import { setStyleVar } from "./global"

setStyleVar({
  "--notify-transition-duration": "0.4s",
})

let notify = {

  /* element */

  notify: {
    classes: `
      p-4
      rounded-md
      shadow-lg
      border-b-4
      text-sm
      bg-secondary-100
      dark:shadow-black/30
      dark:text-secondary-300
      dark:bg-dark-800
    `,
    variant: {
      default: `
        border-dark-200
        dark:border-dark-700
      `,
      info: `
        border-info-400
        dark:border-info-400
      `,
      warn: `
        border-warn-400
        dark:border-warn-400
      `,
      danger: `
        border-danger-400
        dark:border-danger-400
      `,
    }
  },

  /* element */

  header: {
    classes: `
      mb-2
      px-4
      font-semibold
    `,
  },

  /* element */

  icon: {
    classes: `
      h-6
      w-6
      dark:text-secondary-300;
    `,
    variant: {
      default: `
        dark:border-dark-700
      `,
      info: `
        dark:text-info-400
      `,
      warn: `
        dark:text-warn-400
      `,
      danger: `
        dark:border-danger-400
      `,
    }
  },

  /* element */

  content: {
    classes: `
      px-4
      dark:text-secondary-300
    `
  }
}

export default {
  notify
}
