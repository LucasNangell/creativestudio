export const brandAssets = {
  logoHorizontalLight: "/assets/brand/logo-horizontal-light.png",
  logoHorizontalDark: "/assets/brand/logo-horizontal-dark.png",
  logoVerticalLight: "/assets/brand/logo-vertical-light.png",
  logoVerticalDark: "/assets/brand/logo-vertical-dark.png",
  iconGradient: "/assets/brand/icon-gradient.png",
  iconTransparent: "/assets/brand/icon-transparent.png",
  logoHorizontalLightBgWhite: "/assets/brand/logo-horizontal-light-bg-white.png",
  logoVerticalLightBgWhite: "/assets/brand/logo-vertical-light-bg-white.png",
} as const;

export type BrandLogoVariant = "horizontal" | "vertical" | "icon";
export type BrandLogoTheme = "light" | "dark";
