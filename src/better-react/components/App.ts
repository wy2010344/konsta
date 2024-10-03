import { useKonstaProvider } from '../shared/KonstaProvider';
import { useAutoTheme } from '../shared/use-auto-theme';
import { AppClasses } from '../../shared/classes/AppClasses';
import { KonstaTheme } from '../shared/KonstaContext';



/**
 * 返回app的类
 * @param param0 
 * @returns 
 */

export function useApp({
  className,

  theme = 'material',
  dark = true,
  touchRipple = true,
  safeAreas = true,
}: {
  className?: string,
  theme: KonstaTheme,
  dark?: boolean,
  touchRipple?: boolean,
  safeAreas?: boolean,
}) {
  const currentTheme = useAutoTheme(theme);
  const classes = AppClasses({ safeAreas }, currentTheme, className);
  useKonstaProvider({
    theme: currentTheme,
    dark,
    touchRipple,
    autoThemeDetection: false
  })
  return classes
}