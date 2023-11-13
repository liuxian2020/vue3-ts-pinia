// /home/category/mutli
import type { CategoryItem } from '@/types/category'
import { http } from '@/utils/http'
export const getCategoryTopAPI = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
