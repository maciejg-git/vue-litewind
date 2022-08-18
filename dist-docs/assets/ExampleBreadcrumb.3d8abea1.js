const r=`<template>\r
  <v-breadcrumb :path="example.path" />\r
</template>\r
\r
<script>\r
import { reactive } from "vue";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      path: [\r
        {\r
          label: "Home",\r
          to: "/",\r
          icon: "b-house-fill",\r
        },\r
        {\r
          label: "Documentation",\r
          to: "/documentation",\r
        },\r
        {\r
          label: "Breadcrumb",\r
        },\r
      ],\r
    });\r
\r
    return {\r
      example,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{r as default};
