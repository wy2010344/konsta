import { dom } from "better-react-dom";
import { useState } from "better-react-helper";
import { renderLink, renderList, renderListItem, renderNavbar, renderNavbarBackLink, renderTabbar, renderTabbarLink, useBlockTitle, usePage } from "konsta/better-react";
import { renderIcon } from "konsta/better-react/components/Icon";
import { MdPerson, MdEmail, MdToday, MdFileUpload } from 'better-react-icons/md';
import { F7CloudUploadFill, SfCalendar, SfEnvelopeFill, SfPersonCircleFill } from 'better-react-icons/f7';
import renderDemoIcon from "../components/renderDemoIcon";
import { renderListInput } from "konsta/better-react";
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
          info: "Basic string checking",
          media: renderDemoIcon,
          error: name.changed && !name.value.trim()
            ? 'Please specify your name' : '',

          renderInput(arg) {
            renderInput("input", {
              ...arg,
              value: name.value,
              onValueChange: onNameChange,
              placeholder: "Your name",
            })
          },
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
          info: "Type something to see clear button",
          clearButton: demoValue.length > 0,
          media: renderDemoIcon,
          onClear: onDemoValueClear,
          renderInput(arg) {
            renderInput("input", {
              ...arg,
              value: demoValue,
              onValueChange: onDemoValueChange,
              placeholder: "Your favorite TV show",
            })
          },
        })
      }
    })


    dom.div({
      className: useBlockTitle()
    }).renderText`Icon + Input`


    renderList({
      strongIos: true,
      insetIos: true,
      children() {
        renderListInput({
          media: renderDemoIcon,
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "text",
              placeholder: "Your nane",
            }).render()
          },
        })
        renderListInput({
          media: renderDemoIcon,
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "password",
              placeholder: "Your password",
            }).render()
          },
        })

        renderListInput({
          media: renderDemoIcon,
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "email",
              placeholder: "Your e-mail",
            }).render()
          },
        })

        renderListInput({
          media: renderDemoIcon,
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "url",
              placeholder: "URL",
            }).render()
          },
        })
      }
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Label + Input`


    renderList({
      strongIos: true,
      insetIos: true,
      children() {
        renderListInput({
          label: "Name",
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "text",
              placeholder: "Your nane",
            }).render()
          },
        })
        renderListInput({
          label: "Password",
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "password",
              placeholder: "Your password"
            }).render()
          },
        })

        renderListInput({
          label: "Email",
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "email",
              placeholder: "Your e-mail"
            }).render()
          },
        })

        renderListInput({
          label: "URL",
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "url",
              placeholder: "URL",
            }).render()
          },
        })
      }
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Only Inputs`


    renderList({
      strongIos: true,
      insetIos: true,
      children() {
        renderListInput({
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "text",
              placeholder: "Your nane",
            }).render()
          },
        })
        renderListInput({
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "password",
              placeholder: "Your password"
            }).render()
          },
        })

        renderListInput({
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "email",
              placeholder: "Your e-mail"
            }).render()
          },
        })

        renderListInput({
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "url",
              placeholder: "URL",
            }).render()
          },
        })
      }
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Inputs + Additional Info`


    renderList({
      strongIos: true,
      insetIos: true,
      children() {
        renderListInput({
          info: "Full name please",
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "text",
              placeholder: "Your nane",
            }).render()
          },
        })
        renderListInput({
          info: "8 characters minimum",
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "password",
              placeholder: "Your password",
            }).render()
          },
        })

        renderListInput({
          info: "Your work e-mail address",
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "email",
              placeholder: "Your e-mail",
            }).render()
          },
        })

        renderListInput({
          info: "Your website URL",
          renderInput(arg) {
            dom.input({
              ...arg,
              type: "url",
              placeholder: "URL",
            }).render()
          },
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
        media: renderDemoIcon,
        renderInput(arg) {
          dom.input({
            ...arg,
            type: "text",
            placeholder: "Your nane",
          }).render()
        },
      })
      renderListInput({
        floatingLabel,
        outline,
        label: "Password",
        media: renderDemoIcon,
        renderInput(arg) {
          dom.input({
            ...arg,
            type: "password",
            placeholder: "Your password",
          }).render()
        },
      })

      renderListInput({
        floatingLabel,
        outline,
        label: "E-mail",
        media: renderDemoIcon,
        renderInput(arg) {
          dom.input({
            ...arg,
            type: "email",
            placeholder: "Your e-mail",
          }).render()
        },
      })

      renderListInput({
        floatingLabel,
        outline,
        label: "URL",
        media: renderDemoIcon,
        renderInput(arg) {
          dom.input({
            ...arg,
            type: "url",
            placeholder: "URL",
          }).render()
        },
      })

      renderListInput({
        floatingLabel,
        outline,
        label: "Phone",
        media: renderDemoIcon,
        renderInput(arg) {
          dom.input({
            ...arg,
            type: "tel",
            placeholder: "Your phone number",
          }).render()
        },
      })

      if (floatingLabel) {
        return
      }
      renderListInput({
        floatingLabel,
        outline,
        label: "Gender",
        renderInput(arg) {
          dom.select({
            ...arg,
            placeholder: "Please choose",
          }).render(() => {
            dom.option({
              value: "Male"
            }).renderText`Male`
            dom.option({
              value: "Female"
            }).renderText`FeMale`
          })
        },
        dropdown: true,
        media: renderDemoIcon
      })
      renderListInput({
        floatingLabel,
        outline,
        label: "Birthday",
        media: renderDemoIcon,
        renderInput(arg) {
          dom.input({
            ...arg,
            type: "date",
            placeholder: "Please choose..",
          }).render()
        },
      })

      renderListInput({
        floatingLabel,
        outline,
        label: "Date time",
        renderInput(arg) {
          dom.input({
            ...arg,
            type: "datetime-local",
            placeholder: "Please choose..."
          }).render()
        },
        media: renderDemoIcon
      })

      renderListInput({
        floatingLabel,
        outline,
        label: "Textarea",
        renderInput(arg) {
          dom.textarea({
            ...arg,
            placeholder: "Bio"
          }).render()
        },
        media: renderDemoIcon,
        inputClassName: "!h-20 resize-none"
      })
    }
  })
}