<template>
  <VaModal
    v-model="modelValue"
    hide-default-actions
    no-padding
    close-button
    :mobile-fullscreen="false"
    class="request-audit-modal landing"
    @close="emit('close')"
  >
    <template #content>
      <div class="request-audit-modal__inner flex grow modal">
        <div class="request-audit-modal__content">
          <RequestAuditForm />
        </div>
        <div class="request-audit-modal__image">
          <img src="/landing/modals/request-audit.png" alt="Code audit bundle">
        </div>
      </div>
    </template>
  </VaModal>
</template>

<script setup lang='ts'>
import RequestAuditForm from '../forms/RequestAuditForm.vue'

const modelValue = defineModel<boolean>()

const emit = defineEmits<{
  (e: "close"): void;
}>()
</script>

<style lang="scss" scoped>
@use "@/assets" as *;

:global(.request-audit-modal .va-modal__close) {
  color: var(--va-on-primary);

  @include xs(color, var(--va-secondary));
}

.request-audit-modal {
  &__content {
    padding: 40px;
    overflow: hidden;

    @include xs(padding, 32px);
  }

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2450be;
    flex-basis: 45%;
    flex-shrink: 0;
    @include xs(display, none);
  }
}
</style>
