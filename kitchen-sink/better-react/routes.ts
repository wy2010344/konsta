import { EmptyFun } from "wy-helper"



export const componentsRoutes: {
  href: string
  getPage(): Promise<{ default: EmptyFun }>
}[] = [
    {
      href: "ActionSheet",
      getPage() {
        return import("./pages/ActionSheet")
      },
    },
    {
      href: "Badge",
      getPage() {
        return import('./pages/Badge')
      },
    },
    {
      href: "FormInput",
      getPage() {
        return import('./pages/FormInputs')
      },
    },
    {
      href: "List",
      getPage() {
        return import('./pages/List')
      },
    },
    {
      href: "ListButton",
      getPage() {
        return import('./pages/ListButton')
      },
    },
    {
      href: "MenuList",
      getPage() {
        return import('./pages/MenuList')
      },
    },
    {
      href: "ContentBlock",
      getPage() {
        return import('./pages/ContentBlock')
      },
    },
    {
      href: "Checkbox",
      getPage() {
        return import('./pages/Checkbox')
      },
    },
    {
      href: "Searchbar",
      getPage() {
        return import('./pages/Searchbar')
      },
    }
  ]