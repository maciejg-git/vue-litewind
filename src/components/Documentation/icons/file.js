import { h } from 'vue'
export default {
  $_icon: {
    name: "File",
    vendor: "Mdi",
    type: "",
    tags: ["file"],
  },
  render() {
    return h(
      "svg",
      {"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"currentColor","data-name":"mdi-file","innerHTML":"<path d='M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z' />"},
    )
  }
}