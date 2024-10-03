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
    }
  ]