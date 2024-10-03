import { createContext } from "better-react"
import { dom } from "better-react-dom"
import { useTriggerStyleWithShow } from "better-react-dom-helper"
import { useEffect } from "better-react-helper"
import { Action, BrowserHistory, Location } from "history"
import { KonstaTheme, usePage } from "konsta/better-react"
import { ClsWithStyle, CSSProperties } from "wy-dom-helper"
import { EmptyFun, emptyObject, ExitModel, getTimeoutPromise } from "wy-helper"
import { animate } from 'motion'
export const GlobalContext = createContext<{
  action?: Action
  history: BrowserHistory
  location: Location,
}>(undefined as any)


export const ThemeContext = createContext<{
  theme: KonstaTheme,
  setTheme(v: KonstaTheme): void
  colorTheme: string
  setColorTheme(v: string): void
}>(undefined as any)



export const PageContext = createContext<ExitModel<{
  key: string;
  loading: boolean;
  render: EmptyFun;
}>>(undefined as any)



const styleLeft: CSSProperties = {
  // opacity: 0,
  transform: `translateX(-100%)`
}
const styleLeftHalf: CSSProperties = {
  // opacity: 0,
  transform: `translateX(-50%)`
}

const styleRight: CSSProperties = {
  // opacity: 0,
  transform: `translateX(100%)`
}

export function renderPage(renderChildren: EmptyFun) {
  const row = PageContext.useConsumer()


  const { action } = GlobalContext.useConsumer()
  useEffect(() => {
    let x: (string | number)[] = []
    if (action == Action.Pop) {
      if (row.exiting) {
        x = [0, '100%']
      } else {
        x = ['-50%', 0]
      }
    } else if (action == Action.Push) {
      if (row.exiting) {
        x = [0, '-50%']
      } else {
        x = ['100%', 0]
      }
    }
    animate(div, {
      x: x,
    }).finished.then(row.resolve)
  }, row.exiting)
  const div = dom.div({
    className: usePage(),
  }).render(renderChildren)
  return div
  /**
   * 感觉用上面的动画库要好一些
   * 用下面的css触发,可能无法触发动画
   * 总之原生css方式效果很不好!!!
   */
  // let exitStyle: CSSProperties = emptyObject
  // let enterStyle: CSSProperties = emptyObject
  // if (action == Action.Pop) {
  //   if (row.exiting) {
  //     exitStyle = styleRight
  //   } else {
  //     enterStyle = styleLeftHalf
  //   }
  // } else if (action == Action.Push) {
  //   if (row.exiting) {
  //     exitStyle = styleLeftHalf
  //   } else {
  //     enterStyle = styleRight
  //   }
  // }
  // const waitFinish = getTimeoutPromise(1000, row.resolve)
  // const { style } = useTriggerStyleWithShow<HTMLDivElement, ClsWithStyle>(
  //   () => div!,
  //   row.exiting,
  //   {
  //     from: {
  //       style: { ...enterStyle }
  //     },
  //     target: {
  //       style: {
  //         transition: `all ease 1s`,
  //         opacity: 1,
  //         transform: `translateX(0)`
  //       }
  //     },
  //     waitFinish
  //   },
  //   {
  //     target: {
  //       style: {
  //         transition: `all ease 1s`,
  //         ...exitStyle
  //       }
  //     },
  //     waitFinish
  //   })
  // const div = dom.div({
  //   className: usePage(),
  //   style
  // }).render(renderChildren)
  // return div
}