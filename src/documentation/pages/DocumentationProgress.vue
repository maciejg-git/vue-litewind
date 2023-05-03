<template>
  <h3>Progress</h3>
  <links-github-header component="vProgress" />

  <section>
    <h4 id="ProgressReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="ProgressSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <section>
    <h4 id="ExampleProgress">Example</h4>
    <div class="example">
      <example name="ExampleProgress"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleProgressIndeterminate">Example - indeterminate</h4>
    <p>Width, speed, timing function and direction of indeterminate progress bar can be customized with css variables:
    <ul>
      <li>
        <code class="code-text">
          --progress-bar-timing
        </code>
      </li>
      <li>
        <code class="code-text">
          --progress-bar-speed
        </code>
      </li>
      <li>
        <code class="code-text">
          --progress-bar-width
        </code>
      </li>
      <li>
        <code class="code-text">
          --progress-bar-direction
        </code>
      </li>
    </ul>
    </p>
    <div class="example">
      <example name="ExampleProgressIndeterminate"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vProgress.json"

export default {
  setup() {
    let reference = reactive(componentDocumentation)
    
    return {
      reference,
    };
  },
};
</script>

<style scoped>
</style>
