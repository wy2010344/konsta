import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useTouchRipple, useTouchRippleEl } from '../shared/use-touch-ripple.js';
import CheckboxIcon from './icons/CheckboxIcon.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { RadioClasses } from '../../shared/classes/RadioClasses.js';
import { RadioColors } from '../../shared/colors/RadioColors.js';
import { RenderCache, renderDomDefault } from '../konsta-better-react.js';
import { dom, renderFunOrText, TextOrFunNode } from 'better-react-dom';
import { EmptyFun } from 'wy-helper';
import { renderIf, useEffect, useRef } from 'better-react-helper';

export function renderRadio(props: {
  render?: RenderCache<"label">;
  className?: string;
  colors?: Record<string, any>;

  defaultChecked?: boolean;
  checked?: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: EmptyFun;

  ios?: boolean;
  material?: boolean;

  touchRipple?: boolean;

  children?: TextOrFunNode;
}) {
  const {
    render: renderOut = renderDomDefault,
    className,
    colors: colorsProp,

    defaultChecked,
    checked,
    name,
    value,
    disabled,
    readOnly,
    onChange,

    ios,
    material,

    touchRipple = true,

    // Children
    children,
  } = props;

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = RadioColors(colorsProp, dark);

  const state =
    checked || (defaultChecked && !onChange) ? 'checked' : 'notChecked';

  const c = themeClasses(
    RadioClasses(props, colors, className, dark),
    className
  );

  const el = renderOut("label", { className: c.base }, () => {
    const check = dom
      .input({
        type: 'radio',
        name,
        disabled,
        readOnly,
        onChange,
        className: c.input,
      })
      .render();
    useEffect(() => {
      check.checked = checked!
    }, checked)
    useEffect(() => {
      check.value = value || ""
    }, value)
    dom
      .i({
        className: c.iconWrap[state],
      })
      .render(() => {
        renderIf(theme == 'ios', () => {
          CheckboxIcon({ className: c.icon[state] });
        }, () => {
          dom
            .span({
              className: c.icon[state],
            })
            .render();
        })
      });
    renderFunOrText(children);
  });
  useTouchRippleEl(el, theme === 'material' && touchRipple);
  return el
}
