import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useBadge } from './Badge';
import { IconClasses } from '../../shared/classes/IconClasses.js';
import { RenderCache, renderOrOut } from '../konsta-better-react.js';
import { dom, renderFunOrText, TextOrFunNode } from 'better-react-dom';
import { EmptyFun } from 'wy-helper';

export function renderIcon(props: {
  render?: RenderCache<'i'> | undefined;
  className?: string;
  ios: EmptyFun;
  material: EmptyFun;
  badge?: TextOrFunNode;
  badgeColors?: any;
  children?: TextOrFunNode;
}) {
  const {
    render = renderOrOut('i'),
    className,

    ios,
    material,

    badge,
    badgeColors,

    // Children
    children,
  } = props;
  const themeClasses = useThemeClasses();
  const theme = useTheme();

  const c = themeClasses(IconClasses(props, className), className);

  return render(
    {
      className: c.base,
    },
    () => {
      if (theme == 'ios') {
        ios();
      } else {
        material();
      }
      if (typeof badge !== 'undefined' && badge !== null) {
        dom
          .span({
            className: useBadge({
              small: true,
              className: c.badge,
              colors: badgeColors,
            }),
          })
          .renderOrText(badge);
      }
      renderFunOrText(children);
    }
  );
}
