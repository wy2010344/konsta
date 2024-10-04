import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import BackIcon from './icons/BackIcon.js';
import { renderLink } from './Link.js';
import { NavbarBackLinkClasses } from '../../shared/classes/NavbarBackLinkClasses.js';
import { dom, renderFunOrText, TextOrFunNode } from 'better-react-dom';
import { RenderCache, renderDomDefault } from '../konsta-better-react.js';
import { EmptyFun } from 'wy-helper';

export function renderNavbarBackLink(props: {
  render?: RenderCache<'a'>;
  className?: string;
  text?: string;
  showText?: 'auto' | boolean;
  ios?: any;
  material?: any;
  onClick?: EmptyFun;
  children?: TextOrFunNode;
}) {
  const {
    render = renderDomDefault,
    className,

    text = 'Back',

    showText = 'auto',

    ios,
    material,

    onClick,

    // Children
    children,
  } = props;

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });

  const shouldShowText =
    (showText === 'auto' && theme === 'ios') || showText === true;

  const c = themeClasses(NavbarBackLinkClasses(), className);

  renderLink({
    render(type, props) {
      props.onClick = onClick;
      return render(type, props, () => {
        dom
          .span({
            className: c.icon,
          })
          .render(() => {
            BackIcon({
              theme,
            });
          });
        if (shouldShowText) {
          dom.span().renderOrText(text);
        }
        renderFunOrText(children);
      });
    },
    className: c.base,
    navbar: true,
  });
}
