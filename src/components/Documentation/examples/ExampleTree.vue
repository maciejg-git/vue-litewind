<template>
  <v-tree
    v-bind="example"
    ref="treeRef"
    :chevron-attrs="{ triangle: true }"
    :placeholder-folder-icon="['mdi-folder', 'mdi-folder-open']"
    placeholder-item-icon="b-file-earmark"
    @input:click="handleClickItem"
    @input:selected="handleSelectedItem"
  >
    <!-- <template #item-append="{ item }"> -->
    <!--   <v-badge v-if="item.badge" style-badge="tiny" class="ml-2"> {{ item.badge }} </v-badge> -->
    <!-- </template> -->
    <!-- <template #icon="{ item, isFolder }"> -->
    <!-- <v-icon :name="isFolder ? 'mdi-folder' : 'b-star'"></v-icon> -->
    <!-- </template> -->
    <!-- <template #item-prepend="{ isFolder, isOpen }"> -->
    <!-- <v-icon :name="'b-star'"></v-icon> -->
    <!-- <div v-if="isFolder &#38;&#38; !isOpen"> -->
    <!--   [] -->
    <!-- </div> -->
    <!-- <div v-if="isFolder &#38;&#38; isOpen"> -->
    <!--   [open] -->
    <!-- </div> -->
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
  <v-button @click="treeRef.openAllLevel(9999)" class="mr-4 mt-4">
    Open all
  </v-button>
  <v-button @click="treeRef.closeAll()">Close all</v-button>
  <!-- CUT START -->
  <v-tabs base="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="filter">filter:</label>
          <v-input
            type="text"
            id="filter"
            v-model="example.filter"
            clearable
          ></v-input>
        </div>
        <div>
          <label for="open-on-click">open-on-click:</label>
          <v-select-prop id="open-on-click" v-model="example.openOnClick">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="show-indicators">show-indicators:</label>
          <v-select-prop id="show-indicators" v-model="example.showIndicators">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="show-icons">show-icons:</label>
          <v-select-prop id="show-icons" v-model="example.showIcons">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="show-checkboxes">show-checkboxes:</label>
          <v-select-prop id="show-checkboxes" v-model="example.showCheckboxes">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="independent-select">independent-select:</label>
          <v-select-prop id="independent-select" v-model="example.independentSelect">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="allow-select-disabled">allow-select-disabled:</label>
          <v-select
            id="allow-select-disabled"
            v-model="example.allowSelectDisabled"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div>
          <label for="allow-open-disabled">allow-open-disabled:</label>
          <v-select-prop
            id="allow-open-disabled"
            v-model="example.allowOpenDisabled"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="transition">transition:</label>
          <v-select id="transition" v-model="example.transition">
            <option value="fade-f">fade-f</option>
            <option value="fade-m">fade-m</option>
            <option value="fade-s">fade-s</option>
            <option value="fade-slide-f">fade-slide-f</option>
            <option value="fade-slide-m">fade-slide-m</option>
            <option value="fade-slide-s">fade-slide-s</option>
            <option value="">empty string</option>
          </v-select>
        </div>
      </div>
    </v-tab>
    <v-tab>
      <template #name>
        Events
        <v-badge
          style-badge="secondary tiny"
          class="ml-2"
          update-animation="scale-up"
          :update-key="events.length"
        >
          {{ events.length }}
        </v-badge>
      </template>
      <event-viewer :events="events" />
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
        id: 17,
        children: [
          { name: "Lost in Translation", id: 1 },
          { name: "Before Sunset", id: 2 },
          { name: "Groundhog Day", id: 3 },
          { name: "Out of Africa", icon: "b-star", id: 4 },
          {
            name: "Science-fiction",
            id: 5,
            icon: ["mdi-folder", "mdi-folder-open"],
            children: [
              {
                name: "Matrix",
                id: 6,
                children: [
                  { name: "Matrix", id: 7 },
                  { name: "Matrix: Revolutions", id: 8 },
                ],
              },
              { name: "Blade Runner", id: 9 },
              { name: "Futurama", id: 10 },
              { name: "Dune", id: 11 },
              { name: "Ghost in the Shell", id: 12 },
              {
                name: "Star Wars",
                id: 13,
                children: [
                  { name: "Return of The Jedi", id: 14, badge: "NEW" },
                  { name: "The Phantom Menace", id: 15 },
                ],
              },
            ],
          },
          { name: "Spirited Away", id: 16 },
        ],
      },
      {
        name: "Movies",
        id: 34,
        children: [
          { name: "Lost in Translation", id: 18 },
          { name: "Before Sunset 3", id: 19 },
          { name: "Groundhog Day", id: 20 },
          { name: "Out of Africa", icon: "b-star", id: 21 },
          {
            name: "Science-fiction",
            id: 22,
            icon: ["mdi-folder", "mdi-folder-open"],
            children: [
              {
                name: "Matrix",
                id: 23,
                children: [
                  { name: "Matrix", id: 24 },
                  { name: "Matrix: Revolutions", id: 25 },
                ],
              },
              { name: "Blade Runner", id: 26 },
              { name: "Futurama", id: 27 },
              { name: "Dune", disabled: true, id: 28 },
              { name: "Ghost in the Shell", id: 29 },
              {
                name: "Star Wars",
                id: 30,
                disabled: true,
                children: [
                  { name: "Return of The Jedi", id: 31 },
                  { name: "The Phantom Menace", id: 32 },
                ],
              },
            ],
          },
          { name: "Spirited Away", id: 33 },
        ],
      },
    ];

    let example = reactive({
      items: treeData,
      openOnClick: true,
      showIndicators: true,
      showIcons: true,
      showCheckboxes: false,
      filter: "",
      openAll: false,
      autoOpenRoot: true,
      autoOpenAll: false,
      independentSelect: false,
      allowSelectDisabled: false,
      allowOpenDisabled: true,
      transition: "fade-m",
    });

    let treeRef = ref(null);

    let selectedItems = ref([]);

    let events = ref([]);

    let handleClickItem = (item) => {
      events.value.unshift({ ev: "input:click", data: item });
    };

    let handleSelectedItem = (selection) => {
      events.value.unshift({ ev: "input:selected", data: selection });
    };

    return {
      example,
      selectedItems,
      treeRef,
      events,
      handleClickItem,
      handleSelectedItem,
    };
  },
};
</script>
