// 文章评论模块
import request from '@/utils/request'
// 获取文章评论或评论恢复
export const getComments = (params) => {
  return request({
    method: 'get',
    url: `/app/v1_0/comments`,
    params
  })
}
// 发布评论
export const addComment = (data) => {
  return request({
    method: 'post',
    url: `/app/v1_0/comments`,
    data
  })
}
// 评论点赞
export const addCommentLike = (target) => {
  return request({
    method: 'post',
    url: `/app/v1_0/comment/likings`,
    data: {
      target
    }
  })
}
// 取消评论点赞
export const deleteCommentlike = (target) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}
