let triggers = {};

let newTrigger = () => {
  return {
    slotProps: null,
  };
};

let connectTrigger = (id) => {
  let { slotProps, callback } = triggers[id];

  if (callback && slotProps) {
    callback(slotProps);
  }
};

let registerTrigger = (id, callback) => {
  if (!triggers[id]) {
    triggers[id] = newTrigger(id);
  }
  triggers[id].callback = callback;
  connectTrigger(id);
};

let registerListener = (id, slotProps) => {
  if (!triggers[id]) {
    triggers[id] = newTrigger(id);
  }
  triggers[id].slotProps = slotProps;
  connectTrigger(id);
};

let removeTrigger = (id) => {
  triggers[id].callback = null;
};

let removeListener = (id) => {
  triggers[id].slotProps = { reference: null, onTrigger: {} };
  triggers[id].callback && triggers[id].callback(triggers[id].slotProps);
};

export { registerTrigger, registerListener, removeListener, removeTrigger };
