import { unref } from "vue";

export default function useClickOutside() {
  function onClickOutside(el, callback, ref) {
    let clickOutside = function (ev) {
      el = unref(el);

      ref = unref(ref);

      if (!el) return;

      if (el === ev.target || ev.composedPath().includes(el)) {
        return;
      }

      if (ev.target === ref || ev.composedPath().includes(ref)) {
        ev.stopPropagation();
      }

      callback();
    };

    let stop = () => {
      document.body.removeEventListener("click", clickOutside, true);
      return null;
    };

    document.body.addEventListener("click", clickOutside, true);

    return stop;
  }

  return {
    onClickOutside,
  };
}
