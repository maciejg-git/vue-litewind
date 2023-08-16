<template>
  <div class="items-between flex flex-col xl:flex-row">
    <v-card class="w-[320px] flex-none self-start p-2">
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
        @update:formatted="
          events.unshift({ ev: 'update:formatted', data: $event })
        "
        @state:done="events.unshift({ ev: 'state:done', data: $event })"
        @input:cancel="events.unshift({ ev: 'input:cancel', data: $event })"
      ></v-date-picker>
    </v-card>
    <!-- CUT START -->
    <div class="mt-4 flex-grow xl:ml-20 xl:mt-0">
      <v-tabs base="materialTabs">
        <v-tab name="Props">
          <div class="mt-5 flex flex-col gap-y-2">
            <div>
              <label
                for="model"
                class="font-semibold"
              >
                v-model:
              </label>
              <v-input
                type="text"
                id="model"
                inline
                v-model="example.date"
              ></v-input>
            </div>
            <div>
              <label for="range">range:</label>
              <v-select-prop
                id="range"
                v-model="example.range"
              ></v-select-prop>
            </div>
            <div>
              <label for="locale">locale:</label>
              <v-input
                type="text"
                id="locale"
                inline
                v-model="example.locale"
              ></v-input>
            </div>
            <div>
              <label for="monday-first-weekday">monday-first-weekday:</label>
              <v-select-prop
                id="monday-first-weekday"
                v-model="example.mondayFirstWeekday"
              ></v-select-prop>
            </div>
            <div>
              <label for="buttons">buttons:</label>
              <v-select-prop
                id="buttons"
                v-model="example.buttons"
              ></v-select-prop>
            </div>
            <div>
              <label for="primary-button-label">primary-button-label:</label>
              <v-input
                type="text"
                id="primary-button-label"
                inline
                v-model="example.primaryButtonLabel"
              ></v-input>
            </div>
            <div>
              <label for="secondary-button-label">
                secondary-button-label:
              </label>
              <v-input
                type="text"
                id="secondary-button-label"
                inline
                v-model="example.secondaryButtonLabel"
              ></v-input>
            </div>
            <div>
              <label for="adjacent-months">adjacent-months:</label>
              <v-select-prop
                id="adjacent-months"
                v-model="example.adjacentMonths"
              ></v-select-prop>
            </div>
            <div>
              <label for="range-hover-highlight">range-hover-highlight:</label>
              <v-select-prop
                id="range-hover-highlight"
                v-model="example.rangeHoverHighlight"
              ></v-select-prop>
            </div>
            <div>
              <label for="transition">transition:</label>
              <v-select
                id="transition"
                v-model="example.transition"
                inline
                :items="[
                  'fade',
                  'slide',
                  {
                    text: 'empty string',
                    value: '',
                  },
                ]"
              ></v-select>
            </div>
          </div>
        </v-tab>
        <v-tab>
          <template #name>
            Events
            <v-badge
              mod-badge="variant:secondary size:tiny"
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
    </div>
    <!-- CUT END -->
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

let example = reactive({
  date: "",
  range: false,
  locale: navigator.language,
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
</script>
