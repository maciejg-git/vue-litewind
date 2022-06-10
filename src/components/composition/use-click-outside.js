import { unref, onUnmounted } from "vue";

export default function useClickOutside() {
  function onClickOutside(el, callback) {
    console.log("outside callback");
    let clickOutside = function (ev) {
      el = unref(el);
      if (!el) return;
      if (el === ev.target || ev.composedPath().includes(el)) {
        return;
      }
      callback();
    };

    let stop = () => {
      document.body.removeEventListener("click", clickOutside);
      return null;
    };

    document.body.addEventListener("click", clickOutside);

    return stop;
  }
  return {
    onClickOutside,
  };
}
