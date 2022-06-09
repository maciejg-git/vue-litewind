<template>
  <v-tree
    v-bind="example"
    :chevron-attrs="{ triangle: true }"
    :placeholder-folder-icon="['mdi-folder', 'mdi-folder-open']"
    placeholder-item-icon="b-file-earmark"
    @input:item="handleClickItem"
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
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="model" class="font-semibold">v-model:</label>
          <v-input type="text" id="model" v-model="example.model"></v-input>
        </div>
        <div>
          <label for="filter">filter:</label>
          <v-input type="text" id="filter" v-model="example.filter"></v-input>
        </div>
        <div>
          <label for="openAll">open-all:</label>
          <v-select id="openAll" v-model="example.openAll">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div>
          <label for="open-on-click">open-on-click:</label>
          <v-select id="open-on-click" v-model="example.openOnClick">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div>
          <label for="show-indicators">show-indicators:</label>
          <v-select id="show-indicators" v-model="example.showIndicators">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div>
          <label for="show-icons">show-icons:</label>
          <v-select id="show-icons" v-model="example.showIcons">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div>
          <label for="show-checkboxes">show-checkboxes:</label>
          <v-select id="show-checkboxes" v-model="example.showCheckboxes">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
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
    const treeData = [
      {
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
                children: [
                  { name: "Matrix" },
                  { name: "Matrix: Revolutions" }
                ],
              },
              { name: "Blade Runner" },
              { name: "Futurama" },
              { name: "Dune", disabled: true },
              { name: "Ghost in the Shell" },
              {
                name: "Star Wars",
                disabled: true,
                children: [
                  { name: "Return of The Jedi" },
                  { name: "The Phantom Menace" },
                ],
              },
            ],
          },
          { name: "Spirited Away" },
        ],
      },
      {
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
                children: [
                  { name: "Matrix" },
                  { name: "Matrix: Revolutions" }
                ],
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
      },
    ];

    let example = reactive({
      items: treeData,
      openOnClick: true,
      showIndicators: true,
      showIcons: true,
      showCheckboxes: true,
      filter: "",
      openAll: false,
      autoOpenRoot: true,
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
