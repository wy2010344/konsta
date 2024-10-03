
import { getScheduleAskTime } from 'wy-helper';
import './styles/index.css';
const app = document.getElementById("app")!
import { createRoot } from 'better-react-dom'
import renderApp from './components/renderApp';
const destroy = createRoot(
  app,
  renderApp,
  getScheduleAskTime()
)
window.addEventListener("unload", function () {
  destroy()
})