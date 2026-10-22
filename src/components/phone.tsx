import Image from "next/image";

/** A real app screen (rendered from the app itself) in a phone frame. */
export function Phone({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[2.6rem] border border-white/10 bg-[#050605] p-2.5 shadow-[0_30px_80px_-20px_rgb(198_244_50/0.25),0_20px_50px_rgb(0_0_0/0.6)] ${className}`}
    >
      <div className="overflow-hidden rounded-[2.1rem]">
        <Image src={src} alt={alt} width={720} height={1560} priority={priority} className="h-auto w-full" />
      </div>
      <div aria-hidden className="absolute left-1/2 top-4 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/80" />
    </div>
  );
}
