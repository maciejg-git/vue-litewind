export let identifiers = {}

export let addId = (id, triggerElement, listenerCallback) => {
  if (!identifiers[id]) {
    identifiers[id] = {
      el: null,
      callback: null,
    }
  }

  let { el, callback } = identifiers[id]

  if (triggerElement && !el) {
    identifiers[id].el = triggerElement
  }
  if (listenerCallback && !callback) {
    identifiers[id].callback = listenerCallback
  }

  if (identifiers[id].el && identifiers[id].callback) {
    identifiers[id].callback.addOnTriggerEvents(identifiers[id].el)
  }
}

export let removeId = (id, isRemoved) => {
  if (!identifiers[id]) return

  if (identifiers[id].callback) {
    identifiers[id].callback.removeOnTriggerEvents(identifiers[id].el)
  }

  if (isRemoved === "trigger") {
    identifiers[id].el = null
  }
  if (isRemoved === "listener") {
    identifiers[id].callback = null
  }
}
