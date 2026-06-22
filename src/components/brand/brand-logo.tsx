import Image from "next/image";

import {
  brandAssets,
  type BrandLogoTheme,
  type BrandLogoVariant,
} from "@/data/brand-assets";
import { cn } from "@/lib/utils";

const logoMap = {
  horizontal: {
    light: brandAssets.logoHorizontalLight,
    dark: brandAssets.logoHorizontalDark,
  },
  vertical: {
    light: brandAssets.logoVerticalLight,
    dark: brandAssets.logoVerticalDark,
  },
  icon: {
    light: brandAssets.iconTransparent,
    dark: brandAssets.iconGradient,
  },
} as const;

const sizeMap = {
  horizontal: { width: 220, height: 48 },
  vertical: { width: 160, height: 140 },
  icon: { width: 56, height: 56 },
} as const;

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  theme?: BrandLogoTheme;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "horizontal",
  theme = "dark",
  className,
  priority = false,
}: BrandLogoProps) {
  const src = logoMap[variant][theme];
  const { width, height } = sizeMap[variant];

  const altByVariant = {
    horizontal: "Nangell Creative Studio — logomarca horizontal",
    vertical: "Nangell Creative Studio — logomarca vertical",
    icon: "Nangell Creative Studio — ícone da marca",
  } as const;

  return (
    <Image
      src={src}
      alt={altByVariant[variant]}
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto max-w-full object-contain", className)}
    />
  );
}
