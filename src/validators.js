let messages = {
  required: "Please enter a value for this field",
  alpha: "Please enter only letters",
  numeric: "Please enter only numbers",
  alphanumeric: "Please enter only letters or numbers",
  minLength: "Please enter at least 3 characters",
  maxLength: "Please enter at least 3 characters",
  minValue: "",
  maxValue: "",
  email: "Please enter valid email address",
  atLeastOneUppercase: "Please enter at least one uppercase character",
  atLeastOneLowercase: "Please enter at least one lowercase character",
  atLeastOneDigit: "Please enter at least one numeric character",
  atLeastOneSpecial: "Please enter at least one special character",
};

export let globalValidators = {
  required: (value) => {
    if (Array.isArray(value)) return !!value.length || messages.required;
    return !!value || messages.required;
  },
  maxLength: (value, length) => {
    return value.length <= length || messages.maxLength;
  },
  alpha: (value, active) => {
    return /^[a-zA-Z]+$/.test(value) || messages.alpha;
  },
  numeric: (value, active) => {
    return /^[0-9]+$/.test(value) || messages.numeric;
  },
  alphanumeric: (value, active) => {
    return /^[a-zA-Z0-9]+$/.test(value) || messages.alphanumeric;
  },
  maxValue: (value, max) => {
    return value <= max || messages.maxValue;
  },
  minValue: (value, min) => {
    return value >= min || messages.minValue;
  },
  email: (value) => {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      value
    ) || messages.email;
  },
  minLength: (value, length) => {
    return value.length >= length || messages.minLength;
  },
  atLeastOneUppercase: (value) => {
    return /[A-Z]/.test(value) || messages.atLeastOneUppercase;
  },
  atLeastOneLowercase: (value) => {
    return /[a-z]/.test(value) || messages.atLeastOneLowercase;
  },
  atLeastOneSpecial: (value) => {
    return /[^a-zA-Z0-9]/.test(value) || messages.atLeastOneSpecial;
  },
  atLeastOneDigit: (value) => {
    return /[0-9]/.test(value) || messages.atLeastOneDigit;
  },
};
