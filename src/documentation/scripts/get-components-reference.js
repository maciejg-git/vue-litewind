// this script uses build dist to get updated reference for props and emits.
// Slots are collected from vue source files.
// Results are saved as json file and used to generate updated documentation 

import * as components from "../../../dist/vue-litewind.js";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

let pathComponents = "../../components/";
let pathComponentsReference = "../components-reference/";
let pathComponentsDescription = "../components-description/";

for (let component in components) {
  let props = components[component].props;
  let emits = components[component].emits;
  let filename = `${component}.json`;
  let reference = {};
  let description = {
    name: "",
    props: {},
    emits: {},
    slots: {},
    functions: {},
    components: {},
  };
  const slotRegexp = /<!--\s*@slot\s+([a-zA-Z\[\]:-]+)\s*-->/g;

  let replacer = (k, v) => {
    if (v === undefined) {
      return "undefined";
    }
    return v;
  };

  // props

  if (component[0] === "v") {
  if (props) {
    for (let prop in props) {
      if (props[prop].type) {
        props[prop].type = [props[prop].type].flat();
        props[prop].type = props[prop].type.map((i) => i.name);
      }
      if (props[prop].default) {
        if (typeof props[prop].default === "function") {
          props[prop].default = props[prop].default({});
          props[prop].globalDefault = true
        }
      }
      description.props[prop] = "";
    }
  }

    // slots

    let vueFile = await readFile(`${pathComponents}${component}.vue`, "utf8");

    let slots = [...vueFile.matchAll(slotRegexp)].map((i) => i[1]);

    // reference and description files

    reference.name = component;
    reference.props = props || [];
    reference.emits = emits || [];
    reference.slots = slots || [];

    description.name = component;
    description.emits = reference.emits.reduce((acc, i) => {
      acc[i] = "";
      return acc;
    }, {});

    description.slots = reference.slots.reduce((acc, i) => {
      acc[i] = "";
      return acc;
    }, {});

    await writeFile(
      `${pathComponentsReference}${filename}`,
      JSON.stringify(reference, replacer, 2)
    );
    if (!existsSync(`${pathComponentsDescription}${filename}`)) {
      await writeFile(
        `${pathComponentsDescription}${filename}`,
        JSON.stringify(description, null, 2)
      );
    }
  }
}
