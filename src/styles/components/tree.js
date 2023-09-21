let spacing = "my-3"
let indent = "ml-6"

let tree = {
  folder: {
    classes: `
      font-bold
      ${spacing}
      ${indent}
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
      ${spacing}
      ${indent}
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

let cssVariables = {
  "--tree-transition-duration": "0.2s",
}

export default {
  tree,
  cssVariables,
}
