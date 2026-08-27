import beeImg from "@/assets/bee.png";
import { cn } from "@/lib/utils";

interface BeeProps {
  className?: string;
  /** "float" sobe e desce suavemente, "fly" faz a abelhinha voar pela tela */
  motion?: "float" | "fly" | "none";
  size?: number;
}

export function Bee({ className, motion = "float", size = 96 }: BeeProps) {
  return (
    <img
      src={beeImg}
      alt="Abelhinha mascote da Dercibs Doces"
      width={size}
      height={size}
      loading="lazy"
      style={{ width: size, height: size }}
      className={cn(
        "select-none drop-shadow-sm",
        motion === "float" && "animate-float",
        motion === "fly" && "animate-fly",
        className,
      )}
    />
  );
}
