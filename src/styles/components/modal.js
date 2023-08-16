import { setStyleVar } from "./global"

setStyleVar({
  "--modal-transition-duration": "0.2s"
})

let modal = {

  /* element */

  modal: {
    classes: `
      text-text-800
      dark:text-text-300
      bg-white
      dark:bg-dark-800
    `,
    shape: {
      rounded: `
        rounded-md
      `,
      square: `
        rounded-none
      `
    },
    shadow: {
      default : `
        shadow-lg
      `,
      none: `
        shadow-none
      `
    }
  },

  /* element */

  header: {
    classes: `
      text-lg
      leading-6
      font-medium
      px-6
      py-6
      text-text-800
      dark:text-text-300
      bg-secondary-50
      dark:bg-dark-800
    `
  },

  /* element */

  footer: {
    classes: `
      px-6
      py-6
    `
  },

  /* element */

  content: {
    classes: `

    `,
    spacing: {
      default: `
        px-6
        py-5
      `,
      relaxed: `
        px-9
        py-8
      `
    }
  }
}

export default {
  modal,
}
