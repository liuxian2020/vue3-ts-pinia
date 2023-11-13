// /goods

import { http } from '@/utils/http'
export const getGoodsAPI = (id: string) => {
  return http<[]>({
    method: 'GET',
    url: '/goods',
    data: {
      id: id,
    },
  })
}
