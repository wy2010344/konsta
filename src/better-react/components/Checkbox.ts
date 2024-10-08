import { CheckboxClasses } from '../../shared/classes/CheckboxClasses.js';
import { CheckboxColors } from '../../shared/colors/CheckboxColors.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import {
  useTouchRipple,
  useTouchRippleEl,
} from '../shared/use-touch-ripple.js';

import CheckboxIcon from './icons/CheckboxIcon.js';
import { RenderCache, renderDomDefault } from '../konsta-better-react.js';
import { dom, renderFunOrText, TextOrFunNode } from 'better-react-dom';
import { renderIf, useEffect, useRef } from 'better-react-helper';

export function renderCheckbox(props: {
  render?: RenderCache<'label'>;
  colors?: any;
  className?: string;
  ios?: boolean;
  material?: boolean;
  children?: TextOrFunNode;
  touchRipple?: boolean;
  indeterminate?: boolean;

  checked?: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onInput?(e: Event): void;
}) {
  const {
    render = renderDomDefault,
    className,
    colors: colorsProp,
    indeterminate,
    checked,
    name,
    value,
    disabled,
    readOnly,
    onInput,

    ios,
    material,

    touchRipple = true,

    // Children
    children,
  } = props;
  const inputElRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();
  const colors = CheckboxColors(colorsProp, dark);

  const state = checked || !onInput || indeterminate ? 'checked' : 'notChecked';

  const c = themeClasses(
    CheckboxClasses(props, colors, className, dark),
    className
  );

  useEffect(() => {
    if (inputElRef.current) {
      inputElRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  const el = render(
    'label',
    {
      className: c.base,
    },
    () => {
      const el = dom
        .input({
          type: 'checkbox',
          name,
          disabled,
          readOnly,
          value,
          onInput: onInput as any,
          className: c.input,
        } as any)
        .render();
      useEffect(() => {
        el.checked = !!checked;
      }, !checked);
      inputElRef.current = el;
      dom
        .i({
          className: c.iconWrap[state],
        })
        .render(() => {
          renderIf(
            indeterminate,
            () => {
              dom
                .span({
                  className: c.indeterminateIcon,
                })
                .render();
            },
            () => {
              CheckboxIcon({
                ios,
                material,
                className: c.icon[state],
              });
            }
          );
        });
      renderFunOrText(children);
    }
  );
  useTouchRippleEl(el, theme === 'material' && touchRipple);
  return el;
}
