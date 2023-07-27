import { ref } from "vue"

let id = 1000

let notifications = ref([])

let options = {
  delay: 4000,
  dismissable: true,
}

let remove = (notifyId) => {
  let index = notifications.value.findIndex((i) => notifyId === i.id)
  notifications.value.splice(index, 1)
}

let restartTimer = function() {
  return setTimeout(() => remove(this.id), this.delay)
}

let pauseTimer = function() {
  clearTimeout(this.timer)
}

let push = (notify) => {
  let i = {
    header: notify?.header || "",
    text: typeof notify === "string" ? notify : notify.text,
    delay: notify?.delay || options.delay,
    dismissable: notify?.dismissable || options.dismissable,
    variant: notify?.variant || "info",
    slots: notify?.slots || "text",
    id: id,
    restartTimer,
    pauseTimer,
  }

  i.timer = i.restartTimer()

  notifications.value.push(i)

  id++
}

let useNotify = () => {
  return {
    restartTimer,
    pauseTimer,
    push
  }
}

export {
  notifications,
  restartTimer,
  pauseTimer,
  options as notifyOptions,
  useNotify
}
