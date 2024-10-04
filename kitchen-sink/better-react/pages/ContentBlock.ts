import { getADomDefault, renderList, renderListButton, renderNavbar, renderNavbarBackLink, useBlock, useBlockFooter, useBlockHeader, useBlockTitle } from "konsta/better-react";
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

    dom.div({
      className: useBlockTitle()
    }).renderText`Block Title`

    dom.div({
      className: useBlock()
    }).render(() => {
      dom.p().renderText`Donec et nulla auctor massa pharetra adipiscing ut sit amet sem.
Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam
mollis, vulputate turpis vel, sagittis felis.
      `
    })


    dom.div({
      className: useBlockTitle()
    }).renderText`Strong Block`

    dom.div({
      className: useBlock({
        strong: true
      })
    }).render(() => {
      dom.p().renderText`Donec et nulla auctor massa pharetra adipiscing ut sit amet sem.
Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam
mollis, vulputate turpis vel, sagittis felis.
      `
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Strong Outline Title`

    dom.div({
      className: useBlock({
        strong: true,
        outline: true
      })
    }).render(() => {
      dom.p().renderText`Donec et nulla auctor massa pharetra adipiscing ut sit amet sem.
Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam
mollis, vulputate turpis vel, sagittis felis.
      `
    })


    dom.div({
      className: useBlockTitle()
    }).renderText`Stroing Inset Title`

    dom.div({
      className: useBlock({
        strong: true,
        inset: true
      })
    }).render(() => {
      dom.p().renderText`Donec et nulla auctor massa pharetra adipiscing ut sit amet sem.
Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam
mollis, vulputate turpis vel, sagittis felis.
      `
    })


    dom.div({
      className: useBlockTitle()
    }).renderText`Stroing Inset Outline Title`

    dom.div({
      className: useBlock({
        strong: true,
        inset: true,
        outline: true
      })
    }).render(() => {
      dom.p().renderText`Donec et nulla auctor massa pharetra adipiscing ut sit amet sem.
Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam
mollis, vulputate turpis vel, sagittis felis.
      `
    })


    dom.div({
      className: useBlockTitle()
    }).renderText`Stroing Outline Title`

    dom.div({
      className: useBlockHeader()
    }).renderText`Header`
    dom.div({
      className: useBlock({
        strong: true,
        outline: true
      })
    }).render(() => {
      dom.p().renderText`Donec et nulla auctor massa pharetra adipiscing ut sit amet sem.
Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam
mollis, vulputate turpis vel, sagittis felis.
      `
    })

    dom.div({
      className: useBlockFooter()
    }).renderText`Footer`




    dom.div({
      className: useBlockTitle({
        medium: true
      })
    }).renderText`Stroing Outline Title`
    dom.div({
      className: useBlock({
        strong: true,
        outline: true
      })
    }).render(() => {
      dom.p().renderText`Donec et nulla auctor massa pharetra adipiscing ut sit amet sem.
Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam
mollis, vulputate turpis vel, sagittis felis.
      `
    })

    dom.div({
      className: useBlockTitle({
        large: true
      })
    }).renderText`Stroing Outline Title`
    dom.div({
      className: useBlock({
        strong: true,
        outline: true
      })
    }).render(() => {
      dom.p().renderText`Donec et nulla auctor massa pharetra adipiscing ut sit amet sem.
Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam
mollis, vulputate turpis vel, sagittis felis.
      `
    })
  })
}