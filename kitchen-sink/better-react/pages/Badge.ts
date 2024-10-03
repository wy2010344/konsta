import { dom } from "better-react-dom";
import { renderLink, renderList, renderListItem, renderNavbar, renderNavbarBackLink, renderTabbar, renderTabbarLink, usePage } from "konsta/better-react";
import { renderIcon } from "konsta/better-react/components/Icon";
import { MdPerson, MdEmail, MdToday, MdFileUpload } from 'better-react-icons/md';
import { F7CloudUploadFill, SfCalendar, SfEnvelopeFill, SfPersonCircleFill } from 'better-react-icons/f7';
import renderDemoIcon from "../components/renderDemoIcon";
import { useBadge } from "konsta/better-react/components/Badge";
import { renderPage } from "../util";

export default function () {
  const isPreview = document.location.href.includes('examplePreview');



  renderPage(() => {
    renderNavbar({
      title: "Badge",
      left() {
        if (!isPreview) {
          renderNavbarBackLink({
            onClick() {
              history.back()
            }
          })
        }
      },
      right() {
        renderLink({
          navbar: true,
          iconOnly: true,
          render(props) {
            return dom.a(props).render(() => {
              return renderIcon({
                ios() {
                  SfPersonCircleFill({
                    className: "w-7 h-7"
                  })
                },
                material() {
                  MdPerson({
                    className: "w-6 h-6"
                  })
                },
                badge: 5,
                badgeColors: {
                  bg: "bg-red-500"
                }
              })
            })
          }
        })
      }
    })
    renderTabbar({
      labels: true,
      icons: true,
      className: "left-0 bottom-0 fixed",
      children() {
        renderTabbarLink({
          active: true,
          label: "Inbox",
          icon() {
            return renderIcon({
              ios() {
                return SfEnvelopeFill({
                  className: "w-7 h-7"
                })
              },
              material() {
                return MdEmail({
                  className: "w-6 h-6"
                })
              },
              badge: 5,
              badgeColors: {
                bg: 'bg-green-500'
              }
            })
          }
        })
        renderTabbarLink({
          label: "Calendar",
          icon() {
            return renderIcon({
              ios() {
                return SfCalendar({
                  className: "w-7 h-7"
                })
              },
              material() {
                return MdToday({
                  className: "w-6 h-6"
                })
              },
              badge: 7,
              badgeColors: {
                bg: 'bg-red-500'
              }
            })
          }
        })
        renderTabbarLink({
          label: "Upload",
          icon() {
            return renderIcon({
              ios() {
                return F7CloudUploadFill({
                  className: "w-7 h-7"
                })
              },
              material() {
                return MdFileUpload({
                  className: "w-6 h-6"
                })
              },
              badge: 5,
              badgeColors: {
                bg: 'bg-green-500'
              }
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
          media() {
            renderDemoIcon()
          },
          title: "Foo Bar",
          after() {
            dom.span({
              className: useBadge({
                colors: {
                  bg: 'bg-gray-500'
                }
              })
            }).renderText`0`
          }
        })

        renderListItem({
          media() {
            renderDemoIcon()
          },
          title: "Ivan Petrov",
          after() {
            dom.span({
              className: useBadge()
            }).renderText`CEO`
          }
        })

        renderListItem({
          media() {
            renderDemoIcon()
          },
          title: "John Doe",
          after() {
            dom.span({
              className: useBadge({
                colors: {
                  bg: 'bg-green-500'
                }
              })
            }).renderText`CEO`
          }
        })

        renderListItem({
          media() {
            renderDemoIcon()
          },
          title: "John Doe",
          after() {
            dom.span({
              className: useBadge({
                colors: {
                  bg: 'bg-yellow-500'
                }
              })
            }).renderText`NEW`
          }
        })
      }
    })
  })
}