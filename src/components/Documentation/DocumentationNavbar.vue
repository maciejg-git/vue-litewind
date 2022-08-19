<template>
  <h3>Navbar</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example relative">
      <example name="ExampleNavbar" :script="false"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { styleProps } from "./shared-props"

export default {
  setup() {
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
    };
  },
};
</script>

<style scoped>
</style>
