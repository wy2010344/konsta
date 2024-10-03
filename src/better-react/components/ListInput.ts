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
export function renderListInput(props: {
  className?: any;
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
  inputId?: any;
  inputStyle?: any;
  inputClassName?: string;
  name?: any;
  value?: any;
  defaultValue?: any;
  type?: string;
  inputMode?: any;
  readOnly?: any;
  required?: any;
  disabled?: any;
  placeholder?: any;
  size?: any;
  accept?: any;
  autoComplete?: any;
  autoCorrect?: any;
  autoCapitalize?: any;
  spellCheck?: any;
  autoFocus?: any;
  autoSave?: any;
  max?: any;
  min?: any;
  step?: any;
  maxLength?: any;
  minLength?: any;
  multiple?: any;
  pattern?: any;
  tabIndex?: any;
  onInput?: any;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  onClear?: any;
  ios?: any;
  material?: any;
  children?: any;
}) {
  const {
    className,
    colors: colorsProp,

    label,
    floatingLabel,
    outline,
    outlineIos,
    outlineMaterial,
    media,
    input, // for custom input
    info, // string
    error, // string or bool
    clearButton,
    dropdown,

    // input props
    inputId,
    inputStyle,
    inputClassName = '',

    name,
    value,
    type = 'text',
    inputMode,
    readOnly,
    required,
    disabled,
    placeholder,
    size,
    accept,
    autoComplete,
    autoCorrect,
    autoCapitalize,
    spellCheck,
    autoFocus,
    autoSave,
    max,
    min,
    step,
    maxLength,
    minLength,
    multiple,
    pattern,
    tabIndex,

    onInput,
    onChange,
    onFocus,
    onBlur,
    onClear,

    ios,
    material,

    children,
  } = props;

  const inputElRef = useRef<HTMLInputElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = ListInputColors(colorsProp, dark);

  const labelStyle = label && floatingLabel ? 'floating' : 'stacked';
  const labelStyleIsFloating =
    labelStyle === 'floating' ? 'floating' : 'notFloating';

  const getDomValue = () => {
    if (!inputElRef.current) return undefined;
    return inputElRef.current.value;
  };

  const isInputHasValue = () => {
    const domValue = getDomValue();
    return typeof value === 'undefined'
      ? domValue || domValue === '0'
      : value || value === 0;
  };
  const isFloatingTransformed =
    label && floatingLabel && !isInputHasValue() && !isFocused;

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

  const onFocusInternal = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  const onBlurInternal = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
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
  const createInput = () => {
    if (input) return input;
    const InputComponent =
      type === 'select' || type === 'textarea' ? type : 'input';
    const needsType = InputComponent === 'input';
    inputElRef.current = dom[InputComponent as any]({
      id: inputId,
      className: c.input[labelStyleIsFloating],
      style: inputStyle,
      name: name,
      type: needsType ? type : undefined,
      placeholder: placeholder,
      inputMode: inputMode,
      size: size,
      accept: accept,
      autoComplete: autoComplete,
      autoCorrect: autoCorrect,
      autoCapitalize: autoCapitalize,
      spellCheck: spellCheck,
      autoFocus: autoFocus,
      autoSave: autoSave,
      disabled: disabled,
      max: max,
      maxLength: maxLength,
      min: min,
      minLength: minLength,
      step: step,
      multiple: multiple,
      readOnly: readOnly,
      required: required,
      pattern: pattern,
      tabIndex: tabIndex,
      value: value,
      onInput: onInput,
      onChange: onChange,
      onFocus: onFocusInternal,
      onBlur: onBlurInternal,
    }).render(() => {
      if (type == 'select') {
        renderFunOrText(children);
      }
    });
  };

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
          createInput();
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
      if (error && error !== true) {
        dom
          .div({
            className: cls(c.errorInfo, c.error),
          })
          .renderOrText(error);
      }
      if (info && !error) {
        dom
          .div({
            className: cls(c.errorInfo, c.info),
          })
          .renderOrText(info);
      }
    },
    contentChildren() {
      if (isOutline || theme == 'material') {
        dom.span({ className: c.border }).render();
      }
    },
    dividers: theme === 'material' || isOutline ? false : undefined,
    children() {
      if (type != 'select') {
        renderFunOrText(children);
      }
    },
  });
}
