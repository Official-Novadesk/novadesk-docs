<template>
  <div class="tabs-component">
    <div class="tabs-header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-button', { active: activeTab === index }]"
        @click="activeTab = index"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tabs-content">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="activeTab === index"
        class="tab-content"
        v-html="tab.content"
      >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Tab {
  label: string
  content: string
}

const props = defineProps<{
  tabsData: Array<{ label: string; content: string }>
}>()

const activeTab = ref(0)
const tabs = ref<Tab[]>([])

onMounted(() => {
  tabs.value = props.tabsData || []
  if (tabs.value.length > 0) {
    activeTab.value = 0
  }
})
</script>

<style scoped>
.tabs-component {
  margin: 1rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  background-color: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab-button {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  text-align: center;
}

.tab-button:hover {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.tab-button.active {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  border-bottom: 2px solid var(--vp-c-brand-1);
}

.tabs-content {
  background-color: var(--vp-c-bg);
  padding: 1rem;
}

.tab-content {
  min-height: 100px;
}

.tab-content :deep(pre) {
  margin: 0;
  border-radius: 6px;
}

.tab-content :deep(code) {
  font-size: 0.875rem;
}

/* Dark mode support */
.dark .tabs-component {
  border-color: var(--vp-c-divider-dark-2);
}

.dark .tabs-header {
  background-color: var(--vp-c-bg-soft-dark);
  border-bottom-color: var(--vp-c-divider-dark-2);
}

.dark .tab-button {
  color: var(--vp-c-text-dark-2);
}

.dark .tab-button:hover {
  background-color: var(--vp-c-bg-mute-dark);
  color: var(--vp-c-text-dark-1);
}

.dark .tab-button.active {
  background-color: var(--vp-c-bg-dark);
  color: var(--vp-c-brand-dark);
  border-bottom-color: var(--vp-c-brand-dark);
}

.dark .tabs-content {
  background-color: var(--vp-c-bg-dark);
}
</style>