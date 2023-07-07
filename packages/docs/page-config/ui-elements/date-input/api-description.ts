import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    modelValue: "Date, date array or date period",
    weekDays: "Adds days to the table",
    placeholder: "Sets input placeholder",
    config: "Object with settings for date picker",
    monthNames: "Array of 12 month names",
    weekdayNames: "Array of 7 weekday names",
    firstWeekday: "Name of first weekday. Can be `Monday` or `Sunday`",
    hideWeekDays: "Hide weekday names on top of day picker",
    view: "This prop specify which year and month will be shown to user. Also, you can specify type and show year, month or day picker",
    type: "This prop will specify which value user should choose",
    showOtherMonths: "If `true`, other month days will be shown in day picker",
    highlightWeekend: "If `true` weekend will be colored",
    highlightToday: "If `true` today date will be colored",
    allowedDays: "Function that accepts date and return `false` if day is not allowed",
    allowedMonths: "Function that accepts date and return `false` if month is not allowed",
    allowedYears: "Function that accepts date and return `false` if year is not allowed",
    weekends: "Function that accepts date and return `true` if date is weekend",
    startYear: "First year that user can choose. By default is 1970",
    endYear: "Last year that user can choose. By default is current year plus 50 years",
    weekendsColor: "Color of the weekend cells (theme string or HEX string).",
    mode: "Specify if picker value is single date, multiple dates or date range.",
    clearable: "Adds a button to reset the input field value",
    clearValue: "Default input field value",
    formatDate: "Function that accepts picker value and transforms it to the string",
    format: "Function that accepts picker value and should transform it to text for input",
    isOpen: "Value for dropdown. If `true`, then dropdown is shown",
    resetOnClose: "If true, range value will be reset to previous valid value",
    bordered: "Applies underscore",
    label: "Sets input label",
    mask: "Sets input mask if using as string or options for mask",
    color: "Sets input color",
    removable: "Adds an button that clears the value",
    tabindex: "Sets input tabindex",
    returnRaw: "Sets possibility to return raw value",
    autosize: "Sets textarea possibility to grow up automatically",
    minRows: "Minimal count of lines",
    maxRows: "Maximum count of lines",
    rules: "Accepts an array of functions that take an input value as an argument and return either true / false or a string with an error message",
    disabled: "Disable the input",
    readonly: "Puts input in readonly state",
    success: "Sets input state to success",
    messages: "Displays a list of messages or message if using a string",
    error: "Sets input state to error",
    errorMessages: "Displays a list of error messages or message if using a string",
    errorCount: "Number of error messages displayed",
    manualInput: "Allows user to manually input date in VaInput",
    parse: "Function that transforms input field text to date, date array or date period",
    parseDate: "Function that transforms input field text to date",
    parseValue: "Function that transforms string value to date, date array or date period",
    ariaLabel: "The aria-label of the anchor slot",
    ariaSelectedDateLabel: "The aria-label of the input of the component if aria-label is not set",
    closeOnAnchorClick: "Dropdown will be closed when anchor is clicked",
    closeOnContentClick: "Dropdown will be closed when clicked inside dropdown content",
    delimiter: "The delimiter used when turning model value to string",
    hoverOutTimeout: "Time in `ms` after mouse leave dropdown before it will be closed",
    hoverOverTimeout: "Time in `ms` after mouse enter dropdown before it will be opened",
    keepAnchorWidth: "If true, dropdown content will have exact same width as anchor",
    offset: "Dropdown content will be moved by main and cross axis according to current `placement`",
    placement: "Sets the placement of the dropdown content. [More about placements](/ui-elements/dropdown#placement-and-offset)",
    rangeDelimiter: "The delimiter used when turning model value to string",
    trigger: "Action that will triggered when open and close dropdown."
  },
  events: {
    clear: "Emitted if select value has been cleared",
    updateView: "The event is triggered when the component needs to change the view",
    updateMonth: "The event is triggered when the component needs to change the month",
    updateYear: "The event is triggered when the component needs to change the year",
    updateIsOpen: "The event is triggered when the component needs to toggle the 'is-open'",
    updateText: "The event is triggered when the component needs to change the input text",
    hoverDay: "The event is triggered when the mouse hover the day cell",
    hoverMonth: "The event is triggered when the mouse hover the month cell",
    hoverYear: "The event is triggered when the mouse hover the year cell",
    clickDay: "The event is triggered when clicked the day cell",
    clickMonth: "The event is triggered when clicked the month cell",
    clickYear: "The event is triggered when clicked the year cell"
  },
});
