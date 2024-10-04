
import { ListItemProps, renderList, renderListGroup, renderListItem, renderNavbar, renderNavbarBackLink, useBlock, useBlockTitle } from "konsta/better-react";
import { renderPage } from "../util";
import { dom } from "better-react-dom";
import { emptyObject } from "wy-helper";
import renderDemoIcon from "../components/renderDemoIcon";
import { useBadge } from "konsta/better-react/components/Badge";
export default function () {
  const isPreview = document.location.href.includes('examplePreview');

  renderPage(() => {
    renderNavbar({
      title: "List",
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
    }).renderText`Simple List`

    renderList({
      children() {
        renderAList()
      }
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Strong List`
    renderList({
      strong: true,
      children() {
        renderAList()
      }
    })
    dom.div({
      className: useBlockTitle()
    }).renderText`Strong Outline List`
    renderList({
      strong: true,
      outline: true,
      children() {
        renderAList()
      }
    })


    dom.div({
      className: useBlockTitle()
    }).renderText`Strong Inset List`

    renderList({
      strong: true,
      inset: true,
      children() {
        renderAList()
      }
    })



    dom.div({
      className: useBlockTitle()
    }).renderText`Strong Outline Inset List`
    renderList({
      strong: true,
      outline: true,
      inset: true,
      children() {
        renderAList()
      }
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Simple Links List`
    renderList({
      strongIos: true,
      outlineIos: true,
      children() {
        renderAList({
          type: "link"
        })
      }
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Data list,with icons`
    renderList({
      strongIos: true,
      outlineIos: true,
      children() {
        renderListItem({
          media: renderDemoIcon,
          title: "Ivan Petrov",
          after: "CEO"
        })
        renderListItem({
          media: renderDemoIcon,
          title: "John Dom",
          after() {
            dom.span({
              className: useBadge()
            }).renderText`5`
          }
        })
        renderListItem({
          media: renderDemoIcon,
          title: "Jenna Smith"
        })
      }
    })


    dom.div({
      className: useBlockTitle()
    }).renderText`Links`
    renderList({
      strongIos: true,
      outlineIos: true,
      children() {
        renderListItem({
          type: "link",
          media: renderDemoIcon,
          title: "Ivan Petrov",
          after: "CEO"
        })
        renderListItem({
          type: "link",
          media: renderDemoIcon,
          title: "John Dom",
          after: `Cleaner`
        })
        renderListItem({
          type: "link",
          media: renderDemoIcon,
          title: "Jenna Smith"
        })
      }
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Links,Header,Footer`
    renderList({
      strongIos: true,
      outlineIos: true,
      children() {
        renderListItem({
          type: "link",
          media: renderDemoIcon,
          header: "Name",
          title: "John",
          after: "Edit"
        })

        renderListItem({
          type: "link",
          media: renderDemoIcon,
          header: "Phone",
          title: "+7 90 111-22-3344",
          after: "Edit"
        })

        renderListItem({
          type: "link",
          media: renderDemoIcon,
          header: "Email",
          title: "John@doe",
          footer: "Home",
          after: "Edit"
        })

        renderListItem({
          type: "link",
          media: renderDemoIcon,
          header: "Email",
          title: "John@konsta",
          footer: "Work",
          after: "Edit"
        })
      }
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Links,no icons`

    renderList({
      strongIos: true,
      outlineIos: true,
      children() {
        renderListItem({
          type: "link",
          title: "Ivan Petrov"
        })

        renderListItem({
          type: "link",
          title: "John Doe"
        })

        renderListItem({
          groupTitle: true,
          title: "Group title here"
        })

        renderListItem({
          type: "link",
          title: "Ivan Petrov"
        })

        renderListItem({
          type: "link",
          title: "Jenna Smith"
        })
      }
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Grouped with sticky titles`

    renderList({
      strongIos: true,
      outlineIos: true,
      children() {
        renderListGroup({
          children() {
            renderListItem({
              title: "A",
              groupTitle: true,
              className: "ios:top-11-safe material:top-16-safe sticky"
            })
            renderListItem({
              title: "Aaron"
            })
            renderListItem({
              title: "Abbie"
            })
            renderListItem({
              title: "Adam"
            })
          }
        })
        renderListGroup({
          children() {
            renderListItem({
              title: "B",
              groupTitle: true,
              className: "ios:top-11-safe material:top-16-safe sticky"
            })
            renderListItem({
              title: "Bailey"
            })
            renderListItem({
              title: "Barclay"
            })
            renderListItem({
              title: "Bartolo"
            })
          }
        })


        renderListGroup({
          children() {
            renderListItem({
              title: "C",
              groupTitle: true,
              className: "ios:top-11-safe material:top-16-safe sticky"
            })
            renderListItem({
              title: "Caiden"
            })
            renderListItem({
              title: "Calvin"
            })
            renderListItem({
              title: "Candy"
            })
          }
        })
      }
    })


    dom.div({
      className: useBlockTitle({
        className: "text-2xl"
      })
    }).renderText`Media Lists`

    dom.div({
      className: useBlock()
    }).render(() => {
      dom.p().renderText`
Media Lists are almost the same as Data Lists, but with a more
          flexible layout for visualization of more complex data, like products,
          services, user, etc.
`
    })


    dom.div({
      className: useBlockTitle()
    }).renderText`Songs`

    renderList({
      strongIos: true,
      outlineIos: true,
      children() {

        renderListItem({
          type: "link",
          chevronMaterial: false,
          title: "Yellow Submarine",
          after: "$15",
          subtitle: "Beatles",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.",
          media() {
            dom.img({
              className: "ios:rounded-lg material:rounded-full ios:w-20 material:w-10",
              src: "https://cdn.framework7.io/placeholder/people-160x160-1.jpg",
              width: "80",
              alt: "demo"
            }).render()
          }
        })


        renderListItem({
          type: "link",
          chevronMaterial: false,
          title: "Don't Stop Me Now",
          after: "$22",
          subtitle: "Queen",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.",
          media() {
            dom.img({
              className: "ios:rounded-lg material:rounded-full ios:w-20 material:w-10",
              src: "https://cdn.framework7.io/placeholder/people-160x160-2.jpg",
              width: "80",
              alt: "demo"
            }).render()
          }
        })

        renderListItem({
          type: "link",
          chevronMaterial: false,
          title: "Billie Jean",
          after: "$16",
          subtitle: "Michael Jackson",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.",
          media() {
            dom.img({
              className: "ios:rounded-lg material:rounded-full ios:w-20 material:w-10",
              src: "https://cdn.framework7.io/placeholder/people-160x160-3.jpg",
              width: "80",
              alt: "demo"
            }).render()
          }
        })
      }
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Mail App`

    renderList({
      strongIos: true,
      outlineIos: true,
      children() {
        renderListItem({
          type: "link",
          chevronMaterial: true,
          title: "Facebook",
          after: "17:14",
          subtitle: "New messages from John Doe",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        })
        renderListItem({
          type: "link",
          chevronMaterial: true,
          title: "John Doe (via Twitter)",
          after: "17:11",
          subtitle: "John Doe (@_johndoe) mentioned you on Twitter!",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        })
        renderListItem({
          type: "link",
          title: "Facebook",
          chevronMaterial: false,
          after: "16:48",
          subtitle: "New messages from John Doe",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        })

        renderListItem({
          type: "link",
          title: "John Doe (via Twitter)",
          after: "15:32",
          subtitle: "John Doe (@_johndoe) mentioned you on Twitter!",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        })
      }
    })
  })
}

function renderAList(arg?: ListItemProps) {

  renderListItem({
    ...arg,
    title: "Item 1"
  })
  renderListItem({
    ...arg,
    title: "Item 2"
  })
  renderListItem({
    ...arg,
    title: "Item 3"
  })
}