import { h } from 'vue'
export default {
  $_icon: {
    name: "Loading",
    vendor: "Mdi",
    license: "Apache 2.0",
    type: [],
    tags: ["loading"],
  },
  render() {
    return h(
      "svg",
      {"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 24 24","fill":"currentColor"},
      [ 
        h(
          "path",
          {"d":"M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"}
        ) 
      ]
    )
  }
}