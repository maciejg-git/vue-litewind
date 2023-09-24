#### Icons source {#IconSource}

`v-icon` uses icon components (registered names or component objects).

#### Example {#ExampleIcon}

<div class="example">
  <example name="ExampleIcon" auto-show-code></example>
</div>

#### Icon types {#IconTypes}

Provide `icon-types` via provide function in application entry file or anywhere in top level component. `icon-type` is the `object` that maps icon names (registerd icon component) or icon component objects to any name. It can be useful for example to define easy to remember aliases for frequently used icons, changing icons application wide, define icons for various states of components etc.

```javascript
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
```
