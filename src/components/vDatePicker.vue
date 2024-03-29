<template>
  <div
    :class="[classes.datepicker.value]"
    :style="{ width: width }"
  >
    <div class="my-2 grid grid-flow-col grid-cols-6">
      <button
        aria-label="Previous year"
        :class="classes.dateButton.value"
        @click="handleButtonClick('prev', 'year')"
      >
        <chevron-double-left />
      </button>
      <button
        aria-label="Previous month"
        :class="classes.dateButton.value"
        @click="handleButtonClick('prev', 'month')"
      >
        <chevron-left />
      </button>
      <div class="col-span-2 inline-block" :class="classes.date.value">
        <span class="align-baseline">{{ monthNames[month] }} {{ year }}</span>
      </div>
      <button
        aria-label="Next month"
        :class="classes.dateButton.value"
        @click="handleButtonClick('next', 'month')"
      >
        <chevron-right />
      </button>
      <button
        aria-label="Next year"
        :class="classes.dateButton.value"
        @click="handleButtonClick('next', 'year')"
      >
        <chevron-double-right />
      </button>
    </div>
    <div :class="classes.weekdayBar.value">
      <div
        v-for="day in dayNames"
        :class="classes.weekday.value"
        data-testid="weekday"
      >
        {{ day }}
      </div>
    </div>
    <div class="overflow-hidden">
      <transition
        :name="transition"
        mode="out-in"
      >
        <div
          :key="monthNames[month] + year"
          class="relative mb-2 grid grid-cols-7"
        >
          <template v-if="adjacentMonths">
            <div
              v-for="(day, index) in daysList.prevMonthDays"
              :key="index"
            >
              <div :class="[classes.day.value, variants.day.adjacentMonthDay]">
                {{ day }}
              </div>
            </div>
          </template>
          <div
            v-for="(d, index) in daysList.days"
            :key="index"
          >
            <a
              v-if="d"
              role="button"
              :class="getDayClass(d.date)"
              @click="handleDayClick(d.date, index)"
              @mouseenter="handleMouseOverDay(d)"
              :data-testid="isToday(d.date) ? 'today' : null"
            >
              <!-- @slot day -->
              <slot
                name="day"
                v-bind="d"
              >
                {{ d.day }}
              </slot>
            </a>
          </div>
          <template v-if="adjacentMonths">
            <div
              v-for="(day, index) in daysList.nextMonthDays"
              :key="index"
            >
              <div :class="[classes.day.value, variants.day.adjacentMonthDay]">
                {{ day }}
              </div>
            </div>
          </template>
        </div>
      </transition>
    </div>
    <div :class="classes.footer.value">
      {{ todayFormatted }}
    </div>
    <div
      v-if="buttons"
      class="flex justify-between pt-2"
    >
      <v-button
        v-bind="secondaryButton"
        @click="handleSecondaryButtonClick"
      >
        {{ secondaryButtonLabel }}
      </v-button>
      <v-button
        v-bind="primaryButton"
        @click="handlePrimaryButtonClick"
      >
        {{ primaryButtonLabel }}
      </v-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import vButton from "./vButton.vue";
import ChevronRight from "./icons/chevron-right.js";
import ChevronDoubleLeft from "./icons/chevron-double-left.js";
import ChevronDoubleRight from "./icons/chevron-double-right.js";
import ChevronLeft from "./icons/chevron-left.js";
import { pad, getNumberRange } from "../tools.js";
import { locales } from "../const";
import { sharedProps, sharedModProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("datepicker", [
    "Datepicker",
    "Button",
    "Date",
    "WeekdayBar",
    "Weekday",
    "Day",
    "Footer",
  ]),
  modelValue: {
    type: [String, Array],
    default: undefined,
  },
  locale: {
    type: String,
    default: defaultProps("datepicker", "locale", "en-GB"),
  },
  mondayFirstWeekday: {
    type: Boolean,
    default: defaultProps("datepicker", "mondayFirstWeekday", false),
  },
  range: {
    type: Boolean,
    default: false,
  },
  format: {
    type: Object,
    default: () => ({
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  },
  // disabled: {
  //   type: Array,
  //   default: [],
  // },
  width: {
    type: String,
    default: undefined,
  },
  adjacentMonths: {
    type: Boolean,
    default: defaultProps("datepicker", "adjacentMonths", true),
  },
  rangeHoverHighlight: {
    type: Boolean,
    default: true,
  },
  buttons: {
    type: Boolean,
    default: defaultProps("datepicker", "buttons", false),
  },
  secondaryButtonLabel: {
    type: String,
    default: defaultProps("datepicker", "secondaryButtonLabel", "Cancel"),
  },
  primaryButtonLabel: {
    type: String,
    default: defaultProps("datepicker", "primaryButtonLabel", "OK"),
  },
  primaryButton: {
    type: Object,
    default: defaultProps("datepicker", "primaryButton", {
      modButton: "variant:primary size:small",
    }),
  },
  secondaryButton: {
    type: Object,
    default: defaultProps("datepicker", "secondaryButton", {
      modButton: "variant:secondary size:small",
    }),
  },
  transition: {
    type: String,
    default: "fade",
  },
});

const emit = defineEmits([
  "update:modelValue",
  "update:formatted",
  "state:done",
  "input:cancel",
]);

let { datepicker } = inject("mods", {})

let elements = {
  datepicker: null,
  dateButton: {
    fixed: "flex flex-col justify-center leading-none focus:outline-none mx-auto"
  },
  date: null,
  weekdayBar: {
    fixed: "grid grid-cols-7"
  },
  weekday: null,
  day: {
    fixed: "block",
    externalVariants: ["variant"],
  },
  footer: null,
}

let { classes, variants } = useTailwindStyles(props, datepicker, elements)

let getDayClass = (date) => {
  // if (isDisabled(date)) return "text-gray-400";
  return [
    classes.day.value,
    (props.rangeHoverHighlight &&
      mouseOverRange.value &&
      isRangeSelected(date) &&
      variants.day.partiallySelected) ||
    ((isSelectedDay(date) ? variants.day.selected : null) ??
    (isToday(date) ? variants.day.today : null) ??
    variants.day.default),
  ];
};

let transition = ref("");

// today date
let today = new Date();
today.setHours(0, 0, 0, 0);

// current month and year
let month = ref(today.getMonth());
let year = ref(today.getFullYear());

// local models for range and single mode
let range = ref([]);
let single = ref("");

// current state of range selection
// (0 = not selected, 1 = from selected, 2 = from and to selected)
let rangeState = ref(0);

let mouseOverRange = ref(null);

// date utils
let getCountDaysInMonth = (y, m) => 32 - new Date(y, m, 32).getDate();

let parseDate = (d) => d.split("-").map((i) => +i);

let dateToString = (d) => {
  return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
};

let prevMonth = (m, y) => {
  return m - 1 < 0 ? { m: 11, y: y - 1 } : { m: m - 1, y };
};

let nextMonth = (m, y) => {
  return m + 1 > 11 ? { m: 0, y: y + 1 } : { m: m + 1, y };
};

let getFirstDay = (m, y) => {
  let d = new Date(m, y).getDay();
  return props.mondayFirstWeekday ? (6 + d) % 7 : d;
};

// get valid locale
let locale = computed(() => {
  if (!props.locale) return navigator.language;
  return locales.find((l) => props.locale === l) || "en-GB";
});

// get localized month names
let monthNames = computed(() => {
  return Array.from({ length: 12 }, (v, i) =>
    new Date(0, i, 1).toLocaleString(locale.value, {
      month: "short",
    })
  );
});

// get localized weekday names
let dayNames = computed(() =>
  Array.from({ length: 7 }, (v, i) =>
    new Date(2021, 1, props.mondayFirstWeekday ? i + 1 : i).toLocaleString(
      locale.value,
      {
        weekday: "short",
      }
    )
  )
);

// get localized today string
let todayFormatted = computed(() =>
  today.toLocaleDateString(locale.value, props.format)
);

// update and validate local model if modelValue changes
let dateRegexp = /^\d\d\d\d-\d?\d-\d?\d$/;

watch(
  () => props.modelValue,
  () => {
    let m = props.modelValue;
    if (!m) return;

    if (props.range) {
      if (m[0] && dateRegexp.test(m[0]) && m[1] && dateRegexp.test(m[1])) {
        range.value = m.map((d) => new Date(parseDate(d)));
        rangeState.value = 2;
        month.value = range.value[1].getMonth();
        year.value = range.value[1].getFullYear();
      }
    } else {
      if (dateRegexp.test(m)) {
        single.value = new Date(parseDate(m));
        month.value = single.value.getMonth();
        year.value = single.value.getFullYear();
      }
    }
  },
  { immediate: true }
);

watch(
  () => props.range,
  () => {
    reset();
  }
);

// generate days to display for current month
let daysList = computed(() => {
  let day = getFirstDay(year.value, month.value);
  let daysInMonth = getCountDaysInMonth(year.value, month.value);

  let days = getNumberRange(1, daysInMonth);
  days = days.map((i) => {
    return { day: i, date: new Date(year.value, month.value, i) };
  });

  if (!props.adjacentMonths) {
    days = [...Array(day).fill(""), ...days];
    return { days };
  }

  let { m, y } = prevMonth(month.value, year.value);
  let daysCountPrev = getCountDaysInMonth(y, m);
  let prevMonthDays = getNumberRange(daysCountPrev - day + 1, day);
  let nextMonthDays = getNumberRange(1, 42 - daysInMonth - day);
  return { prevMonthDays, days, nextMonthDays };
});

// emit date model after selecting
let emitSelection = (selected, formatted) => {
  emit("update:modelValue", selected);
  emit("update:formatted", formatted);
  emit("state:done");
};

let emitSelectionRange = () => {
  let from = dateToString(range.value[0]);
  let to = dateToString(range.value[1]);
  let formatted = [range.value[0], range.value[1]].map((i) =>
    i.toLocaleDateString(locale.value, props.format)
  );
  emitSelection([from, to], formatted);
};

let emitSelectionSingle = () => {
  if (!single.value) return;
  let formatted = single.value.toLocaleDateString(locale.value, props.format);
  emitSelection(dateToString(single.value), formatted);
};

let reset = () => {
  emit("update:modelValue", "");
  range.value = [];
  single.value = "";
};

// add date in range mode and update state
let addRangeDate = (d) => {
  if (rangeState.value == 2) {
    rangeState.value = 0;
    mouseOverRange.value = false;
  }
  range.value[rangeState.value] = new Date(d.getTime());
  rangeState.value++;
};

let getTransition = (d) => {
  return props.transition == "slide" ? "slide-" + d : props.transition;
};

// update current month and year
let setNextMonth = () =>
  ({ m: month.value, y: year.value } = nextMonth(month.value, year.value));

let setPrevMonth = () =>
  ({ m: month.value, y: year.value } = prevMonth(month.value, year.value));

let setNextYear = () => ++year.value;

let setPrevYear = () => --year.value;

// is* functions to check type of the day
let isDisabled = (index) =>
  props.disabled && props.disabled.findIndex((i) => i == index % 7) != -1;

let isSelectedDay = (date) => {
  if (!props.range) {
    return single.value && single.value.getTime() == date.getTime();
  } else {
    if (rangeState.value == 1) {
      return;
    }
    return range.value[0] <= date && date <= range.value[1];
  }
};

let isRangeSelected = (date) => {
  if (props.range && rangeState.value == 1)
    return (
      (mouseOverRange.value >= date && date >= range.value[0]) ||
      (mouseOverRange.value <= date && date <= range.value[0])
    );
};

let isFirstSelectedDay = (date) => {
  return model[0].getTime() == date.getTime();
};

let isLastSelectedDay = (date) => {
  return model[1].getTime() == date.getTime();
};

let isToday = (date) => today.getTime() == date.getTime();

// handle template events

let handleDayClick = function (date, index) {
  if (isDisabled(index)) return;
  if (props.range) {
    addRangeDate(date);
    if (rangeState.value == 2) {
      if (range.value[0] > range.value[1]) range.value.reverse();
      if (!props.buttons) emitSelectionRange();
    }
  } else {
    single.value = date;
    if (!props.buttons) emitSelectionSingle();
  }
};

let handleButtonClick = (d, t) => {
  transition.value = getTransition(d);

  if (d === "next") {
    if (t === "month") setNextMonth();
    else setNextYear();
  } else {
    if (t === "month") setPrevMonth();
    else setPrevYear();
  }
};

let handleMouseOverDay = (d) => {
  mouseOverRange.value = d.date;
};

let handlePrimaryButtonClick = () => {
  if (props.range) {
    if (rangeState.value == 2) emitSelectionRange();
  } else {
    emitSelectionSingle();
  }
};

let handleSecondaryButtonClick = () => emit("input:cancel");
</script>

<style scoped lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.12s ease;
}
.slide-prev-enter-from {
  transform: translateX(-100%);
}
.slide-prev-leave-to {
  transform: translateX(100%);
}

.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 0.12s ease;
}
.slide-next-enter-from {
  transform: translateX(100%);
}
.slide-next-leave-to {
  transform: translateX(-100%);
}
</style>
