import { ref, computed } from "vue";
import { globalValidators } from "../../validators";
import { isString } from "../../tools";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: false,
  validated: false,
};

let getValidateStatus = (value) => {
  let newStatus = {
    valid: true,
    isRequired: status.value.isRequired,
    // touched: status.value.touched || !!touched,
    // validated: status.value.validated || !!validated,
    dirty: status.value.dirty || !!(value && !!value.length),
  };

  let messages = {};

  let res = null;

  for (let [key, value] of Object.entries(props.rules)) {
    if (globalValidators[key]) {
      res = globalValidators[key](value, value);
      newStatus[key] = res === true;
      if (res !== true) messages[key] = res;
    } else if (typeof validators[key] === "function") {
      res = validators[key](value);
      newStatus[key] = res === true;
      if (res !== true) messages[key] = res;
    }
    newStatus.valid = newStatus.valid && newStatus[key];
  }

  // newStatus.wasValid = status.value.wasValid || newStatus.valid;

  // newStatus.wasInvalid =
  //   status.value.wasInvalid ||
  //   (!newStatus.valid && (status.value.wasValid || touched || validated));

  return { newStatus, messages };
};

export default function useValidate() {
  return { getValidateStatus };
}
