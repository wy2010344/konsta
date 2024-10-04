import { getADomDefault, renderList, renderListButton, renderNavbar, renderNavbarBackLink } from "konsta/better-react";
import { renderPage } from "../util";
import { dom } from "better-react-dom";

export default function () {
  const isPreview = document.location.href.includes('examplePreview');

  renderPage(() => {
    renderNavbar({
      title: "List Button",
      left() {
        if (!isPreview) {
          renderNavbarBackLink({
            onClick() {
              history.back()
            }
          })
        }
      }
    })


    renderList({
      strong: true,
      outlineIos: true,
      children() {
        renderListButton({
          renderChild(type, props) {
            return getADomDefault(type, props).renderText`Button 1`
          }
        })
        renderListButton({
          renderChild(type, props) {
            return getADomDefault(type, props).renderText`Button 2`
          }
        })
        renderListButton({
          renderChild(type, props) {
            return getADomDefault(type, props).renderText`Button 2`
          }
        })
      }
    })


    renderList({
      inset: true,
      strong: true,
      children() {
        renderListButton({
          renderChild(type, props) {
            return getADomDefault(type, props).renderText`Button 1`
          }
        })
        renderListButton({
          renderChild(type, props) {
            return getADomDefault(type, props).renderText`Button 2`
          }
        })
        renderListButton({
          renderChild(type, props) {
            return getADomDefault(type, props).renderText`Button 2`
          }
        })
      }
    })

    renderList({
      inset: true,
      strong: true,
      children() {
        renderListButton({
          className: "k-color-brand-red",
          renderChild(type, props) {
            return getADomDefault(type, props).renderText`Red Button`
          }
        })
      }
    })
  })


}