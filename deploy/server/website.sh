#!/bin/bash
# The FITOS website on the API server (no CloudFront): Caddy, which already
# serves api.<domain> with HTTPS, serves <domain> and www.<domain> too.
#
# Run as root through Systems Manager by deploy/deploy.ps1 — never by hand;
# the server has no SSH. In order, stopping at the first failure while the
# site that is serving keeps serving:
#
#   1. download the site archive (a short-lived S3 link) and check its SHA-256;
#   2. unpack it into releases/<release>;
#   3. with an APK: download it, check its SHA-256, put it in public/downloads/;
#   4. --files-only stops here (the domain does not point at this server yet,
#      so Caddy could not get a certificate);
#   5. make sure the Caddyfile (and the template release.sh renders it from)
#      imports sites/*.caddy; write sites/website.caddy for this release;
#      validate, then a graceful reload (no dropped requests, the API included);
#   6. smoke over HTTPS on this host: /, /features/, a 404, www -> apex, the
#      APK; on failure Caddy goes back to the previous site config;
#   7. keep the newest three releases and three APKs.
#
# Usage: website.sh <domain> <release> <site-url> <site-sha256>
#                   [--apk <name> <url> <sha256>] [--files-only]
set -euo pipefail

DOMAIN="${1:-}"; RELEASE="${2:-}"; SITE_URL="${3:-}"; SITE_SHA="${4:-}"
shift 4 || { echo "usage: website.sh <domain> <release> <site-url> <site-sha256> [--apk <name> <url> <sha256>] [--files-only]" >&2; exit 2; }
APK_NAME=""; APK_URL=""; APK_SHA=""; FILES_ONLY=0
while [ $# -gt 0 ]; do
  case "$1" in
    --apk) APK_NAME="$2"; APK_URL="$3"; APK_SHA="$4"; shift 4 ;;
    --files-only) FILES_ONLY=1; shift ;;
    *) echo "unknown option: $1" >&2; exit 2 ;;
  esac
done
[[ "$DOMAIN" =~ ^[a-z0-9.-]+$ ]] || { echo "bad domain" >&2; exit 2; }
[[ "$RELEASE" =~ ^[0-9]{14}-[0-9a-f]{7}(-dirty)?$ ]] || { echo "bad release id" >&2; exit 2; }
[[ "$SITE_SHA" =~ ^[0-9a-f]{64}$ ]] || { echo "bad site sha256" >&2; exit 2; }
if [ -n "$APK_NAME" ]; then
  [[ "$APK_NAME" =~ ^[A-Za-z0-9._-]+\.apk$ ]] || { echo "bad apk name" >&2; exit 2; }
  [[ "$APK_SHA" =~ ^[0-9a-f]{64}$ ]] || { echo "bad apk sha256" >&2; exit 2; }
fi

CADDY=/opt/fitos/caddy           # mounted read-only in fitos-caddy as /etc/caddy
WEB="$CADDY/website"
SITES="$CADDY/sites"
IMPORT='import /etc/caddy/sites/*.caddy'
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

log() { printf '[website %s] %s\n' "$(date -u +%H:%M:%S)" "$*"; }
fetch() { curl -fsS --retry 3 --max-time 300 -o "$2" "$1"; }
check_sha() { echo "$2  $1" | sha256sum -c --quiet - || { echo "SHA-256 mismatch for $3" >&2; exit 1; }; }

# ---- 1-2. the site ------------------------------------------------------------------
log "site $RELEASE"
fetch "$SITE_URL" "$TMP/site.tar.gz"
check_sha "$TMP/site.tar.gz" "$SITE_SHA" "the site archive"
install -d -m 0755 "$WEB/releases" "$WEB/public/downloads" "$SITES"
rm -rf "$WEB/releases/$RELEASE.new"
install -d -m 0755 "$WEB/releases/$RELEASE.new"
tar -xzf "$TMP/site.tar.gz" -C "$WEB/releases/$RELEASE.new" --no-same-owner --no-same-permissions
[ -f "$WEB/releases/$RELEASE.new/index.html" ] && [ -f "$WEB/releases/$RELEASE.new/404.html" ] ||
  { echo "the archive has no index.html or 404.html" >&2; exit 1; }
chmod -R a+rX,go-w "$WEB/releases/$RELEASE.new"
rm -rf "$WEB/releases/$RELEASE"
mv "$WEB/releases/$RELEASE.new" "$WEB/releases/$RELEASE"

# ---- 3. the APK ---------------------------------------------------------------------
if [ -n "$APK_NAME" ]; then
  if [ -f "$WEB/public/downloads/$APK_NAME" ] && echo "$APK_SHA  $WEB/public/downloads/$APK_NAME" | sha256sum -c --quiet - 2>/dev/null; then
    log "APK $APK_NAME already in place"
  else
    log "APK $APK_NAME"
    fetch "$APK_URL" "$TMP/app.apk"
    check_sha "$TMP/app.apk" "$APK_SHA" "the APK"
    install -m 0644 "$TMP/app.apk" "$WEB/public/downloads/$APK_NAME"
  fi
fi

if [ "$FILES_ONLY" = 1 ]; then
  log "files in place; $DOMAIN is not served yet (--files-only)"
  exit 0
fi

# ---- 5. Caddy -----------------------------------------------------------------------
docker ps --format '{{.Names}}' | grep -qx fitos-caddy || { echo "fitos-caddy is not running (release the API first)" >&2; exit 1; }
for f in "$CADDY/Caddyfile" /opt/fitos/bin/Caddyfile.tmpl; do
  [ -f "$f" ] || continue
  grep -qxF "$IMPORT" "$f" || { printf '\n%s\n' "$IMPORT" >> "$f"; log "added the sites import to $f"; }
done

previous=""
[ -f "$SITES/website.caddy" ] && previous="$(cat "$SITES/website.caddy")"
restore() {
  if [ -n "$previous" ]; then printf '%s\n' "$previous" > "$SITES/website.caddy"; else rm -f "$SITES/website.caddy"; fi
  docker exec fitos-caddy caddy reload --config /etc/caddy/Caddyfile >/dev/null 2>&1 || true
}
sed -e "s|__DOMAIN__|$DOMAIN|g" -e "s|__RELEASE__|$RELEASE|g" /opt/fitos/website-bin/website.caddy > "$SITES/website.caddy.new"
chmod 0644 "$SITES/website.caddy.new"
mv "$SITES/website.caddy.new" "$SITES/website.caddy"
if ! docker exec fitos-caddy caddy validate --config /etc/caddy/Caddyfile >"$TMP/validate.log" 2>&1; then
  tail -5 "$TMP/validate.log" >&2
  restore
  echo "the new site config is invalid; the previous one is back" >&2
  exit 1
fi
docker exec fitos-caddy caddy reload --config /etc/caddy/Caddyfile

# ---- 6. smoke over HTTPS, through Caddy, on this host ------------------------------------
probe() { curl -sS -o /dev/null -w '%{http_code}' --max-time 10 --resolve "$1:443:127.0.0.1" "https://$1$2" 2>/dev/null || true; }
ok=0
for _ in $(seq 1 45); do   # the first time, Caddy needs a moment for the certificates
  [ "$(probe "$DOMAIN" /)" = 200 ] && [ "$(probe "www.$DOMAIN" /)" = 301 ] && { ok=1; break; }
  sleep 2
done
if [ "$ok" = 1 ]; then
  [ "$(probe "$DOMAIN" /features/)" = 200 ] || ok=0
  [ "$(probe "$DOMAIN" /no-such-page/)" = 404 ] || ok=0
  [ -z "$APK_NAME" ] || [ "$(probe "$DOMAIN" "/downloads/$APK_NAME")" = 200 ] || ok=0
fi
if [ "$ok" != 1 ]; then
  docker logs --since 3m fitos-caddy 2>&1 | grep -i "$DOMAIN" | tail -5 >&2 || true
  restore
  echo "HTTPS smoke failed for $DOMAIN; Caddy is back on the previous site config. Does $DOMAIN (and www) point at this server's Elastic IP?" >&2
  exit 1
fi
log "serving $RELEASE at https://$DOMAIN"

# ---- 7. tidy ------------------------------------------------------------------------
ls -1 "$WEB/releases" | grep -v "^$RELEASE\$" | sort -r | tail -n +3 | while read -r old; do rm -rf "${WEB:?}/releases/$old"; done
ls -1t "$WEB/public/downloads" | tail -n +4 | while read -r old; do [ "$old" = "$APK_NAME" ] || rm -f "$WEB/public/downloads/$old"; done
printf '%s\n' "$RELEASE" > "$WEB/current"
