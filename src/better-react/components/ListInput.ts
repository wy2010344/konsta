import { cls } from '../../shared/cls.js';
import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';

import DeleteIcon from './icons/DeleteIcon.js';
import DropdownIcon from './icons/DropdownIcon.js';
import { renderListItem } from './ListItem.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { ListInputClasses } from '../../shared/classes/ListInputClasses.js';
import { ListInputColors } from '../../shared/colors/ListInputColors.js';
import { renderIf, useRef, useState } from 'better-react-helper';
import { dom, renderFunOrText } from 'better-react-dom';
import { GetValue } from 'wy-helper';
export function renderListInput(props: {
  colors?: any;
  label?: any;
  floatingLabel?: any;
  outline?: any;
  outlineIos?: any;
  outlineMaterial?: any;
  media?: any;
  input?: any;
  info?: any;
  error?: any;
  clearButton?: any;
  dropdown?: any;
  inputClassName?: string;
  name?: any;
  onClear?: any;
  ios?: any;
  material?: any;
  children?: any;
  /**
   * 通过是否有值,控制浮动label的展示
   */
  value?: string
  renderInput(arg: {
    className: string
    onFocus(): void
    onBlur(): void
    value?: string
  }): void
}) {
  const {
    // className,
    colors: colorsProp,

    label,
    floatingLabel,
    outline,
    outlineIos,
    outlineMaterial,
    media,
    info, // string
    error, // string or bool
    clearButton,
    dropdown,
    inputClassName = '',

    onClear,

    ios,
    material,

    children,

    value,
    renderInput
  } = props;


  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = ListInputColors(colorsProp, dark);

  const labelStyle = label && floatingLabel ? 'floating' : 'stacked';
  const labelStyleIsFloating =
    labelStyle === 'floating' ? 'floating' : 'notFloating';


  const isFloatingTransformed =
    label && floatingLabel && !value && !isFocused;

  const getLabelColor = () => {
    if (error) return colors.errorText;
    if (theme === 'material') {
      return isFocused
        ? colors.labelTextFocusMaterial
        : colors.labelTextMaterial;
    }
    if (theme === 'ios') {
      return isFocused ? colors.labelTextFocusIos : colors.labelTextIos;
    }

    return '';
  };

  const isOutline =
    typeof outline === 'undefined'
      ? theme === 'ios'
        ? outlineIos
        : outlineMaterial
      : outline;

  const c = themeClasses(
    ListInputClasses(
      {
        ...props,
        outline: isOutline,
        inputClassName,
      },
      colors,
      {
        isFloatingTransformed,
        isFocused,
        darkClasses: dark,
        getLabelColor,
        hasLabel: !!label,
      }
    )
  );

  return renderListItem({
    media,
    className: c.base,
    mediaClassName: c.media,
    innerClassName: c.inner[labelStyle],
    contentClassName: c.itemContent,
    titleWrapClassName: c.titleWrap,
    innerChildren() {
      if (label) {
        dom
          .div({
            className: c.label[labelStyle],
          })
          .render(() => {
            dom
              .div({
                className: c.labelText,
              })
              .renderOrText(label);
          });
      }

      dom
        .div({
          className: c.inputWrap[labelStyle],
        })
        .render(() => {
          renderInput({
            className: c.input[labelStyleIsFloating],
            onFocus() {
              setIsFocused(true)
            },
            onBlur() {
              setIsFocused(false)
            },
            value
          })
          renderIf(clearButton, () => {
            DeleteIcon({
              theme,
              onClick: onClear,
              className: c.clearButton,
            });
          })
          if (dropdown) {
            DropdownIcon({
              className: c.dropdown,
            });
          }
        });
      renderIf(error && error !== true, () => {
        dom
          .div({
            className: cls(c.errorInfo, c.error),
          })
          .renderOrText(error);
      })

      renderIf(info && !error, () => {
        dom
          .div({
            className: cls(c.errorInfo, c.info),
          })
          .renderOrText(info);
      })
    },
    contentChildren() {
      if (isOutline || theme == 'material') {
        dom.span({ className: c.border }).render();
      }
    },
    dividers: theme === 'material' || isOutline ? false : undefined,
    children
  });
}
