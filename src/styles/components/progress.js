let progress = {

  /* element */

  progress: {
    classes: `
      overflow-hidden
    `,
    size: {
      default: `
        h-4
      `,
      tiny: `
        h-1
      `,
      medium: `
        h-2
      `
    },
    shape: {
      rounded: `
        rounded-full
      `,
      square: `
        rounded-none
      `
    },
    variant: {
      default: `
        bg-secondary-100
        dark:bg-dark-700
      `,
      transparent: `
        bg-transparent
        dark:bg-transparent
      `
    }
  },

  /* element */

  progressBar: {
    classes: `

    `,
    shape: {
      rounded: `
        rounded-full
      `,
      square: `
        rounded-none
      `
    },
    variant: {
      default: `
        bg-primary-500
        dark:bg-primary-500;
      `,
      red: `
        bg-danger-500
        dark:bg-danger-500
      `,
      gradient: `
        bg-gradient-to-r
        from-yellow-400
        via-orange-500
        to-red-500
      `
    }
  },

  /* element */

  label: {
    classes: `
      text-xs
      font-bold
      text-white
    `
  }
}

let cssVariables = {
  "--progress-bar-indeterminate-timing": "linear",
  "--progress-bar-speed": "0.2s",
  "--progress-bar-indeterminate-speed": "1.5s",
  "--progress-bar-indeterminate-offset": "1.4",
  "--progress-bar-indeterminate-width": "50%",
  "--progress-bar-indeterminate-direction": "normal",
}

export default {
  progress,
  cssVariables,
}
