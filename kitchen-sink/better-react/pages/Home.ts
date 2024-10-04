import { effectLayout } from "better-react";
import { dom } from "better-react-dom";
import { useChange, useEffect } from "better-react-helper";
import { getADomDefault, renderDomDefault, renderLink, renderList, renderListItem, renderNavbar, renderPopover, renderRadio, renderToggle, useBlockTitle, usePage } from "konsta/better-react";
import { renderPage, ThemeContext } from "../util";
import { RouterContext } from "better-react-dom-helper";
import renderDemoIcon from "../components/renderDemoIcon";
import { componentsRoutes } from "../routes";





export default function Home() {
  const [darkMode, setDarkMode] = useChange(false);
  const [colorPickerOpened, setColorPickerOpened] = useChange(false);

  const { theme, setTheme, setColorTheme, colorTheme } = ThemeContext.useConsumer()
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const dmode = document.documentElement.classList.contains('dark')
    if (darkMode != dmode) {
      effectLayout(() => {
        setDarkMode(dmode);
      })
    }
  });

  renderPage(() => {
    renderNavbar({
      title: "Konsta UI",
      large: true,
      transparent: true,
      centerTitle: true
    })
    dom.div({
      className: useBlockTitle()
    }).renderText`Theme`

    renderList({
      strong: true,
      inset: true,
      children() {
        renderListItem({
          type: "label",
          title: "iOS Theme",
          media() {
            renderRadio({
              onChange() {
                setTheme("ios");
              },
              checked: theme == 'ios'
            })
          }
        })
        renderListItem({
          type: "label",
          title: "Material Theme",
          media() {
            renderRadio({
              onChange() {
                setTheme("material");
              },
              checked: theme == 'material'
            })
          }
        })
      }
    })

    renderList({
      strong: true,
      inset: true,
      children() {
        renderListItem({
          title: "Dark Mode",
          type: "label",
          after() {
            renderToggle({
              onChange: toggleDarkMode,
              checked: darkMode
            })
          }
        })
        renderListItem({
          title: "Color Theme",
          type: "label",
          render(type, c, render) {
            c.onClick = () => {
              setColorPickerOpened(true)
            }
            return renderDomDefault(type, c, render)
          },
          after() {
            dom.div({
              className: "w-6 h-6 rounded-full bg-primary home-color-picker"
            }).render()
          }
        })
      }
    })

    renderPopover({
      opened: colorPickerOpened,
      onBackdropClick() {
        setColorPickerOpened(false);
      },
      size: "w-36",
      target: ".home-color-picker",
      children() {
        dom.div({
          className: "grid grid-cols-3 py-2"
        }).render(() => {
          renderLink({
            touchRipple: true,
            className: "overflow-hidden h-12",
            render(type, props) {
              props.onClick = () => {
                setColorTheme('')
              }
              return getADomDefault(type, props).render(() => {
                dom.span({
                  className: "bg-brand-primary w-6 h-6 rounded-full"
                }).render()
              })
            }
          })
          renderLink({
            touchRipple: true,
            className: "overflow-hidden h-12",
            render(type, props) {
              props.onClick = () => {
                setColorTheme('k-color-brand-red')
              }
              return getADomDefault(type, props).render(() => {
                dom.span({
                  className: "bg-brand-red w-6 h-6 rounded-full"
                }).render()
              })
            }
          })
          renderLink({
            touchRipple: true,
            className: "overflow-hidden h-12",
            render(type, props) {

              props.onClick = () => {
                setColorTheme('k-color-brand-green')
              }
              return getADomDefault(type, props).render(() => {
                dom.span({
                  className: "bg-brand-green w-6 h-6 rounded-full"
                }).render()
              })
            }
          })
          renderLink({
            touchRipple: true,
            className: "overflow-hidden h-12",
            render(type, props) {

              props.onClick = () => {
                setColorTheme('k-color-brand-yellow')
              }
              return getADomDefault(type, props).render(() => {
                dom.span({
                  className: "bg-brand-yellow w-6 h-6 rounded-full"
                }).render()
              })
            }
          })
          renderLink({
            touchRipple: true,
            className: "overflow-hidden h-12",
            render(type, props) {
              props.onClick = () => {
                setColorTheme('k-color-brand-purple')
              }
              return getADomDefault(type, props).render(() => {
                dom.span({
                  className: "bg-brand-purple w-6 h-6 rounded-full"
                }).render()
              })
            }
          })
        })
      }
    })


    dom.div({
      className: useBlockTitle()
    }).renderText`Components`
    renderList({
      strong: true,
      inset: true,
      children() {
        const { rHistory } = RouterContext.useConsumer()
        componentsRoutes.forEach(cr => {
          renderListItem({
            title: cr.href,
            type: "link",
            renderChild(type, props, render) {
              props.onClick = () => {
                rHistory.push(cr.href)
              }
              return renderDomDefault(type, props, render)
            },
            media: renderDemoIcon
          })
        })
      }
    })
  })
}