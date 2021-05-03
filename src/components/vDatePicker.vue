<template>
  <div :class="classes.datepicker.value" :style="{ width: width }">
    <div class="grid grid-cols-6 grid-flow-col my-2">
      <button
        class="btn-prev-double"
        :class="classes.button.value"
        @click="prevYear"
      ></button>
      <button
        class="btn-prev"
        :class="classes.button.value"
        @click="handleClickPrevMonth"
      ></button>
      <div class="col-span-2 text-sm font-bold">
        <span class="align-middle"> {{ months[month] }} {{ year }} </span>
      </div>
      <button
        class="btn-next"
        :class="classes.button.value"
        @click="handleClickNextMonth"
      ></button>
      <button
        class="btn-next-double"
        :class="classes.button.value"
        @click="nextYear"
      ></button>
    </div>
    <div class="grid grid-cols-7 mb-2">
      <div v-for="day in days" class="text-sm font-bold p-0">
        {{ day }}
      </div>
    </div>
    <transition name="fade" @after-leave="afterLeaveTransition">
      <div v-if="!isChanging" class="grid grid-cols-7 mb-2 relative">
        <template v-if="adjecentMonths">
          <div v-for="(day, index) in daysList.prevMonthDays" :key="index">
            <div :class="classes.adjecentMonthDay.value">
              {{ day }}
            </div>
          </div>
        </template>
        <div v-for="(d, index) in daysList.i" :key="index">
          <a
            v-if="d"
            @click="handleDayClick(d.date, index)"
            @mouseenter="mouseOverRange = d.date"
            :class="getDayClass(d.date)"
          >
            {{ d.day }}
          </a>
        </div>
        <template v-if="adjecentMonths">
          <div v-for="(day, index) in daysList.nextMonthDays" :key="index">
            <div :class="classes.adjecentMonthDay.value">
              {{ day }}
            </div>
          </div>
        </template>
      </div>
    </transition>
    <div :class="classes.footer.value">
      {{ todayFormatted }}
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, getCurrentInstance } from "vue";
import useStyles from "../use-styles";
import { removeTailwindClasses } from "../tools.js";

export default {
  props: {
    modelValue: [String, Array],
    locale: { type: String, default: "en-GB" },
    euro: { type: Boolean, default: false },
    range: { type: Boolean, default: false },
    format: {
      type: Object,
      default: () => ({
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    disabled: Array,
    width: { type: String, default: undefined },
    adjecentMonths: { type: Boolean, default: false },
    name: { type: String, default: "datepicker" },
    datepicker: { type: String, default: "default" },
    button: { type: String, default: "default" },
    day: { type: String, default: "default" },
    daySelected: { type: String, default: "default" },
    today: { type: String, default: "default" },
    adjecentMonthDay: { type: String, default: "default" },
    footer: { type: String, default: "default" },
  },
  setup(props, { emit }) {
    let elements = [
      "datepicker",
      "button",
      "day",
      "daySelected",
      "today",
      "footer",
      "adjecentMonthDay",
    ];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClass = {
      button: [
        "flex",
        "flex-col",
        "justify-center",
        "leading-none",
        "focus:outline-none",
        "mx-auto",
      ],
      day: ["block"],
      daySelected: ["block"],
      today: ["block"],
    };

    let classes = {
      datepicker: computed(() => {
        let c = [...styles.datepicker.value];
        return removeTailwindClasses(c);
      }),
      button: computed(() => {
        let c = [...fixedClass.button, ...styles.button.value];
        return removeTailwindClasses(c);
      }),
      day: computed(() => {
        let c = [...fixedClass.day, ...styles.day.value];
        return removeTailwindClasses(c);
      }),
      daySelected: computed(() => {
        let c = [...fixedClass.daySelected, ...styles.daySelected.value];
        return removeTailwindClasses(c);
      }),
      today: computed(() => {
        let c = [...fixedClass.today, ...styles.today.value];
        return removeTailwindClasses(c);
      }),
      adjecentMonthDay: computed(() => {
        let c = [...styles.adjecentMonthDay.value];
        return removeTailwindClasses(c);
      }),
      footer: computed(() => {
        let c = [...styles.footer.value];
        return removeTailwindClasses(c);
      }),
    };

    let getDayClass = (date) => {
      if (mouseOverRange.value && isRangeSelected(date))
        return classes.daySelected.value;
      if (isSelectedDay(date)) return classes.daySelected.value;
      if (isToday(date)) return classes.today.value;
      if (isDisabled(date)) return "text-gray-400";
      return classes.day.value;
    };

    let daysMonth = Array.from({ length: 31 }, (v, i) => i + 1);
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let month = ref(today.getMonth());
    let year = ref(today.getFullYear());
    let range = ref([]);
    let model = [];
    let dateRegexp = /^\d\d\d\d-\d?\d-\d?\d$/;
    let isChanging = ref(false);
    let afterTransitionCall = null;
    let mouseOverRange = ref(null);

    let getCountDaysInMonth = (y, m) => 32 - new Date(y, m, 32).getDate();

    let prevMonth = (m, y) =>
      m - 1 < 0 ? { m: 11, y: y - 1 } : { m: m - 1, y };

    let nextMonth = (m, y) =>
      m + 1 > 11 ? { m: 0, y: y + 1 } : { m: m + 1, y };

    let parseDate = (d) => d.split("-").map((i) => +i);

    let pad = (d) => (d < 10 ? "0" + d : d);

    let dateToString = (d) =>
      [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");

    let todayFormatted = computed(() =>
      today.toLocaleDateString(props.locale, props.format)
    );

    let months = computed(() => {
      return Array.from({ length: 12 }, (v, i) =>
        new Date(0, i, 1).toLocaleString(props.locale, {
          month: "short",
        })
      );
    });

    let days = computed(() =>
      Array.from({ length: 7 }, (v, i) =>
        new Date(2021, 1, props.euro ? i + 1 : i).toLocaleString(props.locale, {
          weekday: "short",
        })
      )
    );

    watch(
      () => props.modelValue,
      () => {
        let m = props.modelValue;
        if (!m) {
          model = [];
          return;
        }
        if (props.range) {
          if (m[0] && dateRegexp.test(m[0]) && m[1] && dateRegexp.test(m[1])) {
            model = m.map((d) => new Date(parseDate(d)));
          }
        } else {
          if (dateRegexp.test(m)) model[0] = new Date(parseDate(m));
        }
        if (model.length) {
          month.value = model[props.range ? 1 : 0].getMonth();
          year.value = model[props.range ? 1 : 0].getFullYear();
        }
      }
    );

    let daysList = computed(() => {
      let start = new Date(year.value, month.value).getDay();
      if (props.euro) start = (7 + (start - 1)) % 7;
      let daysInMonth = getCountDaysInMonth(year.value, month.value);
      let i = Array.from({ length: daysInMonth }, (v, i) => {
        return { day: i + 1, date: new Date(year.value, month.value, i + 1) };
      });
      if (props.adjecentMonths) {
        let { m, y } = prevMonth(month.value, year.value);
        let daysPrev = getCountDaysInMonth(y, m);
        let prevMonthDays = daysMonth.slice(daysPrev - start, daysPrev);
        let nextMonthDays = daysMonth.slice(0, 42 - daysInMonth - start);
        return { prevMonthDays, nextMonthDays, i };
      }
      return { i: [...Array(start).fill(""), ...i] };
    });

    let handleDayClick = function (date, index) {
      if (isDisabled(index)) return;
      if (props.range) {
        range.value.push(new Date(date.getTime()));
        if (range.value.length == 2) {
          if (range.value[0] > range.value[1]) range.value.reverse();
          let from = dateToString(range.value[0]);
          let to = dateToString(range.value[1]);
          let formattedRange = [range.value[0], range.value[1]].map((i) =>
            i.toLocaleDateString(props.locale, props.format)
          );
          range.value.length = 0;
          emit("update:modelValue", [from, to]);
          emit("input:formatted", formattedRange);
          emit("state:done");
        }
      } else {
        let d = new Date(date.getTime());
        let formatted = d.toLocaleDateString(props.locale, props.format);
        emit("update:modelValue", dateToString(d));
        emit("input:formatted", formatted);
        emit("state:done");
      }
    };

    let handleClickNextMonth = () => {
      isChanging.value = true;
      afterTransitionCall = setNextMonth;
    };

    let handleClickPrevMonth = () => {
      isChanging.value = true;
      afterTransitionCall = setPrevMonth;
    };

    let afterLeaveTransition = () => {
      afterTransitionCall();
      isChanging.value = false;
    };

    let setNextMonth = () =>
      ({ m: month.value, y: year.value } = nextMonth(month.value, year.value));

    let setPrevMonth = () =>
      ({ m: month.value, y: year.value } = prevMonth(month.value, year.value));

    let nextYear = () => ++year.value;

    let prevYear = () => --year.value;

    let isDisabled = (index) =>
      props.disabled && props.disabled.findIndex((i) => i == index % 7) != -1;

    let isSelectedDay = (date) => {
      if (!props.range) {
        return model.length && model[0].getTime() == date.getTime();
      } else {
        if (range.value.length == 1) {
          return range.value[0].getTime() == date.getTime();
        }
        if (model.length != 2 || !date) return;
        return model[0] <= date && date <= model[1];
      }
    };

    let isRangeSelected = (date) => {
      if (props.range && range.value.length == 1)
      return mouseOverRange.value >= date && date >= range.value[0] ||
      mouseOverRange.value <= date && date <= range.value[0]
    }

    let isFirstSelectedDay = (date) => {
      if (model.length != 2 || !date) return;
      return model[0].getTime() == date.getTime();
    };

    let isLastSelectedDay = (date) => {
      if (model.length != 2 || !date) return;
      return model[1].getTime() == date.getTime();
    };

    let isToday = (date) => today.getTime() == date.getTime();

    return {
      classes,
      getDayClass,
      isRangeSelected,
      mouseOverRange,
      daysList,
      month,
      year,
      todayFormatted,
      nextYear,
      prevYear,
      isDisabled,
      months,
      days,
      handleDayClick,
      handleClickNextMonth,
      handleClickPrevMonth,
      afterLeaveTransition,
      isChanging,
    };
  },
};
</script>

<style scoped>
.btn-prev-double:before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-double-left' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3E%3Cpath fill-rule='evenodd' d='M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E");
  max-height: 16px;
}
.btn-next-double:before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-double-right' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z'/%3E%3Cpath fill-rule='evenodd' d='M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
  max-height: 16px;
}
.btn-next:before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-right' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
  max-height: 16px;
}
.btn-prev:before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-left' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E");
  max-height: 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
