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
    },
    easing: {
      optional: true,
      inOut: `
        [--progress-bar-indeterminate-timing:ease-in-out]
      `,
      out: `
        [--progress-bar-indeterminate-timing:ease-out]
      `
    },
    speed: {
      optional: true,
      fast: `
        [--progress-bar-indeterminate-duration:1.2s]
      `
    },
    width: {
      optional: true,
      long: `
        [--progress-bar-indeterminate-width:80%]
        [--progress-bar-indeterminate-scale:0.2]
      `
    },
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
  "--progress-bar-duration": "0.2s",
  "--progress-bar-indeterminate-duration": "1.5s",
  "--progress-bar-indeterminate-width": "50%",
  "--progress-bar-indeterminate-scale": "1",
  "--progress-bar-indeterminate-direction": "normal",
}

export default {
  progress,
  cssVariables,
}
