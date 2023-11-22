import { http } from '@/utils/http'
import type { ProfileDetail } from '@/types/login'
export const getMemberProfileApi = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}
