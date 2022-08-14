import { correctPlacement } from "./const.js";

// popper props

export const sharedPopperProps = (d) => {
  d = d || {};

  return {
    placement: {
      type: String,
      default: d.placement || "bottom-start",
      validator: function (v) {
        return correctPlacement.includes(v);
      },
    },
    offsetX: { type: Number, default: d.offsetX || 0 },
    offsetY: { type: Number, default: d.offsetY || 0 },
    noFlip: { type: Boolean, default: d.noFlip || false },
  };
};

// style props

export const sharedStyleProps = () => {
  return {
    base: { type: String, default: "default" },
    variant: { type: [String, Boolean], default: "" },
  };
};

// form props

export const sharedFormProps = (d, options) => {
  d = d || {};
  options = options || {};

  let props = {};
  if (options.icon === true) {
    props.icon = { type: String, default: d.icon || "" };
  }
  if (options.clearable === true) {
    props.clearable = { type: Boolean, default: d.clearable || false };
  }

  return {
    ...props,
    state: { type: String, default: d.state || null },
  };
};
