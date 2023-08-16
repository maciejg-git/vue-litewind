import { setStyleVar } from "./global"

setStyleVar({
  "--backdrop-transition-duration" : "0.2s"
})

let backdrop = {
  intensity: {
    medium: `
      bg-black/50
    `,
    light: `
      bg-black/30
    `,
    large: `
      bg-black/70
    `
  },
  special: {
    optional: true,
    gradient: `
      bg-gradient-to-r 
      from-indigo-500/30
      via-purple-500/30
      to-pink-500/30
    `
  }
}

export default {
  backdrop
}
