import { SearchbarClasses } from '../../shared/classes/SearchbarClasses.js';
import { SearchbarColors } from '../../shared/colors/SearchbarColors.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { cls } from '../../shared/cls.js';
import { useTheme } from '../shared/use-theme.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';

import DeleteIcon from './icons/DeleteIcon.js';
import SearchIcon from './icons/SearchIcon.js';
import BackIcon from './icons/BackIcon.js';
import { renderDomDefault } from '../konsta-better-react.js';
import { dom } from 'better-react-dom';
import { renderInput } from 'better-react-dom-helper';
import {
  renderIf,
  renderOne,
  useEffect,
  useRef,
  useState,
} from 'better-react-helper';

export function renderSearchbar(props: {
  oninput?: (e: any) => void;
  value: any;
  onClear: any;
  disableButton: any;
  disableButtonText: any;
  onDisable: any;
  render?: any;
  className?: any;
  colors?: any;
  placeholder?: any;
  inputId?: any;
  inputStyle?: any;
  clearButton?: any;
  onInput?: any;
  onFocus?: any;
  onBlur?: any;
  ios?: any;
  material?: any;
}) {
  const {
    render = renderDomDefault,
    className,
    colors: colorsProp,

    placeholder = 'Search',
    value,
    inputId,
    inputStyle,

    disableButton = false,
    disableButtonText = 'Cancel',
    clearButton = true,

    onInput,
    onFocus,
    onBlur,
    onClear,
    onDisable,

    ios,
    material,
  } = props;

  const searchElRef = useRef<HTMLInputElement | null>(null);
  const disableButtonRef = useRef<HTMLButtonElement | null>(null);
  const [disableButtonWidth, setDisableButtonWidth] = useState(0);
  const disableTimeout = useRef<any>(null);
  const allowTransition = useRef(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = SearchbarColors(colorsProp, dark);

  const handleInput = (e) => {
    if (onInput) onInput(e);
  };

  const handleFocus = (e) => {
    setIsEnabled(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    if (onBlur) onBlur(e);
  };

  const onGlobalBlur = () => {
    if (!value) {
      disableTimeout.current = setTimeout(() => {
        setIsEnabled(false);
      });
    }
  };
  const onGlobalFocus = () => {
    clearTimeout(disableTimeout.current);
  };

  const handleDisableButton = (e) => {
    e.preventDefault();
    setIsEnabled(false);
    if (searchElRef.current) {
      searchElRef.current.blur();
    }
    if (onDisable) onDisable();
    if (onClear) onClear();
  };

  useEffect(() => {
    if (disableButtonRef.current) {
      setDisableButtonWidth(disableButtonRef.current.offsetWidth);
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        allowTransition.current = true;
      });
    });
  }, []);

  const c = themeClasses(
    SearchbarClasses({ ...props }, colors, { isEnabled, darkClasses: dark })
  );
  return render(
    'div',
    {
      className: c.base,
      onBlurCapture: onGlobalBlur,
      onFocusCapture: onGlobalFocus,
    },
    () => {
      dom
        .div({
          className: c.inner,
        })
        .render(() => {
          dom
            .span({
              className: c.searchIconWrap,
            })
            .render(() => {
              SearchIcon({
                theme,
                className: c.searchIcon,
              });
            });
          const input = dom
            .input({
              id: inputId,
              className: cls(c.input),
              style: inputStyle,
              type: 'text',
              name: 'search',
              placeholder,
              value,
              onInput: handleInput,
              onFocus: handleFocus,
              onBlur: handleBlur,
            } as any)
            .render();
          console.log('dv', value);
          searchElRef.current = input;
          renderIf(value && clearButton, () => {
            dom
              .button({
                className: c.clearButton,
                onClick: onClear,
                type: 'button',
              })
              .render(() => {
                DeleteIcon({
                  theme,
                  className: c.deleteIcon,
                });
              });
          });
        });

      const key = disableButton ? theme : undefined;
      renderOne(key, () => {
        if (key == 'ios') {
          disableButtonRef.current = dom
            .button({
              type: 'button',
              style: {
                marginRight: isEnabled ? 0 : `-${disableButtonWidth}px`,
                transitionDuration: !allowTransition.current ? '0ms' : '',
              },
              className: c.cancelButton,
              onClick: handleDisableButton,
              onPointerDown(e) {
                e.preventDefault();
              },
            })
            .renderOrText(disableButtonText);
        } else if (key == 'material') {
          BackIcon({
            theme,
            onClick: handleDisableButton,
            className: cls(c.cancelButton),
            onPointerDown(e) {
              e.preventDefault();
            },
          });
        }
      });
    }
  );
}
