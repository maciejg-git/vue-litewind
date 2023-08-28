let table = {

  /* element */

  table: {
    classes: `
      border-collapse
      text-left
    `,
    layout: {
      fixed: `
        table-fixed
      `
    },
    state: {
      busy: `
        opacity-30
      `
    }
  },

  /* element */

  headerRow: {
    classes: `

    `,
  },

  /* element */

  headerCell: {
    classes: `
      font-semibold
      py-2
      px-2
      dark:text-text-200
      border-secondary-300
      dark:border-dark-700
    `,
    border: {
      default: `
        border-b
      `,
      full: `
        border
      `
    },
    variant: {
      optional: true,
      light: `
        bg-secondary-100
      `,
      dark: `
        text-white
        bg-secondary-700
      `,
    }
  },

  /* element */

  row: {
    variant: {
      optional: true,
      stripped: `
        even:bg-secondary-50
        dark:even:bg-dark-800
      `
    }
  },

  /* element */

  cell: {
    classes: `
      border-t
      transition-colors
      duration-200
      py-2
      px-2
      border-secondary-300
      dark:border-dark-700
    `,
    border: {
      default: `
        border-t
      `,
      border: `
        border
        py-2
        px-2
        border-secondary-300
      `
    },
    variant: {
      default: `

      `,
      selected: `
        bg-slate-300
        dark:bg-slate-700
      `
    },
    data: (index, data) => {}
  },

  /* element */

  caption: {
    classes: `
      text-left
      py-2
      text-text-600
      dark:text-text-300
    `
  }
}

export default {
  table,
}
