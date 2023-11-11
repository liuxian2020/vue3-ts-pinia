// /src/pages/hot/hot.vue
<script setup lang="ts">
// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
const query = defineProps<{
  type: string
}>()
const selectHot = hotMap.find((t) => t.type === query.type)
uni.setNavigationBarTitle({ title: selectHot!.title })
import { getHomeBannerAPI } from '@/services/hot'
import { ref } from 'vue'
import type { SubtypeItem } from '@/types/hot'
const bannerImg = ref('')
const tabList = ref<(SubtypeItem & { fininsh?: boolean })[]>([])
const activeIndex = ref(0)
const getHomeBannerData = async () => {
  await getHomeBannerAPI(selectHot!.url, {
    page: 1,
    pageSize: 10,
  }).then((res) => {
    bannerImg.value = res.result.bannerPicture
    tabList.value = res.result.subTypes
  })
}
getHomeBannerData()
const onScrolltolower = async () => {
  const currentType = tabList.value[activeIndex.value]
  const query = {
    subType: currentType.id,
    page: ++currentType.goodsItems.page,
    pageSize: 10,
  }
  if (query.page >= currentType.goodsItems.pages) {
    uni.showToast({
      title: '没有更多数据了',
      icon: 'none',
    })
    tabList.value[activeIndex.value].fininsh = true
    return
  }
  await getHomeBannerAPI(selectHot!.url, query).then((res) => {
    tabList.value[activeIndex.value].goodsItems.items.push(
      ...res.result.subTypes[activeIndex.value].goodsItems.items,
    )
  })
}
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerImg"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text class="text" @tap="activeIndex = index" :class="{ active: activeIndex === index }"
        v-for="(item, index) in tabList" :key="item.id">{{ item.title }}</text>
    </view>
    <!-- 推荐列表 -->
    <scroll-view @scrolltolower="onScrolltolower" scroll-y class="scroll-view" v-for="(goodsItem, index) in tabList"
      v-show="activeIndex === index" :key="index">
      <view class="goods">
        <navigator hover-class="none" class="navigator" v-for="goods in goodsItem.goodsItems.items" :key="goods.id"
          :url="`/pages/goods/goods?id=`">
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.name }} {{ goods.desc }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">{{ goodsItem.fininsh ? '没有更多了～' : '正在加载...' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
::v-deep uni-image {
  width: 100%;
  height: 100%;
}

page {
  height: 100%;
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}

.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}

.scroll-view {
  flex: 1;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;

  .text {
    margin: 0 20rpx;
    position: relative;
  }

  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}

.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;

  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  .thumb {
    width: 305rpx;
    height: 305rpx;
  }

  .name {
    // height: 88rpx;
    font-size: 26rpx;
  }

  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }

  .symbol {
    font-size: 70%;
  }

  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
