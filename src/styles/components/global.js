export let disabled = `
  !text-opacity-50
  !dark:text-opacity-50
  !pointer-events-none
`

export let color = {
  background: {
    default: `
      bg-white
      dark:bg-dark-800
    `,
    selected: `
      bg-primary-500
      hover:bg-primary-400
      dark:bg-primary-500
      dark:hover:bg-primary-300
    `,
    border: `
      border-secondary-300
      dark:border-dark-700
    `
  }
}

export let form = {
  base: `
    rounded
    border
    focus:outline-none
  `,
  color: {
    bg: `
      bg-white
      dark:bg-dark-800
    `,
    text: {
      default: `
        dark:text-text-300
      `,
      valid: `
        text-success-600
      `,
      invalid: `
        text-danger-600
      `
    },
    border: {
      default: `
        border-secondary-300
        focus-within:border-secondary-400
        dark:border-dark-600
      `
    }
  }
}

export default {
  disabled,
  color,
  form,
}
