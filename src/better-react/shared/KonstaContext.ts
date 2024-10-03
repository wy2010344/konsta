import { createContext } from "better-react";
import { dom } from "better-react-dom";
import { DomAttribute, DomAttributeSO, DomElement, DomElementType } from "wy-dom-helper";
import { EmptyFun } from "wy-helper";

export type KonstaTheme = 'material' | 'ios' | 'parent'
const KonstaContext = createContext<{
  theme: KonstaTheme,
  dark?: boolean,
  touchRipple?: boolean
}>(undefined as any);


export type RenderCache<key extends DomElementType = any> = (props: DomAttribute<key> | DomAttributeSO<key>, render: EmptyFun) => DomElement<key>
export type RenderACache<key extends DomElementType = any> = (props: DomAttribute<key> | DomAttributeSO<key>) => DomElement<key>
const cacheGlobak: {
  [key in DomElementType]?: RenderCache<key>
} = {}
export function renderOrOut<T extends DomElementType>(type: T): RenderCache<T> {
  let old: any = cacheGlobak[type]
  if (old) {
    return old
  }
  old = function (props: DomAttribute<T> | DomAttributeSO<T>, render: EmptyFun) {
    return dom[type as "div"](props as any).render(render)
  }
  cacheGlobak[type] = old
  return old
}

export function renderAOrOut<T extends DomElementType>(type: T): RenderACache<T> {
  return renderOrOut(type) as any
}

export { KonstaContext };