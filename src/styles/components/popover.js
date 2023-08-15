import { setStyleVar } from "./global"

setStyleVar({
  "--popover-transition-duration": "0.2s",
  "--popover-transition-slide": "-15px",
  "--popover-transition-scale": "0.2",
})

let popover = {
  header: {
    classes: `
      font-semibold
      py-2
      px-3
    `
  }
}

export default {
  popover,
}
