import { ref } from "vue"

let id = 1000

let notifications = ref([])

let isVisible = ref(true)

let options = {
  delay: 4000,
  dismissable: true,
}

let setNotifyOptions = (props) => {
  options.delay = props.delay;
  options.dismissable = props.dismissable;
  options.props = props.notify
}

let removeNotify = (notifyId) => {
  let index = notifications.value.findIndex((i) => notifyId === i.id)
  notifications.value.splice(index, 1)
}

let restartTimer = function() {
  if (!this.delay) return null
  this.timer = setTimeout(() => removeNotify(this.id), this.delay)
}

let pauseTimer = function() {
  if (this.timer) {
    clearTimeout(this.timer)
  }
}

let hide = () => {
  isVisible.value = false
}

let show = () => {
  isVisible.value = true
}

let push = (notify) => {
  let i = {
    header: notify?.header || "",
    text: typeof notify === "string" ? notify : notify.text,
    icon: notify?.icon,
    delay: notify?.delay ?? options.delay,
    dismissable: notify?.dismissable ?? options.dismissable,
    variant: notify?.variant || "info",
    slots: notify?.slots || "text",
    id: id,
    restartTimer,
    pauseTimer,
    props: { ...options.props, ...notify.props },
  }

  i.restartTimer()

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
  removeNotify,
  options,
  setNotifyOptions,
  useNotify
}
