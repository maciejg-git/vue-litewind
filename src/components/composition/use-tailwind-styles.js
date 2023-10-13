import { ref, computed } from "vue";

let isFunction = (v) => typeof v === "function";

let setStyleVar = (variables) => {
  let root = document.querySelector(":root")

  Object.entries(variables).forEach((i) => {
    root.style.setProperty(i[0], i[1])
  })
}

let getClasses = (classes) => {
  return isFunction(classes) ? classes() : classes;
};

let parseElementModProp = (props, el) => {
  let element = "mod" + el.charAt(0).toUpperCase() + el.slice(1);

  if (!props[element]) return {};

  return props[element].split(" ").reduce((acc, i) => {
    // let item = i.match(/^(?:([^?]+)\?)?([^:]+):([^\.]+)(?:\.([^:]+))?$/)
    let item = i.match(/^(?:([^?]+)\?)?([^:]+):([^:]+)$/);

    if (item[1] && item[1] !== props.variant) {
      return acc;
    }

    acc[item[2]] = item;

    return acc;
  }, {});
};

export default function useTailwindStyles(props, styles, elements) {
  let classes = {};
  let variants = {};
  let dataStyle = {};
  let groupClass = null;

  let state = ref("");

  if (styles.cssVariables) {
    setStyleVar(styles.cssVariables)
  }

  groupClass = styles?.[props.base]?._options?.containerGroupClass ?? "";

  for (let [el, options] of Object.entries(elements)) {

    variants[el] = {};

    classes[el] = computed(() => {
      let activeMods = {}

      let base = props.base

      if (!styles[base]) return "";

      let classes = "";

      let mods = parseElementModProp(props, el)

      let elementStyles = styles[base][el];

      if (mods.preset) {
        activeMods.preset = mods.preset[3]
      }

      // get active mods

      for (let type in elementStyles) {
        if (type[0] === "_" || type === "preset" || type === "classes") continue

        if (mods[type]) {
          activeMods[type] = {...activeMods[type], [mods[type][3]]: mods[type][3]}
          continue
        }

        if (elementStyles[type][state.value]) {
          activeMods[type] = {...activeMods[type], [elementStyles[type][state.value]]: elementStyles[type][state.value]}
        }

        if (elementStyles[type].optional) {
          continue
        }

        for (let item in elementStyles[type]) {
          if (item === "classes") continue
          activeMods[type] = {...activeMods[type], [item]: item}
          break
        }
      }

      // return classes

      if (mods.preset) {
        return `
          ${getClasses(elementStyles.preset[mods.preset[3]])}
          ${options?.fixed || ""}
          ${options?.computed?.value || ""}
        `.replace(/\s\s+/g, " ");
      }

      if (elementStyles?.classes) {
        classes += getClasses(elementStyles.classes);
      }

      if (options?.dataStyle) {
        dataStyle[el] = elementStyles.data;
      }

      for (let type in elementStyles) {
        if (type[0] === "_") continue;
        let sharedClasses = null;
        let stateClasses = null;
        let modClasses = null;
        let defaultClasses = null;

        if (options?.externalVariants?.includes(type)) {
          for (let variant in elementStyles[type]) {
            if (variant === "optional") continue
            variants[el][variant] = elementStyles[type][variant].replace(
              /\s\s+/g,
              " "
            );
          }
          continue;
        }

        if (type !== "preset" && type !== "data" && type !== "classes") {
          stateClasses = state.value ? elementStyles[type][state.value] : null;
        }

        if (
          type !== "state" &&
          type !== "preset" &&
          type !== "data" &&
          type !== "classes"
        ) {
          sharedClasses = elementStyles[type]?.classes || "";

          modClasses = mods[type] ? elementStyles[type][mods[type][3]] : "";

          if (!elementStyles[type].optional) {
            for (let item in elementStyles[type]) {
              if (item === "classes" || item === "optional") continue;
              defaultClasses = elementStyles[type][item];
              break;
            }
          }
        }

        classes += ` ${getClasses(sharedClasses)} ${
          (getClasses(stateClasses) ?? getClasses(modClasses)) ||
          getClasses(defaultClasses)
        }`;
      }

      return `
        ${classes}
        ${(options?.fixed || "")}
        ${(options?.computed?.value || "")}
      `.replace(/\s\s+/g, " ")
    });
  }

  let setState = (newState) => {
    state.value = newState;
  };

  return { classes, setState, variants, dataStyle, groupClass };
}
