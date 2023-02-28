import { readFile } from "fs/promises"
import { writeFile } from "fs/promises"
import fg from "fast-glob"
import _ from "lodash"

let referencePath = "../components-reference/"
let descriptionPath = "../components-description/"

let references = fg.sync("**", { cwd: referencePath })
let descriptions = fg.sync("**", { cwd: descriptionPath })

while (references.length) {
  let comp = await readFile(referencePath + references.shift(), 'utf8')
  let desc = await readFile(descriptionPath + descriptions.shift(), 'utf8')

  let reference = JSON.parse(comp)
  let description = JSON.parse(desc)

  // props

  let props = Object.entries(reference.props).reduce((acc, i, index) => {
    i[1].prop = _.kebabCase(i[0])
    if (i[1].prop === "model-value") {
      i[1].prop = "v-model"
    }

    i[1].description = description.props[i[0]]

    if (i[1].default === "") {
      i[1].default = "empty string"
    }

    acc.push(i[1])
    return acc
  }, [])

  props = props.sort((a, b) => {
    if (a.prop > b.prop) return 1
    if (a.prop < b.prop) return -1
    return 0
  })

  let index = props.findIndex((i) => i.prop === 'v-model')
  if (index > 0) props.splice(0, 0, props.splice(index, 1)[0])

  // events

  let events = reference.emits.map((i) => {
    return {
      event: i,
      description: description.emits[i],
    }
  })

  // slots

  let slots = reference.slots.map((i) => {
    return {
      slot: i,
      description: description.slots[i],
    }
  })

  // functions

  let functions = Object.entries(description.functions).map(([k, v]) => {
    return {
      function: k,
      description: v,
    }
  })

  // components

  let components = Object.entries(description.components).map(([k, v]) => {
    return {
      component: k,
      description: v,
    }
  })

  let file = JSON.stringify({ props, events, slots, functions, components }, null, 2)

  await writeFile(`../components-documentation/${reference.name}.json`, file, "utf8")
}
