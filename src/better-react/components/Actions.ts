import { useThemeClasses } from '../shared/use-theme-classes.js';
import { ActionsClasses } from '../../shared/classes/ActionsClasses.js';
import { dom } from 'better-react-dom';
import { EmptyFun } from 'wy-helper';
export function renderActions(props: {
  className?: string;
  ios?: boolean;
  material?: boolean;
  opened?: boolean;
  backdrop?: true | undefined;
  onBackdropClick?: EmptyFun;
}) {
  const {
    className,

    ios,
    material,

    opened,
    backdrop = true,
    onBackdropClick,
  } = props;
  const state = opened ? 'opened' : 'closed';

  const themeClasses = useThemeClasses({ ios, material });

  const c = themeClasses(ActionsClasses(props, className), className);

  if (backdrop) {
    dom
      .div({ className: c.backdrop[state], onClick: onBackdropClick })
      .render();
  }

  return c.base[state] as string;
}
