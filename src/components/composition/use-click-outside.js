export default function useClickOutside() {
  function onClickOutside(elements, callback) {
    let clickOutside = function (ev) {
      if (!elements.length) return;
      for (let el of elements) {
        if (el.value === ev.target || ev.composedPath().includes(el.value)) {
          return;
        }
      }
      callback();
    };

    document.body.addEventListener("mousedown", clickOutside);
  }
  return {
    onClickOutside,
  };
}
