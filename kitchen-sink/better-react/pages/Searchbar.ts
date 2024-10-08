import { renderArray, renderIf, useState } from "better-react-helper";
import { renderPage } from "../util";
import { renderList, renderListItem, renderNavbar, renderNavbarBackLink } from "konsta/better-react";
import { renderSearchbar } from "konsta/better-react/components/Searchbar";
import { renderInput } from "better-react-dom-helper";



const items = [
  { title: 'FC Ajax' },
  { title: 'FC Arsenal' },
  { title: 'FC Athletic' },
  { title: 'FC Barcelona' },
  { title: 'FC Bayern München' },
  { title: 'FC Bordeaux' },
  { title: 'FC Borussia Dortmund' },
  { title: 'FC Chelsea' },
  { title: 'FC Galatasaray' },
  { title: 'FC Juventus' },
  { title: 'FC Liverpool' },
  { title: 'FC Manchester City' },
  { title: 'FC Manchester United' },
  { title: 'FC Paris Saint-Germain' },
  { title: 'FC Real Madrid' },
  { title: 'FC Tottenham Hotspur' },
  { title: 'FC Valencia' },
  { title: 'FC West Ham United' },
];


export default function () {

  const isPreview = document.location.href.includes('examplePreview');
  const [searchQuery, setSearchQuery] = useState('');
  const handleClear = () => {
    setSearchQuery('');
  };
  const handleDisable = () => {
    console.log('Disable');
  };
  const filteredItems = searchQuery
    ? items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : items;

  renderPage(() => {

    renderNavbar({
      title: "Searchbar",
      left() {
        if (!isPreview) {
          renderNavbarBackLink({
            onClick() {
              history.back()
            }
          })
        }
      },
      subnavbar() {
        renderSearchbar({
          onClear: handleClear,
          disableButton: true,
          disableButtonText: "Cancel",
          onDisable: handleDisable,
          hasValue: searchQuery,
          renderInput(a) {
            return renderInput("input", {
              ...a,
              value: searchQuery,
              onValueChange(v) {
                setSearchQuery(v)
              },
            })
          },
        })
      }
    })
    renderList({
      strong: true,
      insetMaterial: true,
      outlineIos: true,
      children() {
        renderIf(filteredItems.length == 0, () => {
          renderListItem({
            title: "Nothing found",
            className: "text-center"
          })
        }, () => {
          renderArray(filteredItems, v => v.title, item => {
            renderListItem({
              title: item.title,
            })
          })
        })
      }
    })
  })
}