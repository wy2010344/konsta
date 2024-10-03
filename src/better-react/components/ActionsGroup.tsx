import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { ActionsGroupClasses } from '../../shared/classes/ActionsGroupClasses.js';
import { emptyObject } from 'wy-helper';

export function useActionsGruop(
  props: {
    className?: string;
    ios?: boolean;
    material?: boolean;
    dividers?: true | undefined;
  } = emptyObject
) {
  const {
    className,

    ios,
    material,

    dividers = true,
  } = props;
  const themeClasses = useThemeClasses({ ios, material });

  const c = themeClasses(
    ActionsGroupClasses({ dividers, ...props }),
    className
  );
  return c.base;
}
