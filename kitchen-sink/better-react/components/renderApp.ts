import { renderExitAnimateArray, renderOne, useChange, useEffect, useExitAnimate, useMemo } from 'better-react-helper'
import { useApp } from 'konsta/better-react';
import { KonstaTheme } from 'konsta/better-react';
import { dom } from 'better-react-dom'
import { Route, RouterContext, useRouter, useTriggerStyleWithShow } from 'better-react-dom-helper'
import { Action, createBrowserHistory } from 'history';
import { getPathNodes, locationMatch, RootRelativeHistory } from 'wy-helper/router';
import { emptyArray, getTimeoutPromise } from 'wy-helper';
import { GlobalContext, PageContext, ThemeContext } from '../util';
import { componentsRoutes } from '../routes';
export default function renderApp() {
  const [theme, setTheme] = useChange<KonstaTheme>(
    window.location.search.includes('theme=material') ? 'material' : 'ios'
  );
  const [currentColorTheme, setCurrentColorTheme] = useChange('');
  const setColorTheme = (color: string) => {
    const htmlEl = document.documentElement;
    htmlEl.classList.forEach((c) => {
      if (c.includes('k-color')) htmlEl.classList.remove(c);
    });
    if (color) htmlEl.classList.add(color);
    setCurrentColorTheme(color);
  };
  useEffect(() => {
    const w = window as any
    w.setTheme = (t) => setTheme(t);
    w.setMode = (mode) => {
      if (mode === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    };
  }, []);
  const inIFrame = window.parent !== window;
  useEffect(() => {
    if (window.location.href.includes('safe-areas')) {
      const html = document.documentElement;
      if (html) {
        html.style.setProperty(
          '--k-safe-area-top',
          theme === 'ios' ? '44px' : '24px'
        );
        html.style.setProperty('--k-safe-area-bottom', '34px');
      }
    }
  }, [theme]);

  ThemeContext.useProvider({
    theme,
    setTheme,
    colorTheme: currentColorTheme,
    setColorTheme
  })

  const pathNodes = useHistory()
  dom.div({
    className: useApp({ theme, safeAreas: !inIFrame })
  }).render(() => {
    const arg = useRouter({
      routes
    }, pathNodes)

    const { action } = GlobalContext.useConsumer()
    renderExitAnimateArray(
      useExitAnimate([arg], v => v.key, {
        mode: action == Action.Pop ? 'pop' : 'shift',
      }),
      row => {
        PageContext.useProvider(row)
        row.value.render()
      }
    )
  })
}


const routes: Route[] = [

  {
    match: locationMatch('/'),
    getPage() {
      return import("../pages/Home")
    },
  },
  ...componentsRoutes.map(cr => {
    return {
      match: locationMatch(cr.href),
      getPage: cr.getPage
    }
  })
]

function createHistory() {
  const history = createBrowserHistory()
  return {
    history,
    rHistory: new RootRelativeHistory(history)
  }
}
function useHistory() {
  const { history, rHistory } = useMemo(createHistory, emptyArray)
  const [location, setRouter] = useChange(history.location)
  const [action, setAction] = useChange<Action>()
  useEffect(() => {
    history.listen((update) => {
      setAction(update.action)
      setRouter(update.location)
    })
  }, emptyArray)
  const pathNodes = useMemo(() => {
    return getPathNodes(location.pathname)
  }, location.pathname)
  GlobalContext.useProvider({
    action,
    history,
    location
  })
  RouterContext.useProvider({
    pathNodes,
    rHistory
  })
  return pathNodes as readonly string[]
}
