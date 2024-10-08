import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useBadge } from './Badge';
import { IconClasses } from '../../shared/classes/IconClasses.js';
import { RenderCache, renderDomDefault } from '../konsta-better-react.js';
import { dom, renderFunOrText, TextOrFunNode} from 'better-react-dom';
import { EmptyFun } from 'wy-helper';
import {renderIf,renderOne } from 'better-react-helper'

export function renderIcon(props: {
  render?: RenderCache<'i'>;
  className?: string;
  ios: EmptyFun;
  material: EmptyFun;
  badge?: TextOrFunNode;
  badgeColors?: any;
  children?: TextOrFunNode;
}) {
  const {
    render = renderDomDefault,
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
    'i',
    {
      className: c.base,
    },
    () => {
      renderOne(theme,()=>{
        if (theme == 'ios') {
          ios();
        } else {
          material();
        }
      })
      renderIf(typeof badge !== 'undefined' && badge !== null,()=>{
        dom
          .span({
            className: useBadge({
              small: true,
              className: c.badge,
              colors: badgeColors,
            }),
          })
          .renderOrText(badge);
      })
      renderFunOrText(children);
    }
  );
}
