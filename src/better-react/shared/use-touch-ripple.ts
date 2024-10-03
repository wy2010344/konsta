import { KonstaContext } from './KonstaContext.js';
import { TouchRipple } from '../../shared/touch-ripple-class.js';
import { useEffect, useRef } from 'better-react-helper';


export function useTouchRippleEl(el: HTMLElement, needsTouchRipple?: any) {
  if (!el) {
    throw new Error('need element')
  }
  return useTouchRipple({ current: el }, needsTouchRipple)
}
export const useTouchRipple = (
  elRef: {
    current?: HTMLElement | null
  },
  needsTouchRipple?: any,
  eventsElRef?: {
    current?: HTMLElement | null
  }) => {
  const context = KonstaContext.useConsumer();
  if (!eventsElRef) eventsElRef = elRef;
  const ripple = useRef<TouchRipple | null>(null);
  const removeRipple = () => {
    if (ripple.current) ripple.current.remove();
    ripple.current = null;
  };

  const onPointerDown = (e) => {
    ripple.current = new TouchRipple(elRef.current, e.pageX, e.pageY);
  };
  const onPointerMove = () => {
    removeRipple();
  };
  const onPointerUp = () => {
    removeRipple();
  };

  const attachEvents = () => {
    if (!context.touchRipple) return;

    const el = eventsElRef!.current!;
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('contextmenu', onPointerUp);
  };
  const detachEvents = () => {
    const el = eventsElRef.current!;
    el.removeEventListener('pointerdown', onPointerDown);
    el.removeEventListener('pointermove', onPointerMove);
    el.removeEventListener('pointerup', onPointerUp);
    el.removeEventListener('pointercancel', onPointerUp);
    el.removeEventListener('contextmenu', onPointerUp);
  };
  const onMounted = () => {
    if (!eventsElRef || !eventsElRef.current || !needsTouchRipple) return;
    attachEvents();
  };
  const onDestroy = () => {
    if (!eventsElRef || !eventsElRef.current || !needsTouchRipple) return;
    detachEvents();
  };

  useEffect(() => {
    onMounted();
    return () => onDestroy();
  });
};
