import { BadgeClasses } from '../../shared/classes/BadgeClasses.js';
import { BadgeColors } from '../../shared/colors/BadgeColors.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { emptyObject } from 'wy-helper';

/**默认是span */
export function useBadge(
  props: {
    className?: string;
    colors?: any;
    small?: boolean;
    ios?: boolean;
    material?: boolean;
  } = emptyObject
) {
  const {
    className,
    colors: colorsProp,
    small,

    ios,
    material,
  } = props;

  const themeClasses = useThemeClasses({ ios, material });

  const colors = BadgeColors(colorsProp);

  const size = small ? 'sm' : 'md';

  const c = themeClasses(BadgeClasses(props, colors), className);

  return c.base[size];
}
