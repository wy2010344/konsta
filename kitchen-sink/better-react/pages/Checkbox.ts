import { useState } from "better-react-helper";
import { renderPage } from "../util";
import { renderCheckbox, renderList, renderListItem, renderNavbar, renderNavbarBackLink, useBlock, useBlockTitle } from "konsta/better-react";
import { dom, renderText } from "better-react-dom";
import { InputBoolProps, renderInputBool } from "better-react-dom-helper";




export default function () {

  const isPreview = document.location.href.includes('examplePreview');
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  // Group
  const [group, setGroup] = useState(['Books']);
  const toggleGroupValue = (value) => {
    if (group.includes(value)) group.splice(group.indexOf(value), 1);
    else group.push(value);
    setGroup([...group]);
  };

  // Indeterminate
  const [movies, setMovies] = useState(['Movie 1']);
  const onMovieChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      movies.push(value);
    } else {
      movies.splice(movies.indexOf(value), 1);
    }
    setMovies([...movies]);
  };
  const onMoviesChange = () => {
    if (movies.length === 1 || movies.length === 0) {
      setMovies(['Movie 1', 'Movie 2']);
    } else if (movies.length === 2) {
      setMovies([]);
    }
  };

  // Media
  const [media, setMedia] = useState(['Item 1']);
  const toggleMediaValue = (value) => {
    if (media.includes(value)) media.splice(media.indexOf(value), 1);
    else media.push(value);
    setMedia([...media]);
  };


  renderPage(() => {
    renderNavbar({
      title: "Checkbox",
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
    }).renderText`Inline`

    dom.div({
      className: useBlock({
        strongIos: true,
        outlineIos: true
      })
    }).render(() => {
      dom.p().render(() => {

        renderText`Lorem `
        renderCheckbox({
          checked: checked1,
          renderCheck(props) {
            const c = props as InputBoolProps
            c.name = "checkbox-1"
            c.onInput = e => {
              setChecked1(e.currentTarget.checked)
            }
            return renderInputBool(c)
          },
        })
        renderText`ipsum dolor sit amet, consectetur adipisicing elit. Alias beatae illo
nihil aut eius commodi sint eveniet aliquid eligendi`
        renderCheckbox({
          checked: checked2,
          renderCheck(props) {
            const c = props as InputBoolProps
            c.name = "checkbox-2"

            c.onInput = e => {
              setChecked2(e.currentTarget.checked)
            }
            return renderInputBool(c)
          }
        })
        renderText`  ad delectus impedit tempore nemo, enim vel praesentium consequatur
nulla mollitia!  `
      })
    })

    dom.div({
      className: useBlockTitle()
    }).renderText`Checkbox Group`

    renderList({
      strongIos: true,
      outlineIos: true,
      children() {
        renderListItem({
          type: "label",
          title: "Books",
          media() {
            renderCheckbox({
              checked: group.includes("Books"),
              renderCheck(props) {
                const c = props as InputBoolProps
                c.onInput = e => {
                  toggleGroupValue("Books")
                }
                return renderInputBool(c)
              }
            })
          }
        })

        renderListItem({
          type: "label",
          title: "Movies",
          media() {
            renderCheckbox({
              checked: group.includes("Movies"),
              renderCheck(props) {
                const c = props as InputBoolProps
                c.onInput = e => {
                  toggleGroupValue("Movies")
                }
                return renderInputBool(c)
              }
            })
          }
        })


        renderListItem({
          type: "label",
          title: "Food",
          media() {
            renderCheckbox({
              checked: group.includes("Food"),
              renderCheck(props) {
                const c = props as InputBoolProps
                c.onInput = e => {
                  toggleGroupValue("Food")
                }
                return renderInputBool(c)
              }
            })
          }
        })

        renderListItem({
          type: "label",
          title: "Drinks",
          media() {
            renderCheckbox({
              checked: group.includes("Drinks"),
              renderCheck(props) {
                const c = props as InputBoolProps
                c.onInput = e => {
                  toggleGroupValue("Drinks")
                }
                return renderInputBool(c)
              }
            })
          }
        })
      }
    })


    dom.div({
      className: useBlockTitle()
    }).renderText`Indeterminate State`

    renderList({
      strongIos: true,
      outlineIos: true,
      children() {
        renderListItem({
          type: "label",
          title: "Movies",
          media() {
            renderCheckbox({
              checked: movies.length == 2,
              indeterminate: movies.length == 1,
              renderCheck(props) {
                const c = props as InputBoolProps
                c.onInput = onMoviesChange
                return renderInputBool(c)
              }
            })
          },
          children() {
            dom.ul({
              className: "ps-12"
            }).render(() => {

              renderListItem({
                type: "label",
                title: "Movie 1",
                media() {
                  renderCheckbox({
                    renderCheck(props) {
                      const c = props as InputBoolProps
                      c.name = "demo-checkbox"
                      c.value = "Movie 1"
                      c.onInput = onMovieChange
                      return renderInputBool(c)
                    },
                    checked: movies.indexOf("Movie 1") > -1
                  })
                }
              })

              renderListItem({
                type: "label",
                title: "Movie 2",
                media() {
                  renderCheckbox({
                    renderCheck(props) {
                      const c = props as InputBoolProps
                      c.name = "demo-checkbox"
                      c.value = "Movie 2"
                      c.onInput = onMovieChange
                      return renderInputBool(c)
                    },
                    checked: movies.indexOf("Movie 2") > -1
                  })
                }
              })
            })
          }
        })
      }
    })


    dom.div({
      className: useBlockTitle()
    }).renderText`With Media Lists`

    renderList({
      strongIos: true,
      outlineIos: true,
      children() {
        renderListItem({
          type: "label",
          title: "Facebook",
          after: "17.14",
          subtitle: "New messages from John Doe",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.",
          media() {
            renderCheckbox({
              checked: media.includes('Item 1'),
              renderCheck(props) {
                const c = props as InputBoolProps
                c.name = "demo-media-checkbox"
                c.onInput = () => {
                  toggleMediaValue('Item 1')
                }
                return renderInputBool(c)
              },
            })
          }
        })


        renderListItem({
          type: "label",
          title: "John Doe (via Twitter)",
          after: "17.11",
          subtitle: "John Doe (@_johndoe) mentioned you on Twitter!",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.",
          media() {
            renderCheckbox({
              checked: media.includes('Item 2'),
              renderCheck(props) {
                const c = props as InputBoolProps
                c.name = "demo-media-checkbox"
                c.onInput = () => {
                  toggleMediaValue('Item 2')
                }
                return renderInputBool(c)
              },
            })
          }
        })
      }
    })
  })
}