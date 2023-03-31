export default function useFormValidation() {
  let inputs = []

  let addToForm = (input) => {
    inputs.push(input)

    input.removeFromForm = () => {
      let index = inputs.findIndex((i) => i === input)
      if (index != -1) inputs.splice(index, 1)
    }
  }

  let validate = function() {
    inputs.forEach((i) => {
      i.formValidate()
    })

    return inputs.every((i) => {
      return i.status.value.valid || i.status.value.optional
    })
  }

  let reset = function() {
    inputs.forEach((i) => {
      i.reset()
    })
  }

  return {
    inputs,
    addToForm,
    validate,
    reset,
  }
}
