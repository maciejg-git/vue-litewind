<template>
  <h3>Alert</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <v-alert
        v-model="example.isVisible"
        :dismissable="example.dismissable"
        :auto-dismiss-delay="example.autoDismissDelay"
        :state="example.state"
        class="my-2"
      >
      <template #icon>
        <v-icon :icon-type="example.state" class="mr-2"></v-icon>
      </template>
        Alert
      </v-alert>
      <v-alert
        v-model="example.isVisibleAbsolute"
        :dismissable="example.dismissable"
        :auto-dismiss-delay="example.autoDismissDelay"
        :state="example.state"
        class="fixed top-20 left-1/2 w-3/4 transform -translate-x-1/2 shadow"
      >
        Alert
      </v-alert>
      <div class="flex justify-between items-center">
        <div class="mt-5">
          <label for="style">Alert state:</label>
          <v-select id="style" v-model="example.state">
            <option value="info">info</option>
            <option value="danger">danger</option>
            <option value="warn">warn</option>
            <option value="success">success</option>
            <option value="light">light</option>
            <option value="valid">valid</option>
            <option value="invalid">invalid</option>
          </v-select>
        </div>
        <div class="flex gap-4">
          <v-button
            :disabled="example.isVisible"
            @click="example.isVisible = true"
          >
            Show alert
          </v-button>
          <v-button
            :disabled="example.isVisibleAbsolute"
            @click="example.isVisibleAbsolute = true"
          >
            Show absolute alert
          </v-button>
        </div>
      </div>
      <v-tabs name="tabs-material" class="mt-5">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="model" class="font-semibold">v-model:</label>
            <v-input
              type="text"
              id="model"
              v-model="example.isVisible"
            ></v-input>
          </div>
          <div class="mb-2">
            <label for="dismissable">dismissable:</label>
            <v-select id="dismissable" v-model="example.dismissable">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="auto-dismiss-delay">auto-dismiss-delay:</label>
            <v-input
              type="text"
              id="auto-dismiss-delay"
              v-model="example.autoDismissDelay"
            ></v-input>
          </div>
        </v-tab>
      </v-tabs>
    </div>
    <pre>
      <code class="language-html">
&lt;v-alert
  v-model=&quot;example.isVisible&quot;
  :dismissable=&quot;example.dismissable&quot;
  :auto-dismiss-delay=&quot;example.autoDismissDelay&quot;
  :style-alert=&quot;example.style&quot;
  class=&quot;my-2&quot;
&gt;
  Alert
&lt;/v-alert&gt;

&lt;v-button :disabled=&quot;example.isVisible&quot; @click=&quot;example.isVisible = true&quot;&gt;
  Show alert
&lt;/v-button&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import hljs from "highlight.js";

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Boolean"],
        default: "false",
        description: "Visiblity state of alert",
      },
      {
        prop: "dismiss-delay",
        type: ["Number"],
        default: "0",
        description:
          "Delay after which alert is closed (<code class='code-word'>v-model</code> is set to <code>false</code>)",
      },
      {
        prop: "name",
        type: ["Array"],
        default: "undefined",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-alert",
        description: "Main alert element",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for alert content",
      },
    ]);

    let example = reactive({
      isVisible: true,
      isVisibleAbsolute: false,
      dismissable: true,
      autoDismissDelay: 0,
      style: "",
      state: "info",
    });

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      styles,
      slots,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
