let tabs = {
  tabBar: {
    classes: `
      border-b
      pl-2
      dark:border-dark-600
    `
  },
  tab: {
    classes: `
      rounded-t-md
      whitespace-nowrap
      overflow-ellipsis
      border
      -mb-px
      -ml-px
      transition-all
      duration-200
    `,
    size: {
      default: `
        p-2
        px-4
      `,
      small: `
        py-1
        px-2
      `
    },
    variant: {
      default: `
        bg-secondary-100
        hover:bg-secondary-50
        border-secondary-300
        dark:text-text-300/80
        dark:bg-dark-900
        dark:hover:bg-dark-800
        dark:border-dark-600
      `,
      active: `
        shadow-none
        bg-white
        hover:bg-white
        border-b-transparent
        dark:border-dark-600
        dark:text-text-300
        dark:bg-dark-800
        dark:hover:bg-dark-800
        dark:border-b-transparent
      `
    }
  },
}

let materialTabs = {
  tabBar: {
    classes: `
      dark:border-dark-700
    `,
  },
  tab: {
    classes: `
      -mb-px
      p-3
      px-4
      transition-colors
      border-b-2
      duration-200
      font-semibold
    `,
    variant: {
      default: `
        border-transparent
        hover:bg-secondary-50
        hover:dark:bg-dark-700
      `,
      active: `
        shadow-none
        border-b-2
        border-primary-500

      `
    }
  }
}

let roundedTabs = {
  tabBar: {
    classes: `

    `
  },
  tab: {
    classes: `
      rounded-md
      whitespace-nowrap
      overflow-ellipsis
      transition-all
      duration-200
      mr-2
    `,
    size: {
      default: `
        p-2
        px-4
      `,
      small: `
        py-1
        px-2
      `
    },
    variant: {
      default: `
        hover:bg-secondary-50
        border-secondary-300
        dark:text-text-300/80
        dark:hover:bg-dark-700
      `,
      active: `
        shadow-none
        text-white
        bg-primary-400
        hover:bg-primary-300
        dark:text-white
        dark:bg-primary-500
        dark:hover:bg-primary-500
        
      `
    }
  }
}

let cssVariables = {
  "--tabs-transition-duration": "0.2s",
}

export default {
  tabs,
  materialTabs,
  roundedTabs,
  cssVariables,
}
