<template>
  <v-tree
    :items="example.items"
    @input:item="handleClickItem"
    :chevron-attrs="{ triangle: true }"
    :placeholder-folder-icon="['mdi-folder', 'mdi-folder-open']"
    placeholder-item-icon="b-file-earmark"
  >
    <!-- <template #item-append="{ isFolder, isOpen }"> -->
    <!--   <div v-if="isFolder &#38;&#38; !isOpen"> -->
    <!--     [] -->
    <!--   </div> -->
    <!--   <div v-if="isFolder &#38;&#38; isOpen"> -->
    <!--     [open] -->
    <!--   </div> -->
    <!-- </template> -->
    <!-- <template #item="{ item, isFolder, isOpen, toggleItem }"> -->
    <!--   <div class="flex items-center"> -->
    <!--     <div class="w-5"> -->
    <!--       <v-button v-if="isFolder" base="button-plain" @click="toggleItem"> -->
    <!--         <v-chevron initial="right" :switch="isOpen"></v-chevron> -->
    <!--       </v-button> -->
    <!--     </div> -->
    <!--     {{ item.name }} -->
    <!--   </div> -->
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
    const treeData = {
      name: "Movies",
      children: [
        { name: "Lost in Translation" },
        { name: "Before Sunset" },
        { name: "Groundhog Day" },
        { name: "Out of Africa", icon: "b-star" },
        {
          name: "Science-fiction",
          icon: ["mdi-folder", "mdi-folder-open"],
          children: [
            {
              name: "Matrix",
              children: [{ name: "Matrix" }, { name: "Matrix: Revolutions" }],
            },
            { name: "Blade Runner" },
            { name: "Futurama" },
            { name: "Dune", disabled: true },
            { name: "Ghost in the Shell" },
            {
              name: "Star Wars",
              children: [
                { name: "Return of The Jedi" },
                { name: "The Phantom Menace" },
              ],
            },
          ],
        },
        { name: "Spirited Away" },
      ],
    };

    let example = reactive({
      items: treeData,
    });

    let handleClickItem = (item) => {
      console.log(item);
    };

    let events = ref([]);

    return {
      example,
      events,
      handleClickItem,
    };
  },
};
</script>
