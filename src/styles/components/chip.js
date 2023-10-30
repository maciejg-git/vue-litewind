let chip = {
  chip: {
    classes: `
      rounded-full
      font-semibold
    `,
    size: {
      small: `
        px-2
      `,
      medium: `
        px-3
        text-lg
      `,
    },
    variant: {
      default: `
        dark:text-text-200
        bg-secondary-200
        dark:bg-dark-500
      `,
      primary: `
        text-text-100
        bg-primary-500
        dark:bg-primary-500
        hover:bg-primary-600
        dark:hover:bg-primary-600
        border-primary-700
        focus:ring-primary-200
      `,
      primaryOutline: `
        border
        text-primary-400
        border-primary-400
        hover:border-primary-300
        hover:text-primary-300
        focus:ring-primary-200
      `,
      secondary: `
        text-text-100
        bg-secondary-500
        dark:bg-secondary-500
        hover:bg-secondary-600
        dark:hover:bg-secondary-600
        border-secondary-700
        focus:ring-secondary-200
      `,
      secondaryOutline: `
        border
        text-secondary-400
        border-secondary-400
        hover:border-secondary-300
        hover:text-secondary-300
        focus:ring-secondary-200
      `,
      warn: `
        text-text-800
        bg-warn-400
        dark:bg-warn-400
        hover:bg-warn-500
        dark:hover:bg-warn-500
        border-warn-600
        focus:ring-warn-200
      `,
      warnOutline: `
        border
        text-warn-400
        border-warn-400
        hover:border-warn-300
        hover:text-warn-300
        focus:ring-warn-200
      `,
      danger: `
        text-text-800
        bg-danger-400
        dark:bg-danger-400
        hover:bg-danger-500
        dark:hover:bg-danger-500
        border-danger-600
        focus:ring-danger-200
      `,
      dangerOutline: `
        border
        text-danger-400
        border-danger-400
        hover:border-danger-300
        hover:text-danger-300
        focus:ring-danger-200
      `,
      success: `
        text-text-800
        bg-success-400
        dark:bg-success-400
        hover:bg-success-500
        dark:hover:bg-success-500
        border-success-600
        focus:ring-success-200
      `,
      successOutline: `
        border
        text-success-400
        border-success-400
        hover:border-success-300
        hover:text-success-300
        focus:ring-success-200
      `,
    },
  },
};

export default {
  chip,
};
