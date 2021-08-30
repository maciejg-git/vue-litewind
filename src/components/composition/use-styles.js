import { computed } from "vue";

export default function useStyles(props, elements) {
  let classes = {};
  let states = {};

  for (let el of Object.keys(elements)) {
    let p = "style" + el.charAt(0).toUpperCase() + el.slice(1);
    classes[el] = computed(() => {
      let c = props[p]
        .split(" ")
        .map((i) => props.name + (props.name != el ? "-" + el : "") + "-" + i);
      let fixed = elements[el] && elements[el].fixed;
      let prop = elements[el] && elements[el].prop && elements[el].prop.value;
      return [fixed, ...c, prop];
    });

    let state = elements[el] && elements[el].states;
    if (state && state.length) {
      states[el] = {};
      for (let s of state) {
        states[el][s] = computed(() => {
          return (
            props.name + (props.name != el ? "-" + el : "") + "-" + s + "-state"
          );
        });
      }
    }
  }

  return {
    classes,
    states,
  };
}
