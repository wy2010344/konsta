import { dom } from "better-react-dom";
import { renderIf, useChange } from "better-react-helper";
import { renderActions, renderActionsButton, renderButton, renderNavbar, renderNavbarBackLink, useActionsGruop, useActionsLabel, useBlock, useBlockTitle, usePage } from "konsta/better-react";
import { renderPage } from "../util";

export default function () {
  const isPreview = document.location.href.includes('examplePreview');

  const [actionsOneOpened, setActionsOneOpened] = useChange(false);
  const [actionsTwoOpened, setActionsTwoOpened] = useChange(false);


  /**
   * 用了动画网页后,出了问题...
   */
  renderPage(() => {
    renderNavbar({
      title: "Action Sheet",
      left() {
        renderIf(!isPreview, () => {
          renderNavbarBackLink({
            onClick() {
              history.back()
            }
          })
        })
      }
    })
    dom.div({
      className: useBlock({
        strong: true,
        inset: true,
        className: "space-y-4"
      })
    }).render(() => {
      dom.p().renderText`
        Action Sheet is a slide-up pane for presenting the user with a set of
          alternatives for how to proceed with a given task.
      
      `
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Open Action Sheet`

    dom.div({
      className: useBlock({
        strong: true,
        inset: true,
        className: "flex space-x-4 rtl:space-x-reverse"
      })
    }).render(() => {
      renderButton({
        render(props) {
          return dom.button({
            ...props,
            onClick() {
              setActionsOneOpened(true)
            }
          }).renderText`One group`
        }
      })
      renderButton({
        render(props) {
          return dom.button({
            ...props,
            onClick() {
              setActionsTwoOpened(true)

            }
          }).renderText`Two group`
        }
      })
    })

    dom.div({
      className: renderActions({
        opened: actionsOneOpened,
        onBackdropClick() {
          setActionsOneOpened(false)
        }
      })
    }).render(() => {
      dom.div({
        className: useActionsGruop()
      }).render(() => {
        dom.div({
          className: useActionsLabel()
        }).renderText`Do something`
        renderActionsButton({
          bold: true,
          render(props) {
            props.onClick = () => {
              setActionsOneOpened(false)
            }
            return dom.button(props).renderText`Button 1`
          }
        })
        renderActionsButton({
          render(props) {
            props.onClick = () => {
              setActionsOneOpened(false)
            }
            return dom.button(props).renderText`Button 2`
          }
        })
        renderActionsButton({
          render(props) {
            props.onClick = () => {
              setActionsOneOpened(false)
            }
            return dom.button(props).renderText`cancel`
          }
        })
      })
    })

    dom.div({
      className: renderActions({
        opened: actionsTwoOpened,
        onBackdropClick() {
          setActionsTwoOpened(false)
        }
      })
    }).render(() => {
      dom.div({
        className: useActionsGruop()
      }).render(() => {
        dom.div({
          className: useActionsLabel()
        }).renderText`Do something`
        renderActionsButton({
          bold: true,
          render(props) {
            props.onClick = () => {
              setActionsTwoOpened(false)
            }
            return dom.button(props).renderText`Button 1`
          }
        })
        renderActionsButton({
          render(props) {
            props.onClick = () => {
              setActionsTwoOpened(false)
            }
            return dom.button(props).renderText`Button 2`
          }
        })
        renderActionsButton({
          render(props) {
            props.onClick = () => {
              setActionsTwoOpened(false)
            }
            return dom.button(props).renderText`cancel`
          }
        })
      })
    })
  })

}