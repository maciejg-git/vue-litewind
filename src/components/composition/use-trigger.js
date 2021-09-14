import { reactive, watchEffect } from "vue"

export default function useTrigger(trigger) {
  let t = reactive({
    on: null,
    off: null,
    toggle: null,
  });

  watchEffect(() => {
    if (trigger.value == "click") {
      t.on = null;
      t.off = null;
      t.toggle = "click";
    } else if (trigger.value == "hover") {
      t.on = "mouseenter";
      t.off = "mouseleave";
      t.toggle = null;
    } else if (trigger.value == "focus") {
      t.on = "focusin";
      t.off = "focusout";
      t.toggle = null;
    }
  });

  return t;
}
