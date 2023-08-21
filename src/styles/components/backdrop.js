import { setStyleVar } from "./global"

setStyleVar({
  "--backdrop-transition-duration" : "0.2s"
})

let backdrop = {
  variant: {
    medium: `
      bg-black/50
    `,
    light: `
      bg-black/30
    `,
    dark: `
      bg-black/70
    `,
    primary: `
      bg-primary-400/20
    `,
    gradient: `
      bg-gradient-to-r 
      from-indigo-500/30
      via-purple-500/30
      to-pink-500/30
    `,
    gradientDiagonal: `
      bg-gradient-to-tl
      from-primary-500/30
      via-transparent
      to-pink-500/30
    `
  },
  filter: {
    optional: true,
    blur: `
      backdrop-blur-sm
    `
  },
  transition: {
    optional: true,
    opacity: `
      transition-opacity
      duration-200
      delay-100
      ease-in
    `
  },
}

export default {
  backdrop
}
