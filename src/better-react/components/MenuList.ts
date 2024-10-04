import { emptyObject } from 'wy-helper';
import { ListProps, renderList } from './List';

export function renderMenuList(props: ListProps = emptyObject) {
  return renderList({
    ...props,
    menuList: true,
  });
}
