import { useState } from "better-react-helper";
import { renderPage } from "../util";
import { renderNavbar, renderNavbarBackLink, useBlockTitle } from "konsta/better-react";
import { dom } from "better-react-dom";


export default function () {

  const isPreview = document.location.href.includes('examplePreview');
  const [inlineValue, setInlineValue] = useState('inline-1');
  const [groupValue, setGroupValue] = useState('Books');
  const [mediaValue, setMediaValue] = useState('Item 1');

  renderPage(() => {

    renderNavbar({
      title: "Radio",
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
    }).renderText`Radio Group`

  })
}