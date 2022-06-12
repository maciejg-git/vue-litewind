import { unref } from "vue";

export default function useClickOutside() {
  function onClickOutside(el, callback, ignore) {
    let clickOutside = function (ev) {
      el = unref(el);
      ignore = unref(ignore);
      if (!el) return;
      if (
        el === ev.target ||
        ev.composedPath().includes(el) ||
        (ignore && (ignore === ev.target || ev.composedPath().includes(ignore)))
      ) {
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
