<template>
    <v-autocomplete
      v-model="user"
      v-model:input-value="example.inputValue"
      :items="example.items"
      :is-loading="example.isLoading"
      style-menu="shadow"
      no-filter
      :no-loader="example.noLoader"
      :clearable="example.clearable"
      :transition="example.transition"
      :state="example.state"
      @input:value="query($event)"
      v-on="handleExampleEvents"
      class="w-[420px]"
    ></v-autocomplete>
  <!-- CUT START -->
  <v-tabs name="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="model" class="font-semibold">v-model:</label>
        <v-input type="text" id="model" v-model="user.model"></v-input>
      </div>
      <!-- no loader -->
      <!-- transition -->
      <!-- clearable -->
      <!-- placement -->
      <!-- no flip -->
      <div class="mb-2">
        <label for="noloader">no-loader:</label>
        <v-select id="noloader" v-model="example.noLoader">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="clearable">clearable:</label>
        <v-select id="clearable" v-model="example.clearable">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="transition">transition:</label>
        <v-select id="transition" v-model="example.transition">
          <option value="fade">fade</option>
          <option value="">empty string</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="state">state:</label>
        <v-select id="state" v-model="example.state">
          <option value="">normal (empty string)</option>
          <option value="valid">valid</option>
          <option value="invalid">invalid</option>
        </v-select>
      </div>
    </v-tab>
    <v-tab>
      <template #name>
        Events
        <v-badge style-badge="secondary tiny" class="ml-2">
          {{ events.length }}
        </v-badge>
      </template>
      <div class="overflow-y-auto max-h-48 mt-5 w-full">
        <div class="px-2 pb-2">
          <template v-for="ev in events">
            <div class="py-1">
              <code class="code-word">{{ ev.ev }}</code>
              {{ ev.data }}
            </div>
          </template>
        </div>
      </div>
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script>
import { ref, reactive, watch, toRef, computed } from "vue";
import { states } from "../../../const";

import useValidateRef from "../../composition/use-validate-ref"
// import vForm from "../../vForm.vue"

export default {
  components: {
    // vForm,
  },
  setup() {
    let example = reactive({
      model: "",
      items: [],
      isLoading: false,
      noLoader: false,
      clearable: false,
      transition: "fade",
      state: "",
    });

    let user = useValidateRef("", {
      minLength: 6,
    })

    // setTimeout(() => {
    //   console.log(user.value.model)
    // }, 5000)
    // validateRef
    // :validate
    // v-model:validate

    let query = (q) => {
      if (q === "") return;
      example.isLoading = true;
      setTimeout(() => {
        example.items = states.filter((e) => {
          return (
            (e.text || "").toLowerCase().indexOf((q || "").toLowerCase()) > -1
          );
        });
        example.isLoading = false;
      }, 500);
    };

    let events = ref([]);

    let handleExampleEvents = {
      ["update:page"]: (event) =>
        events.value.unshift({ ev: "update:page", data: event }),
      ["state:focus"]: (event) =>
        events.value.unshift({ ev: "state:focus", data: event }),
      ["state:opened"]: (event) =>
        events.value.unshift({ ev: "state:opened", data: event }),
      ["state:closed"]: (event) =>
        events.value.unshift({ ev: "state:closed", data: event }),
      ["input:value"]: (event) =>
        events.value.unshift({ ev: "input:value", data: event }),
    };

    return {
      example,
      query,
      events,
      handleExampleEvents,
      user,
    };
  },
};
</script>
