let triggers = {};

// create new triger

let _newTrigger = () => {
  return {
    slotProps : null,
  };
};

// attempt to connect trigger to the listerner if both are present. Called every
// time trigger or listener is registered.

let _connectTrigger = (id) => {
  let {slotProps, callback} = triggers[id];

  if (callback && slotProps) {
    callback(slotProps);
  }
};

// register new trigger. This is called by the setup function of the v-trigger
// component. The callback argument is a function that is called by
// _connectTrigger when trigger and listerner have been registered. The callback
// function passes components data (reference element, events etc) back to the
// v-trigger component. This data is then set as a slot props of the v-trigger
// components default slot. The contents of this slot (for example button) can
// use provided slot data to trigger attached events and react to the state of
// the component.

let registerTrigger = (id, callback) => {
  if (!triggers[id]) {
    triggers[id] = _newTrigger(id);
  }
  triggers[id].callback = callback;
  _connectTrigger(id);
};

// register new listener. This function is called by the component for which
// action is triggered. The slotProps argument is an object that contains:
// reference element (for components that are positioned relative to the
// triggering elements), events to attach to the triggering element and the
// current state of the component.

let registerListener = (id, slotProps) => {
  if (!triggers[id]) {
    triggers[id] = _newTrigger(id);
  }
  triggers[id].slotProps = slotProps;
  _connectTrigger(id);
};

// destroy triggers and listerners. Called by onUnmounted callback.

let removeTrigger = (id) => { triggers[id].callback = null; };

let removeListener = (id) => {
  triggers[id].slotProps = {reference : null, onTrigger : {}};
  triggers[id].callback && triggers[id].callback(triggers[id].slotProps);
};

export {registerTrigger, registerListener, removeListener, removeTrigger};
