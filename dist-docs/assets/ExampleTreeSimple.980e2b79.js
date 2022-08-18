const n=`<template>\r
  <v-tree :items="items"></v-tree>\r
</template>\r
\r
<script>\r
import { ref } from "vue";\r
\r
export default {\r
  setup() {\r
    const items = ref([\r
      {\r
        name: "Directory",\r
        id: 17,\r
        children: [\r
          { name: "Some item", id: 1 },\r
          { name: "Another item", id: 2 },\r
          { name: "Third", id: 3 },\r
          { name: "File"},\r
          {\r
            name: "Sub directory",\r
            id: 5,\r
            children: [\r
              {\r
                name: "Another sub directory",\r
                id: 6,\r
                children: [\r
                  { name: "Content", id: 7 },\r
                  { name: "Another item", id: 8 },\r
                ],\r
              },\r
              { name: "Fourth", id: 9 },\r
              { name: "Another file", id: 10 },\r
              { name: "Video file", id: 11 },\r
              { name: "Secret item", id: 12 },\r
              {\r
                name: "More content here",\r
                id: 13,\r
                children: [\r
                  { name: "Another video file", id: 14},\r
                  { name: "Fifth", id: 15 },\r
                ],\r
              },\r
            ],\r
          },\r
          { name: "Sixth item", id: 16 },\r
        ],\r
      },\r
    ])\r
\r
    return {\r
      items,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{n as default};
