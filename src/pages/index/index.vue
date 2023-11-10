<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app';
import type { BannerItem, CategoryItem, HotPanelItem } from '@/types/home'
import { ref } from 'vue'
import { getHomeBannerAPI, getCategoryAPI, getHotPanelAPI } from '@/services/home'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type XtxGuessInstance from '@/components/components'
// const onegame = require('./onegame_sdk_v1.0.0')
let bannerList = ref<BannerItem[]>([
  // {
  //   hrefUrl: '11',
  //   id: '11',
  //   imgUrl: '22',
  //   type: 1
  // }
])
// 获取banner数据
const getHomeBannerData = async() => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
let categoryList = ref<CategoryItem[]>([])
// 获取分类数据
const getCategoryData = async() => {
  const res = await getCategoryAPI()
  categoryList.value = res.result
}
let hotPanelList = ref<HotPanelItem[]>([])
// 获取热图数据
const getHotPanelData = async() => {
  const res = await getHotPanelAPI()
  hotPanelList.value = res.result
}
const guessRef = ref<XtxGuessInstance>()
const onScrolltolower = () => {
  guessRef.value?.getMore()
}
// import * as onegame from './onegame_sdk_v1.0.0.js'
// const onegame = window.require('./onegame_sdk_v1.0.0.js')
// import {onegame} from './onegame_sdk_v1.0.0.js'
// 自定义下拉被触发
const onRefresherrrefresh = async () => {
  console.log('下拉刷新')
  isTriggered.value = true
  guessRef.value?.resetData()
  await Promise.all([getHomeBannerData(), getCategoryData(), getHotPanelData(),  guessRef.value?.getMore()])
  isTriggered.value = false
}
const isTriggered = ref(false)
// 页面加载
onLoad(() => {
  // const og = window.onegame_sdk.default
  // og.callbackToLogin()
  getHomeBannerData()
  getCategoryData()
  getHotPanelData()
})
</script>

<template>
  <!-- 头部 -->
   <CustomNavbar></CustomNavbar>
   <!-- 轮播图 -->
   <scroll-view
   refresher-enabled
   @refresherrefresh="onRefresherrrefresh"
   :refresher-triggered="isTriggered"
   @scrolltolower="onScrolltolower"
   scroll-y
   class="scrollView">
     <XtxSwiper :list="bannerList"></XtxSwiper>
     <!-- 分类 -->
     <CategoryPanel :list="categoryList"></CategoryPanel>
     <!-- 热门推荐 -->
     <HotPanel :list="hotPanelList"></HotPanel>
     <!-- 猜你喜欢 -->
     <XtxGuess ref="guessRef"></XtxGuess>
   </scroll-view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.scrollView {
  flex: 1;
}
</style>
