import request from '@/utils/request'

// 搜索模块

export const getSuggestion = (q) => {
  return request({
    method: 'get',
    url: `/app/v1_0/suggestion`,
    params: {
      q
    }

  })
}
// 获取文章列表模块
export const getSearch = (params) => {
  return request({
    method: 'get',
    url: `/app/v1_0/search`,
    params

  })
}
