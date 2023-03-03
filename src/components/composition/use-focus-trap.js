import { nextTick, watch } from "vue";

const focusableElementsSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const useFocusTrap = (trapRef) => {
  let focusableElements = [];
  let firstFocusable;
  let lastFocusable;
  let focused;
  let trapEl

  watch(trapRef, (value) => {
    // if (trapEl) {
    //   focused.focus()
    //   return
    // }
    trapEl = value;
    value ? initFocusTrap() : clearFocusTrap();
  })

  function keyHandler(e) {
    const isTabPressed = e.key === "Tab";

    if (!isTabPressed) return;

    if (focusableElements.indexOf(document.activeElement) === -1) {
      firstFocusable.focus()
      return
    }

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
    focused = document.activeElement
  }

  function initFocusTrap() {
    if (!trapRef.value) return;

    focusableElements = trapRef.value.querySelectorAll(
      focusableElementsSelector
    );
    focusableElements = [...focusableElements]

    firstFocusable = focusableElements[0];
    lastFocusable = focusableElements[focusableElements.length - 1];

    document.addEventListener("keydown", keyHandler);

    nextTick(() => {
      firstFocusable.focus();
    })
  }

  function clearFocusTrap() {
    document.removeEventListener("keydown", keyHandler);
  }

  return {
    trapRef,
    initFocusTrap,
    clearFocusTrap,
  };
};

export default useFocusTrap;
