import { color } from "./global"

let pagination = {

  /* element */

  paginationBar: {
    classes: `
    `
  },

  /* element */

  page: {
    classes: `
      border
      text-sm
      font-semibold
      rounded
      w-12
      h-10
      mx-0.5
    `,
    variant: {
      default: `
        hover:bg-secondary-50
        border-secondary-300
        dark:text-text-300
        dark:hover:bg-dark-700
        dark:border-dark-700
      `,
      active: `
        ring-2
        font-semibold
        text-white
        ${color.background.selected}
        border-primary-200
        ring-primary-200
        dark:text-text-100
        dark:border-primary-500
        dark:ring-primary-100
      `
    }
  },

  /* element */

  dots: {
    classes: `
      tracking-wider
    `,
    variant: {
      default: () => `
        ${pagination.page.classes}
        ${pagination.page.variant.default}
      `,
      plain: () => `
        ${pagination.page.classes}
        !border-none
      `,
    },
  },

  /* element */

  button: {
    classes: () => `
      border
      text-sm
      font-medium
      cursor-pointer
      rounded
      w-12
      p-2
      ${pagination.page.variant.default}
    `,
    direction: {
      next: `
        rounded-r-md
        ml-0.5
      `,
      prev: `
        rounded-l-md
        mr-0.5
      `
    }
  }
}

let flatPagination = {
  paginationBar: {
    classes: `
      rounded-md
    `
  },
  page: {
    classes: `
      text-sm
      font-semibold
      rounded
      w-12
      h-10
      mx-0.5
    `,
    variant: {
      default: `
        hover:bg-secondary-50
        border-secondary-300
        dark:text-text-300
        dark:hover:bg-dark-700
        dark:border-dark-700
      `,
      active: `
        font-semibold
        text-white
        bg-primary-500
        hover:bg-primary-400
        border-primary-200
        ring-primary-200
        dark:text-text-100
        dark:bg-primary-500
        dark:hover:bg-primary-300
        dark:border-primary-500
        dark:ring-primary-100
      `
    },
  },
  dots: {
    classes: () => `
      ${pagination.page.classes}
      border-secondary-300
      dark:text-text-300
      dark:border-dark-700
      hover:bg-transparent
      dark:hover:bg-transparent
      tracking-widest
    `
  },
  buttons: {
    classes: `
      text-sm
      font-medium
      cursor-pointer
      rounded
      w-12
      p-2
      hover:bg-secondary-50
      border-secondary-300
      dark:text-text-300
      dark:hover:bg-dark-700
      dark:border-dark-700
    `,
    direction: {
      next: `
        rounded-r-md
        ml-0.5
      `,
      prev: `
        rounded-l-md
        mr-0.5
      `
    }
  }
}

export default {
  pagination,
  flatPagination,
}
