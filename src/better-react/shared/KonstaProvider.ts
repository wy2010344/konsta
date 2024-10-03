import { emptyObject } from "wy-helper";
import { KonstaContext, KonstaTheme } from "./KonstaContext";
import { useAutoTheme } from "./use-auto-theme";

export function useKonstaProvider({
  theme,
  dark,
  touchRipple = true,
  autoThemeDetection = true,
}: {
  theme: KonstaTheme
  dark?: boolean
  touchRipple?: boolean
  autoThemeDetection?: boolean
} = emptyObject as any) {
  const currentTheme = useAutoTheme(theme, autoThemeDetection);
  KonstaContext.useProvider({
    theme: currentTheme,
    dark,
    touchRipple
  })
}