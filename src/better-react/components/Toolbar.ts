import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { ToolbarClasses } from '../../shared/classes/ToolbarClasses.js';
import { ToolbarColors } from '../../shared/colors/ToolbarColors.js';
import { useEffect, useRef, useState } from 'better-react-helper';
import { RenderCache, renderDomDefault } from '../konsta-better-react.js';
import { dom, TextOrFunNode } from 'better-react-dom';

export type ToolbarProps = {
  render?: RenderCache<'div'>;
  className: string;
  colors?: any;
  translucent?: boolean | undefined;
  bgClassName?: string | undefined;
  innerClassName?: string | undefined;
  outline?: boolean;
  tabbar?: boolean;
  tabbarIcons?: any;
  tabbarLabels?: any;
  top?: any;
  ios?: boolean;
  material?: boolean;
  children?: TextOrFunNode;
};
export function renderToolbar(props: ToolbarProps) {
  const {
    render = renderDomDefault,
    className,
    colors: colorsProp,
    translucent = true,

    bgClassName = '',
    innerClassName = '',

    outline,

    tabbar,
    tabbarIcons,
    tabbarLabels,

    top,

    ios,
    material,

    children,
  } = props;

  const highlightElRef = useRef<any>(null);

  const [highlightStyle, setHighlightStyle] = useState({
    transform: '',
    width: '',
  });
  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = ToolbarColors(colorsProp, dark);

  const isOutline = typeof outline === 'undefined' ? theme === 'ios' : outline;

  const c = themeClasses(
    ToolbarClasses(
      {
        ...props,
        outline: isOutline,
        translucent,
        bgClassName,
        innerClassName,
      },
      colors,
      className
    ),
    className
  );

  const hasHighlight = theme === 'material' && tabbar && !tabbarIcons;

  useEffect(() => {
    if (hasHighlight && highlightElRef.current) {
      const linksEl = highlightElRef.current.previousElementSibling;
      const width = (1 / linksEl.children.length) * 100;
      const activeIndex = [...linksEl.children].indexOf(
        linksEl.querySelector('.k-tabbar-link-active')
      );

      setHighlightStyle({
        ...highlightStyle,
        width: `${width}%`,
        transform: `translateX(${activeIndex * 100}%)`,
      });
    }
  }, [children]);

  return render(
    'div',
    {
      className: c.base,
    },
    () => {
      dom.div({ className: c.bg }).render();
      dom.div({ className: c.inner }).renderOrText(children);
      if (hasHighlight) {
        highlightElRef.current = dom
          .span({
            className: c.highlight,
            style: highlightStyle,
          })
          .render();
      }
    }
  );
}
