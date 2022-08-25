import { shallowRef } from "vue";

let triggers = {};

let newTrigger = () => {
  return {
    slotProps: shallowRef(null),
  };
};

let isTriggerId = (id) => {
  let { slotProps, callback } = triggers[id]

  if (callback && slotProps.value) {
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
  triggers[id].slotProps.value = slotProps;
  isTriggerId(id);
};

export let removeListener = (id) => {
  triggers[id].slotProps.value = { reference: null, onTrigger: {} };
};
