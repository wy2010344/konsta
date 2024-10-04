import { createContext } from "better-react";
import { dom, DomCreater } from "better-react-dom";
import { DomAttribute, DomAttributeSO, DomElement, DomElementType } from "wy-dom-helper";
import { emptyFun, EmptyFun } from "wy-helper";

export type KonstaTheme = 'material' | 'ios' | 'parent'
const KonstaContext = createContext<{
  theme: KonstaTheme,
  dark?: boolean,
  touchRipple?: boolean
}>(undefined as any);


export type RenderCache<key extends DomElementType> = (
  type: key,
  props: DomAttributeSO<key>,
  render: EmptyFun) => DomElement<key>

export function renderDomDefault<T extends DomElementType>(
  type: T,
  props: DomAttributeSO<T>,
  renderChildren: EmptyFun
) {
  return dom[type as 'div'](props as any).render(renderChildren) as DomElement<T>
}
export type RenderACache<key extends DomElementType> = (
  type: key,
  props: DomAttributeSO<key>
) => DomElement<key>


export function renderADomDefault<T extends DomElementType>(
  type: T,
  props: DomAttributeSO<T>
) {
  return renderDomDefault(type, props, emptyFun)
}

export function getADomDefault<T extends DomElementType>(
  type: T,
  props: DomAttributeSO<T>
) {
  return dom[type as 'div'](props as any) as unknown as DomCreater<T>
}

export { KonstaContext };