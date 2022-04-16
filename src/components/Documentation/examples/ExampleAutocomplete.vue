<template>
  <div>
    state touched
    <v-autocomplete
      v-model="example.model"
      :items="items"
      item-text="Description"
      item-value="Link"
      style-dropdown="shadow"
      @state:touched="getItems()"
      class="w-[620px]"
    >
      <!-- <template #item="{ item }"> -->
      <!--   {{ item }} -->
      <!--   <span>{{ item }}</span> -->
      <!-- </template> -->
    </v-autocomplete>
  </div>

  <div>
    remote
    <v-autocomplete
      v-model="example.model"
      :items="itemsRemote"
      item-text="Description"
      item-value="Link"
      style-dropdown="shadow"
      @input:value="getItemsRemote($event)"
      class="w-[620px]"
    >
      <!-- <template #item="{ item }"> -->
      <!--   {{ item }} -->
      <!--   <span> {{ item }} </span> -->
      <!-- </template> -->
    </v-autocomplete>
  </div>

  <div>
    remote state
    <v-autocomplete
      v-model="example.model"
      :items="itemsState"
      item-text="Description"
      item-value="Link"
      style-dropdown="shadow"
      no-filter
      @input:value="querySelections($event)"
      class="w-[620px]"
    >
      <!-- <template #item="{ item }"> -->
      <!--   {{ item }} -->
      <!--   <span> {{ item }} </span> -->
      <!-- </template> -->
    </v-autocomplete>
  </div>

  <div>
    local
    <v-autocomplete
      v-model="example.model"
      :items="itemsLanguages"
      item-text="Description"
      item-value="Link"
      style-dropdown="shadow"
      class="w-[620px]"
    >
      <!-- <template #item="{ item }"> -->
      <!--   {{ item }} -->
      <!--   <span> {{ item }} </span> -->
      <!-- </template> -->
    </v-autocomplete>
  </div>
  <!-- CUT START -->
  <v-tabs name="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="model" class="font-semibold">v-model:</label>
        <v-input type="text" id="model" v-model="example.model"></v-input>
      </div>
      <div class="mb-2">
        <label for="type">type:</label>
        <v-select id="type" v-model="example.type">
          <option value="text">text</option>
          <option value="password">password</option>
          <option value="email">email</option>
          <option value="number">number</option>
          <option value="search">search</option>
          <option value="time">time</option>
          <option value="url">url</option>
          <option value="color">color</option>
          <option value="date">date</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="state">state:</label>
        <v-select id="state" v-model="example.state">
          <option value="">normal (empty string)</option>
          <option value="valid">valid</option>
          <option value="invalid">invalid</option>
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
          <template v-for="ev in example.events">
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
import { languages } from "../../../const";

export default {
  setup() {
    let example = reactive({
      model: "",
      type: "text",
      state: "",
    });

    let states = [
          'Alabama',
          'Alaska',
          'American Samoa',
          'Arizona',
          'Arkansas',
          'California',
          'Colorado',
          'Connecticut',
          'Delaware',
          'District of Columbia',
          'Federated States of Micronesia',
          'Florida',
          'Georgia',
          'Guam',
          'Hawaii',
          'Idaho',
          'Illinois',
          'Indiana',
          'Iowa',
          'Kansas',
          'Kentucky',
          'Louisiana',
          'Maine',
          'Marshall Islands',
          'Maryland',
          'Massachusetts',
          'Michigan',
          'Minnesota',
          'Mississippi',
          'Missouri',
          'Montana',
          'Nebraska',
          'Nevada',
          'New Hampshire',
          'New Jersey',
          'New Mexico',
          'New York',
          'North Carolina',
          'North Dakota',
          'Northern Mariana Islands',
          'Ohio',
          'Oklahoma',
          'Oregon',
          'Palau',
          'Pennsylvania',
          'Puerto Rico',
          'Rhode Island',
          'South Carolina',
          'South Dakota',
          'Tennessee',
          'Texas',
          'Utah',
          'Vermont',
          'Virgin Island',
          'Virginia',
          'Washington',
          'West Virginia',
          'Wisconsin',
          'Wyoming',
        ]

    let events = ref([]);

    // let items = ref([]);
    let itemsLanguages = ref(languages);
    let items = ref([]);
    let itemsRemote = ref([]);

    let itemsState = ref([])

    let querySelections = (v) => {
        // Simulated ajax query
        setTimeout(() => {
          itemsState.value = states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
        }, 500)
      };

    let getItems = () => {
      fetch('https://api.publicapis.org/entries', {mode: "cors"})
          .then(res => res.json())
          .then(res => {
            const { count, entries } = res
            // this.count = count
            items.value = entries
          })
          .catch(err => {
            console.log(err)
          })
          .finally()
    }
    let getItemsRemote = (v) => {
      console.log('get', v)
      let regexp = new RegExp(v);
      fetch("https://api.publicapis.org/entries")
        .then((res) => res.json())
        .then((res) => {
          console.log('res')
          const { count, entries } = res;
          // this.count = count
          itemsRemote.value = entries.filter((i) => {
            return i.Description.search(regexp) !== -1;
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally();
    };

    return {
      example,
      events,
      languages,
      itemsState,
      items,
      itemsLanguages,
      itemsRemote,
      querySelections,
      getItems,
      getItemsRemote,
    };
  },
};
</script>
