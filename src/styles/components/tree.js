import { setStyleVar } from "./global"

setStyleVar({
  "--tree-transition-duration": "0.2s",
})

let tree = {
  folder: {
    classes: `
      font-bold
      my-3
      ml-8
    `,
    variant: {
      root: `
        !ml-0
      `,
      opened: `

      `
    }
  },
  item: {
    classes: `
      font-normal
      my-3
      ml-8
    `
  },
  icon: {
    classes: `
      w-5
      h-5
      text-secondary-600
      dark:text-secondary-300
    `
  }
}

export default {
  tree
}
