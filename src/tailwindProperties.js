const shade = {
  _name: null,
  50: true,
  100: true,
  200: true,
  300: true,
  400: true,
  500: true,
  600: true,
  700: true,
  800: true,
  900: true,
};

const colors = {
  _name: "color",
  transparent: { _optional: true, _name: null },
  white: { _optional: true, _name: null },
  black: { _optional: true, _name: null },
  gray: shade,
  red: shade,
  yellow: shade,
  green: shade,
  blue: shade,
  indigo: shade,
  purple: shade,
  pink: shade,
  green: shade,
  yellow: shade,
};

const roundedSize = {
  _name: "size",
  _optional: true,
  none: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
  "2xl": true,
  "3xl": true,
  full: true,
};

const roundedSide = {
  t: roundedSize,
  r: roundedSize,
  b: roundedSize,
  l: roundedSize,
};

const borderWidth = {
  _name: "width",
  _optional: true,
  0: true,
  2: true,
  4: true,
  8: true,
};

const borderSide = {
  t: borderWidth,
  r: borderWidth,
  b: borderWidth,
  l: borderWidth,
};

const weight = {
  _name: "weight",
  thin: true,
  extralight: true,
  light: true,
  normal: true,
  medium: true,
  semibold: true,
  bold: true,
  extrabold: true,
  black: true,
};

const overflow = {
  _name: "visibility",
  auto: true,
  hidden: true,
  visible: true,
  scroll: true,
};

const opacity = {
  _name: null,
  0: true,
  5: true,
  10: true,
  20: true,
  25: true,
  30: true,
  40: true,
  50: true,
  60: true,
  75: true,
  80: true,
  90: true,
  95: true,
  100: true,
};

const space = {
  _name: null,
  0: true,
  0.5: true,
  1: true,
  1.5: true,
  2: true,
  2.5: true,
  3: true,
  3.5: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
  12: true,
  14: true,
  16: true,
  20: true,
  24: true,
  28: true,
  32: true,
  36: true,
  40: true,
  44: true,
  48: true,
  52: true,
  56: true,
  60: true,
  64: true,
  72: true,
  80: true,
  96: true,
  px: true,
  reverse: true,
};

const order = {
  _name: null,
  0: true,
  1: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
  12: true,
  first: true,
  last: true,
  none: true,
};

const sizing = {
  _name: null,
  0: true,
  0.5: true,
  1: true,
  1.5: true,
  2: true,
  2.5: true,
  3: true,
  3.5: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
  12: true,
  14: true,
  16: true,
  20: true,
  24: true,
  28: true,
  32: true,
  36: true,
  40: true,
  44: true,
  48: true,
  52: true,
  56: true,
  60: true,
  64: true,
  72: true,
  80: true,
  96: true,
  px: true,
};

let gap = {
  _name: null,
  0: true,
  px: true,
  0.5: true,
  1: true,
  1.5: true,
  2: true,
  2.5: true,
  3: true,
  3.5: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
  12: true,
  14: true,
  16: true,
  20: true,
  24: true,
  28: true,
  32: true,
  36: true,
  40: true,
  44: true,
  48: true,
  52: true,
  56: true,
  60: true,
  64: true,
  72: true,
  80: true,
  96: true,
};

let width = {
  _name: null,
  0: true,
  px: true,
  0.5: true,
  1: true,
  1.5: true,
  2: true,
  2.5: true,
  3: true,
  3.5: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
  12: true,
  14: true,
  16: true,
  20: true,
  24: true,
  28: true,
  32: true,
  36: true,
  40: true,
  44: true,
  48: true,
  52: true,
  56: true,
  60: true,
  64: true,
  72: true,
  80: true,
  96: true,
  auto: true,
  "1/2": true,
  "1/3": true,
  "2/3": true,
  "1/4": true,
  "2/4": true,
  "3/4": true,
  "1/5": true,
  "2/5": true,
  "3/5": true,
  "4/5": true,
  "1/6": true,
  "2/6": true,
  "3/6": true,
  "4/6": true,
  "5/6": true,
  "1/12": true,
  "2/12": true,
  "3/12": true,
  "4/12": true,
  "5/12": true,
  "6/12": true,
  "7/12": true,
  "8/12": true,
  "9/12": true,
  "10/12": true,
  "11/12": true,
  full: true,
  screen: true,
  min: true,
  max: true,
};

let height = {
  _name: null,
  0: true,
  px: true,
  0.5: true,
  1: true,
  1.5: true,
  2: true,
  2.5: true,
  3: true,
  3.5: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
  12: true,
  14: true,
  16: true,
  20: true,
  24: true,
  28: true,
  32: true,
  36: true,
  40: true,
  44: true,
  48: true,
  52: true,
  56: true,
  60: true,
  64: true,
  72: true,
  80: true,
  96: true,
  auto: true,
  "1/2": true,
  "1/3": true,
  "2/3": true,
  "1/4": true,
  "2/4": true,
  "3/4": true,
  "1/5": true,
  "2/5": true,
  "3/5": true,
  "4/5": true,
  "1/6": true,
  "2/6": true,
  "3/6": true,
  "4/6": true,
  "5/6": true,
  full: true,
  screen: true,
};

let placement = {
  _name: null,
  0: true,
  0.5: true,
  1: true,
  1.5: true,
  2: true,
  2.5: true,
  3: true,
  3.5: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
  12: true,
  14: true,
  16: true,
  20: true,
  24: true,
  28: true,
  32: true,
  36: true,
  40: true,
  44: true,
  48: true,
  52: true,
  56: true,
  60: true,
  64: true,
  72: true,
  80: true,
  96: true,
  px: true,
  auto: true,
  "1/2": true,
  "1/3": true,
  "2/3": true,
  "1/4": true,
  "2/4": true,
  "3/4": true,
  full: true,
};

const shadow = {
  _name: null,
  sm: true,
  md: true,
  lg: true,
  xl: true,
  "2xl": true,
  inner: true,
  none: true,
};

let states = {
  hover: true,
  "group-hover": true,
  focus: true,
  "group-focus": true,
  "focus-within": true,
  "focus-visible": true,
  active: true,
  group: true,
  motion: true,
  disabled: true,
  visited: true,
  checked: true,
};

export const tailwindcss = {
  states,
  container: {
    _single: "container",
  },
  bg: {
    _name: "bg",
    props: [
      colors,
      {
        _name: "opacity",
        opacity,
      },
      {
        _name: "attachment",
        fixed: true,
        local: true,
        scroll: true,
      },
      {
        clip: {
          _name: null,
          border: true,
          padding: true,
          content: true,
          text: true,
        },
      },
      {
        _name: "position",
        bottom: true,
        center: true,
        left: {
          _optional: true,
          _name: null,
          bottom: true,
          top: true,
        },
        right: {
          _optional: true,
          _name: null,
          bottom: true,
          top: true,
        },
        top: true,
      },
      {
        _name: "size",
        auto: true,
        cover: true,
        contain: true,
      },
    ],
  },
  float: {
    props: [
      {
        _name: null,
        right: true,
        left: true,
        none: true,
      },
    ],
  },
  clear: {
    props: [
      {
        _name: null,
        left: true,
        right: true,
        both: true,
        none: true,
      },
    ],
  },
  visible: {
    _single: "visibility",
  },
  invisible: {
    _single: "visibility",
  },
  z: {
    props: [
      {
        _name: null,
        0: true,
        10: true,
        20: true,
        30: true,
        40: true,
        50: true,
        auto: true,
      },
    ],
  },
  gap: {
    props: [
      gap,
      {
        _name: "column",
        x: gap,
      },
      {
        _name: "row",
        y: gap,
      },
    ],
  },
  justify: {
    props: [
      {
        _name: null,
        start: true,
        end: true,
        center: true,
        between: true,
        around: true,
        evenly: true,
      },
      {
        items: {
          _name: null,
          auto: true,
          start: true,
          end: true,
          center: true,
          stretch: true,
        },
        self: {
          _name: null,
          auto: true,
          start: true,
          end: true,
          center: true,
          stretch: true,
        },
      },
    ],
  },
  content: {
    _name: "aligncontent",
    props: [
      {
        _name: null,
        start: true,
        end: true,
        center: true,
        between: true,
        around: true,
        evenly: true,
      },
    ],
  },
  items: {
    _name: "alignitems",
    props: [
      {
        _name: null,
        start: true,
        end: true,
        center: true,
        baseline: true,
        stretch: true,
      },
    ],
  },
  self: {
    _name: "alignself",
    props: [
      {
        _name: null,
        auto: true,
        start: true,
        end: true,
        center: true,
        stretch: true,
      },
    ],
  },
  place: {
    props: [
      {
        content: {
          _name: null,
          center: true,
          start: true,
          end: true,
          between: true,
          around: true,
          evenly: true,
          stretch: true,
        },
      },
      {
        items: {
          _name: null,
          start: true,
          end: true,
          center: true,
          stretch: true,
        },
      },
      {
        self: {
          _name: null,
          auto: true,
          start: true,
          end: true,
          center: true,
          stretch: true,
        },
      },
    ],
  },
  p: {
    props: [sizing],
  },
  px: {
    props: [sizing],
  },
  py: {
    props: [sizing],
  },
  pt: {
    props: [sizing],
  },
  pr: {
    props: [sizing],
  },
  pb: {
    props: [sizing],
  },
  pl: {
    props: [sizing],
  },
  m: {
    props: [sizing],
  },
  mx: {
    props: [sizing],
  },
  my: {
    props: [sizing],
  },
  mt: {
    props: [sizing],
  },
  mr: {
    props: [sizing],
  },
  mb: {
    props: [sizing],
  },
  ml: {
    props: [sizing],
  },
  "-m": {
    _name: "m",
    props: [sizing],
  },
  "-mx": {
    _name: "mx",
    props: [sizing],
  },
  "-my": {
    _name: "my",
    props: [sizing],
  },
  "-mt": {
    _name: "mt",
    props: [sizing],
  },
  "-mr": {
    _name: "mr",
    props: [sizing],
  },
  "-mb": {
    _name: "mb",
    props: [sizing],
  },
  "-ml": {
    _name: "ml",
    props: [sizing],
  },
  space: {
    props: [
      {
        x: space,
        y: space,
      },
    ],
  },
  "-space": {
    _name: "space",
    props: [
      {
        x: space,
        y: space,
      },
    ],
  },
  w: {
    props: [
      width,
    ],
  },
  h: {
    props: [
      height,
    ]
  },
  cursor: {
    props: [
      {
        pointer: true,
      },
    ],
  },
  text: {
    _name: "text",
    props: [
      colors,
      {
        _name: "align",
        left: true,
        center: true,
        right: true,
        justify: true,
      },
      {
        _name: "opacity",
        opacity,
      },
      {
        _name: "size",
        xs: true,
        sm: true,
        base: true,
        lg: true,
        xl: true,
        "2xl": true,
        "3xl": true,
        "4xl": true,
        "5xl": true,
        "6xl": true,
        "7xl": true,
        "8xl": true,
        "9xl": true,
      },
    ],
  },
  italic: {
    _single: "fontstyle",
  },
  not: {
    _name: null,
    props: [
      {
        _name: "fontstyle",
        italic: true,
      },
    ],
  },
  underline: {
    _single: "textdecoration",
  },
  line: {
    _name: null,
    props: [
      {
        _name: "textdecoration",
        through: true,
      },
    ],
  },
  no: {
    _name: null,
    props: [
      {
        _name: "textdecoration",
        underline: true,
      },
    ],
  },
  uppercase: {
    _single: "uppercase",
  },
  truncate: {
    _single: "truncate",
  },
  align: {
    props: [
      {
        _name: "vertical",
        baseline: true,
        top: true,
        middle: true,
        bottom: true,
        text: {
          _name: null,
          top: true,
          bottom: true,
        },
      },
    ],
  },
  rounded: {
    _name: "rounded",
    _single: "roundedsize",
    props: [roundedSize, roundedSide],
  },
  font: {
    _name: "font",
    props: [weight],
  },
  tracking: {
    props: [
      {
        _name: null,
        tighter: true,
        tight: true,
        normal: true,
        wide: true,
        wider: true,
        widest: true,
      },
    ],
  },
  leading: {
    props: [
      {
        _name: null,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        none: true,
        tight: true,
        snug: true,
        normal: true,
        relaxed: true,
        loose: true,
      },
    ],
  },
  block: {
    _single: "display",
  },
  border: {
    _name: "border",
    _single: "borderwidth",
    props: [
      borderSide,
      borderWidth,
      colors,
      {
        _name: "opacity",
        opacity,
      },
      {
        _name: "style",
        solid: true,
        dashed: true,
        dotted: true,
        double: true,
        none: true,
      },
      {
        _name: "collapse",
        collapse: true,
        separate: true,
      },
    ],
  },
  ring: {
    _single: "ringwidth",
    props: [
      colors,
      {
        opacity,
      },
      {
        _name: "width",
        0: true,
        1: true,
        2: true,
        4: true,
        8: true,
        inset: true,
      },
      {
        offset: {
          _name: null,
          0: true,
          1: true,
          2: true,
          4: true,
          8: true,
        },
      },
      {
        offset: colors,
      },
    ],
  },
  opacity: {
    props: [opacity],
  },
  shadow: {
    _single: "shadow",
    props: [shadow],
  },
  overflow: {
    _name: "overflow",
    props: [
      overflow,
      {
        _name: "x",
        x: overflow,
      },
      {
        _name: "y",
        y: overflow,
      },
      {
        _name: "text",
        ellipsis: true,
        clip: true,
      },
    ],
  },
  static: {
    _single: "position",
  },
  fixed: {
    _single: "position",
  },
  absolute: {
    _single: "position",
  },
  relative: {
    _single: "position",
  },
  sticky: {
    _single: "position",
  },
  top: {
    props: [placement],
  },
  right: {
    props: [placement],
  },
  bottom: {
    props: [placement],
  },
  left: {
    props: [placement],
  },
  inset: {
    props: [
      placement,
      {
        x: placement,
        y: placement,
      },
    ],
  },
  "-inset": {
    _name: "inset",
    props: [
      placement,
      {
        x: placement,
        y: placement,
      },
    ],
  },
  box: {
    _name: "box",
    props: [
      {
        _name: "sizing",
        border: true,
        content: true,
      },
    ],
  },
  block: {
    _single: "display",
  },
  inline: {
    _single: "display",
    _name: "display",
    props: [
      {
        _name: null,
        block: true,
        flex: true,
        grid: true,
      },
    ],
  },
  flex: {
    _single: "display",
    _name: "flex",
    props: [
      {
        row: {
          _name: "direction",
          _optional: true, // ?
          reverse: true,
        },
        col: {
          _name: "direction",
          reverse: true,
        },
      },
      {
        _name: "wrap",
        wrap: {
          _name: null,
          _optional: true,
          reverse: true,
        },
        nowrap: true,
      },
      {
        _name: null,
        1: true,
        auto: true,
        initial: true,
        none: true,
      },
      {
        grow: {
          _name: null,
          _optional: true,
          0: true,
        },
      },
      {
        shrink: {
          _name: null,
          _optional: true,
          0: true,
        },
      },
    ],
  },
  order: {
    props: [order],
  },
  table: {
    _single: "display",
    props: [
      {
        _name: "layout",
        auto: true,
        fixed: true,
      },
    ],
  },
  grid: {
    _single: "display",
    props: [
      {
        cols: {
          _name: null,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: true,
          7: true,
          8: true,
          9: true,
          10: true,
          11: true,
          12: true,
          none: true,
        },
      },
    ],
  },
  contents: {
    _single: "display",
    props: [],
  },
  hidden: {
    _single: "display",
    props: [],
  },
  cursor: {
    props: [
      {
        auto: true,
        default: true,
        pointer: true,
        wait: true,
        text: true,
        move: true,
        help: true,
        not: {
          allowed: true,
        },
      },
    ],
  },
  outline: {
    props: [
      {
        _name: null,
        none: true,
        white: true,
        black: true,
      },
    ],
  },
  pointer: {
    props: [
      {
        events: {
          _name: null,
          none: true,
          auto: true,
        },
      },
    ],
  },
  resize: {
    _single: "resize",
    props: [
      {
        _name: null,
        none: true,
        x: true,
        y: true,
      },
    ],
  },

  // table-caption
  // table-cell
  // table-column
  // table-column-group
  // table-footer-group
  // table-header-group
  // table-row-group
  // table-row
  // flow-root
};
