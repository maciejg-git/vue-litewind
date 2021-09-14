import { unref, onUnmounted } from "vue"

export default function useClickOutside() {
  function onClickOutside(elements, callback) {
    let clickOutside = function (ev) {
      if (!elements.length) return;

      for (let el of elements) {
        el = unref(el)
        if (!el) return;
        if (el === ev.target || ev.composedPath().includes(el)) {
          return;
        }
      }
      callback();
    };

    document.body.addEventListener("mousedown", clickOutside);

    let stop = () => {
      removeEventListener("mousedown", clickOutside)
    }

    onUnmounted(stop)
  }
  return {
    onClickOutside,
  };
}
