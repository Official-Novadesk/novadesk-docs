<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    imageSrc: string
    imageAlt?: string
    imageWidth?: string
  }>(),
  {
    imageAlt: 'Illustration',
    imageWidth: '420px'
  }
)
</script>

<template>
  <section class="ltr-image-row">
    <div class="ltr-image-row__text">
      <slot />
    </div>
    <div class="ltr-image-row__image-wrap">
      <img
        class="ltr-image-row__image"
        :src="props.imageSrc"
        :alt="props.imageAlt"
        :style="{ maxWidth: props.imageWidth }"
      >
    </div>
  </section>
</template>

<style scoped>
.ltr-image-row {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 24px;
  align-items: center;
}

.ltr-image-row__text :deep(p:first-child) {
  margin-top: 0;
}

.ltr-image-row__text :deep(p:last-child) {
  margin-bottom: 0;
}

.ltr-image-row__image-wrap {
  display: flex;
  justify-content: flex-end;
}

.ltr-image-row__image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

@media (max-width: 960px) {
  .ltr-image-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .ltr-image-row__image-wrap {
    justify-content: flex-start;
  }
}
</style>
