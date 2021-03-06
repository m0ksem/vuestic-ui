<template>
  <div class="va-date-picker">
    <div :data-toggle="!disabled">
      <va-input
        v-model="valueProxy"
        readonly
        :placeholder="placeholder"
        :label="label"
        :disabled="disabled"
        :error="error"
        :success="success"
        :messages="messages"
        :error-messages="errorMessages"
      >
        <template #append>
          <va-icon
            color="gray"
            name="calendar_today"
          />
        </template>
      </va-input>
    </div>
    <vue-flatpickr-component
      class="va-date-picker__flatpickr"
      v-model="valueProxy"
      :config="fullConfig"
      :disabled="disabled"
      @on-open="onOpen"
      data-input
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
// @ts-ignore
import VueFlatpickrComponent from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import VaInput from '../va-input'
import VaIcon from '../va-icon'

class DatePickerProps {
  modelValue = prop<string | Record<string, unknown> | number>({
    type: [String, Object, Number],
    default: '',
  })

  weekDays = prop<boolean>({
    type: Boolean,
    default: false,
  })

  placeholder = prop<string>({
    type: String,
    default: '',
  })

  label = prop<string>({
    type: String,
    default: '',
  })

  disabled = prop<boolean>({
    type: Boolean,
    default: false,
  })

  error = prop<boolean>({
    type: Boolean,
    default: false,
  })

  success = prop<boolean>({
    type: Boolean,
    default: false,
  })

  messages = prop<any[]>({
    type: Array,
    default: () => [],
  })

  errorMessages = prop<any[]>({
    type: Array,
    default: () => [],
  })

  config = prop<Record<string, unknown>>({
    type: Object,
    default: () => undefined,
  })
}

const DatePickerPropsMixin = Vue.with(DatePickerProps)

@Options({
  name: 'VaDatePicker',
  components: {
    VaInput,
    VueFlatpickrComponent,
    VaIcon,
  },
  emits: ['update:modelValue'],
})
export default class VaDatePicker extends mixins(DatePickerPropsMixin) {
  isOpen = false

  get valueProxy () {
    return this.modelValue
  }

  set valueProxy (value) {
    if (!this.disabled) {
      this.$emit('update:modelValue', value)
    }
  }

  get fullConfig () {
    return Object.assign({}, this.defaultConfig, this.config)
  }

  get defaultConfig () {
    return {
      wrap: true,
      nextArrow: '<span aria-hidden="true" class="ion ion-ios-arrow-forward"/>', // TODO: Need to change on material-icons
      prevArrow: '<span aria-hidden="true" class="ion ion-ios-arrow-back"/>', // TODO: Need to change on material-icons
      disableMobile: true, // doesn't work without this one at all
    }
  }

  onOpen (selectedDates: any, dateStr: any, pcrObject: { calendarContainer: any }) {
    const calendar = pcrObject.calendarContainer
    if (this.weekDays) {
      calendar.classList.add('flatpickr-calendar--show-days')
    }
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';
@import 'variables';

$datepickerActiveBackground: $vue-darkest-blue;
$datepickerActiveColor: $vue-green;
$datepickerBackground: $light-gray3;
$datepickerText: $vue-darkest-blue;

$datepickerToday: lighten($datepickerBackground, 5);
$datepickerOtherMonth: darken($datepickerText, 40);
$datepickerWeekday: $brand-secondary;
$datepickerDayHover: $vue-darkest-blue;
$datepickerDayRange: $vue-green;
$datepickerSeparatorColor: $separator-color;

$borderPadding: 0.5rem;
$dayPadding: 0.375rem;
$daySize: 2rem;
$dayMargin: 0.6rem;

.va-date-picker {
  position: var(--va-date-picker-position);

  &__container {
    display: var(--va-date-picker-container-display);
    position: var(--va-date-picker-container-position);
    flex-wrap: var(--va-date-picker-container-flex-wrap);
  }

  &__flatpickr {
    position: absolute;
    visibility: hidden;
    top: 0;
    left: 0;
    height: 100%;
  }

  &__icon {
    position: var(--va-date-picker-icon-position);
    right: var(--va-date-picker-icon-right);
    top: var(--va-date-picker-icon-top);
    border-radius: var(--va-date-picker-icon-border-radius);
    border-bottom: var(--va-date-picker-icon-border-bottom);
    color: var(--va-date-picker-icon-color);
    padding: var(--va-date-picker-icon-padding);
    height: var(--va-date-picker-icon-height);
    cursor: var(--va-date-picker-icon-cursor);
    background-color: var(--va-date-picker-icon-background-color);
    width: var(--va-date-picker-icon-width);
  }

  i + i {
    margin-left: 0.5rem;
  }
}

.flatpickr-calendar {
  border-radius: 0.5rem;
  max-width: $daySize * 7 + ($dayPadding + $dayMargin * 2) * 6 + $borderPadding * 2;
  width: 100%;
  background-color: $datepickerBackground;
  box-shadow: $datepicker-box-shadow;

  &:not(.inline) {
    @include media-breakpoint-only(xs) {
      max-width: 18rem;
    }
  }

  &:not(.flatpickr-calendar--show-days) {
    .flatpickr-weekdays {
      display: none;
    }
  }

  .flatpickr-rContainer {
    padding: 0.25rem 0;
  }

  .flatpickr-days {
    width: 100%;
    display: block;

    .dayContainer {
      width: 100%;
      max-width: 100%;
      min-width: 240px;

      .flatpickr-day {
        @include va-flex-center();

        height: $daySize;
        line-height: 1.7;
        font-size: 1rem;
        flex: 0 0 $daySize;
        margin: 0.25rem calc((100% - 2rem * 7) / 14);
        border: none;
        color: $datepickerText;

        &.today {
          color: $datepickerActiveBackground;

          &.selected {
            color: $datepickerActiveColor;
          }
        }

        &:hover {
          background-color: $datepickerDayHover;
          color: $vue-green;
        }

        &.selected {
          background-color: $datepickerActiveBackground;
          color: $datepickerActiveColor;

          &:hover {
            color: $datepickerActiveColor;
          }
        }

        &.nextMonthDay,
        &.prevMonthDay {
          color: $brand-secondary;

          &.startRange {
            background-color: $datepickerDayHover;
          }

          &.endRange {
            background-color: $datepickerDayHover;
          }
        }

        &.disabled {
          color: $brand-secondary;

          &:hover {
            background-color: inherit;
          }
        }

        &.startRange,
        &.endRange,
        &.inRange {
          border-radius: 2rem;
          box-shadow: none;
        }

        &.startRange,
        &.endRange {
          background-color: $datepickerActiveBackground;
          color: $datepickerActiveColor;
        }

        &.inRange {
          color: $datepickerDayRange;
          background-color: $light-gray3;
        }
      }
    }
  }

  .numInputWrapper span {
    border: none;

    &.arrowUp,
    &.arrowDown {
      &:hover {
        background: none;
      }
    }

    &.arrowUp::after {
      border-style: solid;
      border-width: 0 0.25rem 0.25rem 0.25rem;
      border-color: transparent transparent $datepickerActiveColor transparent;
    }

    &.arrowDown::after {
      border-style: solid;
      border-width: 0.25rem 0.25rem 0 0.25rem;
      border-color: $datepickerActiveColor transparent transparent transparent;
    }
  }

  .flatpickr-months {
    height: 2.625rem;
    border-bottom: solid 0.0625rem $datepickerSeparatorColor;

    .flatpickr-month {
      height: 100%;

      .flatpickr-current-month {
        padding-top: 0.625rem;
        color: $datepickerText;
        background-color: $datepickerBackground;

        .cur-month {
          font-size: 1rem;
          font-weight: inherit;

          &:hover {
            background-color: $datepickerBackground;
          }
        }

        .cur-year {
          font-size: 1rem;
        }

        .numInputWrapper {
          border: 0;

          &:hover {
            background-color: $datepickerBackground;
          }

          .numInput.cur-year {
            color: $vue-darkest-blue;
          }
        }
      }
    }

    .flatpickr-prev-month,
    .flatpickr-next-month {
      height: 2.625rem;
      width: 1.625rem;

      @include va-flex-center();

      padding: 0;
      color: $brand-secondary;

      &:hover {
        color: $datepickerActiveBackground;
      }
    }
  }

  .flatpickr-innerContainer {
    overflow-x: auto;
  }

  .flatpickr-weekdays {
    &--hidden {
      display: none;
    }

    .flatpickr-weekdaycontainer {
      .flatpickr-weekday {
        color: $datepickerWeekday;
        text-transform: uppercase;
        font-weight: $font-weight-bold;
        font-size: 0.625rem;
      }
    }
  }

  .flatpickr-weekwrapper {
    .flatpickr-weekday {
      text-transform: uppercase;
      letter-spacing: 0.0625rem;
      color: $datepickerWeekday;
      font-weight: $font-weight-bold;
      font-size: 0.6875rem;
    }

    .flatpickr-weeks {
      box-shadow: 2px 0 0 $datepickerSeparatorColor;
      padding-bottom: $borderPadding;
      margin-top: -$dayPadding;

      .flatpickr-day {
        height: $daySize;
        line-height: 1.7;
        font-size: 1rem;
        flex: 0 0 $daySize;
        margin-top: $dayPadding;
        color: $datepickerOtherMonth;
      }
    }
  }

  &.showTimeInput.hasTime .flatpickr-time {
    border-top: solid 0.0625rem $datepickerSeparatorColor;
    height: 3rem;
    max-height: 3rem;

    .numInputWrapper {
      &:hover {
        background-color: $datepickerBackground;
      }

      .flatpickr-hour {
        margin-left: 1rem;
        width: 6rem;
        padding-left: 0.5rem;
        font-weight: inherit;
        text-align: left;
        background-color: $datepickerBackground;
        border-bottom: 1px solid $brand-secondary;
      }

      .flatpickr-minute {
        margin-left: 1rem;
        width: 6rem;
        padding-left: 0.5rem;
        text-align: left;
        background-color: $datepickerBackground;
        border-bottom: 1px solid $brand-secondary;
      }

      .numInput {
        &:hover,
        &:focus {
          background: $datepickerBackground;
        }
      }

      span {
        margin-right: 0.5rem;
        height: calc(50% - 10px);

        &.arrowUp {
          margin-top: 10px;
        }
      }
    }

    .flatpickr-time-separator {
      color: $datepickerText;
      display: none;
    }

    .flatpickr-am-pm {
      color: $datepickerText;
      padding-top: 0.5rem;
      padding-left: 0.5rem;
      margin-left: 1rem;
      margin-bottom: 1rem;
      margin-right: 1.5rem;
      width: 6rem;
      text-align: left;
      background-color: $datepickerBackground;
      border-bottom: 1px solid $brand-secondary;
    }
  }
}
</style>
