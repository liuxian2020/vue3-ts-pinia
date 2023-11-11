import type { GoodsItem } from '@/types/global'
export type GuessItem = GoodsItem
/** 首页-广告区域数据类型 */
export type BannerItem = {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  id: string
  /** 图片链接 */
  imgUrl: string
  /** 跳转类型 */
  type: number
}

export type CategoryItem = {
  // 图标
  icon: string
  // id
  id: string
  // 名称
  name: string
}

export type HotPanelItem = {
  // 标题
  title: string
  // 副标题
  alt: string
  // 编号
  target: string
  // 类型
  type: number
  // 图片信息
  pictures: string[]
}
