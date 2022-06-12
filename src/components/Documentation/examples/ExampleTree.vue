<template>
  {{ selectedItems }}
  <v-tree
    v-bind="example"
    :chevron-attrs="{ triangle: true }"
    :placeholder-folder-icon="['mdi-folder', 'mdi-folder-open']"
    placeholder-item-icon="b-file-earmark"
    @input:item="handleClickItem"
    @input:selected="event => selectedItems = event"
  >
    <!-- <template #item-prepend="{ isFolder, isOpen }"> -->
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
        key: 17,
        children: [
          { name: "Lost in Translation", key: 1},
          { name: "Before Sunset", key: 2 },
          { name: "Groundhog Day", key: 3 },
          { name: "Out of Africa", icon: "b-star", key: 4 },
          {
            name: "Science-fiction",
            key: 5,
            icon: ["mdi-folder", "mdi-folder-open"],
            children: [
              {
                name: "Matrix",
            key: 6,
                children: [
                  { name: "Matrix", key: 7 },
                  { name: "Matrix: Revolutions", key: 8 }
                ],
              },
              { name: "Blade Runner", key: 9 },
              { name: "Futurama", key: 10 },
              { name: "Dune", disabled: true, key: 11 },
              { name: "Ghost in the Shell", key: 12 },
              {
                name: "Star Wars",
            key: 13,
                disabled: true,
                children: [
                  { name: "Return of The Jedi", key: 14 },
                  { name: "The Phantom Menace", key: 15 },
                ],
              },
            ],
          },
          { name: "Spirited Away", key: 16 },
        ],
      },
      {
        name: "Movies",
        key: 34,
        children: [
          { name: "Lost in Translation", key: 18},
          { name: "Before Sunset 3", key: 19 },
          { name: "Groundhog Day", key: 20 },
          { name: "Out of Africa", icon: "b-star", key: 21 },
          {
            name: "Science-fiction",
            key: 22,
            icon: ["mdi-folder", "mdi-folder-open"],
            children: [
              {
                name: "Matrix",
            key: 23,
                children: [
                  { name: "Matrix", key: 24 },
                  { name: "Matrix: Revolutions", key: 25 }
                ],
              },
              { name: "Blade Runner", key: 26 },
              { name: "Futurama", key: 27 },
              { name: "Dune", disabled: true, key: 28 },
              { name: "Ghost in the Shell", key: 29 },
              {
                name: "Star Wars",
            key: 30,
                disabled: true,
                children: [
                  { name: "Return of The Jedi", key: 31 },
                  { name: "The Phantom Menace", key: 32 },
                ],
              },
            ],
          },
          { name: "Spirited Away", key: 33 },
        ],
      },
      {
        name: "Movies",
        key: 51,
        children: [
          { name: "Lost in Translation", key: 35},
          { name: "Before Sunset", key: 36 },
          { name: "Groundhog Day", key: 37 },
          { name: "Out of Africa", icon: "b-star", key: 38 },
          {
            name: "Science-fiction",
            key: 39,
            icon: ["mdi-folder", "mdi-folder-open"],
            children: [
              {
                name: "Matrix",
            key: 40,
                children: [
                  { name: "Matrix", key: 41 },
                  { name: "Matrix: Revolutions", key: 42 }
                ],
              },
              { name: "Blade Runner", key: 43 },
              { name: "Futurama", key: 44 },
              { name: "Dune", disabled: true, key: 45 },
              { name: "Ghost in the Shell", key: 46 },
              {
                name: "Star Wars",
            key: 47,
                disabled: true,
                children: [
                  { name: "Return of The Jedi", key: 48 },
                  { name: "The Phantom Menace", key: 49 },
                ],
              },
            ],
          },
          { name: "Spirited Away", key: 50 },
        ],
      },
    ];

    // setTimeout(() => {
    //   example.items.splice(1, 1)
    // }, 5000)
    // setTimeout(() => {
    //   example.items.splice(0, 1)
    // }, 8000)

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

    let selectedItems = ref([])

    let handleClickItem = (item) => {
      console.log(item);
    };

    let events = ref([]);

    return {
      example,
      selectedItems,
      events,
      handleClickItem,
    };
  },
};
</script>
