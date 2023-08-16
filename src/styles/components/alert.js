let alert = {

  /* element */

  alert: {
    classes: `
      rounded-md
    `,
    variant: {
      info: `
        text-text-800
        dark:text-info-200
        bg-info-200
        dark:bg-info-500/50
        border-info-400
        dark:border-info-500
      `,
      danger: `
        text-text-800
        dark:text-danger-200
        bg-danger-300
        dark:bg-danger-500/50
        border-danger-400
        dark:border-danger-500
      `,
      warn: `
        text-text-800
        dark:text-warn-200
        bg-warn-400/70
        dark:bg-warn-500/50
        border-warn-400
        dark:border-warn-500
      `,
      success: `
        text-text-800
        dark:text-success-200
        bg-success-300
        dark:bg-success-500/50
        border-success-400
        dark:border-success-500
      `
    },
    shadow: {
      optional: true,
      medium: `
        shadow-lg
        dark:shadow-black/20
      `
    },
    text: {
      optional: true,
      bold: `
        font-semibold
      `
    },
    spacing: {
      default: `
        p-5
      `,
      dense: `
        px-4
        py-2
      `
    },
    effect: {
      optional: true,
      bounce: `
        animate-bounce
      `,
      pulse: `
        animate-pulse
      `
    },
    special: {
      optional: true,
      outline: `
        !text-text-800
        dark:!text-text-300
        !bg-secondary-100
        dark:!bg-dark-700
        !border-0 
        !border-l-8
      `,
      marked: `
        !border-0 
        !border-l-8
      `
    }
  },

  /* element */

  icon: {
    classes: `
      w-6
      h-6
      mr-2
    `,
    effect: {
      optional: true,
      bounce: `
        animate-bounce
      `,
      pulse: `
        animate-pulse
      `
    }
  }
}

export default {
  alert,
}
