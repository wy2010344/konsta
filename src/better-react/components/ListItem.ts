import { cls } from '../../shared/cls.js';
import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useTouchRipple, useTouchRippleEl } from '../shared/use-touch-ripple.js';
import ChevronIcon from './icons/ChevronIcon.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { ListItemClasses } from '../../shared/classes/ListItemClasses.js';
import { ListItemColors } from '../../shared/colors/ListItemColors.js';
import { useListDividers } from '../shared/use-list-dividers.js';
import { RenderCache, renderDomDefault } from '../konsta-better-react.js';
import { dom, renderFunOrText, TextOrFunNode } from 'better-react-dom';
import { EmptyFun } from 'wy-helper';
import { DomAttributeSO, DomElementType } from 'wy-dom-helper';

export type ListItemProps = {
  render?: RenderCache<'li'>;

  colors?: Record<string, any>;

  className?: string;
  mediaClassName?: string;
  innerClassName?: string;
  innerChildren?: TextOrFunNode;
  contentClassName?: string;
  contentChildren?: TextOrFunNode;
  titleWrapClassName?: string;

  titleFontSizeIos?: string;
  titleFontSizeMaterial?: string;

  title?: TextOrFunNode;
  subtitle?: TextOrFunNode;
  text?: TextOrFunNode;
  after?: TextOrFunNode;
  media?: TextOrFunNode;
  header?: TextOrFunNode;
  footer?: TextOrFunNode;

  menuListItem?: TextOrFunNode;
  menuListItemActive?: TextOrFunNode;

  groupTitle?: TextOrFunNode;

  strongTitle?: string | boolean;
  dividers?: boolean;
  ios?: boolean;
  material?: boolean;

  touchRipple?: boolean;

  children?: TextOrFunNode;
} & ({
  type?: never
  renderChild?: RenderCache<"div">
  chevron?: never;
  chevronIos?: never;
  chevronMaterial?: never;
  chevronIcon?: never;
} | {
  type: "label"
  renderChild?: RenderCache<"label">
  chevron?: never;
  chevronIos?: never;
  chevronMaterial?: never;
  chevronIcon?: never;
} | {
  type: "link"
  renderChild?: RenderCache<"a">
  chevron?: string;
  chevronIos?: string;
  chevronMaterial?: boolean;
  chevronIcon?: EmptyFun;
})
export function renderListItem(props: ListItemProps) {
  const {
    render = renderDomDefault,
    renderChild = renderDomDefault,
    colors: colorsProp,
    className,
    mediaClassName = '',
    innerClassName = '',
    innerChildren,
    contentClassName = '',
    contentChildren,
    titleWrapClassName = '',

    titleFontSizeIos = 'text-[17px]',
    titleFontSizeMaterial = 'text-[16px]',

    // Content props
    title,
    subtitle,
    text,
    after,
    media,
    header,
    footer,

    menuListItem,
    menuListItemActive,

    groupTitle,

    // Title
    strongTitle = 'auto',

    type,

    chevron = undefined,
    chevronIos = true,
    chevronMaterial = true,
    chevronIcon,

    dividers: dividersProp,

    ios,
    material,

    touchRipple = true,

    // Children
    children,
  } = props;

  const dividers =
    typeof dividersProp === 'undefined' ? useListDividers() : dividersProp;
  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();


  const colors = ListItemColors(colorsProp, dark);

  const isMenuListItemActive = menuListItem && menuListItemActive;

  const textColor =
    colors[
    `${isMenuListItemActive
      ? 'menuListItemActiveText'
      : menuListItem
        ? 'menuListItemText'
        : 'text'
    }${theme === 'ios' ? 'Ios' : 'Material'}` as 'menuListItemTextIos'
    ];

  const isLink = type == 'link' || menuListItem;
  const isLabel = type == 'label'

  const needsTouchRipple =
    theme === 'material' && (isLabel || isLink) && touchRipple;

  const ItemContentComponent = isLink
    ? 'a'
    : isLabel
      ? 'label'
      : 'div';
  const isMediaItem = title && (subtitle || text);
  const autoStrongTitle = strongTitle === 'auto' && isMediaItem;
  const c = themeClasses(
    ListItemClasses(
      {
        ...props,
        titleFontSizeIos,
        titleFontSizeMaterial,
        dividers,
        strongTitle,
        mediaClassName,
        innerClassName,
        contentClassName,
        titleWrapClassName,
      },
      colors,
      {
        isMediaItem,
        theme,
        textColor,
        needsTouchRipple,
        isMenuListItemActive,
        // darkClasses: dark,
        autoStrongTitle,
        className,
      }
    ),
    className
  );

  const itemContentClasses =
    isLink || isLabel ? c.itemContent.link : c.itemContent.default;

  const titleClasses = menuListItem
    ? c.title.menuListItem
    : strongTitle === true || autoStrongTitle
      ? c.title.strong
      : c.title.default;


  const renderComponent = 'li'
  if (groupTitle) {
    return render(renderComponent, {
      className: cls(c.groupTitle, className)
    }, () => {
      renderFunOrText(title);
      renderFunOrText(children);
    });
  }

  return render(renderComponent, {
    className: c.base
  }, () => {
    const rippleEl = (renderChild as any)(ItemContentComponent as 'a', {
      className: itemContentClasses,
    } as any, () => {
      if (media) {
        dom.div({ className: c.media }).renderOrText(media);
      }
      dom.div({ className: c.inner }).render(() => {
        if (header) {
          dom
            .div({
              className: c.header,
            })
            .renderOrText(header);
        }
        if (title || after) {
          dom.div({ className: c.titleWrap }).render(() => {
            if (title) {
              dom.div({ className: titleClasses }).renderOrText(title);
            }
            if (after) {
              dom.div({ className: c.after }).renderOrText(after);
            }

            const hasChevron =
              typeof chevron === 'undefined'
                ? theme === 'ios'
                  ? chevronIos
                  : chevronMaterial
                : chevron;
            if (isLink && hasChevron && !menuListItem) {
              if (chevronIcon) {
                chevronIcon();
              } else {
                ChevronIcon({ className: c.chevron });
              }
            }
          });
        }
        if (subtitle) {
          dom
            .div({
              className: c.subtitle,
            })
            .renderOrText(subtitle);
        }
        if (text) {
          dom
            .div({
              className: c.text,
            })
            .renderOrText(text);
        }
        if (footer) {
          dom
            .div({
              className: c.footer,
            })
            .renderOrText(footer);
        }
        renderFunOrText(innerChildren);
      });
      renderFunOrText(contentChildren);
    });
    useTouchRippleEl(rippleEl, needsTouchRipple);
    renderFunOrText(children);
  });
}
