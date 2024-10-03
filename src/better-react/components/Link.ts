import { cls } from '../../shared/cls.js';
import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useTouchRipple, useTouchRippleEl } from '../shared/use-touch-ripple.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { LinkClasses } from '../../shared/classes/LinkClasses.js';
import { LinkColors } from '../../shared/colors/LinkColors.js';
import { useRef } from 'better-react-helper';
import { RenderACache, renderAOrOut, RenderCache, renderOrOut } from '../konsta-better-react.js';
import { renderFunOrText, TextOrFunNode } from 'better-react-dom';
import { EmptyFun } from 'wy-helper';

export function renderLink(props: {
  navbar?: any;
  render?: RenderACache;
  className?: string;
  colors?: Record<string, any>;
  toolbar?: any;
  tabbar?: any;
  tabbarActive?: any;
  touchRipple?: any;
  ios?: any;
  material?: any;
  iconOnly?: boolean
}) {
  const {
    render: renderOut = renderAOrOut('a'),
    className,
    colors: colorsProp,

    // Toolbar/navbar link
    navbar,
    toolbar,

    tabbar,
    tabbarActive,

    touchRipple = undefined,
    ios,
    material,
  } = props;

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const needsTouchRipple =
    theme === 'material' &&
    (touchRipple ||
      ((toolbar || tabbar || navbar) && typeof touchRipple === 'undefined'));


  const colors = LinkColors(colorsProp, dark) as any;

  // prettier-ignore
  const themeTextColor = props.navbar ?
    (
      theme === 'material' ? colors.navbarTextMaterial : colors.navbarTextIos
    ) :
    (
      theme === 'material' ? colors.textMaterial : colors.textIos
    );
  const textColor =
    tabbar && !tabbarActive ? colors.tabbarInactive : themeTextColor;
  const tabbarState = tabbarActive ? 'active' : 'inactive';

  const c = themeClasses(
    LinkClasses(props, { textColor, needsTouchRipple }, className)
  );

  const classes = cls(
    // base
    c.base[tabbar ? 'default' : 'notTabbar'],

    toolbar && c.toolbar,

    navbar && c.navbar,

    tabbar && c.tabbar[tabbarState],

    className
  );

  const rippleEl = renderOut(
    {
      className: classes,
      tabIndex: '0',
      role: 'link',
    } as any
  );
  useTouchRippleEl(rippleEl, needsTouchRipple);
  return rippleEl
}
