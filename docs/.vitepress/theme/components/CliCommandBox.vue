<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

interface CliFlag {
  flag: string
  description: string
  optional?: boolean
  value?: string
}

const props = withDefaults(defineProps<{
  command: string
  usage?: string
  platform?: string
  platformType?: 'nwm' | 'novadesk' | 'ndpkg' | 'manage' | string
  flags?: CliFlag[]
}>(), {
  usage: undefined,
  platform: undefined,
  platformType: 'novadesk',
  flags: () => []
})

// Slug-based ID from command name
const id = computed(() => {
  return props.command
    .toLowerCase()
    .trim()
    .replace(/^--?/, '')         // strip leading -- or -
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
})

// Badge color per platform type
const platformBadgeStyle = computed(() => {
  const t = props.platformType?.toLowerCase()
  if (t === 'nwm') return { background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }
  if (t === 'ndpkg') return { background: 'rgba(249,115,22,0.12)', color: '#f97316', border: '1px solid rgba(249,115,22,0.28)' }
  if (t === 'manage') return { background: 'rgba(168,85,247,0.12)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.28)' }
  // default: novadesk / blue
  return { background: 'rgba(99,179,237,0.12)', color: 'var(--vp-c-brand-1)', border: '1px solid rgba(99,179,237,0.28)' }
})

const isAnchored = ref(false)

let route: any = null
try { route = useRoute() } catch (e) {}

const checkHash = () => {
  if (typeof window !== 'undefined') {
    isAnchored.value = decodeURIComponent(window.location.hash.slice(1)) === id.value
  }
}
const handleGlobalClick = () => setTimeout(checkHash, 50)

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
if (route) watch(() => route.path, () => setTimeout(checkHash, 100))
</script>

<template>
  <div :id="id" :class="['cli-box', { 'is-anchored': isAnchored }]">

    <!-- Header -->
    <div class="cli-box__header">
      <div class="cli-box__left">
        <!-- Terminal icon -->
        <span class="cli-box__icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 17 10 11 4 5"/>
            <line x1="12" y1="19" x2="20" y2="19"/>
          </svg>
        </span>
        <span class="cli-box__name">
          {{ command }}
          <a :href="`#${id}`" class="cli-box__anchor" :aria-label="`Permalink to ${command}`">#</a>
        </span>
      </div>
      <div class="cli-box__right">
        <span v-if="platform" class="cli-box__platform-badge" :style="platformBadgeStyle">{{ platform }}</span>
        <span class="cli-box__cli-badge">CLI</span>
      </div>
    </div>

    <!-- Body -->
    <div class="cli-box__body">

      <!-- Usage syntax block -->
      <div v-if="usage" class="cli-box__section">
        <h4 class="cli-box__section-title">USAGE</h4>
        <div class="cli-box__usage">
          <code>{{ usage }}</code>
        </div>
      </div>

      <!-- Description (default slot) -->
      <div class="cli-box__description">
        <slot />
      </div>

      <!-- Flags / arguments table -->
      <div v-if="flags && flags.length > 0" class="cli-box__section">
        <h4 class="cli-box__section-title">FLAGS</h4>
        <div class="cli-box__flags-list">
          <div
            v-for="item in flags"
            :key="item.flag"
            class="cli-box__flag-row"
          >
            <div class="cli-box__flag-info">
              <span class="cli-box__flag-name">{{ item.flag }}</span>
              <span v-if="item.value" class="cli-box__flag-value">&lt;{{ item.value }}&gt;</span>
              <span v-if="item.optional" class="cli-box__flag-optional">OPTIONAL</span>
            </div>
            <div class="cli-box__flag-desc">{{ item.description }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ── Card shell — same as PropertyBox / MethodBox ── */
.cli-box {
  margin: 20px 0;
  padding: 22px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: border-color 0.25s, background-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.cli-box:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.cli-box:target,
.cli-box.is-anchored {
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
.cli-box__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.cli-box__left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.cli-box__icon {
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  opacity: 0.75;
}

/* Command name — mono, brand-colored, same 16px as PropertyBox */
.cli-box__name {
  font-family: var(--vp-font-family-mono);
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  letter-spacing: -0.2px;
}

/* Anchor link — identical to other boxes */
.cli-box__anchor {
  margin-left: 6px;
  color: var(--vp-c-brand-1);
  opacity: 0;
  transition: opacity 0.25s, color 0.25s;
  font-weight: normal;
  text-decoration: none !important;
  user-select: none;
}

.cli-box:hover .cli-box__anchor { opacity: 0.6; }
.cli-box__anchor:hover { opacity: 1 !important; color: var(--vp-c-brand-2); }

/* ── Right side badges ── */
.cli-box__right {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Platform badge — colored per type */
.cli-box__platform-badge {
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 2px 7px;
  border-radius: 6px;
}

/* CLI badge — same style as PropertyBox type badge */
.cli-box__cli-badge {
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

/* ── Body ── */
.cli-box__body {
  display: flex;
  flex-direction: column;
}

/* ── Section ── */
.cli-box__section {
  margin-bottom: 16px;
}

.cli-box__section-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  letter-spacing: 0.8px;
  margin: 0 0 8px 0;
  padding: 0;
  border: none;
}

/* ── Usage block ── */
.cli-box__usage {
  padding: 10px 14px;
  border-radius: 8px;
  background-color: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
}

.cli-box__usage code {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-1);
  background: none;
  padding: 0;
  border: none;
}

/* ── Description (default slot) ── */
.cli-box__description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.cli-box__description :deep(p) { margin: 0 0 10px 0; }
.cli-box__description :deep(p:last-child) { margin-bottom: 0; }

.cli-box__description :deep(:not(pre) > code) {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
  padding: 2px 5px;
  border-radius: 4px;
  background-color: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.cli-box__description :deep(div[class*="language-"]) {
  margin: 12px 0;
  border-radius: 8px;
  overflow: hidden;
  font-size: 13px;
}

.cli-box__description :deep(div[class*="language-"]:first-child) { margin-top: 0; }
.cli-box__description :deep(div[class*="language-"]:last-child) { margin-bottom: 0; }

.cli-box__description :deep(div[class*="language-"] pre) {
  padding: 16px !important;
  margin: 0 !important;
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  outline: none !important;
  box-shadow: none !important;
}

.cli-box__description :deep(div[class*="language-"] pre code) {
  background: transparent !important;
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  color: inherit;
  font-size: inherit;
}

.cli-box__description :deep(ul),
.cli-box__description :deep(ol) {
  margin: 8px 0;
  padding-left: 20px;
  color: var(--vp-c-text-2);
}

.cli-box__description :deep(ul:last-child),
.cli-box__description :deep(ol:last-child) { margin-bottom: 0; }

.cli-box__description :deep(li) { margin: 4px 0; line-height: 1.6; }
.cli-box__description :deep(strong) { color: var(--vp-c-text-1); font-weight: 600; }

/* ── Flags table — identical to parameters table in other boxes ── */
.cli-box__flags-list {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-mute);
  overflow: hidden;
}

.cli-box__flag-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  gap: 12px;
}

.cli-box__flag-row:last-child { border-bottom: none; }

.cli-box__flag-info {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.cli-box__flag-name {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.cli-box__flag-value {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  color: var(--vp-c-text-2);
  opacity: 0.8;
}

.cli-box__flag-optional {
  font-family: var(--vp-font-family-mono);
  font-size: 9px;
  font-weight: 600;
  padding: 1px 4px;
  border-radius: 4px;
  border: 1px dashed var(--vp-c-divider);
  color: var(--vp-c-text-3);
  letter-spacing: 0.3px;
}

.cli-box__flag-desc {
  font-size: 13px;
  font-style: italic;
  color: var(--vp-c-text-2);
  text-align: right;
  max-width: 60%;
}

@media (max-width: 640px) {
  .cli-box__flag-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  .cli-box__flag-desc {
    text-align: left;
    max-width: 100%;
  }
}
</style>
