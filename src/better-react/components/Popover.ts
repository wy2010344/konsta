import { cls } from '../../shared/cls.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useTheme } from '../shared/use-theme.js';
import { calcPopoverPosition } from '../../shared/calc-popover-position.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { PopoverClasses } from '../../shared/classes/PopoverClasses.js';
import { PopoverColors } from '../../shared/colors/PopoverColors.js';
import { useEffect, useRef, useState } from 'better-react-helper';
import { dom, TextOrFunNode } from 'better-react-dom';
import { RenderCache, renderDomDefault } from '../konsta-better-react.js';

export function renderPopover(props: {
  render?: RenderCache<"div">;
  className?: string;
  angle?: true | undefined;
  angleClassName?: '' | undefined;
  colors?: any;
  size?: string | undefined;
  opened: any;
  backdrop?: true | undefined;
  onBackdropClick: any;
  target?: any;
  targetX?: any;
  targetY?: any;
  targetWidth?: any;
  targetHeight?: any;
  translucent?: true | undefined;
  ios?: boolean;
  material?: boolean;
  children?: TextOrFunNode;
  style?: {} | undefined;
}) {
  const {
    render: renderOut = renderDomDefault,
    className,
    angle = true,
    angleClassName = '',
    colors: colorsProp,
    size = 'w-64',
    opened,
    backdrop = true,
    onBackdropClick,
    target,
    targetX,
    targetY,
    targetWidth,
    targetHeight,
    translucent = true,

    ios,
    material,

    // Children
    children,

    // Rest
    style = {},
    ...rest
  } = props;

  const elRef = useRef<HTMLDivElement | null>(null);
  const angleElRef = useRef<HTMLDivElement | null>(null);
  const [positions, setPositions] = useState<{
    set: boolean;
    angleTop?: number | string;
    angleLeft?: number | string;
    anglePosition: string;
    popoverTop?: number | string;
    popoverLeft?: number | string;
    popoverPosition: string;
  }>({
    set: false,
    angleTop: 0,
    angleLeft: 0,
    anglePosition: 'bottom',
    popoverTop: 0,
    popoverLeft: 0,
    popoverPosition: 'top-left',
  });

  const state = opened ? 'opened' : 'closed';

  const attrs = {
    ...rest,
  };

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  const colors = PopoverColors(colorsProp, dark);

  const c = themeClasses(
    PopoverClasses(
      { ...props, size, angleClassName, translucent },
      colors,
      className
    ),
    className
  );

  const setPopover = () => {
    if (!target || !elRef.current || !opened) return;
    setPositions(
      calcPopoverPosition({
        popoverEl: elRef.current,
        targetEl: target,
        angleEl: angleElRef.current,
        needsAngle: angle,
        targetX,
        targetY,
        targetHeight,
        targetWidth,
        theme,
      })
    );
  };

  const attachEvents = () => {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', setPopover);
  };

  const detachEvents = () => {
    if (typeof window === 'undefined') return;
    window.removeEventListener('resize', setPopover);
  };

  useEffect(() => {
    attachEvents();
    return () => detachEvents();
  });

  useEffect(() => {
    setPopover();
  }, [opened]);

  const popoverStyle = positions.set
    ? {
      ...(style || {}),
      left: positions.popoverLeft,
      top: positions.popoverTop,
    }
    : style;

  const angleStyle = positions.set
    ? {
      left: positions.angleLeft,
      top: positions.angleTop,
    }
    : undefined;

  const originClasses = {
    'top-right': 'origin-bottom-left',
    'top-left': 'origin-bottom-right',
    'middle-left': 'origin-right',
    'middle-right': 'origin-left',
    'bottom-right': 'origin-top-left',
    'bottom-left': 'origin-top-right',
  };

  const classes = cls(
    c.base[state],
    theme === 'material' && originClasses[positions.popoverPosition]
  );

  if (backdrop) {
    dom
      .div({
        className: c.backdrop[state],
        onClick: onBackdropClick
      })
      .render();
  }

  elRef.current = renderOut(
    "div",
    {
      className: classes,
      style: popoverStyle,
    },
    () => {
      if (angle) {
        angleElRef.current = dom
          .div({
            style: angleStyle,
            className: c.angleWrap[positions.anglePosition],
          })
          .render(() => {
            dom
              .div({
                className: c.angleArrow[positions.anglePosition],
              })
              .render();
          });
      }
      dom.div({ className: c.inner }).renderOrText(children);
    }
  );
  return elRef.current!;
}
