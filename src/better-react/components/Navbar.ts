
import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { NavbarClasses } from '../../shared/classes/NavbarClasses.js';
import { NavbarColors } from '../../shared/colors/NavbarColors.js';
import { useEffect, useRef } from 'better-react-helper';
import { dom, renderFunOrText, TextOrFunNode } from 'better-react-dom';
import { EmptyFun } from 'wy-helper';
import { RenderCache, renderOrOut } from '../konsta-better-react.js';



export function renderNavbar(props: {
  render?: RenderCache;

  className?: string


  bgClassName?: string,
  innerClassName?: string,
  leftClassName?: string,
  titleClassName?: string,
  subtitleClassName?: string,
  rightClassName?: string,
  subnavbarClassName?: string,


  centerTitle?: boolean


  colors?: Record<string, any>,
  translucent?: boolean,
  outline?: boolean,
  medium?: boolean,
  large?: boolean,
  transparent?: boolean,

  fontSizeIos?: string
  fontSizeMaterial?: string
  titleFontSizeIos?: string
  titleFontSizeMaterial?: string
  titleMediumFontSizeIos?: string
  titleMediumFontSizeMaterial?: string
  titleLargeFontSizeIos?: string
  titleLargeFontSizeMaterial?: string

  left?: TextOrFunNode
  title?: TextOrFunNode,
  subtitle?: TextOrFunNode
  right?: TextOrFunNode
  children?: TextOrFunNode
  subnavbar?: TextOrFunNode
  ios?: boolean
  material?: boolean


  scrollEl?: HTMLElement & {
    current?: HTMLElement
  }
}) {
  const {
    render: renderOut = renderOrOut("div"),
    className,

    bgClassName = '',
    innerClassName = '',
    leftClassName = '',
    titleClassName = '',
    subtitleClassName = '',
    rightClassName = '',
    subnavbarClassName = '',

    centerTitle,

    colors: colorsProp,
    translucent = true,
    outline,
    medium,
    large,
    transparent,

    fontSizeIos = 'text-[17px]',
    fontSizeMaterial = 'text-[16px]',

    titleFontSizeIos = 'text-[17px]',
    titleFontSizeMaterial = 'text-[22px]',

    titleMediumFontSizeIos = 'text-[24px]',
    titleMediumFontSizeMaterial = 'text-[24px]',

    titleLargeFontSizeIos = 'text-[34px]',
    titleLargeFontSizeMaterial = 'text-[28px]',

    scrollEl,

    left,
    title,
    subtitle,
    right,
    subnavbar,
    ios,
    material,
    children,
    ...rest
  } = props


  const elRef = useRef<HTMLDivElement | undefined>(undefined);
  const titleContainerHeight = useRef(0);
  const bgElRef = useRef<HTMLDivElement | undefined>(undefined);
  const innerElRef = useRef<HTMLDivElement | undefined>(undefined);
  const titleContainerElRef = useRef<HTMLDivElement | undefined>(undefined);
  const titleElRef = useRef<HTMLDivElement | undefined>(undefined);
  const subnavbarElRef = useRef<HTMLDivElement | undefined>(undefined);

  const wasScrollable = useRef<boolean | undefined>(undefined);

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = NavbarColors(colorsProp, dark);

  const onScroll = (e) => {
    const { scrollTop } = e.target;
    if (!transparent && !large && !medium) {
      if (wasScrollable.current) {
        if (titleElRef.current) {
          titleElRef.current.style.opacity = '';
        }
        if (bgElRef.current) {
          bgElRef.current.style.opacity = '';
        }
      }
      return;
    }

    const maxTranslate = titleContainerHeight.current;
    const scrollProgress = Math.max(Math.min(scrollTop / maxTranslate, 1), 0);

    bgElRef.current!.style.opacity = transparent
      ? -0.5 + scrollProgress * 1.5 + ''
      : '';
    if (medium || large) {
      bgElRef.current!.style.transform = `translateY(-${scrollProgress * maxTranslate
        }px)`;
    }

    if (titleContainerElRef.current) {
      titleContainerElRef.current.style.transform = `translateY(-${scrollProgress * maxTranslate
        }px)`;
      titleContainerElRef.current!.style.opacity = 1 - scrollProgress * 2 + '';
    }
    if (titleElRef.current) {
      titleElRef.current!.style.opacity = -0.5 + scrollProgress * 1.5 + '';
    }
    if ((medium || large) && subnavbarElRef.current) {
      subnavbarElRef.current.style.transform = `translateY(-${scrollProgress * maxTranslate
        }px)`;
    }
  };

  const getScrollEl = () => {
    if (typeof scrollEl === 'undefined') {
      return elRef.current && elRef.current.parentNode;
    }
    return scrollEl.current || scrollEl;
  };

  const initScroll = () => {
    if (!large && !medium && !transparent) {
      if (wasScrollable.current) {
        onScroll({ target: { scrollTop: 0 } });
        wasScrollable.current = false;
      }
      return;
    }
    wasScrollable.current = true;
    if (titleContainerElRef.current) {
      titleContainerHeight.current = titleContainerElRef.current.offsetHeight;
    } else {
      titleContainerHeight.current = innerElRef.current!.offsetHeight;
    }
    const scrollElLocal = getScrollEl();
    if (scrollElLocal) {
      scrollElLocal.addEventListener('scroll', onScroll);
      onScroll({ target: scrollElLocal });
    } else {
      onScroll({ target: { scrollTop: 0 } });
    }
  };

  const destroyScroll = () => {
    const scrollElLocal = getScrollEl();
    if (scrollElLocal) {
      scrollElLocal.removeEventListener('scroll', onScroll);
    }
  };

  useEffect(() => {
    initScroll();
    return destroyScroll;
  });

  const isOutline = typeof outline === 'undefined' ? theme === 'ios' : outline;

  const c = themeClasses(
    NavbarClasses(
      {
        ...props,
        centerTitle:
          typeof centerTitle === 'undefined' ? theme === 'ios' : centerTitle,
        translucent,
        outline: isOutline,
        fontSizeIos,
        fontSizeMaterial,
        titleFontSizeIos,
        titleFontSizeMaterial,
        titleMediumFontSizeIos,
        titleMediumFontSizeMaterial,
        titleLargeFontSizeIos,
        titleLargeFontSizeMaterial,
        bgClassName,
        innerClassName,
        leftClassName,
        titleClassName,
        subtitleClassName,
        rightClassName,
        subnavbarClassName,
      },
      colors,
      className
    ),
    className
  );

  const el = renderOut({
    className: c.base
  }, () => {
    bgElRef.current = dom.div({ className: c.bg }).render()
    innerElRef.current = dom.div({ className: c.inner }).render(() => {
      if (left) {
        dom.div({
          className: c.left
        }).renderOrText(left)
      }
      if (title || subtitle) {
        titleElRef.current = dom.div({
          className: c.title
        }).render(() => {
          renderFunOrText(title)
          if (subtitle) {
            dom.div({
              className: c.subtitle
            }).renderOrText(subtitle)
          }
        })
      }
      if (right) {
        dom.div({ className: c.right }).renderOrText(right)
      }
      renderFunOrText(children)
    })
    if (large || medium) {
      titleContainerElRef.current = dom.div({
        className: c.titleContainer
      }).renderOrText(title)
    }
    if (subnavbar) {
      subnavbarElRef.current = dom.div({
        className: c.subnavbar
      }).renderOrText(subnavbar)
    }
  })
  return el
}