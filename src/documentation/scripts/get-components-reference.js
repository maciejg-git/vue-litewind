import * as components from "../../../dist/vue-component-tailwind.js"
import { readFile } from "fs/promises"
import { writeFile } from "fs/promises"

let pathComponents = "../../components/"
let pathComponentsReference = "../components-reference/"
let pathComponentsDescription = "../components-description/"

for (let component in components) {
  let props = components[component].props
  let emits = components[component].emits
  let filename = `${component}.json`
  let reference = {}
  let description = {
    props: {},
    emits: {},
    slots: {},
  }

  if (props) {
    for (let prop in props) {
      if (props[prop].type) {
        props[prop].type = [props[prop].type].flat()
        props[prop].type = props[prop].type.map((i) => i.name)
      }
      if (props[prop].default) {
        if (typeof props[prop].default === 'function') {
          props[prop].default = props[prop].default({})
        }
      }
      description.props[prop] = ""
    }
    reference.props = props

    reference.emits = emits || []

    description.emits = reference.emits.reduce((acc, i) => {
      acc[i] = ""
      return acc
    }, {})

    await writeFile(`${pathComponentsReference}${filename}`, JSON.stringify(reference, (k, v) => v === undefined ? "undefined" : v, 2))
    // await writeFile(`${pathComponentsDescription}${filename}`, JSON.stringify(description, null, 2))
  }
}
