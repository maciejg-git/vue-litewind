<template>
  <h3>Navbar</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example relative">
      <example-navbar></example-navbar>
    </div>
    <pre>
      <code class="language-html">
&lt;v-navbar class=&quot;py-2 px-4&quot;&gt;
  &lt;div class=&quot;flex items-center&quot;&gt;
    &lt;span class=&quot;font-bold text-lg&quot;&gt;Brand&lt;/span&gt;
    &lt;ul class=&quot;flex flex-row gap-x-7 ml-7&quot;&gt;
      &lt;li&gt;Home&lt;/li&gt;
      &lt;li&gt;About&lt;/li&gt;
      &lt;li&gt;
        &lt;v-dropdown :offset-y=&quot;10&quot;&gt;
          &lt;template #activator&gt;
            &lt;v-button name=&quot;button-link&quot;&gt;Dropdown&lt;/v-button&gt;
          &lt;/template&gt;
          &lt;v-card width=&quot;320px&quot; style-card=&quot;shadow&quot;&gt;
            &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;
              Menu item
            &lt;/v-dropdown-menu-item&gt;
            &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;
              Menu item 2
            &lt;/v-dropdown-menu-item&gt;
            &lt;v-dropdown-header&gt;Menu header&lt;/v-dropdown-header&gt;
            &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;
              Menu item 3
            &lt;/v-dropdown-menu-item&gt;
            &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;
              Menu item 4
            &lt;/v-dropdown-menu-item&gt;
            &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;
              Menu item 5
            &lt;/v-dropdown-menu-item&gt;
          &lt;/v-card&gt;
        &lt;/v-dropdown&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;v-input class=&quot;ml-auto mr-4&quot;&gt;&lt;/v-input&gt;
    &lt;v-button style-button=&quot;outline&quot;&gt;Search&lt;/v-button&gt;
  &lt;/div&gt;
&lt;/v-navbar&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleNavbar from "./examples/ExampleNavbar.vue"

export default {
  components: {
    ExampleNavbar,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "fixed",
        type: ["Boolean"],
        default: "false",
        description:
          "If true navbar position is set to fixed. If both <code>fixed</code> and <code>sticky</code> are false then navbar is positioned as relative",
      },
      {
        prop: "sticky",
        type: ["Boolean"],
        default: "false",
        description:
          "If true navbar position is set to sticky. If both <code>fixed</code> and <code>sticky</code> are false then navbar is positioned as relative",
      },
      {
        prop: "bottom",
        type: ["Boolean"],
        default: "false",
        description:
          "Places navbar on the bottom. <span class='font-semibold'>Note</span>: fixed must be also set to true",
      },
      {
        prop: "name",
        type: ["String"],
        default: "navbar",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-navbar",
        description: "Main navbar element",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for navbar content",
      },
    ]);

    return {
      reference,
      styles,
      slots,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
