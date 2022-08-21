export let identifiers = {}

export let addId = (id, el, callback) => {
  if (!identifiers[id]) {
    identifiers[id] = {}
  }
  if (el && !identifiers[id].el) {
    identifiers[id].el = el
  }
  if (callback && !identifiers[id].callback) {
    identifiers[id].callback = callback
  }

  if (identifiers[id].el && identifiers[id].callback) {
    identifiers[id].callback.addOnTriggerEvents(identifiers[id].el)
  }
}

export let removeId = (id) => {

}
