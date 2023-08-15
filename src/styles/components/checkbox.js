let checkbox = {
  checkbox: {
    classes: `
      rounded
      border
      focus:outline-none
      focus-within:ring
      outline-none
      bg-white
      dark:bg-dark-800
      dark:checked:bg-current
      dark:checked:border-current
      border-secondary-300
      focus:ring-offset-0
      transform
      scale-110
      transition-all
      duration-150
    `,
    variant: {
      default: `
        text-primary-500
        dark:text-primary-500
        dark:border-dark-700
        dark:focus:ring-primary-200
        focus-within:border-secondary-400
        focus-within:ring-primary-200
      `,
      valid: `
        text-success-600
        border-success-300
        focus-within:ring-success-200
        dark:text-success-600
        dark:border-success-400
        dark:focus-within:ring-success-300
      `,
      invalid: `
        text-danger-600
        border-danger-300
        focus-within:ring-danger-200
        dark:text-danger-600
        dark:border-danger-400
        dark:focus-within:ring-danger-300
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
  checkbox,
}
