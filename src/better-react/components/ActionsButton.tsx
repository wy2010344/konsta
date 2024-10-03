import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useTheme } from '../shared/use-theme.js';
import {
  useTouchRipple,
  useTouchRippleEl,
} from '../shared/use-touch-ripple.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { ActionsButtonClasses } from '../../shared/classes/ActionsButtonClasses.js';
import { ActionsButtonColors } from '../../shared/colors/ActionsButtonColors.js';
import { RenderACache, renderAOrOut } from '../konsta-better-react.js';

export function renderActionsButton(props: {
  render?: RenderACache;
  className?: string;
  colors?: any;
  ios?: any;
  material?: any;
  bold?: any;
  boldIos?: any;
  boldMaterial?: any;
  fontSizeIos?: any;
  fontSizeMaterial?: any;
  href?: any;
  touchRipple?: any;
  dividers?: any;
}) {
  let {
    render = renderAOrOut('button'),
    className,
    colors: colorsProp,

    ios,
    material,

    bold,
    boldIos = false,
    boldMaterial = false,

    fontSizeIos = 'text-xl',
    fontSizeMaterial = 'text-base',

    touchRipple = true,

    dividers = undefined,
  } = props;

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = ActionsButtonColors(colorsProp, dark);

  const isDividers =
    typeof dividers === 'undefined' ? theme === 'ios' : dividers;

  const isBold =
    typeof bold === 'undefined'
      ? theme === 'ios'
        ? boldIos
        : boldMaterial
      : bold;

  const c = themeClasses(
    ActionsButtonClasses(
      {
        fontSizeIos,
        fontSizeMaterial,
        bold: isBold,
        dividers: isDividers,
        ...props,
      },
      colors,
      dark
    ),
    className
  );

  const rippleEl = render({
    role: 'button',
    tabIndex: 0,
    className: c.base,
  } as any);
  useTouchRippleEl(rippleEl, theme === 'material' && touchRipple);
  return rippleEl;
}
