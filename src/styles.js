let shadow = false;

// BUTTON

let fixedButton = [
  "rounded",
  "text-base",
  "font-medium",
  "text-white",
  "focus:outline-none",
  "focus:ring-4",
  "sm:w-auto" ,
  "sm:text-sm",
  "px-4",
  "py-2",
  "m-1",
  shadow ? "shadow" : "" 
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
      "border-0",
      "border-indigo-500",
    ],
    secondary: [
      ...fixedButton,
      "bg-gray-500",
      "hover:bg-gray-600",
      "focus:ring-gray-200",
      "border-0",
      "border-gray-500",
    ],
    small: ["py-1"],
    tiny: [
      "py-0.5",
      "text-sm",
    ],
    large: ["py-2.5"],
    square: ["rounded-none"],
    pill: ["rounded-full"],
    uppercase: ["uppercase"],
    noMargin: ["m-0"],
  }
};

// TABS

let fixedTab = [
  "border",
  "rounded-t-md",
  "border-gray-300",
  "-mb-px",
  "-ml-px",
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

let fixedTabMaterial = [
  // "border",
  // "border-gray-300",
  "-mb-px",
  "-ml-px",
  "transition-all",
]

let tabsMaterial = {
  tab: {
    default: [
      ...fixedTabMaterial,
      // "bg-gray-100",
      "hover:bg-gray-50",
    ],
    small: [
      "p-0",
    ]
  },
  tabActive: {
    default: [
      ...fixedTabMaterial,
      "bg-white",
      'shadow-none',
      "border-b-2",
      "border-indigo-500",
      "font-semibold",
      // "v-border-b-transparent",
    ],
  },
  tabBar: {
    default: [
      "border-b",
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
    ]
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
      // "hover:bg-gray-50",
    ]
  },
  cell: {
    default: [
      // "border",
      "border-t",
      "border-gray-300",
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
]

let list = {
  list: {
    default: [
      "border",
      "border-gray-200",
      "divide-y",
      "divide-gray-200",
      "rounded-md",
    ],
    square: [
      "rounded-none"
    ],
  },
  item: {
    default: [
      ...item,
    ]
  },
  itemActive: {
    default: [
      ...item,
      "bg-blue-500",
    ]
  },
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
      "shadow",
    ],
    square: [
      "rounded-none",
    ],
    borderless: [
      "border-0"
    ],
    gray: [
      "bg-gray-100",
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
      "focus:bg-blue-500",
      "focus:text-white",
    ],
  },
  menuItemActive: {
    default: [
      ...menuItem,
      "text-white",
      "bg-blue-500",
      "hover:bg-blue-600",
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
      // "ring-indigo-200",
      // "ring",
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
      "animate-spin",
      "h-10",
      "w-10",
      "text-blue-500",
    ]
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
      "shadow",
    ]
  },
  content: {
    default: [
      "p-3",
    ]
  }
}

// BADGE

let badge = {
  badge: {
    default: [
      "bg-indigo-500",
      "text-white",
      "rounded-md",
      "font-bold",
      "p-2",
      "px-3",
      "mx-2",
    ],
    primary: [
      "bg-indigo-500",
      "text-white",
      "rounded-md",
      "font-bold",
      "p-2",
      "px-3",
      "mx-2",
    ],
    secondary: [
      "bg-indigo-500",
      "text-white",
      "rounded-md",
      "font-bold",
      "p-2",
      "px-3",
      "mx-2",
    ],
    small: [
      "p-1",
      "px-2",
      "text-sm",
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
  "w-12",
  "h-10",
  "mx-0.5",
  "font-semibold",
  "rounded",
  // "-ml-px",
]

let fixedSideControls = [
  "hover:bg-gray-50",
  // "border",
  "border-gray-300",
  "text-sm",
  "font-medium",
  "cursor-pointer",
  "w-10",
  "p-2",
]

let pagination = {
  paginationBar: {
    default: [
      "rounded-md",
      // shadow ? "shadow" : ""
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
  next: {
    default: [
      ...fixedSideControls,
      "ml-0.5",
      "rounded-r-md",
      // "-ml-px",
    ],
  },
  prev: {
    default: [
      ...fixedSideControls,
      "mr-0.5",
      "rounded-l-md",
    ],
  }
};

// let fixedPage = [
//   "border",
//   "border-gray-200",
//   "hover:bg-gray-50",
//   "text-sm",
//   "font-medium",
//   "px-4",
//   "py-2",
//   "cursor-pointer",
//   "mx-0.5",
//   "rounded",
//   "shadow-md",
// ]
//
// let pagination = {
//   bar: {
//     default: [
//     ],
//   },
//   page: {
//     default: [
//       ...fixedPage,
//     ],
//   },
//   pageActive: {
//     default: [
//       ...fixedPage,
//       "bg-blue-500",
//       "hover:bg-blue-600",
//       "text-white",
//       "border-blue-500",
//       "ring-blue-300",
//       "ring-2",
//     ],
//   },
//   next: {
//     default: [
//       "border",
//       "border-gray-200",
//       "hover:bg-gray-50",
//       "rounded",
//       "text-sm",
//       "font-medium",
//       "cursor-pointer",
//       "-ml-px",
//       "px-4",
//       "p-2",
//       "ml-0.5",
//       "shadow-md",
//     ],
//   },
//   prev: {
//     default: [
//       "border",
//       "border-gray-200",
//       "hover:bg-gray-50",
//       "rounded",
//       "text-sm",
//       "font-medium",
//       "cursor-pointer",
//       "px-4",
//       "p-2",
//       "mr-0.5",
//       "shadow-md",
//     ],
//   }
// };

export let styles = {
  button,
  list,
  spinner,
  popover,
  dropdown,
  sidepanel,
  table,
  modal,
  card,
  datepicker,
  tabs,
  tabsMaterial,
  badge,
  pagination,
}
