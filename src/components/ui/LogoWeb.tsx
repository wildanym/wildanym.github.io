import { cn } from "@/utils/cn";
import logoSrc from "@/assets/images/logo.webp";

interface LogoWebProps {
  className?: string;
  animate?: boolean;
}

export function LogoWeb({ className, animate = true }: LogoWebProps) {
  return (
    <img
      src={logoSrc}
      alt='logo'
      aria-hidden='true'
      decoding='async'
      className={cn(animate && "logo-web", className)}
    />
  );
}
