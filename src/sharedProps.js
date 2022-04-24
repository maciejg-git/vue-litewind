import { correctPlacement } from "./const.js";

// popper props

export const sharedPopperProps = (d) => {
  d = d || {}

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
  }
}

// style props

export const sharedStyleProps = (base) => {
  return {
    name: { type: String, default: base },
    variant: { type: String, default: ""},
  }
}
