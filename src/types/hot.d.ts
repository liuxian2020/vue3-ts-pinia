import type { PageResult, GoodsItem } from './global'
// 热门推荐
export type HotResult = {
  // 首图
  bannerPicture: string
  id: string
  title: string
  subTypes: SubtypeItem[]
}

export type SubtypeItem = {
  id: string
  title: string
  goodsItems: PageResult<GoodsItem>
}
