import { shallowRef } from "vue";

let triggers = {};

let newTrigger = () => {
  return {
    slotProps: null,
  };
};

let isTriggerId = (id) => {
  let { slotProps, callback } = triggers[id]

  if (callback && slotProps) {
    callback(slotProps);
  }
};

export let addTrigger = (id, callback) => {
  if (!triggers[id]) {
    triggers[id] = newTrigger(id);
  }
  triggers[id].callback = callback;
  isTriggerId(id);
};

export let addListener = (id, slotProps) => {
  if (!triggers[id]) {
    triggers[id] = newTrigger(id);
  }
  triggers[id].slotProps = slotProps;
  isTriggerId(id);
};

export let removeListener = (id) => {
  triggers[id].slotProps = { reference: null, onTrigger: {} };
  triggers[id].callback(triggers[id].slotProps)
};
