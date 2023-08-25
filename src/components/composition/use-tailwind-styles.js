import { ref, computed } from "vue"

let isFunction = (v) => typeof v === "function";

let getClasses = (classes) => {
  return isFunction(classes) ? classes() : classes
}

let parseElementModProp = (props, el) => {
    let element = "mod" + el.charAt(0).toUpperCase() + el.slice(1)

    if (!props[element]) return {}

    return props[element].split(" ").reduce((acc, i) => {
      // let item = i.match(/^(?:([^?]+)\?)?([^:]+):([^\.]+)(?:\.([^:]+))?$/)
      let item = i.match(/^(?:([^?]+)\?)?([^:]+):([^:]+)$/)

      if (item[1] && item[1] !== props.variant) {
        return acc
      }

      acc[item[2]] = item

      return acc
    }, {})
}

export default function useTailwindStyles(props, styles, elements) {
  let classes = {}
  let variants = {}
  let dataStyle = {}
  let groupClass = null
  
  let state = ref("")

  groupClass = styles?.[props.base]?._options?.containerGroupClass ?? ""

  let isSingleElement = Object.keys(elements).length === 1

  let activeMods = {}

  // for (let [el, options] of Object.entries(elements)) {
  //     activeMods[el] = {}
  //
  //     let base = props.base
  //
  //     if (!styles[base]) continue
  //
  //     let mods = parseElementModProp(props, el)
  //
  //     let elementStyles = !isSingleElement ? styles[base][el] : styles[base]
  //
  //     if (mods.preset) {
  //       activeMods[el].preset = mods.preset.value
  //       continue
  //     }
  //
  //     for (let type in elementStyles) {
  //       if (type[0] === "_" || type === "preset" || type === "classes") continue
  //
  //       if (mods[type]) {
  //         activeMods[el][type] = {...activeMods[el][type], [mods[type].value]: mods[type].value}
  //         continue
  //       }
  //
  //       if (elementStyles[type][state.value]) {
  //         activeMods[el][type] = {...activeMods[el][type], [elementStyles[type][state.value]]: elementStyles[type][state.value]}
  //       }
  //
  //       if (elementStyles[type].optional) {
  //         continue
  //       }
  //
  //       for (let item in elementStyles[type]) {
  //         if (item === "classes") continue
  //         activeMods[el][type] = {...activeMods[el][type], [item]: item}
  //         break
  //       }
  //     }
  // }
  // console.log(activeMods)

  for (let [el, options] of Object.entries(elements)) {
    variants[el] = {}
    classes[el] = computed(() => {
      let base = props.base

      if (!styles[base]) return ""

      let mods = parseElementModProp(props, el)

      let elementStyles = !isSingleElement ? styles[base][el] : styles[base]

      let classes = ""

      if (mods.preset) {
        return getClasses(elementStyles.preset[mods.preset[3]]).replace(/\s\s+/g, " ") + " " + (options?.fixed || "") + " " + (options?.computed?.value || "")
      }

      if (elementStyles?.classes) {
        classes += getClasses(elementStyles.classes)
      }

      if (options?.dataStyle) {
        dataStyle[el] = elementStyles.data
      }

      for (let type in elementStyles) {
        if (type[0] === "_") continue
        let sharedClasses = null
        let stateClasses = null
        let modClasses = null
        let defaultClasses = null

        if (options?.externalVariants?.includes(type)) {
          for (let variant in elementStyles[type]) {
            variants[el][variant] = elementStyles[type][variant].replace(/\s\s+/g, " ")
          }
          continue
        }

        if (type !== "state" && type !== "preset" && type !== "data") {
          sharedClasses = elementStyles[type]?.classes || ""
        }

        if (type !== "preset" && type !== "data") {
          stateClasses = state.value ? elementStyles[type][state.value] : null
        }

        if (type !== "state" && type !== "preset" && type !== "data") {
          modClasses = mods[type] && (mods[type][4] ? elementStyles[type][mods[type][3]][mods[type][4]] : elementStyles[type][mods[type][3]])

          for (let item in elementStyles[type]) {
            if (item === "classes" || item === "preset" || item === "data" || item === "state") continue
            defaultClasses = elementStyles[type][item]
            break
          }
        }

        classes += ` ${getClasses(sharedClasses)} ${(getClasses(stateClasses) ?? getClasses(modClasses)) || getClasses(defaultClasses)}`
      }

      return classes.replace(/\s\s+/g, " ") + " " + (options?.fixed || "") + " " + (options?.computed?.value || "")
    })
  }

  let setState = (newState) => {
    state.value = newState
  }

  return { classes, setState, variants, dataStyle, groupClass }

}
