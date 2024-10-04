import { useState } from "better-react-helper";
import { renderPage } from "../util";
import { renderDomDefault, renderMenuList, renderMenuListItem, renderNavbar, renderNavbarBackLink, useBlock } from "konsta/better-react";
import { dom } from "better-react-dom";
import renderDemoIcon from "../components/renderDemoIcon";



export default function () {

  const isPreview = document.location.href.includes('examplePreview');
  const [selected, setSelected] = useState('home');
  const [selectedMedia, setSelectedMedia] = useState('home');

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

    dom.div({
      className: useBlock({
        strong: true,
        inset: true
      })
    }).render(() => {
      dom.p().renderText`
         Menu list unlike usual links list is designed to indicate currently
          active screen (or section) of your app. Think about it like a Tabbar
          but in a form of a list.
      `
    })

    renderMenuList({
      strongIos: true,
      outlineIos: true,
      children() {
        renderMenuListItem({
          title: "Home",
          active: selected == 'home',
          media: renderDemoIcon,

          render(type, props, render) {
            props.onClick = () => {
              setSelected('home')
            }
            return renderDomDefault(type, props, render)
          }
        })

        renderMenuListItem({
          title: "Profile",
          active: selected == 'profile',
          media: renderDemoIcon,

          render(type, props, render) {
            props.onClick = () => {
              setSelected('profile')
            }
            return renderDomDefault(type, props, render)
          }
        })

        renderMenuListItem({
          title: "Settings",
          active: selected == 'settings',
          media: renderDemoIcon,

          render(type, props, render) {
            props.onClick = () => {
              setSelected('settings')
            }
            return renderDomDefault(type, props, render)
          }
        })
      }
    })

    renderMenuList({
      strongIos: true,
      outlineIos: true,
      children() {
        renderMenuListItem({
          title: "Home",
          subtitle: "Home subtitle",
          active: selected == 'home',
          media: renderDemoIcon,

          render(type, props, render) {
            props.onClick = () => {
              setSelected('home')
            }
            return renderDomDefault(type, props, render)
          }
        })

        renderMenuListItem({
          title: "Profile",
          subtitle: "Profile subtitle",
          active: selected == 'profile',
          media: renderDemoIcon,

          render(type, props, render) {
            props.onClick = () => {
              setSelected('profile')
            }
            return renderDomDefault(type, props, render)
          }
        })

        renderMenuListItem({
          title: "Settings",
          subtitle: "Settings subtitle",
          active: selected == 'settings',
          media: renderDemoIcon,

          render(type, props, render) {
            props.onClick = () => {
              setSelected('settings')
            }
            return renderDomDefault(type, props, render)
          }
        })
      }
    })
  })
}