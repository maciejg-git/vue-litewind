import { setStyleVar } from "./global"

setStyleVar({
  "--spinner-border-speed": "0.75s",
  "--spinner-svg-speed": "1s",
})

let spinner = {
  container: {
    classes: `
      inline-block
    `
  },
  spinner: {
    classes: `

    `,
    size: {
      medium: `
        h-8
        w-8
      `,
      small: `
        h-5
        w-5
      `,
      large: `
        h-20
        w-20
      `,
    },
    variant: {
      primary: `
        text-primary-500
      `,
      secondary: `
        text-secondary-300
      `,
      warn: `
        text-warn-500
      `,
      success: `
        text-success-500
      `,
      light: `
        text-text-200
      `,
    }
  },
}

export default {
  spinner,
}
