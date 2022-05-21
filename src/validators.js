export let globalValidators = {
  minLength: (value, length) => {
    return value.length >= length;
  },
  maxLength: (value, length) => {
    return value.length <= length;
  },
  alpha: (value, active) => {
    return /^[a-zA-Z]+$/.test(value);
  },
  numeric: (value, active) => {
    return /^[0-9]+$/.test(value);
  },
  alphanumeric: (value, active) => {
    return /^[a-zA-Z0-9]+$/.test(value);
  },
  required: (value) => {
    return !!value;
  },
  email: (value) => {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value)
  }
};
