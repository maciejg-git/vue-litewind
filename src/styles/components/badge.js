let badge = {
  classes: `
    rounded-md
    font-bold
  `,
  size: {
    medium: `
      p-1
      px-3
    `,
    small: `
      text-sm
      p-1
      px-2
    `,
    tiny: `
      text-xs
      p-0.5
      px-2
    `
  },
  variant: {
    primary: `
      text-white
      bg-primary-500
    `,
    secondary: `
      text-white
      bg-secondary-500
    `,
    success: `
      text-text-800
      bg-success-500
    `,
    warn: `
      text-text-800
      bg-warn-500
    `,
    danger: `
      text-white
      bg-danger-500
    `
  },
  special: {
    optional: true,
    circle: `
      !rounded-full
      border
      w-4
      h-4
      !px-0
      !py-0
      border-white
      dark:border-dark-800
    `,
    circleSmall: `
      !rounded-full
      border
      w-2
      h-2
      !px-0
      !py-0
      border-white
      dark:border-dark-800
    `
  }
}

export default {
  badge
}
