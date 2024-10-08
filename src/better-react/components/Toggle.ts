import { ToggleClasses } from '../../shared/classes/ToggleClasses.js';
import { ToggleColors } from '../../shared/colors/ToggleColors.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useTheme } from '../shared/use-theme.js';
import { useTouchRipple } from '../shared/use-touch-ripple.js';
import { dom, renderFunOrText, TextOrFunNode } from 'better-react-dom';
import { RenderCache, renderDomDefault } from '../konsta-better-react.js';
import { useEffect, useRef } from 'better-react-helper';
export function renderToggle(props: {
  render?: RenderCache<"label">;
  className?: string;
  colors?: Record<string, any>;
  checked?: boolean;
  renderCheck(props: {
    type: "checkbox",
    className: string
    checked?: boolean
  }): void

  touchRipple?: true | undefined;
  ios?: boolean;
  material?: boolean;
  children?: TextOrFunNode;
}) {
  const {
    render: renderOut = renderDomDefault,
    className,
    colors: colorsProp,
    checked,
    renderCheck,
    touchRipple = true,

    ios,
    material,

    children
  } = props;

  const rippleTargetElRef = useRef<HTMLSpanElement | null>(null);

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();
  const colors = ToggleColors(colorsProp, dark);

  const state =
    checked ? 'checked' : 'notChecked';

  const c = themeClasses(
    ToggleClasses(props, colors, className, dark),
    className
  );

  const el = renderOut(
    "label",
    {
      className: c.base[state],
    },
    () => {
      renderCheck({
        type: "checkbox",
        className: c.input,
        checked
      })
      dom.span({ className: c.inner[state] }).render();
      rippleTargetElRef.current = dom
        .span({ className: c.thumbWrap[state] })
        .render(() => {
          dom.span({ className: c.thumb[state] }).render();
        });
      renderFunOrText(children);
    }
  );


  useTouchRipple(rippleTargetElRef, theme === 'material' && touchRipple, {
    current: el
  });

  return el
}
