<template>
  <v-tree :items="example.items">
    <!-- <template #item-prepend="{ isFolder, isOpen }"> -->
    <!--   <div v-if="isFolder"> -->
    <!--     [] -->
    <!--   </div> -->
    <!--   <div v-if="isFolder &#38;&#38; isOpen"> -->
    <!--     [open] -->
    <!--   </div> -->
    <!-- </template> -->
    <!-- <template #item="{ item }"> -->
    <!--   <div :class="{'text-warn-400': item.children?.length}"><v-chevron></v-chevron>{{ item.name + 'slot' }}</div> -->
    <!-- </template> -->
  </v-tree>
  <!-- CUT START -->
  <v-tabs base="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="model" class="font-semibold">v-model:</label>
        <v-input type="text" id="model" v-model="example.model"></v-input>
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
    const treeData = ref({
      name: "My Tree",
      children: [
        { name: "hello" },
        { name: "world" },
        {
          name: "child folder",
          children: [
            {
              name: "child folder",
              children: [{ name: "hello" }, { name: "world" }],
            },
            { name: "hello" },
            { name: "world" },
            {
              name: "child folder",
              children: [{ name: "hello" }, { name: "world" }],
            },
          ],
        },
      ],
    });

    let example = reactive({
      items: treeData,
    });

    let events = ref([]);

    return {
      example,
      events,
    };
  },
};
</script>
