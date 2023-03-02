// this script genrates v-table compatibile array from components
// reference and descripton. Arrays are stored in json and imported
// in respective Documentation*.vue files.

import { readFile } from "fs/promises";
import { writeFile } from "fs/promises";
import fg from "fast-glob";
import _ from "lodash";
import chalk from "chalk";
import sharedDescriptions from "../shared-descriptions.json" assert { type: "json" };

let referencePath = "../components-reference/";
let descriptionPath = "../components-description/";

let references = fg.sync("**", { cwd: referencePath });
let descriptions = fg.sync("**", { cwd: descriptionPath });

let getDefault = (value) => {
  if (value === "undefined") {
    return value;
  }
  if (value === null) {
    return "null";
  }
  if (value === "") {
    return "empty string";
  }
  if (typeof value === "string") {
    return `"${value}"`;
  }
  return value;
};

let getSharedDescription = (type, value) => {
  if (type === "props") {
    return (
      sharedDescriptions.props.popper[value] ||
      sharedDescriptions.props.style[value] ||
      sharedDescriptions.props.form[value] ||
      ""
    );
  }
  if (type === "events") {
    return (
      sharedDescriptions.events[value] ||
      ""
    );
  }
};

let verifyDocs = ({ name, props, events, slots, functions, components }) => {
  props.forEach((i) => {
    if (i.description === "" || i.description === undefined) {
      console.warn(
        `${chalk.red(name)} [props]: Missing description for ${i.prop} (${i.description === undefined ? "not found" : "empty" })`
      );
    }
  });
  events.forEach((i) => {
    if (i.description === "" || i.description === undefined) {
      console.warn(
        `${chalk.red(name)} [events]: Missing description for ${i.event} (${i.description === undefined ? "not found" : "empty" })`
      );
    }
  });
  slots.forEach((i) => {
    if (i.description === "" || i.description === undefined) {
      console.warn(
        `${chalk.red(name)} [slots]: Missing description for ${i.slot} (${i.description === undefined ? "not found" : "empty" })`
      );
    }
  });
};

while (references.length) {
  let comp = await readFile(referencePath + references.shift(), "utf8");
  let desc = await readFile(descriptionPath + descriptions.shift(), "utf8");

  let reference = JSON.parse(comp);
  let description = JSON.parse(desc);

  // name

  let name = reference.name;

  // props

  let props = Object.entries(reference.props).map(([k, v]) => {
    v.prop = _.kebabCase(k);
    if (v.prop === "model-value") {
      v.prop = "v-model";
    }

    v.description = description.props[k] || getSharedDescription("props", k);

    v.default = getDefault(v.default);

    return v;
  });

  props = props.filter((i) => {
    return !i.description.startsWith("[hidden]")
  })

  props = props.sort((a, b) => {
    if (a.prop > b.prop) return 1;
    if (a.prop < b.prop) return -1;
    return 0;
  });

  let index = props.findIndex((i) => i.prop === "v-model");
  if (index > 0) props.splice(0, 0, props.splice(index, 1)[0]);

  // events

  let events = reference.emits.map((i) => {
    return {
      event: i,
      description: description.emits[i] || getSharedDescription("events", i),
    };
  });

  // slots

  let slots = reference.slots.map((i) => {
    return {
      slot: i,
      description: description.slots[i],
    };
  });

  slots = slots.filter((i) => {
    return !i.description.startsWith("[hidden]")
  })

  // functions

  let functions = Object.entries(description.functions).map(([k, v]) => {
    return {
      function: k,
      description: v,
    };
  });

  // components

  let components = Object.entries(description.components).map(([k, v]) => {
    return {
      component: k,
      description: v,
    };
  });

  verifyDocs({ name, props, events, slots, functions, components });

  let file = JSON.stringify(
    { name, props, events, slots, functions, components },
    null,
    2
  );

  await writeFile(
    `../components-documentation/${reference.name}.json`,
    file,
    "utf8"
  );
}
