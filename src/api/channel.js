import request from '@/utils/request'

export const getUserChannels = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/user/channels`

  })
}
// 获取所有频道
export const getAllChannels = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/channels`

  })
}
