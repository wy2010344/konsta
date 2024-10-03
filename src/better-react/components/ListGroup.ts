import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { renderList } from './List';
import { dom } from 'better-react-dom';

export function renderListGroup(props) {
  return dom.li().render(() => {
    renderList({
      nested: true,
      ...props
    })
  })
}
