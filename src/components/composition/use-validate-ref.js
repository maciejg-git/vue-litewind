import { ref } from "vue";

export default function useValidateRef(model, validate) {
    let user = ref({
      _isValidateRef: true,
      model,
      validate: validate || {},
      status: {},
      trigger() {

      }
    })

  return user
}
