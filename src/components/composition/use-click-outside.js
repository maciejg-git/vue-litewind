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
      document.body.removeEventListener("click", clickOutside)
    }

    document.body.addEventListener("click", clickOutside);

    return stop;
  }
  return {
    onClickOutside,
  };
}
