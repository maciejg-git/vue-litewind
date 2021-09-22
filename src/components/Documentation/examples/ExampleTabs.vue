<template>
  <v-tabs
    :fill="example.fill"
    :center="example.center"
    :right="example.right"
    :transition="example.transition"
    :name="example.name"
    @input:changed-tab="
      events.unshift({ ev: 'input:changed-tab', data: $event })
    "
  >
    <v-tab name="Tab" class="p-4">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
<!-- CUT START -->
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
  <!-- CUT END -->
    </v-tab>

    <v-tab name="Tab 2" class="p-4">
      It is a long established fact that a reader will be distracted by the
      readable content of a page when looking at its layout. The point of using
<!-- CUT START -->
      Lorem Ipsum is that it has a more-or-less normal distribution of letters,
      as opposed to using 'Content here, content here', making it look like
      readable English. Many desktop publishing packages and web page editors
      now use Lorem Ipsum as their default model text, and a search for 'lorem
      ipsum' will uncover many web sites still in their infancy. Various
      versions have evolved over the years, sometimes by accident, sometimes on
      purpose (injected humour and the like).
  <!-- CUT END -->
    </v-tab>

    <v-tab name="Another tab" class="p-4">
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has
      roots in a piece of classical Latin literature from 45 BC, making it over
<!-- CUT START -->
      2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
      College in Virginia, looked up one of the more obscure Latin words,
      consectetur, from a Lorem Ipsum passage, and going through the cites of
      the word in classical literature, discovered the undoubtable source. Lorem
      Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
      Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This
      book is a treatise on the theory of ethics, very popular during the
      Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
      amet..", comes from a line in section 1.10.32.
      <br />

      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below
      for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus
      Bonorum et Malorum" by Cicero are also reproduced in their exact original
      form, accompanied by English versions from the 1914 translation by H.
      Rackham.
  <!-- CUT END -->
    </v-tab>

    <v-tab class="p-4">
      <template #name>
        Tab with custom content
        <v-badge style-badge="secondary tiny">4</v-badge>
      </template>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has
      roots in a piece of classical Latin literature from 45 BC, making it over
<!-- CUT START -->
      2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
      College in Virginia, looked up one of the more obscure Latin words,
      consectetur, from a Lorem Ipsum passage, and going through the cites of
      the word in classical literature, discovered the undoubtable source. Lorem
      Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
      Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This
      book is a treatise on the theory of ethics, very popular during the
      Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
      amet..", comes from a line in section 1.10.32.
      <br />

      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below
      for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus
      Bonorum et Malorum" by Cicero are also reproduced in their exact original
      form, accompanied by English versions from the 1914 translation by H.
      Rackham.
  <!-- CUT END -->
    </v-tab>
  </v-tabs>
<!-- CUT START -->
  <div class="mt-5">
    <label for="style">Tabs style:</label>
    <v-select id="style" v-model="example.name">
      <option value="tabs">browser</option>
      <option value="tabs-material">material</option>
    </v-select>
  </div>
  <v-tabs name="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="fill">fill:</label>
        <v-select id="fill" v-model="example.fill">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="center">center:</label>
        <v-select id="center" v-model="example.center">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="right">right:</label>
        <v-select id="right" v-model="example.right">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="transition">transition:</label>
        <v-select id="transition" v-model="example.transition">
          <option value="fade">fade</option>
          <option value="">empty string (no transition)</option>
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
import { ref, reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      fill: false,
      center: false,
      right: false,
      transition: "fade",
      name: "tabs",
    });

    let events = ref([]);

    return {
      example,
      events,
    };
  },
};
</script>
