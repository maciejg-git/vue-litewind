<template>
  <v-table :items="example.data" class="w-full"></v-table>
</template>

<script>
import { reactive } from "vue";
/* CUT START */
import dataJSON from "../../../data.json";
/* CUT END */

export default {
  setup() {
    let example = reactive({
      data: dataJSON.slice(0, 5),
    });

    return {
      example,
    };
  },
};
</script>
