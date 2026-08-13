<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

interface Parameter {
  name: string
  type: string
  optional?: boolean
  description: string
}

const props = withDefaults(defineProps<{
  name: string
  badge: string
  badgeType?: 'core' | 'ui' | 'remote' | 'green' | 'blue' | 'orange' | string
  returns?: string
  parameters?: Parameter[]
}>(), {
  badgeType: 'core',
  returns: undefined,
  parameters: () => []
})

// Generate HTML ID (e.g., ".init()" -> "init")
const id = computed(() => {
  return props.name
    .toLowerCase()
    .trim()
    .replace(/^\./, '')    // Remove leading dot
    .replace(/\(\)/, '')   // Remove parentheses
    .replace(/\s+/g, '-')   // Replace spaces with hyphens
    .replace(/[^\w-]/g, '') // Remove remaining special characters
})

const isAnchored = ref(false)

let route: any = null
try {
  route = useRoute()
} catch (e) {
  // Safe fail for SSR build
}

const checkHash = () => {
  if (typeof window !== 'undefined') {
    const currentHash = decodeURIComponent(window.location.hash.slice(1))
    isAnchored.value = currentHash === id.value
  }
}

const handleGlobalClick = () => {
  setTimeout(checkHash, 50)
}

onMounted(() => {
  window.addEventListener('hashchange', checkHash)
  document.addEventListener('click', handleGlobalClick)
  checkHash()
  setTimeout(checkHash, 150)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('hashchange', checkHash)
    document.removeEventListener('click', handleGlobalClick)
  }
})

if (route) {
  watch(() => route.path, () => {
    setTimeout(checkHash, 100)
  })
}

// Map badgeType to custom colors matching the design and VitePress theme
const badgeStyle = computed(() => {
  const type = props.badgeType?.toLowerCase()
  if (type === 'core' || type === 'green') {
    return {
      backgroundColor: 'rgba(16, 185, 129, 0.85)',
      color: '#ffffff'
    }
  }
  if (type === 'ui' || type === 'blue') {
    return {
      backgroundColor: 'rgba(6, 182, 212, 0.85)',
      color: '#ffffff'
    }
  }
  if (type === 'remote' || type === 'orange') {
    return {
      backgroundColor: 'rgba(249, 115, 22, 0.85)',
      color: '#ffffff'
    }
  }
  return {
    backgroundColor: 'var(--vp-c-brand-1)',
    color: '#ffffff'
  }
})
</script>

<template>
  <div :id="id" :class="['method-box', { 'is-anchored': isAnchored }]">
    <div class="method-box__header">
      <div class="method-box__left">
        <span class="method-box__name">
          {{ name }}
          <a :href="`#${id}`" class="method-box__anchor" :aria-label="`Permalink to ${name}`">#</a>
        </span>
      </div>
      <div class="method-box__right">
        <span class="method-box__badge" :style="badgeStyle">{{ badge }}</span>
      </div>
    </div>

    <div class="method-box__body">
      <!-- Method Description -->
      <div class="method-box__description">
        <slot />
      </div>

      <!-- Parameters Table -->
      <div v-if="parameters && parameters.length > 0" class="method-box__section">
        <h4 class="method-box__section-title">PARAMETERS</h4>
        <div class="method-box__parameters-list">
          <div v-for="param in parameters" :key="param.name" class="method-box__parameter-row">
            <div class="method-box__parameter-info">
              <span class="method-box__parameter-name">{{ param.name }}</span>
              <span class="method-box__parameter-type-badge">{{ param.type }}</span>
              <span v-if="param.optional" class="method-box__parameter-optional-badge">OPTIONAL</span>
            </div>
            <div class="method-box__parameter-desc">
              {{ param.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- Returns section -->
      <div v-if="returns || $slots.returns" class="method-box__section method-box__returns">
        <span class="method-box__section-title method-box__returns-title">RETURNS:</span>
        <code v-if="returns" class="method-box__returns-value">{{ returns }}</code>
        <span v-if="$slots.returns" class="method-box__returns-desc"><slot name="returns" /></span>
      </div>

      <!-- Code Example -->
      <div v-if="$slots.example" class="method-box__example">
        <slot name="example" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.method-box {
  margin: 24px 0;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: border-color 0.25s, background-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.method-box:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.method-box:target,
.method-box.is-anchored {
  border-color: var(--vp-c-brand-1) !important;
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft), 0 8px 24px rgba(0, 0, 0, 0.08);
  background-color: var(--vp-c-bg-elv);
  animation: anchor-pulse 1.5s ease-out;
}

@keyframes anchor-pulse {
  0% {
    box-shadow: 0 0 0 10px var(--vp-c-brand-soft), 0 8px 24px rgba(0, 0, 0, 0.08);
  }
  100% {
    box-shadow: 0 0 0 3px var(--vp-c-brand-soft), 0 8px 24px rgba(0, 0, 0, 0.08);
  }
}

.method-box__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.method-box__name {
  font-family: var(--vp-font-family-mono);
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  letter-spacing: -0.3px;
  position: relative;
}

.method-box__anchor {
  margin-left: 6px;
  color: var(--vp-c-brand-1);
  opacity: 0;
  transition: opacity 0.25s, color 0.25s;
  font-weight: normal;
  text-decoration: none !important;
  user-select: none;
}

.method-box:hover .method-box__anchor {
  opacity: 0.6;
}

.method-box__anchor:hover {
  opacity: 1 !important;
  color: var(--vp-c-brand-2);
}

.method-box__badge {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.method-box__description {
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  margin-bottom: 20px;
}

.method-box__section {
  margin-bottom: 20px;
}

.method-box__section-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  letter-spacing: 0.8px;
  margin: 0 0 10px 0;
}

.method-box__parameters-list {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-mute);
  overflow: hidden;
}

.method-box__parameter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.method-box__parameter-row:last-child {
  border-bottom: none;
}

.method-box__parameter-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.method-box__parameter-name {
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  color: var(--vp-c-brand-1);
  font-size: 14px;
}

.method-box__parameter-type-badge {
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 4px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  text-transform: uppercase;
}

.method-box__parameter-optional-badge {
  font-family: var(--vp-font-family-mono);
  font-size: 9px;
  font-weight: 600;
  padding: 1px 4px;
  border-radius: 4px;
  border: 1px dashed var(--vp-c-divider);
  color: var(--vp-c-text-3);
  letter-spacing: 0.3px;
}

.method-box__parameter-desc {
  font-size: 13px;
  font-style: italic;
  color: var(--vp-c-text-2);
  max-width: 60%;
  text-align: right;
}

.method-box__returns {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  flex-wrap: wrap;
}

.method-box__returns-title {
  margin: 0;
  color: var(--vp-c-text-2);
}

.method-box__returns-value {
  font-family: var(--vp-font-family-mono);
  color: #10b981 !important;
  background-color: rgba(16, 185, 129, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(16, 185, 129, 0.18);
  font-weight: 500;
}

.dark .method-box__returns-value {
  color: #34d399 !important;
  background-color: rgba(52, 211, 153, 0.08);
  border-color: rgba(52, 211, 153, 0.18);
}

.method-box__returns-desc {
  font-size: 13px;
  font-style: italic;
  color: var(--vp-c-text-2);
}

.method-box__example {
  margin-top: 16px;
}

.method-box__example :deep(div[class*="language-"]) {
  margin: 0;
  border-radius: 8px;
  overflow: hidden;
  font-size: 13px;
}

.method-box__example :deep(div[class*="language-"] pre) {
  padding: 16px !important;
  margin: 0 !important;
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  outline: none !important;
  box-shadow: none !important;
}

.method-box__example :deep(div[class*="language-"] pre code) {
  background: transparent !important;
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  color: inherit;
  font-size: inherit;
}

@media (max-width: 640px) {
  .method-box__parameter-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  .method-box__parameter-desc {
    text-align: left;
    max-width: 100%;
  }
}
</style>
