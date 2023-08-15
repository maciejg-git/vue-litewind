let radio = {
  radio: {
    classes: `
      scale-110
      border
      focus:ring
      focus:ring-offset-0
      focus:outline-none
      transform
      outline-none
      transition-shadow
      duration-150
      bg-white
      dark:bg-dark-800
      dark:checked:bg-current
      dark:checked:border-current
    `,
    variant: {
      default: `
        text-primary-500
        border-secondary-300
        focus:ring-primary-200
        dark:text-primary-500
        dark:border-dark-700
        dark:focus:ring-primary-200
      `,
      valid: `
        text-success-500
        border-success-300
        focus:ring-success-200
        dark:text-success-500
        dark:border-success-400
        dark:focus:ring-success-300
      `,
      invalid: `
        text-danger-500
        border-danger-300
        focus:ring-danger-200
        dark:text-danger-500
        dark:border-danger-400
        dark:focus:ring-danger-300
      `
    }
  },
  label: {
    classes: `
      ml-4
    `
  }
}

export default {
  radio,
}
