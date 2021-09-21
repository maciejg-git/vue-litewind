<template>
  <v-card style="width: 320px" class="self-start p-2">
    <v-date-picker
      v-model="example.date"
      :range="example.range"
      :locale="example.locale"
      :monday-first-weekday="example.mondayFirstWeekday"
      :buttons="!!example.buttons"
      :primary-button-label="example.primaryButtonLabel"
      :secondary-button-label="example.secondaryButtonLabel"
      :adjacent-months="!!example.adjacentMonths"
      :range-hover-highlight="example.rangeHoverHighlight"
      :transition="example.transition"
      @update:modelValue="
        events.unshift({ ev: 'update:modelValue', data: $event })
      "
      @input:formatted="events.unshift({ ev: 'input:formatted', data: $event })"
      @state:done="events.unshift({ ev: 'state:done', data: $event })"
      @state:cancel="events.unshift({ ev: 'state:cancel', data: $event })"
    />
  </v-card>
  <!-- CUT START -->
  <div class="flex-grow mt-4 lg:ml-14 lg:mt-0">
    <v-tabs name="tabs-material">
      <v-tab name="Props">
        <div class="mb-2 mt-5">
          <label for="model" class="font-semibold">v-model:</label>
          <v-input type="text" id="model" v-model="example.date"></v-input>
        </div>
        <div class="mb-2">
          <label for="range">range:</label>
          <v-select id="range" v-model="example.range">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="locale">locale:</label>
          <v-input type="text" id="locale" v-model="example.locale"></v-input>
        </div>
        <div class="mb-2">
          <label for="monday-first-weekday">monday-first-weekday:</label>
          <v-select
            id="monday-first-weekday"
            v-model="example.mondayFirstWeekday"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="buttons">buttons:</label>
          <v-select id="buttons" v-model="example.buttons">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="primary-button-label">primary-button-label:</label>
          <v-input
            type="text"
            id="primary-button-label"
            v-model="example.primaryButtonLabel"
          ></v-input>
        </div>
        <div class="mb-2">
          <label for="secondary-button-label">secondary-button-label:</label>
          <v-input
            type="text"
            id="secondary-button-label"
            v-model="example.secondaryButtonLabel"
          ></v-input>
        </div>
        <div class="mb-2">
          <label for="adjacent-months">adjacent-months:</label>
          <v-select id="adjacent-months" v-model="example.adjacentMonths">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="range-hover-highlight">range-hover-highlight:</label>
          <v-select
            id="range-hover-highlight"
            v-model="example.rangeHoverHighlight"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-5">
          <label for="transition">transition:</label>
          <v-select id="transition" v-model="example.transition">
            <option value="fade">fade</option>
            <option value="slide">slide</option>
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
  </div>
  <!-- CUT END -->
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      date: "",
      range: false,
      locale: "en-GB",
      buttons: true,
      adjacentMonths: true,
      secondaryButtonLabel: "Cancel",
      primaryButtonLabel: "OK",
      rangeHoverHighlight: true,
      transition: "fade",
      mondayFirstWeekday: true,
      formattedEmitted: false,
      doneEmitted: false,
      cancelEmitted: false,
      formatted: "",
      done: false,
      cancel: false,
    });

    let events = ref([]);

    return {
      example,
      events,
    };
  },
};
</script>
