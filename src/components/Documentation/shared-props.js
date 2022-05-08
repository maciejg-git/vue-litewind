export let popperProps = [
  {
    prop: "placement",
    type: ["String"],
    default: "bottom-start",
    description:
      "Initial placement of dropdown content. See valid values in <a href='https://popper.js.org/docs/v2/constructors/' class='link'>Popperjs documentation</a>",
  },
  {
    prop: "offsetX",
    type: ["Number"],
    default: "0",
    description:
      "Offset of dropdown relative to reference element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
  },
  {
    prop: "offsetY",
    type: ["Number"],
    default: "0",
    description:
      "Offset of dropdown relative to reference element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
  },
  {
    prop: "no-flip",
    type: ["Boolean"],
    default: "false",
    description:
      "Allows fliping dropdown to opposite placement if outside of current view",
  },
];

export let styleProps = (name) => {
  return [
    {
      prop: "name",
      type: ["String"],
      default: name,
      description: "Name of the component",
    },
  ];
};
