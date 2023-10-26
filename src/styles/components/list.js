let list = {
  list: {
    classes: `
      divide-y
      overflow-hidden
      divide-secondary-200
      bg-white
      dark:bg-dark-800
      dark:border-dark-700
      dark:divide-dark-700
    `,
    shape: {
      rounded: `
        rounded-md
      `,
      square: `
        rounded-none
      `
    },
    border: {
      default: `
        border
      `,
      borderless: `
        border-0
      `
    }
  },
  item: {
    classes: `
      py-4
      px-4
    `,
    variant: {
      default: `
        hover:bg-secondary-50
        dark:hover:bg-dark-700
      `,
      active: `
        text-white
        bg-info-500
        hover:bg-info-600
        dark:bg-info-500
        dark:hover:bg-info-600
      `
    }
  }
}

let materialList = {
  list: {
    classes: `

    `,
    shape: {
      square: `
        rounded-none
      `,
      round: `
        rounded-md
      `
    },
    border: {
      borderless: `
        border-0
      `
    }
  },
  item: {
    classes: `
      border
      shadow-md
      transition-all
      p-2
      px-4
      my-1
    `,
    variant: {
      default: `
        border-gray-100
        hover:bg-gray-50
        dark:bg-dark-800
        dark:border-dark-700
        dark:shadow-black/20
        dark:hover:bg-dark-700;
      `,
      active: `
        border-l-4
        text-white
        border-blue-600
        bg-blue-500
        hover:bg-blue-600
        dark:bg-blue-500
        dark:border-blue-600
        dark:hover:bg-blue-600
      `
    }
  }
}

export default {
  list,
  materialList
}
