<template>
  <div class="sm:container mx-auto">
    item
    <v-tabs style-tab="default">
      <v-tab name="item" class="p-2"
        >item Options can be passed via data attributes or JavaScript. For data
        attributes, append the option name to data-bs-, as in
        data-bs-animation="". Make sure to change the case type of the option
        name from camelCase to kebab-case when passing via data attributes. For
        example: instead of using data-bs-customClass="beautifier", use
        data-bs-custom-class="beautifier". Options can be passed via data
        attributes or JavaScript. For data attributes, append the option name to
        data-bs-, as in data-bs-animation="". Make sure to change the case type
        of the option name from camelCase to kebab-case when passing via data
        attributes. For example: instead of using
        data-bs-customClass="beautifier", use
        data-bs-custom-class="beautifier".</v-tab
      >
      <v-tab name="item2" class="p-2">
        <v-card style-card="default shadow gray" class="mb-4">
          <v-button style-button="primary small">table</v-button>
          <v-button style-button="primary small">add</v-button>
          <v-button style-button="secondary small">add</v-button>
          <v-dropdown auto-close-menu>
            <template #activator>
              <v-button style-button="primary small">add</v-button>
            </template>
            <template #default="{ hide }">
              <v-card style-card="default shadow" width="320px">
                <v-dropdown-menu-item tag="button" active @click.prevent="log('click')">
                  item
                </v-dropdown-menu-item>
                <v-dropdown-menu-item>
                  item 2
                </v-dropdown-menu-item>
                <v-dropdown-header>
                  items
                </v-dropdown-header>
                <v-dropdown-menu-item disabled>
                  item 3
                </v-dropdown-menu-item>
                <v-divider></v-divider>
                <v-dropdown-menu-item tag="button" >
                  item 9
                </v-dropdown-menu-item>
              </v-card>
            </template>
          </v-dropdown>
        </v-card>
        <v-table
          :items="data"
          :definition="definition"
          :filter="filter"
          :itemsPerPage="itemsPerPage"
          :page="page"
          @update:filtered-count="tableItemsCount = $event"
          @update:page="page = $event"
          caption-top
        >
          <template #caption>table 4</template>
          <template #cell:item_city="{ item }">
            <v-button button="primary tiny noMargin">item</v-button>
            <!-- <span v-tooltip.right.delay200="() => item.city">{{ item.id }}</span> -->
            <!-- <v&#45;popover trigger="hover" :delay="500" transition="fade"> -->
            <!--   <template #activator> -->
            <!--     <v&#45;button>popover</v&#45;button> -->
            <!--     <a href="">item</a> -->
            <!--     <v&#45;button>popover</v&#45;button> -->
            <!--   </template> -->
            <!--   <template #header>Popover</template> -->
            <!--   {{ item.id }} -->
            <!--   <input type=""> -->
            <!-- </v&#45;popover> -->
          </template>
        </v-table>
      </v-tab>
      <v-tab :name="tabname" class="p-2">item3</v-tab>
      <v-tab name="item4" class="p-2">item 44</v-tab>
      <!-- <v&#45;tab name="item5" v&#45;if="tooltipTest"></v&#45;tab> -->
    </v-tabs>
    <v-button @click="tabname = 'item 5'">tabname</v-button>
    <v-button @click="filter = /am/">filter table</v-button>
    <v-button @click="busy = !busy">busy table</v-button>

    {{ tableSelection }}
    <input v-model="filter" type="" class="form-control w-25" />
    <v-card style-card="default shadow">
      <v-table
        :definition="definition"
        :items="data"
        :filter="filter"
        :itemsPerPage="itemsPerPage"
        :page="page"
        :busy="busy"
        primary-key="id"
        style-table="default fixed"
        selection-mode="single"
        @input:selection="tableSelection = $event"
        @update:filtered-count="tableItemsCount = $event"
        @update:page="page = $event"
      >
      <!-- <template #busy><v-spinner></v-spinner></template> -->
        <template #cell:item_city="{ item }">
          <!-- <v&#45;button small>item</v&#45;button> -->
          <!--     <!&#45;&#45; <v&#38;#45;button>popover</v&#38;#45;button> &#45;&#45;> -->
          <!--     <a href="">item</a> -->
          <!--     <!&#45;&#45; <v&#38;#45;button>popover</v&#38;#45;button> &#45;&#45;> -->
          <!--   </template> -->
          <!--   <!&#45;&#45; <template #header>Popover</template> &#45;&#45;> -->
          <!--   item item 2 -->
          <!--   {{ item.id }} -->
          <!--   <input type=""> -->
          <!-- </v&#45;popover> -->
        </template>
      </v-table>
    </v-card>

    <div class="grid grid-cols-2 mt-2">
      <v-pagination
        v-model="page"
        :itemsCount="tableItemsCount"
        :itemsPerPage="itemsPerPage"
        :maxPages="8"
        icons
      ></v-pagination>
      <input type="" />
    </div>

    <v-button @click="classadd = 'bg-blue-700 border-2'">classadd</v-button>
    <v-button @click="definition[3].visible = !definition[3].visible"
      >visible city col</v-button
    >
    <v-button @click="data = dataJSON.slice(0, 40)">table</v-button>
    <v-button @click="definition.push({ key: 'item5' })">table push</v-button>
    <v-button @click="data[0].item5 = 6">table add col</v-button>
    <v-button style-button="bg-indigo-500 text-white p-4">class</v-button>

    <div class="my-2">
      spinner
      <v-spinner></v-spinner>
    </div>

    <v-badge style-badge="primary small">badge</v-badge>

    <v-button @click="tooltipTest = true">tooltipTest</v-button>

    <span
      v-tooltip.bottom.delay500.oY5="() => 'item item 2'"
      data-title="item item 4"
      >tooltip</span
    >

    <br />

    <span
      v-tooltip.top-end.delay500="() => 'item item 2'"
      data-title="item item 4"
      >tooltip</span
    >

    <br />

    {{ i }}
    {{ formattedDate }}
    <v-button @click="i = [ '2021-05-14', '2021-05-15' ]">set d</v-button>
    <v-card style-card="default" class="p-2 mb-2" style="width: 320px">
      <vDatePicker v-model="i" euro range range-hover-highlight buttons adjecent-months style-day="default font-semibold"></vDatePicker>
    </v-card>
    <v-card style-card="default" class="p-2" style="width: 320px">
      <vDatePicker
        v-model="i"
        @input:formatted="formattedDate = $event"
        euro
        range
      ></vDatePicker>
    </v-card>
    <v-card card="default" class="p-2" style="width: 320px">
      <vDatePicker
        v-model="i"
        @input:formatted="formattedDate = $event"
        euro
        buttons
      ></vDatePicker>
    </v-card>

    <v-button @click="sidepanel = !sidepanel">sidepanel</v-button>

    <v-sidepanel v-model="sidepanel" close-button>
      <template #header
        ><h5 class="text-xl font-semibold">Sidepanel</h5></template
      >
      <div class="p-2">
        sidepanel
      </div>
    </v-sidepanel>

    <v-dropdown transition="fade">
      <template #activator>
        <v-button>Dropdown</v-button>
      </template>
      <template #default>
        <v-card style-card="default shadow">
          item
          <v-dropdown-menu-item v-tooltip.right.delay200="'item content'"
            >item</v-dropdown-menu-item
          >
          <v-dropdown-menu-item>item</v-dropdown-menu-item>
          <div class="p-2">
            <vDatePicker
              v-model="i"
              euro
              buttons
              @input:formatted="formattedDate = $event"
              width="320px"
            ></vDatePicker>
          </div>
        </v-card>
      </template>
    </v-dropdown>

    <v-dropdown transition="fade">
      <template #activator>
        <v-button>Dropdown</v-button>
      </template>
      <template #default="{ hide }">
        <v-card style-card="default shadow" class="p-2">
            <vDatePicker
              v-model="i"
              euro
              buttons
              adjecent-months
              @input:formatted="formattedDate = $event"
              width="320px"
            ></vDatePicker>
        </v-card>
      </template>
    </v-dropdown>

    <v-dropdown transition="fade">
      <template #activator>
        <vInputDate v-model="i" class="w-80"></vInputDate>
      </template>
      <template #default="{ hide }">
        <v-card style-card="default shadow" class="p-2">
            <vDatePicker
              v-model="i"
              euro
              buttons
              adjecent-months
              range
              @input:formatted="formattedDate = $event"
              @state:done="hide"
              @state:cancel="hide"
              width="320px"
            ></vDatePicker>
        </v-card>
      </template>
    </v-dropdown>

    <v-list width="320px">
      <v-list-item>item</v-list-item>
      <v-list-item>item2</v-list-item>
      <v-list-item>item3</v-list-item>
      <v-list-item active>item</v-list-item>
      <v-list-item>item2</v-list-item>
      <v-list-item v-tooltip.right.delay100="'item content'">item3</v-list-item>
      <v-list-item>item</v-list-item>
      <v-list-item>item2</v-list-item>
      <v-list-item>item3</v-list-item>
      <v-list-item>item3</v-list-item>
    </v-list>

    <v-button @click="i2 = !i2">collapse</v-button>
    <v-collapse v-model="i2">Options can be passed via data attributes or JavaScript. For
      data attributes, append the option name to data-bs-, as in
      data-bs-animation="". Make sure to change the case type of the option name
      from camelCase to kebab-case when passing via data attributes. For
      example: instead of using data-bs-customClass="beautifier", use
      data-bs-custom-class="beautifier". Options can be passed via data
      attributes or JavaScript. For data attributes, append the option name to
      data-bs-, as in data-bs-animation="". Make sure to change the case type of
      the option name from camelCase to kebab-case when passing via data
      attributes. For example: instead of using
      data-bs-customClass="beautifier", use data-bs-custom-class="beautifier".
      Options can be passed via data attributes or JavaScript. For data
      attributes, append the option name to data-bs-, as in
      data-bs-animation="". Make sure to change the case type of the option name
      from camelCase to kebab-case when passing via data attributes. For
      example: instead of using data-bs-customClass="beautifier", use
      data-bs-custom-class="beautifier". Options can be passed via data
      attributes or JavaScript. For data attributes, append the option name to
      data-bs-, as in data-bs-animation="". Make sure to change the case type of
      the option name from camelCase to kebab-case when passing via data
      attributes. For example: instead of using
      data-bs-customClass="beautifier", use data-bs-custom-class="beautifier".</v-collapse>

    <v-badge>new</v-badge>
    <v-button @click="modal = !modal">modal</v-button>
    <v-modal
      v-model="modal"
      position="center"
      transition="fade-slide"
      secondaryButtonClose
      title="Modal"
    >
      item item Options can be passed via data attributes or JavaScript. For
      data attributes, append the option name to data-bs-, as in
      data-bs-animation="". Make sure to change the case type of the option name
      from camelCase to kebab-case when passing via data attributes. For
      example: instead of using data-bs-customClass="beautifier", use
      data-bs-custom-class="beautifier". Options can be passed via data
      attributes or JavaScript. For data attributes, append the option name to
      data-bs-, as in data-bs-animation="". Make sure to change the case type of
      the option name from camelCase to kebab-case when passing via data
      attributes. For example: instead of using
      data-bs-customClass="beautifier", use data-bs-custom-class="beautifier".
      Options can be passed via data attributes or JavaScript. For data
      attributes, append the option name to data-bs-, as in
      data-bs-animation="". Make sure to change the case type of the option name
      from camelCase to kebab-case when passing via data attributes. For
      example: instead of using data-bs-customClass="beautifier", use
      data-bs-custom-class="beautifier". Options can be passed via data
      attributes or JavaScript. For data attributes, append the option name to
      data-bs-, as in data-bs-animation="". Make sure to change the case type of
      the option name from camelCase to kebab-case when passing via data
      attributes. For example: instead of using
      data-bs-customClass="beautifier", use data-bs-custom-class="beautifier".
    </v-modal>

    <div class="my-5">
      <v-button shadow class-button="bg-gray-500 hover:bg-gray-600"
        >custom button</v-button
      >
      <v-button shadow class-button="bg-red-500 hover:bg-red-600"
        >custom button</v-button
      >
      <v-button class-button="bg-blue-500 hover:bg-blue-600"
        >custom button</v-button
      >
      <!-- <v&#45;button :class&#45;button="[btn.primary, btn.small, btn.square]">custom button</v&#45;button> -->
      <!-- <v&#45;button :class&#45;button="[btn.secondary, btn.small, 'shadow&#45;md']">custom button</v&#45;button> -->
      <!-- <v&#45;button :class&#45;button="[btn.secondary, btn.large, 'shadow&#45;md']">custom button</v&#45;button> -->
      <!-- <v&#45;button :class&#45;button="[btn.primary, btn.pill, 'shadow&#45;md']">custom button</v&#45;button> -->
      <v-button>custom button</v-button>
      <v-button style-button="primary small">custom button</v-button>
      <v-button style-button="primary pill small">custom button</v-button>
    </div>
    <br />

    Options can be passed via data attributes or JavaScript. For data
    attributes, append the option name to data-bs-, as in data-bs-animation="".
    Make sure to change the case type of the option name from camelCase to
    kebab-case when passing via data attributes. For example: instead of using
    data-bs-customClass="beautifier", use data-bs-custom-class="beautifier".
    <br />

    {{ popoverText }}
    <v-popover
      trigger="click"
      :delay="0"
      click-outside-close
      v-model="popoverShow"
    >
      <template #activator>
        <input
          ref="activator"
          type="text"
          placeholder="focus popover click"
          class="p-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded"
        />
      </template>
      <template #header>Popover</template>
      item item 2
      {{ popoverText }}
      <!-- <input type="" class="form&#45;control"> -->
      <!-- <input type="" class="form&#45;control mt&#45;2" v&#45;model="popoverText"> -->
      <input
        ref="activator"
        type="text"
        placeholder="focus popover click"
        class="p-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded"
      />
      <input
        ref="activator"
        type="text"
        placeholder="focus popover click"
        class="mt-2 p-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded"
      />
      <!-- <v&#45;button class="mt&#45;2">popover text</v&#45;button> -->
    </v-popover>

    <v-button square disabled small shadow-md @click="popoverShow = true"
      >popover model
    </v-button>
    <v-button @click="popoverShow = false">popover model false</v-button>
    <v-button square shadow @click="popoverShow = true"
      >popover model
    </v-button>

    <v-button id="button">popover button id</v-button>
    <a href="" id="buttonLink">popover button id </a>
    <input type="" id="input" placeholder="input popover id " />

    <v-popover
      trigger="click"
      :delay="50"
      click-outside-close
      target-id="button"
    >
      <template #header>Popover</template>
      item item 2
      <input type="" />
    </v-popover>

    <v-popover title="popover" trigger="hover" :delay="500" transition="fade">
      <template #activator>
        <!-- <v&#45;button>popover</v&#45;button> -->
        <v-button>popover</v-button>
      </template>
      <template #header>Popover</template>
      item item 2
      <input type="" />
    </v-popover>

    <v-popover trigger="focus">
      <template #activator>
        <input ref="activator" type="text" placeholder="focus popover" />
      </template>
      <template #header>Popover</template>
      item item 2
      <input type="" />
    </v-popover>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    input, documentation, tailwind map do for do object
      <div class="">
        <span class="align-top"> align </span>
        <span class="align-middle"> align </span>
      </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import dataJSON from "./../MOCK_DATA (1).json";
import vTabs from "./vTabs.vue"
import vTab from "./vTab.vue"
// import vTable from './vTable.vue'
// import {vTable} from "./index.js"
import vDatePicker from "./vDatePicker.vue";
import vCard from "./vCard.vue";
import vSidepanel from "./vSidepanel.vue";
import vButton from "./vButton.vue";
import vPagination from "./vPagination.vue";
import vDropdown from "./vDropdown.vue";
import vDropdownMenuItem from "./vDropdownMenuItem.vue";
import vDropdownHeader from "./vDropdownHeader.vue";
import vDivider from "./vDivider.vue";
import vList from "./vList.vue";
import vListItem from "./vListItem.vue";
import vCollapse from "./vCollapse.vue";
import vModal from "./vModal.vue";
import vBadge from "./vBadge.vue";
import vPopover from "./vPopover.vue";
import tooltip from "../directives/tooltip.js";
import vSpinner from "./vSpinner.vue";
import vInputDate from "./vInputDate.vue"
// import {vTable} from "../dist/vuecomponent2.es"

export default {
  name: "HelloWorld",
  components: {
    vTabs,
    vTab,
    // vTable,
    vDatePicker,
    vCard,
    vButton,
    vSidepanel,
    vPagination,
    vDropdown,
    vDropdownMenuItem,
    vDropdownHeader,
    vDivider,
    vList,
    vListItem,
    vCollapse,
    vModal,
    vBadge,
    vPopover,
    vSpinner,
    vInputDate,
  },
  props: {
    msg: String,
  },
  directives: {
    tooltip,
  },
  setup(props) {
    // let data = ref(dataJSON.slice(0, 140));
    let data = ref(dataJSON);
    data.value.map(i => i.date = new Date(2021, 2, 2))
    data.value[1].date = new Date(2021, 4, 2)
    data.value[2].date = new Date(2021, 7, 2)
    let dataTest = [2, 3, 5, 12, 20, 21, 22, 30, 31, 40, 41, 42, 43, 45, 60]
    let dataTest2 = [7, 30, 40, 70]
    dataTest.forEach(i => data.value[i].first_name = null)
    dataTest.forEach(i => data.value[i].country = undefined)
    dataTest.forEach(i => data.value[i].city = undefined)
    // dataTest2.forEach(i => data.value[i].id = NaN)
    let dataEmpty = ref([]);
    let busy = ref(false)
    let tableCommand = null;
    let tableSelection = ref([])
    // data.value = dataEmpty.value;
    let definition = ref([
      {
        key: "id",
        sortable: true,
        filterable: false,
        class: () => "w-1/12",
      },
      {
        key: "first_name",
        sortable: true,
        class: () => "w-2/12",
      },
      {
        key: "date",
        filterable: false,
        sortable: true,
        f: (k, v) => v.toLocaleDateString(),
        class: () => "bg-gray-100 w-2/12",
      },
      // {
      //   key: "last_name",
      // },
      {
        key: "email",
        sortable: true,
        class: () => "w-3/12",
      },
      {
        key: "city",
        // visible: false,
        sortable: true,
        f: (k, v, i) => i.id + " " + k + " " + v,
        // sortByFunction: true,
        // filterByFunction: true,
        class: () => "w-2/12",
      },
      {
        key: "country",
        class: () => "w-1/12",
      },
      {
        key: "item_city",
      },
    ]);
    let i = ref([]);
    let filter = ref("");
    let sidepanel = ref(false);
    let tableItemsCount = ref(0);
    let itemsPerPage = ref(10);
    let page = ref(1);
    let i2 = ref(false);
    let modal = ref(false);
    let tooltipTest = ref(false);
    let activator = ref(null);
    let popoverText = ref("");
    let popoverShow = ref(false);
    let classadd = ref("");
    let tabname = ref("item 2");
    let formattedDate = "";
    let log = (m) => console.log(m);

    let buttonPrimary = "bg-indigo-500 hover:bg-indigo-600";
    let buttonSmall = "py-1";

    onMounted(() => {
      setTimeout(() => {
        tooltipTest.value = true;
      }, 4000);
    });

    return {
      data,
      dataJSON,
      definition,
      i,
      sidepanel,
      filter,
      tableItemsCount,
      itemsPerPage,
      page,
      i2,
      tableSelection,
      busy,
      modal,
      tooltipTest,
      activator,
      popoverText,
      popoverShow,
      classadd,
      tabname,
      buttonPrimary,
      buttonSmall,
      formattedDate,
      log,
    };
  },
};
</script>

<style scoped></style>
