<template>
  <div>
    <va-checkbox
      label="Toggle visibility"
      v-model="isCloseableAlertVisible"
      class="mb-4"
    />
    <va-alert
      v-model="isCloseableAlertVisible"
      closeable
      class="mb-4"
    >
      You read this important alert message with a default close icon.
    </va-alert>

    <va-alert
      color="info"
      v-model="isCloseableAlertVisible"
      closeable
      close-icon="info"
      class="mb-4"
    >
      You read this important alert message with a custom close icon.
    </va-alert>

    <va-alert
      color="warning"
      v-model="isCloseableAlertVisible"
      closeable
      close-text="close"
      class="mb-4"
    >
      You read this important alert message with a text instead of an icon.
    </va-alert>

    <va-alert
      color="success"
      v-model="isCloseableAlertVisible"
      closeable
      class="mb-4"
    >
      <template #close>
        close
      </template>
      You read this important alert message with a slotted text instead of an icon.
    </va-alert>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCloseableAlertVisible: true,
    }
  },
}
</script>
