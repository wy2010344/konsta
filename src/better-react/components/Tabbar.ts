import { renderToolbar, ToolbarProps } from './Toolbar';

export function renderTabbar(
  props: {
    labels: any;
    icons: any;
  } & Omit<ToolbarProps, 'tabbar' | 'tabbarIcons' | 'tabbarLabels'>
) {
  const { labels, icons } = props;

  return renderToolbar({
    tabbar: true,
    tabbarIcons: icons,
    tabbarLabels: labels,
    ...props,
  });
}
