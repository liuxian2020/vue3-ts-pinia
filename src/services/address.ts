import { http } from '@/utils/http'
export const PostMemberAddressApi = (data) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}
