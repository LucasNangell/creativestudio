export const brandAssets = {
  logoHorizontalLight: "/assets/brand/logo-horizontal-light.webp",
  logoHorizontalDark: "/assets/brand/logo-horizontal-dark.webp",
  logoVerticalLight: "/assets/brand/logo-vertical-light.webp",
  logoVerticalDark: "/assets/brand/logo-vertical-dark.webp",
  iconGradient: "/assets/brand/icon-gradient.webp",
  iconTransparent: "/assets/brand/icon-transparent.webp",
  logoHorizontalLightBgWhite: "/assets/brand/logo-horizontal-light-bg-white.webp",
  logoVerticalLightBgWhite: "/assets/brand/logo-vertical-light-bg-white.webp",
} as const;

export type BrandLogoVariant = "horizontal" | "vertical" | "icon";
export type BrandLogoTheme = "light" | "dark";
