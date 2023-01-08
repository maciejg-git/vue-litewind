// main.js

import BCheckLg from "./check-lg";
import BExclamationTriangle from "./exclamation-circle";
import BExclamationCircle from "./exclamation-triange";
import BInfoCircle from "./info-circle";
import BThreeDots from "./three-dots";
import BQuestionCircle from "./question-circle";

[
  BCheckLg, 
  BExclamationTriangle
].forEach((icon) => {
  let { vendor, name, type } = icon.$_icon;
  app.component(`${vendor}${name}${type.join("")}`, icon);
})

app.provide("icon-types", {
  valid: "b-check-lg", // registered icon name
  invalid: "b-exclamation-triangle",
  success: BCheckLg, // icon component object
  info: BInfoCircle,
  danger: BExclamationCircle,
  warn: BExclamationCircle,
  menu: BThreeDots,
  question: BQuestionCircle,
});
