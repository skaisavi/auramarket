import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  form?: string;
  "aria-label"?: string;
};

const variants = {
  primary: "bg-ink text-white shadow-soft hover:bg-sage-700",
  secondary: "border border-line bg-white/72 text-ink shadow-inset hover:bg-white",
  ghost: "text-ink hover:bg-white/60"
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  disabled,
  type,
  form,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} disabled={disabled} type={type} form={form} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
