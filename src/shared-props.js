import { correctPlacement } from "./const.js";
import { defaultProps } from "./defaultProps";

const sharedProps = () => {
  return {
    name: { type: String, default: "" },
  };
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
    flip: {
      type: Boolean,
      default: defaultProps(component, "flip", true),
    },
    autoPlacement: {
      type: Boolean,
      default: defaultProps(component, "autoPlacement", false),
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

const sharedValidationProps = (component, options) => {
  options = options || {};

  let props = {}

  if (options.validateOn) {
    props.validateOn = {
      type: String,
      default: options.validateOn || "blur",
    }
  }
  if (options.validateMode) {
    props.validateMode = {
      type: String,
      default: options.validateMode || "silent",
    }
  }

  return {
    ...props,
    rules: {
      type: Object,
      default: {},
    },
  };
};

// form props

const sharedFormProps = (component, d, options) => {
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
      default: defaultProps(component, "clearable", d.clearable),
    };
  }

  return {
    ...props,
    validationState: { type: String, default: d.state || null },
  };
};

export {
  sharedProps,
  sharedPopperProps,
  sharedStyleProps,
  sharedValidationProps,
  sharedFormProps,
};
