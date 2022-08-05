<template>
  <h3>Navbar</h3>
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
    <table-reference-basic :items="slots" reference="slot"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example relative">
      <example-navbar></example-navbar>
    </div>
    <v-code :code="exampleNavbarCode" template language="html"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import exampleNavbarCode from "./examples/ExampleNavbar.vue?raw"
import { styleProps } from "./shared-props"

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "fixed",
        type: ["Boolean"],
        default: "false",
        description:
          "If true navbar position is set to fixed. If both <code class='code-text'>fixed</code> and <code class='code-text'>sticky</code> are false then navbar is positioned as relative",
      },
      {
        prop: "sticky",
        type: ["Boolean"],
        default: "false",
        description:
          "If true navbar position is set to sticky. If both <code class='code-text'>fixed</code> and <code class='code-text'>sticky</code> are false then navbar is positioned as relative",
      },
      {
        prop: "bottom",
        type: ["Boolean"],
        default: "false",
        description:
          "Places navbar on the bottom. <span class='font-semibold'>Note</span>: fixed must be also set to true",
      },
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-navbar",
        description: "Main navbar element",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description: "Slot for navbar content",
      },
    ]);

    return {
      reference,
      styles,
      slots,
      exampleNavbarCode,
    };
  },
};
</script>

<style scoped>
</style>
