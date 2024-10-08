import { TabbarLinkClasses } from '../../shared/classes/TabbarLinkClasses.js';
import { TabbarLinkColors } from '../../shared/colors/TabbarLinkColors.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';

import { renderLink } from './Link';
import { RenderCache, renderDomDefault } from '../konsta-better-react.js';
import { dom, renderFunOrText, TextOrFunNode } from 'better-react-dom';

export function renderTabbarLink(props: {
  render?: RenderCache<'a'>;
  className?: string;
  active?: boolean;
  ios?: boolean;
  material?: boolean;
  colors?: any;
  icon?: TextOrFunNode;
  label?: TextOrFunNode;
  children?: TextOrFunNode;
}) {
  const {
    render = renderDomDefault,
    className,
    active,

    ios,
    material,
    colors: colorsProp,
    icon,
    label,

    children,
    ...rest
  } = props;

  const dark = useDarkClasses();
  const colors = TabbarLinkColors(colorsProp, dark);
  const themeClasses = useThemeClasses({ ios, material });

  const hasIcon = !!icon;
  const hasLabel = label || children;
  const c = themeClasses(
    TabbarLinkClasses({ hasLabel, hasIcon, active }, colors)
  );

  return renderLink({
    tabbar: true,
    tabbarActive: active,
    className,
    ...rest,
    render(type, props) {
      return render(type, props, () => {
        return dom
          .span({
            className: c.content,
          })
          .render(() => {
            if (icon) {
              dom
                .span({
                  className: c.iconContainer,
                })
                .render(() => {
                  dom.span({
                    className: c.iconBg,
                  });
                  renderFunOrText(icon);
                });
            }
            if (label || children) {
              dom
                .span({
                  className: c.label,
                })
                .render(() => {
                  renderFunOrText(label);
                  renderFunOrText(children);
                });
            }
          });
      });
    },
  });
}
