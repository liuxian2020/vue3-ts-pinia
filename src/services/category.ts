// /home/category/mutli
import { http } from "@/utils/http"
export const getCategoryTopAPI = () => {
  return http<[]>({
    method: 'GET',
    url: '/category/top',
  })
}
