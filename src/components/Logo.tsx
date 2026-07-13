import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({
  width = 160,
  height,
  className,
}: LogoProps) {
  const h = height ?? width;

  return (
    <Image
      src="/fullSizeIcon.png"
      alt="Sifr Mind"
      width={width}
      height={h}
      className={cn("shrink-0", className)}
      priority
    />
  );
}
