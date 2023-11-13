import type { type } from 'os'
import type { GoodsItem } from './global'

export type CategoryItem = {
  id: string
  name: string
  picture: string
  children: childrenItem[]
}

export type childrenItem = {
  id: string
  name: string
  picture: string
  goods: GoodsItem[]
}
