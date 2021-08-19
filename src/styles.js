let fixedFormStates = {
  valid: [
    "border-green-300",
    "focus:ring-green-200",
  ],
  invalid: [
    "border-red-300",
    "focus:ring-red-200",
  ],
  disabled: [
    "opacity-50",
  ]
}

let fixedCheckboxFormStates = {
  valid: [
    "text-green-500",
    "border-green-300",
    "focus:ring-green-200",
  ],
  invalid: [
    "text-red-500",
    "border-red-300",
    "focus:ring-red-200",
  ],
  disabled: [
    "opacity-50",
  ]
}

// BUTTON

let fixedButton = [
  "rounded",
  "text-sm",
  "sm:text-base",
  "font-medium",
  "text-white",
  "focus:outline-none",
  "focus:ring-4",
  "px-4",
  "py-2",
  "m-1",
]

let button = {
  button: {
    default: [
      ...fixedButton,
      "bg-indigo-500",
      "hover:bg-indigo-600",
      "focus:ring-indigo-200",
    ],
    primary: [
      ...fixedButton,
      "bg-indigo-500",
      "hover:bg-indigo-600",
      "focus:ring-indigo-200",
    ],
    secondary: [
      ...fixedButton,
      "bg-gray-500",
      "hover:bg-gray-600",
      "focus:ring-gray-200",
    ],
    yellow: [
      "bg-yellow-500",
      "hover:bg-yellow-600",
      "focus:ring-yellow-200",
    ],
    green: [
      "bg-green-500",
      "hover:bg-green-600",
      "focus:ring-green-200",
    ],
    red: [
      "bg-red-500",
      "hover:bg-red-600",
      "focus:ring-red-200",
    ],
    outline: [
      "border",
      "border-blue-500",
      "bg-transparent",
      "hover:bg-transparent",
      "text-blue-500",
    ],
    small: [
      "py-1"
    ],
    tiny: [
      "py-0.5", "text-sm"
    ],
    large: [
      "py-2.5"
    ],
    square: [
      "rounded-none"
    ],
    pill: [
      "rounded-full"
    ],
    uppercase: [
      "uppercase"
    ],
    "no-margin": [
      "m-0"
    ],
  }
};

// TABS

let fixedTab = [
  "border",
  "rounded-t-md",
  "border-gray-300",
  "-mb-px",
  "-ml-px",
  "p-2",
  "px-4",
  "whitespace-nowrap",
  "overflow-ellipsis",
  "no-underline",
]

let tabs = {
  tab: {
    default: [
      ...fixedTab,
      "bg-gray-100",
      "hover:bg-gray-50",
    ],
    small: [
      "p-0",
    ]
  },
  tabActive: {
    default: [
      ...fixedTab,
      "bg-white",
      'shadow-none',
      "v-border-b-transparent",
    ],
  },
  tabBar: {
    default: [
      "border-b",
      "pl-2"
    ],
  }
};

// TABLE

let table = {
  table: {
    default: [
      "bg-white",
      "border-collapse",
    ], 
    fixed: [
      "table-fixed",
    ],
    busy: [
      "opacity-50",
    ],
  },
  headerRow: {
    default: [
    ]
  },
  headerCell: {
    default: [
      "border-b",
      "border-gray-300",
      "py-2",
      "px-2",
    ],
    bordered: [
      "border",
    ],
    dark: [
      "bg-gray-700",
      "text-white",
    ],
    light:[
      "bg-gray-100",
    ],
  },
  row: {
    default: [
    ]
  },
  cell: {
    default: [
      "border-t",
      "border-gray-300",
      "transition",
      "duration-200",
      "py-2",
      "px-2",
      "pr-6",
    ],
    bordered: [
      "border",
      "border-t",
      "border-gray-300",
      "py-2",
      "px-2",
      "pr-6",
    ]
  },
  selected: {
    default: [
      "bg-gray-100",
      "border-t",
      "border-gray-300",
      "transition",
      "duration-200",
      "py-2",
      "px-2",
      "pr-6",
    ],
  },
  caption: {
    default: [
      "text-gray-600",
      "text-left",
      "py-2",
    ]
  }
}

// LIST

let item = [
  "p-2",
  "px-4",
]

let list = {
  list: {
    default: [
      "border",
      "divide-y",
      "divide-gray-200",
      "rounded-md",
      "overflow-hidden",
    ],
    square: [
      "rounded-none"
    ],
    borderless: [
      "border-0",
    ]
  },
  item: {
    default: [
      ...item,
      "hover:bg-gray-50",
    ]
  },
  itemActive: {
    default: [
      ...item,
      "bg-blue-500",
      "hover:bg-blue-600",
      "text-white",
    ]
  },
}

let progress = {
  progress: {
    default: [
      "bg-gray-100",
      "rounded",
      "overflow-hidden",
      "h-4",
    ],
    transparent: [
      "bg-transparent",
    ],
    tiny: [
      "h-1",
    ],
  },
  progressBar: {
    default: [
      "bg-indigo-500",
    ],
    gradient: [
      "bg-gradient-to-r",
      "from-yellow-400", 
      "via-red-500", 
      "to-pink-500",
    ],
  },
  label: {
    default: [
      "text-xs",
      "text-white",
      "font-bold",
    ]
  }
}

// BREADCRUMB

let breadcrumb = {
  breadcrumb: {
    default: [
      "text-blue-500",
      "underline",
    ],
  },
  separator: {
    default: [
    ],
  },
}

// FORM TEXT

let formText = {
  formText: {
    default: [
      "text-sm",
      "text-gray-600",
      "mt-1",
    ],
  },
}

// SELECT

let select = {
  select: {
    default: [
      "rounded",
      "border",
      "bg-white",
      "border-gray-300",
      "focus:outline-none",
      "focus:ring",
      "focus:ring-indigo-200",
      "focus:border-gray-400",
      "outline-none",
      "overflow-y-auto",
    ],
    ...fixedFormStates,
  },
}

// RANGE

let range = {
  range: {
    default: [
      "rounded",
      "bg-white",
      "border-gray-300",
      "focus:outline-none",
      "focus:ring",
      "focus:ring-indigo-200",
      "focus:border-gray-400",
      "outline-none",
    ],
    ...fixedFormStates,
  },
}

// RADIO

let radio = {
  radio: {
    default: [
      "border",
      "bg-white",
      "border-gray-300",
      "text-indigo-500",
      "focus:border-gray-400",
      "focus:ring",
      "focus:ring-indigo-200",
      "focus:ring-offset-0",
      "focus:outline-none",
      "transform",
      "scale-110",
      "outline-none",
    ],
    ...fixedCheckboxFormStates,
  },
}

// CHECKBOX

let checkbox = {
  checkbox: {
    default: [
      "rounded",
      "border",
      "bg-white",
      "border-gray-300",
      "text-indigo-500",
      "focus:border-gray-400",
      "focus:ring",
      "focus:ring-indigo-200",
      "focus:ring-offset-0",
      "focus:outline-none",
      "transform",
      "scale-110",
      "outline-none",
    ],
    ...fixedCheckboxFormStates,
  },
  
}

// INPUT

let input = {
  input: {
    default: [
      "rounded",
      "border",
      "bg-white",
      "border-gray-300",
      "focus:outline-none",
      "focus:ring",
      "focus:ring-indigo-200",
      "focus:border-gray-400",
      "outline-none",
    ],
    ...fixedFormStates,
    // test
  },
}

// TEXTAREA

let textarea = {
  textarea: {
    default: [
      "rounded",
      "border",
      "bg-white",
      "border-gray-300",
      "focus:outline-none",
      "focus:ring",
      "focus:ring-indigo-200",
      "focus:border-gray-400",
      "outline-none",
      "py-1",
      "px-3",
    ],
    ...fixedFormStates,
  },
}

// ALERT

let alert = {
  alert: {
    default: [
      "bg-blue-100",
      "border",
      "border-blue-200",
      "border-l-4",
      "rounded",
      "font-semibold",
      "p-4",
    ],
    info: [
      "bg-yellow-100",
      "border-yellow-200",
    ],
    danger: [
      "bg-red-100",
      "border-red-200",
    ],
    success: [
      "bg-green-100",
      "border-green-200",
    ],
    light: [
      "bg-gray-100",
      "border-gray-200",
    ],
  }
}

// NAVBAR

let navbar = {
  navbar: {
    default: [
      "w-full",
      "bg-gray-100",
      "shadow-md",
    ]
  }
}

// CLOSEBUTTON

let closebutton = {
  closeButton: {
    default: [
      "text-gray-600",
      "opacity-60",
      "w-6",
      "h-6",
    ]
  }
}

// SIDEPANEL

let sidepanel = {
  sidepanel: {
    default: [
      "bg-gray-100",
      "text-left",
      "v-shadow-panel",
    ]
  }
}

// MODAL

let modal = {
  modal: {
    default: [
      "bg-white",
      "shadow-lg",
      "rounded-md",
      "text-gray-900",
    ],
    square: [
      "rounded-none"
    ]
  },
  header: {
    default: [
      "bg-gray-50",
      "text-gray-900",
      "text-lg", 
      "leading-6", 
      "font-medium", 
      "px-6", 
      "py-6", 
    ]
  },
  footer: {
    default: [
      "px-6",
      "py-6",
    ]
  },
  content: {
    default: [
      "px-6", 
      "py-5",
    ]
  },
  backdrop: {
    default: [
      "bg-black",
      "opacity-50"
    ]
  }
}

// CARD

let card = {
  card: {
    default: [
      "bg-white",
      "border",
      "border-gray-200",
      "rounded",
      "overflow-hidden",
    ],
    shadow: [
      "shadow-md",
    ],
    square: [
      "rounded-none",
    ],
    borderless: [
      "border-0"
    ],
    gray: [
      "bg-gray-100",
    ],
    borderless: [
      "border-0",
    ],
    hoverable: [
      "hover:shadow-lg",
      "transition-all",
    ]
  },
}

// DROPDOWN

let menuItem = [
  "text-left",
  "w-full",
  "focus:outline-none",
  "pr-4",
]

let dropdown = {
  menuItem: {
    default: [
      ...menuItem,
      "text-black",
      "hover:bg-gray-50",
      "focus:bg-indigo-500",
      "focus:text-white",
    ],
    green: [
      "bg-green-500"
    ]
  },
  menuItemActive: {
    default: [
      ...menuItem,
      "text-white",
      "bg-indigo-500",
      "hover:bg-indigo-600",
    ],
  },
  menuItemDisabled: {
    default: [
      ...menuItem,
      "text-gray-200",
      "pointer-events-none",
    ],
  },
  menuItemHeader: {
    default: [
      "font-semibold",
      "text-sm",
      "px-4",
      "py-2",
    ],
  },
}

// DATEPICKER

let fixedDay = [
  "cursor-pointer",
  "rounded",
  "text-sm",
  "py-1",
  "mx-1",
  "my-1",
]

let datepicker = {
  datepicker: {
    default: [
      "bg-white",
      "text-center",
    ],
  },
  button: {
    default: [
      "rounded",
      "focus:ring-2",
      "focus:ring-indigo-200",
      "py-1",
      "px-2",
    ]
  },
  day: {
    default: [
      ...fixedDay,
      "hover:bg-gray-50",
    ]
  },
  daySelected: {
    default: [
      ...fixedDay,
      "bg-indigo-400",
      "hover:bg-indigo-600",
      "font-semibold",
      "text-white", 
    ]
  },
  today: {
    default: [
      ...fixedDay,
      "hover:bg-gray-50",
      "text-blue-500",
      "font-bold",
    ]
  },
  adjecentMonthDay: {
    default: [
      ...fixedDay,
      "text-gray-200",
      "pointer-events-none",
    ]
  },
  footer: {
    default: [
      "bg-gray-100",
      "text-sm",
      "font-semibold",
      "py-1",
    ]
  }
}

// SPINNER

let spinner = {
  spinner: {
    default: [
      "text-indigo-500",
      "h-8",
      "w-8",
    ],
    blue: [
      "text-blue-500",
    ],
    yellow: [
      "text-yellow-500",
    ],
    green: [
      "text-green-500",
    ],
    gray: [
      "text-gray-300",
    ],
    large: [
      "h-20",
      "w-20",
    ],
    small: [
      "h-5",
      "w-5",
    ],
  }
}

// POPOVER

let popover = {
  popover: {
    default: [
      "bg-white",
      "border",
      "border-gray-300",
      "rounded-md", 
      "overflow-hidden",
      "max-w-xs",
      "shadow-lg",
    ]
  },
  content: {
    default: [
      "p-5",
    ]
  }
}

// BADGE

let fixedBadge = [
  "rounded-md",
  "font-bold",
  "p-1",
  "px-3",
]

let badge = {
  badge: {
    default: [
      ...fixedBadge,
      "bg-indigo-500",
      "text-white",
    ],
    primary: [
      ...fixedBadge,
      "bg-indigo-500",
      "text-white",
    ],
    secondary: [
      ...fixedBadge,
      "bg-gray-500",
      "text-white",
    ],
    green: [
      "bg-green-500",
      "text-white",
    ],
    yellow: [
      "bg-yellow-500",
      "text-white",
    ],
    red: [
      "bg-red-500",
      "text-white",
    ],
    small: [
      "text-sm",
      "p-1",
      "px-2",
    ],
    tiny: [
      "text-xs",
      "font-semibold",
      "p-0.5",
      "px-2",
    ],
  }
}

// PAGINATION

let fixedPage = [
  "hover:bg-gray-50",
  "border",
  "border-gray-300",
  "text-sm",
  "font-medium",
  "font-semibold",
  "rounded",
  "w-12",
  "h-10",
  "mx-0.5",
]

let fixedSideControls = [
  "hover:bg-gray-50",
  "border",
  "border-gray-300",
  "text-sm",
  "font-medium",
  "cursor-pointer",
  "rounded",
  "w-12",
  "p-2",
]

let pagination = {
  paginationBar: {
    default: [
      "rounded-md",
    ],
  },
  page: {
    default: [
      ...fixedPage,
    ],
  },
  pageActive: {
    default: [
      ...fixedPage,
      "hover:bg-indigo-400",
      "border-indigo-200",
      "bg-indigo-500",
      "ring-indigo-200",
      "text-white",
      "ring-2",
      "font-semibold",
    ],
  },
  dots: {
    default: [
      ...fixedPage,
      "tracking-wider",
    ]
  },
  next: {
    default: [
      ...fixedSideControls,
      "rounded-r-md",
      "ml-0.5",
    ],
  },
  prev: {
    default: [
      ...fixedSideControls,
      "rounded-l-md",
      "mr-0.5",
    ],
  }
};

export let styles = {
  button,
  list,
  select,
  radio,
  checkbox,
  input,
  textarea,
  formText,
  range,
  spinner,
  popover,
  dropdown,
  progress,
  alert,
  navbar,
  closebutton,
  sidepanel,
  table,
  modal,
  card,
  datepicker,
  tabs,
  badge,
  breadcrumb,
  pagination,
}
