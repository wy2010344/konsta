import { useChange, useEffect } from "better-react-helper";
import { KonstaTheme } from "./KonstaContext";
import { effectLayout } from "better-react";




export function useAutoTheme(theme: KonstaTheme, autoThemeDetection = true) {
  const [themeState, setThemeState] = useChange(theme);

  useEffect(e => {
    if (!autoThemeDetection) return;
    effectLayout(() => {
      if (theme === 'ios' || theme === 'material') {
        if (themeState !== theme) setThemeState(theme);
      } else if (
        themeState === 'parent' &&
        typeof window !== 'undefined' &&
        typeof document !== 'undefined'
      ) {
        const htmlEl = document.documentElement;
        if (htmlEl) {
          if (htmlEl.classList.contains('ios')) {
            setThemeState('ios');
          } else if (
            htmlEl.classList.contains('md') ||
            htmlEl.classList.contains('material')
          ) {
            setThemeState('material');
          }
        }
      }
    })
  }, theme)
  return autoThemeDetection ? themeState : theme;
}