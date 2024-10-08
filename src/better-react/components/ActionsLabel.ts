import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { ActionsLabelClasses } from '../../shared/classes/ActionsLabelClasses.js';
import { ActionsLabelColors } from '../../shared/colors/ActionsLabelColors.js';
import { emptyObject } from 'wy-helper';

export function useActionsLabel(
  props: {
    className?: string;
    colors?: any;
    ios?: boolean;
    material?: boolean;
    fontSizeIos?: string | undefined;
    fontSizeMaterial?: string | undefined;
    dividers?: undefined;
  } = emptyObject
) {
  const {
    className,
    colors: colorsProp,

    ios,
    material,

    fontSizeIos = 'text-sm',
    fontSizeMaterial = 'text-sm',

    dividers = undefined,
  } = props;

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = ActionsLabelColors(colorsProp, dark);

  const isDividers =
    typeof dividers === 'undefined' ? theme === 'ios' : dividers;

  const c = themeClasses(
    ActionsLabelClasses(
      { fontSizeIos, fontSizeMaterial, dividers: isDividers, ...props },
      colors
    ),
    className
  );
  return c.base;
}
