let select = {
  item: {
    classes: `
      w-full
      text-left
      focus:outline-none
      cursor-pointer
      px-6
      transition-colors
    `,
    spacing: {
      default: `
        py-4
        my-1
      `,
      dense: `
        py-2
      `,
    },
    variant: {
      default: `
        text-text-800
        dark:text-text-300
        hover:bg-secondary-100
        dark:hover:bg-dark-600
      `,
      selected: `
        text-text-800
        dark:text-text-800
        bg-primary-300
        hover:bg-primary-400
        dark:bg-primary-400
        dark:hover:bg-primary-500
      `,
      highlighted: `
        text-text-800
        bg-dark-200
        dark:text-text-300
        dark:bg-dark-600
      `,
    },
    match: {
      highlight: `
        !font-semibold
        !bg-secondary-100
        dark:!bg-dark-600
      `,
    },
  },
};

let cssVariables = {
  "--select-transition-duration": "0.2s",
  "--select-transition-slide": "-15px",
  "--select-transition-scale": 0.2,
  "--select-max-menu-height": "400px",
}

export default {
  select,
  cssVariables,
};
