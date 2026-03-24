<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  href?: string
  text?: string
  theme?: 'filled' | 'outline'
}>(), {
  theme: 'filled',
  href: '#'
})

const classes = computed(() => {
  return [
    'custom-button',
    `custom-button--${props.theme}`
  ]
})
</script>

<template>
  <a :href="href" :class="classes">
    <slot>{{ text }}</slot>
  </a>
</template>

<style scoped>
.custom-button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  cursor: pointer;
  padding: 0 20px;
  line-height: 38px;
  border-radius: 20px;
  font-size: 14px;
  text-decoration: none !important;
  margin-right: 12px;
}

.custom-button:last-child {
  margin-right: 0;
}

.custom-button--filled {
  color: #1e1e20;
  background-color:rgb(103, 115, 217);
  border-color:rgb(33, 38, 82);
}

.custom-button--filled:hover {
  background-color: #8c97ff;
  border-color: #8c97ff;
  color: #1e1e20;
}

.dark .custom-button--filled {
  color: #ffffff;
}

.dark .custom-button--filled:hover {
  color: #ffffff;
}

.custom-button--outline {
  color: #A8B1FF;
  background-color: transparent;
  border-color: #A8B1FF;
}


.custom-button--outline:hover {
  border-color: #8c97ff;
  color: #8c97ff;
  background-color: rgba(168, 177, 255, 0.1);
}

.dark .custom-button--outline {
  color: #A8B1FF;
  border-color: #A8B1FF;
}

</style>
