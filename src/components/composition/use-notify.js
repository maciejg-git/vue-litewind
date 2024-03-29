import { ref } from "vue"

let id = 1000

let notifications = ref([])

let isVisible = ref(true)

let options = {}

let setNotifyOptions = (props) => {
  options.autoDismissDelay = props.autoDismissDelay;
  options.dismissable = props.dismissable;
  options.props = props.notify
  options.static = props.static
}

let removeNotify = function() {
  let index = notifications.value.findIndex((i) => this.id === i.id)
  notifications.value.splice(index, 1)
}

let removeNotifyById = (notifyId) => {
  let index = notifications.value.findIndex((i) => notifyId === i.id)
  notifications.value.splice(index, 1)
}

let restartTimer = function() {
  if (this.static) return null
  this.timer = setTimeout(() => removeNotifyById(this.id), this.autoDismissDelay)
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
    text: typeof notify === "string" ? notify : (notify?.text || ""),
    icon: notify?.icon || null,
    autoDismissDelay: notify?.autoDismissDelay ?? options.autoDismissDelay,
    dismissable: notify?.dismissable ?? options.dismissable,
    static: notify?.static ?? options.static,
    variant: notify?.variant || "info",
    id: id,
    restartTimer,
    pauseTimer,
    props: { ...options.props, ...notify.props },
    options: notify?.options || {},
    remove: removeNotify,
  }

  i.restartTimer()
  i.removeById = () => removeNotifyById(i.id)

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
  removeNotifyById,
  options,
  setNotifyOptions,
  useNotify
}
