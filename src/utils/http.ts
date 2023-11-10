// 添加拦截器
// 拦截request请求
// 拦截uploadFile文件上传·
// todo:

// 1非http开头需拼接地址
// 2请求超时
// 3添加小程序端请求头标识
// 4添加token请求头标识

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
import { useMemberStore } from '@/stores'
const httpInterceptor = {
  // 拦截前触发
  invoke(options:UniApp.RequestOptions) {
    // 1非http开头需拼接地址
    if(!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2请求超时
    options.timeout = 10000
    // console.log(options, '===options')
    // 3. 添加小程序端请求头标识
    options.header = {
      'source-client': 'miniapp',
      ...options.header,
    }
    // 4. 添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  }
}
uni.addInterceptor('request',httpInterceptor)
uni.addInterceptor('unloadFile',httpInterceptor)

interface Data<T> {
  code:string
  msg:string
  result: T
}
export const http = <T>(options:UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve,reject) => {
    uni.request({
      ...options,
      // 请求成功
      success(res) {
        if(res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        }else if(res.statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({
            url: '/pages/login/login'
          })
          reject(res)
        }else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误'
          })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试'
        })
        reject(err)
      }
    })
  })
}
