// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import { LiteTree } from '@lite-tree/vue'
import BackToTopButton from '@miletorix/vitepress-back-to-top-button' 
import '@miletorix/vitepress-back-to-top-button/style.css'
import MyLayout from './MyLayout.vue'
import CustomButton from './components/CustomButton.vue'
import LeftTextRightImage from './components/LeftTextRightImage.vue'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    enhanceAppWithTabs(app)
    app.component('LiteTree', LiteTree)
    app.component('CustomButton', CustomButton)
    app.component('LeftTextRightImage', LeftTextRightImage)
    BackToTopButton(app, {
      progressColor: '#3f4152', 
    })
  }
} satisfies Theme
