"use client";

import { useEffect, useState } from "react";
import { DownloadButton } from "@/components/download-button";

/**
 * Beta 6.2 (C8, C15): what an invite link shows on a phone without FITOS (or
 * on a computer). With FITOS installed, Android opens the app instead (App
 * Links, /.well-known/assetlinks.json). Nothing is fetched: the link itself
 * holds only the club's code or the person's handle.
 */
type Invite = { kind: "club"; code: string } | { kind: "friend"; handle: string } | { kind: "none" };

function inviteFromPath(path: string): Invite {
  const club = /^\/c\/([A-HJ-NP-Z2-9]{8})\/?$/i.exec(path);
  if (club !== null) return { kind: "club", code: club[1]!.toUpperCase() };
  const friend = /^\/u\/([a-z0-9_]{3,20})\/?$/i.exec(path);
  if (friend !== null) return { kind: "friend", handle: friend[1]!.toLowerCase() };
  return { kind: "none" };
}

export function InviteDetails() {
  const [invite, setInvite] = useState<Invite | null>(null);
  useEffect(() => setInvite(inviteFromPath(window.location.pathname)), []);
  if (invite === null) return null;
  if (invite.kind === "none") {
    return <p className="text-lg text-white/80">This invite link is not complete. Ask for it again.</p>;
  }
  const shown = invite.kind === "club" ? `${invite.code.slice(0, 4)}-${invite.code.slice(4)}` : `@${invite.handle}`;
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
        <p className="text-sm uppercase tracking-wide text-white/60">{invite.kind === "club" ? "Club code" : "Handle"}</p>
        <p className="mt-2 font-mono text-3xl tracking-widest text-white">{shown}</p>
      </div>
      <ol className="list-decimal space-y-2 pl-6 text-white/80">
        <li>Get FITOS below and sign in.</li>
        <li>Open Community and choose a handle.</li>
        {invite.kind === "club" ? (
          <li>
            Clubs → Join with a code → <strong className="text-white">{shown}</strong>. Or open this link again: it now opens FITOS.
          </li>
        ) : (
          <li>
            Friends → Add a friend → <strong className="text-white">{shown}</strong>. Or open this link again: it now opens FITOS.
          </li>
        )}
      </ol>
      <DownloadButton />
    </div>
  );
}
