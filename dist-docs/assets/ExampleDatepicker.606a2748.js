const e=`<template>\r
  <div class="flex items-between">\r
    <v-card style="width: 320px" class="self-start p-2">\r
      <v-date-picker\r
        v-model="example.date"\r
        :range="example.range"\r
        :locale="example.locale"\r
        :monday-first-weekday="example.mondayFirstWeekday"\r
        :buttons="!!example.buttons"\r
        :primary-button-label="example.primaryButtonLabel"\r
        :secondary-button-label="example.secondaryButtonLabel"\r
        :adjacent-months="!!example.adjacentMonths"\r
        :range-hover-highlight="example.rangeHoverHighlight"\r
        :transition="example.transition"\r
        @update:formatted="\r
          events.unshift({ ev: 'update:formatted', data: $event })\r
        "\r
        @state:done="events.unshift({ ev: 'state:done', data: $event })"\r
        @input:cancel="events.unshift({ ev: 'input:cancel', data: $event })"\r
      >\r
      <!-- <template #day="{ day }"> -->\r
      <!--   <div class="relative"> -->\r
      <!--     {{ day }} -->\r
      <!--   <v-badge style-badge="circle-small danger tiny" class="absolute top-full right-1/2 transform translate-x-1/2"></v-badge> -->\r
      <!--   </div> -->\r
      <!-- </template> -->\r
      </v-date-picker>\r
    </v-card>\r
    <!-- CUT START -->\r
      <div class="flex-grow mt-4 lg:ml-20 lg:mt-0">\r
        <v-tabs base="material">\r
          <v-tab name="Props">\r
            <div class="flex flex-col gap-y-2 mt-5">\r
              <div>\r
                <label for="model" class="font-semibold">v-model:</label>\r
                <v-input type="text" id="model" inline v-model="example.date"></v-input>\r
              </div>\r
              <div>\r
                <label for="range">range:</label>\r
                <v-select-prop id="range" v-model="example.range">\r
                  <option :value="true">true</option>\r
                  <option :value="false">false</option>\r
                </v-select-prop>\r
              </div>\r
              <div>\r
                <label for="locale">locale:</label>\r
                <v-input type="text" id="locale" inline v-model="example.locale"></v-input>\r
              </div>\r
              <div>\r
                <label for="monday-first-weekday">monday-first-weekday:</label>\r
                <v-select-prop\r
                  id="monday-first-weekday"\r
                  v-model="example.mondayFirstWeekday"\r
                >\r
                  <option :value="true">true</option>\r
                  <option :value="false">false</option>\r
                </v-select-prop>\r
              </div>\r
              <div>\r
                <label for="buttons">buttons:</label>\r
                <v-select-prop id="buttons" v-model="example.buttons">\r
                  <option :value="true">true</option>\r
                  <option :value="false">false</option>\r
                </v-select-prop>\r
              </div>\r
              <div>\r
                <label for="primary-button-label">primary-button-label:</label>\r
                <v-input\r
                  type="text"\r
                  id="primary-button-label"\r
                  inline\r
                  v-model="example.primaryButtonLabel"\r
                ></v-input>\r
              </div>\r
              <div>\r
                <label for="secondary-button-label">secondary-button-label:</label>\r
                <v-input\r
                  type="text"\r
                  id="secondary-button-label"\r
                  inline\r
                  v-model="example.secondaryButtonLabel"\r
                ></v-input>\r
              </div>\r
              <div>\r
                <label for="adjacent-months">adjacent-months:</label>\r
                <v-select-prop\r
                  id="adjacent-months"\r
                  v-model="example.adjacentMonths"\r
                >\r
                  <option :value="true">true</option>\r
                  <option :value="false">false</option>\r
                </v-select-prop>\r
              </div>\r
              <div>\r
                <label for="range-hover-highlight">range-hover-highlight:</label>\r
                <v-select-prop\r
                  id="range-hover-highlight"\r
                  v-model="example.rangeHoverHighlight"\r
                >\r
                  <option :value="true">true</option>\r
                  <option :value="false">false</option>\r
                </v-select-prop>\r
              </div>\r
              <div>\r
                <label for="transition">transition:</label>\r
                <v-select id="transition" v-model="example.transition">\r
                  <option value="fade">fade</option>\r
                  <option value="slide">slide</option>\r
                  <option value="">empty string (no transition)</option>\r
                </v-select>\r
              </div>\r
            </div>\r
          </v-tab>\r
          <v-tab>\r
            <template #name>\r
              Events\r
              <v-badge\r
                style-badge="secondary tiny"\r
                class="ml-2"\r
                update-animation="scale-up"\r
                :update-key="events.length"\r
              >\r
                {{ events.length }}\r
              </v-badge>\r
            </template>\r
            <event-viewer :events="events" />\r
          </v-tab>\r
        </v-tabs>\r
      </div>\r
<!-- CUT END -->\r
  </div>\r
</template>\r
\r
<script>\r
import { ref, reactive } from "vue";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      date: "",\r
      range: false,\r
      locale: navigator.language,\r
      buttons: true,\r
      adjacentMonths: true,\r
      secondaryButtonLabel: "Cancel",\r
      primaryButtonLabel: "OK",\r
      rangeHoverHighlight: true,\r
      transition: "fade",\r
      mondayFirstWeekday: true,\r
      formattedEmitted: false,\r
      doneEmitted: false,\r
      cancelEmitted: false,\r
      formatted: "",\r
      done: false,\r
      cancel: false,\r
    });\r
\r
    let events = ref([]);\r
\r
    return {\r
      example,\r
      events,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{e as default};
