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
        <span class="align-middle">
          {{ months[month] }} {{ year }}
        </span>
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
      <div v-show="!isChanging" class="grid grid-cols-7 mb-2">
        <template v-if="adjecentMonths">
          <div
            v-for="(day, index) in daysList.prevMonthDays"
            class="px-1 py-1"
            :key="index"
          >
            <div :class="classes.adjecentMonthDay.value">
              {{ day }}
            </div>
          </div>
        </template>
        <div
          v-for="(day, index) in daysList.i"
          class="px-1 py-1"
          @click="handleDayClick(day, index)"
          :key="index"
        >
          <a v-if="day" :class="getDayClass(day)">
            {{ day }}
          </a>
        </div>
        <template v-if="adjecentMonths">
          <div
            v-for="(day, index) in daysList.nextMonthDays"
            class="px-1 py-1"
            :key="index"
          >
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
import { ref, computed, watch, getCurrentInstance } from "vue";
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

    let getDayClass = (day) => {
      if (isSelectedDay(day)) return classes.daySelected.value;
      if (isToday(day)) return classes.today.value;
      if (isDisabled(day)) return "text-gray-400";
      return classes.day.value;
    };

    let date = new Date();
    let today = ref([date.getFullYear(), date.getMonth(), date.getDate()]);
    let todayFormatted = date.toLocaleDateString(props.locale, props.format);
    let daysMonth = Array.from({ length: 31 }, (v, i) => i + 1);
    let month = ref(today.value[1]);
    let year = ref(today.value[0]);
    let range = ref([]);
    let model = ref([]);
    let dateRegexp = /^\d\d\d\d-\d?\d-\d?\d$/;
    let isChanging = ref(false);
    let afterTransitionCall = null;

    let getCountDaysInMonth = (y, m) => 32 - new Date(y, m, 32).getDate();
    let totalDays = (i) => i[2] + i[1] * 31 + i[0] * 372;
    let addLeadingZero = (d) => ("" + d).padStart(2, "0");
    let getPrevMonth = (m) => (m - 1 < 0 ? 11 : m - 1);
    let getNextMonth = (m) => (m + 1 > 11 ? 0 : m + 1);

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
        if (!props.modelValue) {
          model.value = [];
          return;
        }
        if (props.range) {
          if (
            props.modelValue[0] &&
            dateRegexp.test(props.modelValue[0]) &&
            props.modelValue[1] &&
            dateRegexp.test(props.modelValue[1])
          )
            model.value = props.modelValue.map((i) =>
              i.split("-").map((i) => +i)
            );
        } else {
          if (dateRegexp.test(props.modelValue))
            model.value = [props.modelValue.split("-").map((i) => +i)];
        }
        if (model.value.length) {
          month.value = model.value[props.range ? 1 : 0][1] - 1;
          year.value = model.value[props.range ? 1 : 0][0];
        }
      }
    );

    let daysList = computed(() => {
      let start = new Date(year.value, month.value).getDay();
      if (props.euro) start = (7 + (start - 1)) % 7;
      let daysInMonth = getCountDaysInMonth(year.value, month.value);
      let i = daysMonth.slice(0, daysInMonth);
      if (props.adjecentMonths) {
        let prevMonth = getPrevMonth(month.value);
        let prevYear = prevMonth == 11 ? year.value - 1 : year.value;
        let daysPrev = getCountDaysInMonth(prevYear, prevMonth);
        let prevMonthDays = daysMonth.slice(daysPrev - start, daysPrev);
        let nextMonthDays = daysMonth.slice(0, 42 - daysInMonth - start);
        return { prevMonthDays, nextMonthDays, i };
      }
      return { i: [...Array(start).fill(""), ...i] };
    });

    let handleDayClick = function(day, index) {
      if (isDisabled(index)) return;
      if (props.range) {
        range.value.push([year.value, month.value + 1, day]);
        if (range.value.length == 2) {
          if (totalDays(range.value[0]) > totalDays(range.value[1]))
            range.value.reverse();
          let from = range.value[0].map(addLeadingZero).join("-");
          let to = range.value[1].map(addLeadingZero).join("-");
          let formattedRange = [
            new Date(...range.value[0]),
            new Date(...range.value[1]),
          ].map((i) => i.toLocaleDateString(props.locale, props.format));
          range.value.length = 0;
          emit("update:modelValue", [from, to]);
          emit("input:formatted", formattedRange);
          emit("state:done");
        }
      } else {
        let m = addLeadingZero(month.value + 1);
        let d = addLeadingZero(day);
        let formatted = new Date(
          year.value,
          month.value,
          day
        ).toLocaleDateString(props.locale, props.format);
        emit("update:modelValue", `${year.value}-${m}-${d}`);
        emit("input:formatted", formatted);
        emit("state:done");
      }
    };

    let handleClickNextMonth = () => {
      isChanging.value = true;
      afterTransitionCall = nextMonth;
    };

    let handleClickPrevMonth = () => {
      isChanging.value = true;
      afterTransitionCall = prevMonth;
    };

    let afterLeaveTransition = () => {
      afterTransitionCall();
      isChanging.value = false;
    };

    let nextMonth = () => {
      month.value = getNextMonth(month.value);
      if (month.value == 0) nextYear();
    };

    let prevMonth = () => {
      month.value = getPrevMonth(month.value);
      if (month.value == 11) prevYear();
    };

    let nextYear = () => ++year.value;

    let prevYear = () => --year.value;

    let isDisabled = (index) =>
      props.disabled && props.disabled.findIndex((i) => i == index % 7) != -1;

    let isSelectedDay = (day) => {
      if (!props.range) {
        return (
          model.value.length &&
          model.value[0][2] == day &&
          model.value[0][1] == month.value + 1 &&
          model.value[0][0] == year.value
        );
      } else {
        if (range.value.length == 1) {
          return (
            range.value[0][2] == day &&
            range.value[0][1] == month.value + 1 &&
            range.value[0][0] == year.value
          );
        }
        if (model.value.length != 2 || !day) return;
        let i = day + (month.value + 1) * 31 + year.value * 372;
        return totalDays(model.value[0]) <= i && i <= totalDays(model.value[1]);
      }
    };

    let isToday = (day) =>
      today.value[2] == day &&
      today.value[1] == month.value &&
      today.value[0] == year.value;

    return {
      classes,
      getDayClass,
      daysList,
      month,
      year,
      today,
      todayFormatted,
      nextYear,
      prevYear,
      isDisabled,
      months,
      days,
      isSelectedDay,
      isToday,
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
  transition: opacity 0.1s ease;
}
.fade-enter-from {
  opacity: 0;
  /* transform: translateX(50px); */
}
.fade-leave-to {
  opacity: 0;
  /* transform: translateX(-50px); */
}
</style>
