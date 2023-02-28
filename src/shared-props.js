import { correctPlacement } from "./const.js";
import { defaultProps } from "./defaultProps";

const sharedProps = () => {
  return {};
};

// popper props

const sharedPopperProps = (component) => {
  return {
    placement: {
      type: String,
      default: defaultProps(component, "placement", "bottom-start"),
      validator: function (v) {
        return correctPlacement.includes(v);
      },
    },
    offsetX: {
      type: Number,
      default: defaultProps(component, "offsetX", 0),
    },
    offsetY: {
      type: Number,
      default: defaultProps(component, "offsetY", 0),
    },
    noFlip: {
      type: Boolean,
      default: defaultProps(component, "noFlip", false),
    },
  };
};

// style props

const sharedStyleProps = (component) => {
  return {
    base: {
      type: String,
      default: defaultProps(component, "base", component),
    },
    variant: {
      type: [String, Boolean],
      default: "",
    },
  };
};

// form props

const sharedFormProps = (d, options) => {
  d = d || {};
  options = options || {};

  let props = {};
  if (options.icon === true) {
    props.icon = {
      type: [String, Object],
      default: d.icon || "",
    };
  }
  if (options.clearable === true) {
    props.clearable = {
      type: Boolean,
      default: d.clearable || false,
    };
  }

  return {
    ...props,
    state: { type: String, default: d.state || null },
  };
};

export { sharedProps, sharedPopperProps, sharedStyleProps, sharedFormProps };
