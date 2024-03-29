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

    if (!acc[item[2]]) acc[item[2]] = []
    acc[item[2]].push(item[3]);

    return acc;
  }, {});
};

export default function useTailwindStyles(props, styles, elements) {
  let classes = {};
  let variants = {};
  let dataStyle = {};
  let groupClass = null;

  let state = ref("");

  if (styles.cssVariables) setStyleVar(styles.cssVariables)

  groupClass = styles?.[props.base]?._options?.containerGroupClass ?? "";

  for (let [element, options] of Object.entries(elements)) {

    variants[element] = {};

    classes[element] = computed(() => {
      let activeMods = {}

      if (!styles[props.base]) return "";

      let classes = "";

      let mods = parseElementModProp(props, element)

      let elementStyles = styles[props.base][element];

      // get active mods

      if (mods.preset) {
        activeMods.preset = mods.preset[0]
      }

      for (let type in elementStyles) {
        if (type[0] === "_" || type === "preset" || type === "classes") continue

        if (mods[type]) {
          mods[type].forEach((i) => {
            activeMods[type] = {...activeMods[type], [i]: true}
          })
          continue
        }

        if (elementStyles[type][state.value]) {
          activeMods[type] = {...activeMods[type], [elementStyles[type][state.value]]: true}
        }

        if (elementStyles[type].optional) {
          continue
        }

        for (let item in elementStyles[type]) {
          if (item === "classes") continue
          activeMods[type] = {...activeMods[type], [item]: true}
          break
        }
      }

      for (let type in elementStyles) {
        if (type[0] === "_") continue;

        if (options?.externalVariants?.includes(type)) {
          for (let variant in elementStyles[type]) {
            if (variant === "optional") continue
            variants[element][variant] = elementStyles[type][variant].replace(
              /\s\s+/g,
              " "
            );
          }
          continue;
        }
      }

      // return classes

      if (mods.preset) {
        return `
          ${getClasses(elementStyles.preset[mods.preset[0]])}
          ${options?.fixed || ""}
          ${options?.computed?.value || ""}
        `.replace(/\s\s+/g, " ");
      }

      if (elementStyles?.classes) {
        classes += getClasses(elementStyles.classes);
      }

      if (options?.dataStyle) {
        dataStyle[element] = elementStyles.data;
      }

      for (let type in elementStyles) {
        if (type[0] === "_") continue;
        let sharedClasses = null;
        let stateClasses = null;
        let modClasses = null;
        let defaultClasses = null;

        if (options?.externalVariants?.includes(type)) {
          continue;
        }

        if (type !== "preset" && type !== "data" && type !== "classes") {
          stateClasses = state.value ? elementStyles[type][state.value] : null;

          if (type !== "state") {
            sharedClasses = elementStyles[type]?.classes || "";

            if (mods[type]) {
              mods[type].forEach((i) => {
                modClasses += elementStyles[type][i]
              })
            }

            if (!elementStyles[type].optional) {
              for (let item in elementStyles[type]) {
                if (item === "classes") continue;
                defaultClasses = elementStyles[type][item];
                break;
              }
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
