import { cls } from '../../shared/cls.js';
import { ListClasses } from '../../shared/classes/ListClasses.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useTheme } from '../shared/use-theme.js';
import { ListColors } from '../../shared/colors/ListColors.js';
import { ListDividersContext } from '../shared/ListDividersContext';
import { RenderCache, renderOrOut } from '../konsta-better-react.js';
import { dom, TextOrFunNode } from 'better-react-dom';
import { emptyObject } from 'wy-helper';
import { renderStateHolder } from 'better-react';

export function renderList(props: {
  render?: RenderCache
  className?: string

  colors?: Record<string, any>,

  margin?: string,
  menuList?: boolean,

  dividers?: boolean,
  dividersIos?: boolean,
  dividersMaterial?: boolean,

  inset?: boolean,
  insetIos?: boolean,
  insetMaterial?: boolean,
  strong?: boolean,
  strongIos?: boolean,
  strongMaterial?: boolean,
  outline?: boolean,
  outlineIos?: boolean,
  outlineMaterial?: boolean,

  ios?: boolean,
  material?: boolean,

  // Children
  children?: TextOrFunNode,
} = emptyObject) {
  const {
    render = renderOrOut("ul"),
    className,
    colors: colorsProp,

    margin = 'my-8',
    menuList,

    dividers,
    dividersIos = true,
    dividersMaterial = false,

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

    // Children
    children,
  } = props;


  const theme = useTheme();
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const hasDividers =
    typeof dividers === 'undefined'
      ? theme === 'ios'
        ? dividersIos
        : dividersMaterial
      : dividers;
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

  const colors = ListColors(colorsProp, dark);

  const c = themeClasses(
    ListClasses(
      {
        ...props,
        margin,
        inset: isInset,
        strong: isStrong,
        outline: isOutline,
      },
      colors,
      className
    )
  );

  const classes = cls(
    c.base,

    isInset && c.inset,

    menuList && c.menuList,

    className
  );


  let node
  renderStateHolder(() => {
    ListDividersContext.useProvider(hasDividers)
    node = render({ className: classes }, () => {
      dom.ul({ className: c.ul }).renderOrText(children)
    })
  })
  return node
};

