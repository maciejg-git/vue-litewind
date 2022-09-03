import { computed } from "vue";

const transitionDuration = {
  75: "duration-75",
  100: "duration-100",
  150: "duration-150",
  200: "duration-200",
  300: "duration-300",
  500: "duration-500",
  700: "duration-700",
  1000: "duration-1000",
};

export default function useTransition(props) {
  let transition = computed(() => {
    let t = props.transition.split("-");

    if (t[0] === '') {
      return {
        name: "",
        duration: "",
      }
    }

    let duration = transitionDuration[t[t.length - 1]]

    if (duration) {
      t.pop()
    } else {
      duration = transitionDuration['200']
    }

    return {
      name: t.join("-"),
      duration,
    }
  });

  return transition;
}
