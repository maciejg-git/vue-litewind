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

    let stop = () => {
      document.body.removeEventListener("mousedown", clickOutside)
    }

    document.body.addEventListener("mousedown", clickOutside, true);

    return stop;
  }
  return {
    onClickOutside,
  };
}
