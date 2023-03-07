import { reactive, watch } from "vue";

export default function useTrigger(trigger, show, hide) {
  let onTrigger = reactive({
    click: null,
    mouseenter: null,
    mouseleave: null,
    focusin: null,
    focusout: null,
  });

  watch(
    trigger,
    (value) => {
      if (value === "click") {
        onTrigger.click = show;
        onTrigger.mouseenter = null;
        onTrigger.mouseleave = null;
        onTrigger.focusin = null;
        onTrigger.focusout = null;
      } else if (value === "hover") {
        onTrigger.click = null;
        onTrigger.mouseenter = show;
        onTrigger.mouseleave = hide;
        onTrigger.focusin = null;
        onTrigger.focusout = null;
      } else if (value === "focus") {
        onTrigger.click = null;
        onTrigger.mouseenter = null;
        onTrigger.mouseleave = null;
        onTrigger.focusin = show;
        onTrigger.focusout = hide;
      }
    },
    { immediate: true }
  );

  return { onTrigger };
}
