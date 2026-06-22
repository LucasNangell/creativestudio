export const brandAssets = {
  logo: "/assets/brand/logo.png",
  icon: "/assets/brand/icon.png",
  logoHorizontalLight: "/assets/brand/logo.png",
  logoHorizontalDark: "/assets/brand/logo.png",
  logoVerticalLight: "/assets/brand/logo.png",
  logoVerticalDark: "/assets/brand/logo.png",
  iconGradient: "/assets/brand/icon.png",
  iconTransparent: "/assets/brand/icon.png",
  logoHorizontalLightBgWhite: "/assets/brand/logo.png",
  logoVerticalLightBgWhite: "/assets/brand/logo.png",
} as const;

export type BrandLogoVariant = "horizontal" | "vertical" | "icon";
export type BrandLogoTheme = "light" | "dark";
