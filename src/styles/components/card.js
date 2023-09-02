let card = {
  card: {
    shape: {
      rounded: `
        rounded-md
      `,
      square: `
        rounded-none 
      `,
      roundedExtra: `
        rounded-xl
      `,
    },
    shadow: {
      medium: `
        shadow-md
        dark:shadow-lg
        dark:shadow-black/30
      `,
    },
    border: {
      default: `
        border
      `,
      borderless: `
        border-0
      `,
    },
    variant: {
      default: `
        dark:text-text-300
        bg-white
        dark:bg-dark-800
        border-secondary-200
        dark:border-dark-700
      `,
      transparent: `
        bg-transparent
        dark:bg-transparent
        dark:bg-dark-800
        border-secondary-200
        dark:border-dark-700
      `,
    },
    effect: {
      optional: true,
      hoverScale: `
        hover:shadow-lg
        transition-all
        hover:scale-105
        delay-75
      `,
      hoverRing: `
        transition-shadow
        duration-150
        hover:ring-4
        ring-primary-400
        dark:ring-primary-300
      `,
      loading: `
        animate-pulse
      `,
    },
    preset: {
      selectMenu: () => `
        group-data-[placement=bottom]:rounded-b-md
        group-data-[placement=top]:rounded-t-md
        ${card.card.shadow.medium}
        ${card.card.border.borderless}
        ${card.card.variant.default}
      `,
      flatDropdown: () => `
        ${card.card.shape.square}
        ${card.card.shadow.medium}
        ${card.card.border.borderless}
        ${card.card.variant.default}
      `,
      tooltip: () => `
        ${card.card.shape.square}
        ${card.card.shadow.medium}
        ${card.card.border.borderless}
        ${card.card.variant.default}
      `,
    },
  },
};

card._options = {
  containerGroupClass: "group",
};

export default {
  card,
};
