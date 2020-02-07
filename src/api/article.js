import request from '@/utils/request'

// 获取指定的用户的文章列表
export const getArticlesByUser = (userId, params) => {
  return request({
    method: 'get',
    url: `/app/v1_0/users/${userId}/articles`,
    params

  })
}
// 获取频道的文章列表
export const getArticlesByChannel = (params) => {
  return request({
    method: 'get',
    url: `/app/v1_1/articles`,
    params

  })
}
// 获取指定id的文章
export const getArticleById = (articleId) => {
  return request({
    method: 'get',
    url: `/app/v1_0/articles/${articleId}`

  })
}
/**
 * 收藏文章
 */
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}
// 点赞
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/likings`,
    data: {
      target
    }

  })
}
// 取消点赞
export const deleteLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`

  })
}
// 获取当前文章列表
export const getCurrentUserArticles = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/user/articles`

  })
}
// 获取用户收藏列表
export const getCollectArticles = (params) => {
  return request({
    method: 'get',
    url: `/app/v1_0/article/collections`,
    params

  })
}
// 获取用户历史记录
export const getHistoryArticles = (params) => {
  return request({
    method: 'get',
    url: `/app/v1_0/user/histories`,
    params

  })
}
