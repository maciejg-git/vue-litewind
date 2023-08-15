import { setStyleVar } from "./global"

setStyleVar({
  "--sidepanel-transition-duration": "0.2s",
})

let sidepanel = {
  classes: `
    text-left
    shadow-lg
    shadow-black/40
    dark:text-text-300
    bg-secondary-100
    dark:bg-dark-700
  `
}

export default {
  sidepanel,
}
