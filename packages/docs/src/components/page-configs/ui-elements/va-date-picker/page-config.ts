import { ApiDocsBlock } from '../../../../types/configTypes'
import VaDatePicker from 'vuestic-ui/src/components/vuestic-components/va-date-picker/VaDatePicker.vue'
import apiOptions from './api-options'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('datePicker.title'),

  DocsHelper.subtitle('all.examples'),

  // examples
  ...DocsHelper.exampleBlock(
    'datePicker.examples.default.title',
    'datePicker.examples.default.text',
    'va-date-picker/Default',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.mode.title',
    'datePicker.examples.mode.text',
    'va-date-picker/Mode',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.stateful.title',
    'datePicker.examples.stateful.text',
    'va-date-picker/Stateful',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.firstWeekday.title',
    'datePicker.examples.firstWeekday.text',
    'va-date-picker/FirstWeekday',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.weekends.title',
    'datePicker.examples.weekends.text',
    'va-date-picker/Weekends',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.otherMonths.title',
    'datePicker.examples.otherMonths.text',
    'va-date-picker/OtherMonths',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.slots.title',
    'datePicker.examples.slots.text',
    'va-date-picker/Slots',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.view.title',
    'datePicker.examples.view.text',
    'va-date-picker/View',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.type.title',
    'datePicker.examples.type.text',
    'va-date-picker/Type',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.disabledDates.title',
    'datePicker.examples.disabledDates.text',
    'va-date-picker/DisabledDates',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.colors.title',
    'datePicker.examples.colors.text',
    'va-date-picker/Color',
  ),

  DocsHelper.api(VaDatePicker, apiOptions),
] as ApiDocsBlock[]
