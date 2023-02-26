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

  let props = Object.entries(reference.props).reduce((acc, i, index) => {
    i[1].prop = _.kebabCase(i[0])
    if (i[1].prop === "model-value") {
      i[1].prop = "v-model"
    }
    i[1].description = description.props[i[0]]
    if (i[1].default === "") {
      i[1].default = "empty string"
    }
    acc[index] = i[1]
    return acc
  }, [])

  let emits = reference.emits.map((i) => {
    return {
      event: i,
      description: description.emits[i],
    }
  })

  console.log(comp)
  console.log(props)
}
