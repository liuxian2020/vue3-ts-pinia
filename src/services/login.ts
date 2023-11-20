import type { loginResult } from '@/types/login'
import { http } from '@/utils/http'
export const getLoginAPI = (phoneNumber: string) => {
  return http<loginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
