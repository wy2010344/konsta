import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import {
  useTouchRipple,
  useTouchRippleEl,
} from '../shared/use-touch-ripple.js';
import { ListButtonClasses } from '../../shared/classes/ListButtonClasses.js';
import { ListButtonColors } from '../../shared/colors/ListButtonColors.js';
import { useListDividers } from '../shared/use-list-dividers.js';
import {
  RenderACache,
  renderADomDefault,
  RenderCache,
  renderDomDefault,
} from '../konsta-better-react.js';
import { emptyObject } from 'wy-helper';

export function renderListButton(
  props: {
    render?: RenderCache<'li'>;
    renderChild?: RenderACache<'button'>;
    className?: string;
    colors?: any;
    ios?: boolean;
    material?: boolean;
    touchRipple?: true | undefined;
  } = emptyObject
) {
  const {
    render = renderDomDefault,
    renderChild = renderADomDefault,
    className,
    colors: colorsProp,
    ios,
    material,

    touchRipple = true,
  } = props;
  const dividers = useListDividers();

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });

  const dark = useDarkClasses();

  const colors = ListButtonColors(colorsProp, dark);

  const c = themeClasses(
    ListButtonClasses({ ...props, dividers }, colors, className),
    className
  );
  return render(
    "li",
    {
      className: c.base,
    },
    () => {
      const btn = renderChild("button", {
        className: c.button,
      });
      useTouchRippleEl(btn, theme === 'material' && touchRipple);
    }
  );
}
