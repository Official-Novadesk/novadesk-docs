// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import { LiteTree } from '@lite-tree/vue'
import BackToTopButton from '@miletorix/vitepress-back-to-top-button' 
import '@miletorix/vitepress-back-to-top-button/style.css'
import MyLayout from './MyLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    enhanceAppWithTabs(app)
    app.component('LiteTree', LiteTree)
    BackToTopButton(app, {
      progressColor: '#3f4152', 
    })
  }
} satisfies Theme
