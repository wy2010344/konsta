import { ListItemProps, renderListItem } from './ListItem';
import { emptyObject } from 'wy-helper';
export function renderMenuListItem(
  props: ListItemProps & {
    active?: boolean;
  } = emptyObject
) {
  return renderListItem({
    ...props,
    menuListItem: true,
    menuListItemActive: props.active,
  });
}
