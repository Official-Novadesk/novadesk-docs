<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

interface CallbackParam {
  name: string
  type: string
  optional?: boolean
  description: string
}

const props = withDefaults(defineProps<{
  name: string
  signature?: string
  optional?: boolean
  parameters?: CallbackParam[]
}>(), {
  signature: undefined,
  optional: false,
  parameters: () => []
})

const id = computed(() => {
  return props.name
    .toLowerCase()
    .trim()
    .replace(/\./g, '-')
    .replace(/[\(\)]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
})

const isAnchored = ref(false)

let route: any = null
try {
  route = useRoute()
} catch (e) {
  // Safe fail for SSR
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
</script>

<template>
  <div :id="id" :class="['callback-box', { 'is-anchored': isAnchored }]">

    <!-- Header: name (left) + CALLBACK badge (right) -->
    <div class="callback-box__header">
      <div class="callback-box__left">
        <span class="callback-box__name">
          {{ name }}
          <a :href="`#${id}`" class="callback-box__anchor" :aria-label="`Permalink to ${name}`">#</a>
        </span>
        <span class="callback-box__type-badge">{{ optional ? 'FUNCTION' : 'FUNCTION' }}</span>
        <span v-if="optional" class="callback-box__optional-badge">OPTIONAL</span>
      </div>
      <div class="callback-box__right">
        <span class="callback-box__callback-badge">CALLBACK</span>
      </div>
    </div>

    <div class="callback-box__body">

      <!-- Signature line -->
      <div v-if="signature" class="callback-box__section">
        <h4 class="callback-box__section-title">SIGNATURE</h4>
        <div class="callback-box__signature">
          <code>{{ signature }}</code>
        </div>
      </div>

      <!-- Default slot: description + code blocks + lists etc -->
      <div class="callback-box__description">
        <slot />
      </div>

      <!-- Parameters table -->
      <div v-if="parameters && parameters.length > 0" class="callback-box__section">
        <h4 class="callback-box__section-title">PARAMETERS</h4>
        <div class="callback-box__parameters-list">
          <div
            v-for="param in parameters"
            :key="param.name"
            class="callback-box__parameter-row"
          >
            <div class="callback-box__parameter-info">
              <span class="callback-box__parameter-name">{{ param.name }}</span>
              <span class="callback-box__parameter-type-badge">{{ param.type }}</span>
              <span v-if="param.optional" class="callback-box__parameter-optional-badge">OPTIONAL</span>
            </div>
            <div class="callback-box__parameter-desc">{{ param.description }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ── Card shell — identical to PropertyBox & MethodBox ── */
.callback-box {
  margin: 20px 0;
  padding: 22px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: border-color 0.25s, background-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.callback-box:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.callback-box:target,
.callback-box.is-anchored {
  border-color: var(--vp-c-brand-1) !important;
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft), 0 8px 24px rgba(0, 0, 0, 0.08);
  background-color: var(--vp-c-bg-elv);
  animation: anchor-pulse 1.5s ease-out;
}

@keyframes anchor-pulse {
  0%   { box-shadow: 0 0 0 10px var(--vp-c-brand-soft), 0 8px 24px rgba(0, 0, 0, 0.08); }
  100% { box-shadow: 0 0 0 3px  var(--vp-c-brand-soft), 0 8px 24px rgba(0, 0, 0, 0.08); }
}

/* ── Header ── */
.callback-box__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.callback-box__left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* Name — same as PropertyBox (mono, brand color, 16px) */
.callback-box__name {
  font-family: var(--vp-font-family-mono);
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  letter-spacing: -0.2px;
  position: relative;
}

/* Anchor link — identical reveal behavior */
.callback-box__anchor {
  margin-left: 6px;
  color: var(--vp-c-brand-1);
  opacity: 0;
  transition: opacity 0.25s, color 0.25s;
  font-weight: normal;
  text-decoration: none !important;
  user-select: none;
}

.callback-box:hover .callback-box__anchor {
  opacity: 0.6;
}

.callback-box__anchor:hover {
  opacity: 1 !important;
  color: var(--vp-c-brand-2);
}

/* FUNCTION badge — same style as PropertyBox type badge */
.callback-box__type-badge {
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 6px;
  text-transform: uppercase;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  letter-spacing: 0.5px;
}

/* OPTIONAL badge — same as MethodBox parameter optional badge */
.callback-box__optional-badge {
  font-family: var(--vp-font-family-mono);
  font-size: 9px;
  font-weight: 600;
  padding: 1px 4px;
  border-radius: 4px;
  border: 1px dashed var(--vp-c-divider);
  color: var(--vp-c-text-3);
  letter-spacing: 0.3px;
}

/* Right-side CALLBACK pill */
.callback-box__right {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.callback-box__callback-badge {
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 6px;
  background-color: rgba(168, 177, 255, 0.12);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(168, 177, 255, 0.3);
}

/* ── Body ── */
.callback-box__body {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Section ── */
.callback-box__section {
  margin-bottom: 16px;
}

.callback-box__section-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  letter-spacing: 0.8px;
  margin: 0 0 10px 0;
  padding: 0;
  border: none;
}

/* ── Signature ── */
.callback-box__signature {
  padding: 8px 12px;
  border-radius: 8px;
  background-color: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
}

.callback-box__signature code {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-1);
  background: none;
  padding: 0;
  border: none;
}

/* ── Description (default slot) ── */
.callback-box__description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

/* Paragraphs */
.callback-box__description :deep(p) {
  margin: 0 0 10px 0;
}

.callback-box__description :deep(p:last-child) {
  margin-bottom: 0;
}

/* Inline code (only when not inside a fenced pre block) */
.callback-box__description :deep(:not(pre) > code) {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
  padding: 2px 5px;
  border-radius: 4px;
  background-color: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

/* Code blocks (fenced) — with top margin so they don't stick */
.callback-box__description :deep(div[class*="language-"]) {
  margin: 12px 0;
  border-radius: 8px;
  overflow: hidden;
  font-size: 13px;
}

.callback-box__description :deep(div[class*="language-"]:first-child) {
  margin-top: 0;
}

.callback-box__description :deep(div[class*="language-"]:last-child) {
  margin-bottom: 0;
}

/* Ensure proper padding on pre and remove inner borders from pre code */
.callback-box__description :deep(div[class*="language-"] pre) {
  padding: 16px !important;
  margin: 0 !important;
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  outline: none !important;
  box-shadow: none !important;
}

.callback-box__description :deep(div[class*="language-"] pre code) {
  background: transparent !important;
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  color: inherit;
  font-size: inherit;
}

/* Lists */
.callback-box__description :deep(ul),
.callback-box__description :deep(ol) {
  margin: 8px 0;
  padding-left: 20px;
  color: var(--vp-c-text-2);
}

.callback-box__description :deep(ul:last-child),
.callback-box__description :deep(ol:last-child) {
  margin-bottom: 0;
}

.callback-box__description :deep(li) {
  margin: 4px 0;
  line-height: 1.6;
}

.callback-box__description :deep(li > code) {
  font-size: 0.85em;
}

/* Headings inside slot */
.callback-box__description :deep(h3),
.callback-box__description :deep(h4),
.callback-box__description :deep(h5) {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: var(--vp-c-text-3);
  margin: 14px 0 8px 0;
  padding: 0;
  border: none;
}

.callback-box__description :deep(h3:first-child),
.callback-box__description :deep(h4:first-child),
.callback-box__description :deep(h5:first-child) {
  margin-top: 0;
}

/* Bold and italic */
.callback-box__description :deep(strong) {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.callback-box__description :deep(em) {
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .callback-box__parameter-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  .callback-box__parameter-desc {
    text-align: left;
    max-width: 100%;
  }
}
</style>
