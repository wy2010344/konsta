import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { BlockHeaderClasses } from '../../shared/classes/BlockHeaderClasses.js';
import { BlockHeaderColors } from '../../shared/colors/BlockHeaderColors.js';
import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { emptyObject } from 'wy-helper';

export function useBlockHeader(props: {
  className?: string;
  colors?: any;
  ios?: boolean;
  material?: boolean;
  inset?: boolean;
  insetIos?: boolean;
  insetMaterial?: boolean;
} = emptyObject) {
  const {
    className,
    colors: colorsProp,

    ios,
    material,

    inset,
    insetIos,
    insetMaterial,
  } = props;
  const theme = useTheme();

  const isInset =
    typeof inset === 'undefined'
      ? theme === 'ios'
        ? insetIos
        : insetMaterial
      : inset;

  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = BlockHeaderColors(colorsProp, dark);

  const c = themeClasses(
    BlockHeaderClasses({ ...props, inset: isInset }, colors),
    className
  );

  return c.base;
}
