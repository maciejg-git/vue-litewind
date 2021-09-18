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
      <v-card style="height: 600px">
        <v-navbar class="py-2 px-4">
          <div class="flex items-center">
            <span class="font-bold text-lg">Brand</span>
            <ul class="flex flex-row gap-x-7 ml-7">
              <li>Home</li>
              <li>About</li>
              <li>
                <v-dropdown trigger="hover" :offset-y="10" name="dropdown-flat">
                  <template #activator>
                    <v-button name="button-link">Dropdown</v-button>
                  </template>
                  <v-card width="420px" name="card-flat">
                    <v-dropdown-menu-item tag="button">
                      <header class="font-semibold">Get started</header>
                      <span class="text-sm">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book
                      </span>
                    </v-dropdown-menu-item>
                    <v-dropdown-menu-item tag="button">
                      <header class="font-semibold">Documenation</header>
                      <span class="text-sm">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout
                      </span>
                    </v-dropdown-menu-item>
                    <v-dropdown-menu-item tag="button">
                      <header class="font-semibold">Team</header>
                      <span class="text-sm">
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin
                        literature from 45 BC, making it over 2000 years old
                      </span>
                    </v-dropdown-menu-item>
                    <v-dropdown-menu-item tag="button">
                      <header class="font-semibold">About</header>
                      <span class="text-sm">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout
                      </span>
                    </v-dropdown-menu-item>
                  </v-card>
                </v-dropdown>
              </li>
            </ul>
            <v-input class="ml-auto mr-4"></v-input>
            <v-button>Search</v-button>
          </div>
        </v-navbar>
      </v-card>
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
import { ref, reactive, onMounted } from "vue";
import hljs from "highlight.js";

export default {
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

    let example = reactive({});

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
