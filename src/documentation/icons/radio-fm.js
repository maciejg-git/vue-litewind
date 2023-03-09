import { h } from 'vue'
export default {
  $_icon: {
    name: "RadioFm",
    vendor: "Mdi",
    license: "Apache 2.0",
    type: [],
    tags: ["radio","fm"],
  },
  render() {
    return h(
      "svg",
      {"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 24 24","fill":"currentColor"},
      [ 
        h(
          "path",
          {"d":"M3,7V17H5V13H8V11H5V9H9V7H3M13,7A2,2 0 0,0 11,9V17H13V9H15V16H17V9H19V17H21V9A2,2 0 0,0 19,7H13Z"}
        ) 
      ]
    )
  }
}