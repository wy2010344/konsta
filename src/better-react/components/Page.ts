import { emptyObject } from 'wy-helper';
import { PageClasses } from '../../shared/classes/PageClasses.js';
import { PageColors } from '../../shared/colors/PageColors.js';
import { useDarkClasses } from '../shared/use-dark-classes';
import { useThemeClasses } from '../shared/use-theme-classes';

/**
 * 返回page的className
 * @param param0 
 * @returns 
 */
export function usePage({
  className,
  colors: colorsProp,
  ios,
  material,
}: {
  className?: string
  ios?: boolean
  material?: boolean
  colors?: Record<string, any>
} = emptyObject) {

  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = PageColors(colorsProp, dark);

  const c = themeClasses(PageClasses(emptyObject, colors, className), className);

  return c.base
}