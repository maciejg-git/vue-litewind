<template>
  <div class="flex flex-col gap-y-4">
    <div>
      state touched
      <v-autocomplete
        v-model="example.model"
        :items="items"
        item-text="Description"
        item-value="Link"
        style-dropdown="shadow"
        @state:focus.once="getItems()"
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
        no-filter
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
        v-model:input-value="example.inputValue"
        :items="itemsState"
        :is-loading="example.isLoading"
        style-dropdown="shadow"
        no-filter
        @input:value="querySelections($event)"
        class="w-[620px]"
      >
        <!-- <template #item="{ text, item, value, inputValue, highlightMatch }"> -->
        <!--   <span v-html="highlightMatch(text, inputValue)"></span> -->
        <!--   <span v-html="highlightMatch(value, inputValue)">  </span> -->
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
      inputValue: "",
      type: "text",
      state: "",
      isLoading: false,
    });

    let states = [
      {
          text: 'Alabama',
          value: 'Alabama',
      },
      {
          text: 'Alaska',
          value: 'Alaska',
      },
      {
          text: 'American Samoa',
          value: 'American Samoa',
      },
      {
          text: 'Arizona',
          value: 'Arizona',
      },
      {
          text: 'Arkansas',
          value: 'Arkansas',
      },
      {
          text: 'California',
          value: 'California',
      },
      {
          text: 'Colorado',
          value: 'Colorado',
      },
      {
          text: 'Connecticut',
          value: 'Connecticut',
      },
      {
          text: 'Delaware',
          value: 'Delaware',
      },
      {
          text: 'District of Columbia',
          value: 'District of Columbia',
      },
      {
          text: 'Federated States of Micronesia',
          value: 'Federated States of Micronesia',
      },
      {
          text: 'Florida',
          value: 'Florida',
      },
      {
          text: 'Georgia',
          value: 'Georgia',
      },
      {
          text: 'Guam',
          value: 'Guam',
      },
      {
          text: 'Hawaii',
          value: 'Hawaii',
      },
      {
          text: 'Idaho',
          value: 'Idaho',
      },
      {
          text: 'Illinois',
          value: 'Illinois',
      },
      {
          text: 'Indiana',
          value: 'Indiana',
      },
      {
          text: 'Iowa',
          value: 'Iowa',
      },
      {
          text: 'Kansas',
          value: 'Kansas',
      },
      {
          text: 'Kentucky',
          value: 'Kentucky',
      },
      {
          text: 'Louisiana',
          value: 'Louisiana',
      },
      {
          text: 'Maine',
          value: 'Maine',
      },
      {
          text: 'Marshall Islands',
          value: 'Marshall Islands',
      },
      {
          text: 'Maryland',
          value: 'Maryland',
      },
      {
          text: 'Massachusetts',
          value: 'Massachusetts',
      },
      {
          text: 'Michigan',
          value: 'Michigan',
      },
      {
          text: 'Minnesota',
          value: 'Minnesota',
      },
      {
          text: 'Mississippi',
          value: 'Mississippi',
      },
      {
          text: 'Missouri',
          value: 'Missouri',
      },
      {
          text: 'Montana',
          value: 'Montana',
      },
      {
          text: 'Nebraska',
          value: 'Nebraska',
      },
      {
          text: 'Nevada',
          value: 'Nevada',
      },
      {
          text: 'New Hampshire',
          value: 'New Hampshire',
      },
      {
          text: 'New Jersey',
          value: 'New Jersey',
      },
      {
          text: 'New Mexico',
          value: 'New Mexico',
      },
      {
          text: 'New York',
          value: 'New York',
      },
      {
          text: 'North Carolina',
          value: 'North Carolina',
      },
      {
          text: 'North Dakota',
          value: 'North Dakota',
      },
      {
          text: 'Northern Mariana Islands',
          value: 'Northern Mariana Islands',
      },
      {
          text: 'Ohio',
          value: 'Ohio',
      },
      {
          text: 'Oklahoma',
          value: 'Oklahoma',
      },
      {
          text: 'Oregon',
          value: 'Oregon',
      },
      {
          text: 'Palau',
          value: 'Palau',
      },
      {
          text: 'Pennsylvania',
          value: 'Pennsylvania',
      },
      {
          text: 'Puerto Rico',
          value: 'Puerto Rico',
      },
      {
          text: 'Rhode Island',
          value: 'Rhode Island',
      },
      {
          text: 'South Carolina',
          value: 'South Carolina',
      },
      {
          text: 'South Dakota',
          value: 'South Dakota',
      },
      {
          text: 'Tennessee',
          value: 'Tennessee',
      },
      {
          text: 'Texas',
          value: 'Texas',
      },
      {
          text: 'Utah',
          value: 'Utah',
      },
      {
          text: 'Vermont',
          value: 'Vermont',
      },
      {
          text: 'Virgin Island',
          value: 'Virgin Island',
      },
      {
          text: 'Virginia',
          value: 'Virginia',
      },
      {
          text: 'Washington',
          value: 'Washington',
      },
      {
          text: 'West Virginia',
          value: 'West Virginia',
      },
      {
          text: 'Wisconsin',
          value: 'Wisconsin',
      },
      {
          text: 'Wyoming',
          value: 'Wyoming',
      },
        ]

    let events = ref([]);

    // let items = ref([]);
    let itemsLanguages = ref(languages);
    let items = ref([]);
    let itemsRemote = ref([]);

    let itemsState = ref([])

    let querySelections = (v) => {
        // Simulated ajax query
      if (v === "") return
      example.isLoading = true
        setTimeout(() => {
          itemsState.value = states.filter(e => {
            return (e.text || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          example.isLoading = false
        }, 500)
      };

    let getItems = () => {
      console.log('get  ')
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
      example.isLoading = true
      fetch("https://api.publicapis.org/entries")
        .then((res) => res.json())
        .then((res) => {
          console.log('res')
          const { count, entries } = res;
          // this.count = count
          itemsRemote.value = entries.filter((i) => {
            return i.Description.search(regexp) !== -1;
          });
          example.isLoading = false
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
