import { emptyObject } from 'wy-helper';
import { BlockClasses } from '../../shared/classes/BlockClasses.js';
import { cls } from '../../shared/cls.js';
import { BlockColors } from '../../shared/colors/BlockColors.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useTheme } from '../shared/use-theme.js';

export function useBlock(
  props: {
    className?: string;
    colors?: any;
    margin?: string;
    padding?: string;
    inset?: boolean;
    insetIos?: string;
    insetMaterial?: string;
    strong?: boolean;
    strongIos?: boolean;
    strongMaterial?: string;
    outline?: boolean;
    outlineIos?: boolean;
    outlineMaterial?: string;
    ios?: boolean;
    material?: boolean;
  } = emptyObject
) {
  const {
    className,
    colors: colorsProp,

    margin = 'my-8',
    padding = 'py-4',
    inset,
    insetIos,
    insetMaterial,
    strong,
    strongIos,
    strongMaterial,
    outline,
    outlineIos,
    outlineMaterial,
    ios,
    material,
  } = props;

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = BlockColors(colorsProp, dark);

  const isStrong =
    typeof strong === 'undefined'
      ? theme === 'ios'
        ? strongIos
        : strongMaterial
      : strong;

  const isOutline =
    typeof outline === 'undefined'
      ? theme === 'ios'
        ? outlineIos
        : outlineMaterial
      : outline;
  const isInset =
    typeof inset === 'undefined'
      ? theme === 'ios'
        ? insetIos
        : insetMaterial
      : inset;

  const c = themeClasses(
    BlockClasses(
      {
        ...props,
        margin,
        padding,
        inset: isInset,
        strong: isStrong,
        outline: isOutline,
      },
      colors,
      className
    )
  );

  const classes = cls(
    // base
    c.base,

    // inset
    isInset && c.inset,

    className
  );
  return classes;
}
