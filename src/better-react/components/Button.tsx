import { cls } from '../../shared/cls.js';
import { useTheme } from '../shared/use-theme.js';
import {
  useTouchRipple,
  useTouchRippleEl,
} from '../shared/use-touch-ripple.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';

import { useDarkClasses } from '../shared/use-dark-classes.js';
import { ButtonClasses } from '../../shared/classes/ButtonClasses.js';
import { ButtonColors } from '../../shared/colors/ButtonColors.js';
import { RenderACache, renderADomDefault } from '../konsta-better-react.js';

export function renderButton(props: {
  render?: RenderACache<'button'>;
  className?: string;
  colors?: any;
  ios?: any;
  material?: any;
  disabled?: any;
  outline?: any;
  outlineIos?: any;
  outlineMaterial?: any;
  clear?: any;
  clearIos?: any;
  clearMaterial?: any;
  tonal?: any;
  tonalIos?: any;
  tonalMaterial?: any;
  rounded?: any;
  roundedIos?: any;
  roundedMaterial?: any;
  small?: any;
  smallIos?: any;
  smallMaterial?: any;
  large?: any;
  largeIos?: any;
  largeMaterial?: any;
  raised?: any;
  raisedIos?: any;
  raisedMaterial?: any;
  inline?: any;
  segmented?: any;
  segmentedStrong?: any;
  segmentedActive?: any;
  touchRipple?: any;
}) {
  let {
    render = renderADomDefault,
    className,
    colors: colorsProp,

    ios,
    material,

    disabled,

    // Style props
    outline,
    clear,
    tonal,
    rounded,
    small,
    large,
    raised,

    // Segmented
    segmented,
    segmentedStrong,
    segmentedActive,

    touchRipple = true,
  } = props;

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const getThemeSpecificProps = (obj) => {
    const res = {};
    Object.keys(obj).forEach((key) => {
      res[key] =
        typeof obj[key] === 'undefined'
          ? theme === 'ios'
            ? props[`${key}Ios`]
            : props[`${key}Material`]
          : obj[key];
    });
    return res;
  };
  const themeProps = getThemeSpecificProps({
    outline,
    clear,
    tonal,
    rounded,
    small,
    large,
    raised,
  }) as any;

  const size = themeProps.large
    ? 'large'
    : themeProps.small
      ? 'small'
      : 'medium';
  let style = themeProps.outline
    ? 'outline'
    : themeProps.clear || (segmented && !segmentedActive)
      ? 'clear'
      : themeProps.tonal
        ? 'tonal'
        : 'fill';
  if (segmentedStrong) style = 'segmentedStrong';
  if (segmentedStrong && segmentedActive) style = 'segmentedStrongActive';

  const colors = ButtonColors(colorsProp, dark);

  const c = themeClasses(
    ButtonClasses(
      {
        ...props,
        ...themeProps,
      },
      colors,
      className,
      dark
    )
  );
  const classes = cls(
    c.base[themeProps.rounded ? 'rounded' : 'square'],

    // style
    c.style[style],

    // size
    c.size[size],

    themeProps.raised && c.raised,

    className
  );
  const rippleEL = render('button', {
    className: classes,
    disabled,
    role: 'button',
    tabIndex: '0',
  } as any);
  useTouchRippleEl(rippleEL, theme === 'material' && touchRipple);
  return rippleEL;
}
