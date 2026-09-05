import Link from "next/link";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

// Shared CTA styling so every call-to-action across the site uses the brand
// navy consistently (SEO audit #22 — CTA design consolidation).
export type CtaVariant = "primary" | "outline" | "outlineLight";
export type CtaSize = "md" | "sm" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200";

const SIZES: Record<CtaSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-3 text-lg",
};

const VARIANTS: Record<CtaVariant, string> = {
  // Solid navy — primary action on light backgrounds.
  primary: "bg-[#092754] text-white hover:bg-[#0b3570]",
  // Navy outline that fills on hover — secondary action on light backgrounds.
  outline:
    "border-2 border-[#092754] text-[#092754] hover:bg-[#092754] hover:text-white",
  // White outline that fills white on hover — for dark/navy backgrounds.
  outlineLight:
    "border-2 border-white text-white hover:bg-white hover:text-[#092754]",
};

function classes(variant: CtaVariant, size: CtaSize, extra?: string) {
  return `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${extra ?? ""}`.trim();
}

type SharedProps = {
  variant?: CtaVariant;
  size?: CtaSize;
  className?: string;
  children: ReactNode;
};

export function CtaLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: SharedProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "href"
  >) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function CtaButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  return (
    <button
      className={`${classes(variant, size, className)} disabled:opacity-60 disabled:cursor-not-allowed`}
      {...rest}
    >
      {children}
    </button>
  );
}
