let closeButton = {
  closeButton: {
    classes: `
      opacity-90
      text-current
      dark:text-current
    `,
    size: {
      default: `
        w-5
        h-5
      `,
      small: `
        w-4
        h-4
      `
    },
  },
  wrapper: {
    classes: `

    `
  }
}

let roundCloseButton = {
  closeButton: {
    classes: `
      text-text-500
      dark:text-text-700;
    `,
    size: {
      default: `
        w-4
        h-4
      `,
      small: `
        w-2
        h-2
      `
    }
  },
  wrapper: {
    classes: `
      rounded-full
      p-1
      bg-white
      dark:bg-dark-200
    `
  }
}

export default {
  closeButton,
  roundCloseButton
}
