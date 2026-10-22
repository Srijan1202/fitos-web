import Link from "next/link";

/** "Get the app": always to the Download page, which has the file, its checksum and the install steps. */
export function DownloadButton({ size = "md", label = "Get the app" }: { size?: "sm" | "md" | "lg"; label?: string }) {
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };
  return (
    <Link
      href="/download/"
      className={`lime-gradient inline-flex items-center gap-2 rounded-xl font-semibold text-carbon shadow-[0_8px_30px_-8px_rgb(198_244_50/0.6)] transition hover:brightness-110 ${sizes[size]}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-[1.1em] w-[1.1em]" fill="none" stroke="currentColor" strokeWidth={2.2}>
        <path d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </Link>
  );
}
