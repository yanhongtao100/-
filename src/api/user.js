import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    // headers: {
    //   'Content-type': 'application/json'
    // },
    // params: '',
    data
  })
}
export const getSmsCode = mobile => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`

  })
}
// 获取当前用户信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/user`

  })
}
// 获取指定用户信息
export const getUserById = (userId) => {
  return request({
    method: 'get',
    url: `/app/v1_0/users/${userId}`

  })
}
// 关注用户
export const addFollow = (userId) => {
  return request({
    method: 'post',
    url: `/app/v1_0/user/followings`,
    data: {
      target: userId
    }

  })
}
// 取消关注
export const deleteFollow = (userId) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${userId}`

  })
}
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/user/profile`

  })
}
// 更新用户头像
export const updataUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/photo`,
    data

  })
}
// 更新用户资料
export const updateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/profile`,
    data
  })
}
