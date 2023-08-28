let datepicker = {

  /* element */

  datepicker: {
    classes: `
      text-center
      text-text-800
      dark:text-text-300
      bg-white
      dark:bg-dark-800
    `
  },

  /* element */

  dateButton: {
    classes: `
      rounded
      focus:ring-2
      py-1
      px-2
      focus:ring-primary-200
      dark:focus:ring-primary-400
    `
  },

  /* element */

  date: {
    classes: `
      font-bold
    `
  },

  /* element */

  weekdayBar: {
    classes: `
      mb-2
    `
  },

  /* element */

  weekday: {
    classes: `
      text-sm 
      font-semibold 
      dark:text-text-300
    `
  },

  /* element */

  day: {
    classes: `
      cursor-pointer
      rounded
      text-sm
      py-1
      mx-1
      my-1
      font-semibold
    `,
    variant: {
      default: `
        dark:text-text-300
      `,
      today: `
        !font-bold
        text-primary-400
        dark:text-primary-400
      `,
      adjacentMonthDay: `
        pointer-events-none
        text-text-800/10
        dark:text-text-200/10
      `,
      selected: `
        text-white
        dark:text-text-200
        bg-primary-400
        dark:bg-primary-500
        hover:bg-primary-600
        dark:hover:bg-primary-700
      `,
      partiallySelected: `
        text-text-800
        dark:text-text-300
        bg-secondary-300
        dark:bg-dark-700
      `
    }
  },

  /* element */

  footer: {
    classes: `
      text-sm
      font-semibold
      py-1
      dark:text-text-300
      bg-secondary-100
      dark:bg-dark-700
    `
  }
}

export default {
  datepicker
}
