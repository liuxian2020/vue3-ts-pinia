import { http } from '@/utils/http'
import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
// 首页广告区域
type HotParams = PageParams & {
  subType?: string
}
export const getHomeBannerAPI = (url: string, data?: HotParams) => {
  return http<HotResult>({
    method: 'GET',
    url: url,
    data: data,
  })
}
