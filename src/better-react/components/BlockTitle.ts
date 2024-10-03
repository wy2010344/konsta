
import { BlockTitleClasses } from '../../shared/classes/BlockTitleClasses.js';
import { BlockTitleColors } from '../../shared/colors/BlockTitleColors.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { emptyObject } from 'wy-helper';

/**
 * 返回类名
 * @param param0 
 * @returns 
 */
export function useBlockTitle({
  ios,
  material,
  colors: colorsProp,
  withBlock = true,
  className,
  ...props
}: {
  className?: string
  ios?: boolean,
  material?: boolean,
  colors?: Record<string, any>
  withBlock?: boolean
  medium?: boolean
  large?: boolean
} = emptyObject) {

  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = BlockTitleColors(colorsProp, dark);

  const c = themeClasses(
    BlockTitleClasses({ ...props, withBlock }, colors),
    className
  );

  return c.base
}