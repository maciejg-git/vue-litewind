let triggers = {};

let newTrigger = () => {
  return {
    slotProps: null,
  };
};

let connectTrigger = (id) => {
  let { slotProps, callback } = triggers[id]

  if (callback && slotProps) {
    callback(slotProps);
  }
};

export let registerTrigger = (id, callback) => {
  if (!triggers[id]) {
    triggers[id] = newTrigger(id);
  }
  triggers[id].callback = callback;
  connectTrigger(id);
};

export let registerListener = (id, slotProps) => {
  if (!triggers[id]) {
    triggers[id] = newTrigger(id);
  }
  triggers[id].slotProps = slotProps;
  connectTrigger(id);
};

export let removeListener = (id) => {
  triggers[id].slotProps = { reference: null, onTrigger: {} };
  triggers[id].callback(triggers[id].slotProps)
};
