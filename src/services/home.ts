import { http } from "@/utils/http"
import type { BannerItem, CategoryItem, GuessItem } from '@/types/home'
import type { PageResult } from '@/types/global'
// 首页广告区域
export const getHomeBannerAPI = (distributionSite = 1)=> {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite
    }}
  )
}

// /home/category/mutli
export const getCategoryAPI = ()=> {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli'
  })
}

// /home/hot/mutli
export const getHotPanelAPI = ()=> {
  return http<[]>({
    method: 'GET',
    url: '/home/hot/mutli'
  })
}

// /home/goods/guessLike
export const getHomeGoodsAPI = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data
  })
}