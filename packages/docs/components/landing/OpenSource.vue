<template>
  <section
    class="opensource"
    :style="{ color: textColor }"
  >
    <div class="opensource__wrapper">
      <div class="opensource__inner">
        <div class="opensource__info">
          <h2 class="opensource__title">
            Open Source
          </h2>

          <div class="opensource__text">
            Vuestic UI is forever free and open to contributions. See our
            <a
              href="https://github.com/epicmaxco/vuestic-ui/issues"
              target="_blank"
            >
              issues
            </a>,
            <RouterLink to="/contribution/documentation-page">
              contributing guide
            </RouterLink>
            and
            <a
              href="https://discord.gg/u7fQdqQt8c"
              target="_blank"
            >
              discord server
            </a>
            to help us improve Vuestic UI experience.
          </div>
        </div>

        <div class="opensource__actions">
          <img
            src="/landing/image-open-source.png"
            alt="Open source"
            height="446"
            width="632"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useElementTextColor } from 'vuestic-ui'

const textColor = useElementTextColor('background-primary')
</script>

<style lang="scss" scoped>
@use "@/assets" as *;

.opensource {
  $section-padding: 5rem 0 7rem;
  $section-xs-padding: 3.5rem 0 4rem;

  width: 100%;
  position: relative;
  padding: $section-padding;
  background-color: var(--va-background-secondary);

  @include xs(padding, $section-xs-padding);

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    align-items: center;

    @include row-flex();
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include col();
    @include size(5);
    @include shift-left(1);
    @include size-sm(12);
    @include shift-sm-left(0);
  }

  &__title {
    width: 100%;

    @include subtitle-font();
    @include sm(text-align, center);
  }

  &__text {
    margin-top: 1.5rem;
    max-width: 35rem;

    @include text-font();
    @include sm(text-align, center);
  }

  &__actions {
    @include col();
    @include size(6);
    @include sm(display, none);

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
