<template>
  <div class="my-5">
    <v-input v-model="username" type="text" inline class="w-[420px]" />
  </div>
  <!-- CUT START -->
  <v-tabs base="material-tabs" class="mt-5">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <!-- <div> -->
        <!--   <label for="inline">inline:</label> -->
        <!--   <v-select-prop id="inline" v-model="example.inline"> -->
        <!--     <option :value="true">true</option> -->
        <!--     <option :value="false">false</option> -->
        <!--   </v-select-prop> -->
        <!-- </div> -->
        <!-- <div> -->
        <!--   <label for="visible-states">visible-states:</label> -->
        <!--   <v-select id="visible-states" v-model="example.visibleStates"> -->
        <!--     <option value="default,invalid,valid">default,invalid,valid</option> -->
        <!--     <option value="invalid,valid">invalid,valid</option> -->
        <!--     <option value="invalid">invalid</option> -->
        <!--     <option value="default">default</option> -->
        <!--   </v-select> -->
        <!-- </div> -->
      </div>
    </v-tab>
  </v-tabs>
<!-- CUT END -->
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let username = ref("")

    return {
      username,
    };
  },
};
</script>
