import { correctPlacement } from "./const.js";

export const sharedPopperProps = {
  placement: {
    type: String,
    default: "bottom-start",
    validator: function (v) {
      return correctPlacement.includes(v);
    },
  },
  offsetX: { type: Number, default: 0 },
  offsetY: { type: Number, default: 0 },
  noFlip: { type: Boolean, default: false },
}

export const sharedStyleProps = (base) => {
  return {
    name: { type: String, default: base },
    variant: { type: String, default: ""},
  }
}
