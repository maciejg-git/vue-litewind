import { computed } from "vue";

export default function useStyles(props, elements, state) {
  let classes = {};

  for (let el of Object.keys(elements)) {
    let p = "style" + el.charAt(0).toUpperCase() + el.slice(1);
    classes[el] = computed(() => {
      let c = props[p]
        .split(" ")
        .map((i) => props.name + (props.name != el ? "-" + el : "") + "-" + i);
      let fixed = elements[el] && elements[el].fixed;
      let propClass =
        elements[el] &&
        elements[el].prop &&
        elements[el].prop.value;
      return [fixed, ...c, propClass];
    });
  }

  return {
    classes,
  };
}
