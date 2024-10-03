import { dom } from "better-react-dom";
import { useState } from "better-react-helper";
import { renderLink, renderList, renderListItem, renderNavbar, renderNavbarBackLink, renderTabbar, renderTabbarLink, useBlockTitle, usePage } from "konsta/better-react";
import { renderIcon } from "konsta/better-react/components/Icon";
import { MdPerson, MdEmail, MdToday, MdFileUpload } from 'better-react-icons/md';
import { F7CloudUploadFill, SfCalendar, SfEnvelopeFill, SfPersonCircleFill } from 'better-react-icons/f7';
import renderDemoIcon from "../components/renderDemoIcon";
import { useBadge } from "konsta/better-react/components/Badge";
import { renderListInput } from "konsta/better-react/components/ListInput";
import { emptyObject } from "wy-helper";
import { renderPage } from "../util";
import { renderInput } from "better-react-dom-helper";

export default function () {
  const isPreview = document.location.href.includes('examplePreview');
  const [name, setName] = useState({ value: '', changed: false });
  const [demoValue, setDemoValue] = useState('');

  const onNameChange = (e) => {
    setName({ value: e.target.value, changed: true });
  };
  const onDemoValueChange = (e) => {
    setDemoValue(e.target.value);
  };
  const onDemoValueClear = () => {
    setDemoValue('');
  };

  renderPage(() => {

    renderNavbar({
      title: "Form Inputs",
      left() {
        if (!isPreview) {
          renderNavbarBackLink({
            onClick() {
              history.back()
            }
          })
        }
      },
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Default`
    renderRow()
    dom.div({
      className: useBlockTitle()
    }).renderText`Outline`
    renderRow({
      outline: true
    })
    dom.div({
      className: useBlockTitle()
    }).renderText`Floating labels`
    renderRow({
      floatingLabel: true
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Outline+Floating labels`
    renderRow({
      outline: true,
      floatingLabel: true
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Validation + Additional Info`
    renderList({
      strongIos: true,
      insetIos: true,
      children() {
        renderListInput({
          label: "Name",
          type: "text",
          placeholder: "Your name",
          info: "Basic string checking",
          value: name.value,
          onInput: onNameChange,
          media: renderDemoIcon,
          error: name.changed && !name.value.trim()
            ? 'Please specify your name' : ''
        })
      }
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Clear Button`

    renderList({
      strongIos: true,
      insetIos: true,
      children() {
        renderListInput({
          label: "TV Show",
          type: "text",
          placeholder: "Your favorite TV show",
          info: "Type something to see clear button",
          value: demoValue,
          clearButton: demoValue.length > 0,
          media: renderDemoIcon,
          onInput: onDemoValueChange,
          onClear: onDemoValueClear
        })
      }
    })
  })
}


function renderRow({
  floatingLabel,
  outline
}: {
  floatingLabel?: boolean
  outline?: boolean
} = emptyObject) {

  renderList({
    strongIos: true,
    insetIos: true,
    children() {
      renderListInput({
        floatingLabel,
        outline,
        label: "Name",
        type: "text",
        placeholder: "Your nane",
        media: renderDemoIcon
      })
      renderListInput({
        floatingLabel,
        outline,
        label: "Password",
        type: "password",
        placeholder: "Your password",
        media: renderDemoIcon
      })

      renderListInput({
        floatingLabel,
        outline,
        label: "E-mail",
        type: "email",
        placeholder: "Your e-mail",
        media: renderDemoIcon
      })

      renderListInput({
        floatingLabel,
        outline,
        label: "URL",
        type: "url",
        placeholder: "URL",
        media: renderDemoIcon
      })

      renderListInput({
        floatingLabel,
        outline,
        label: "Phone",
        type: "tel",
        placeholder: "Your phone number",
        media: renderDemoIcon
      })

      if (floatingLabel) {
        return
      }
      renderListInput({
        floatingLabel,
        outline,
        label: "Gender",
        type: "select",
        dropdown: true,
        placeholder: "Please choose",
        media: renderDemoIcon,
        children() {
          dom.option({
            value: "Male"
          }).renderText`Male`
          dom.option({
            value: "Female"
          }).renderText`FeMale`
        }
      })
      renderListInput({
        floatingLabel,
        outline,
        label: "Birthday",
        type: "date",
        placeholder: "Please choose..",
        media: renderDemoIcon
      })

      renderListInput({
        floatingLabel,
        outline,
        label: "Date time",
        type: "datetime-local",
        placeholder: "Please choose..",
        media: renderDemoIcon
      })

      renderListInput({
        floatingLabel,
        outline,
        label: "Textarea",
        type: "textarea",
        placeholder: "Bio",
        media: renderDemoIcon,
        inputClassName: "!h-20 resize-none"
      })
    }
  })
}