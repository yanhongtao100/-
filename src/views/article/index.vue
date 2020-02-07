<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading class="loading" color="#1989fa" vertical v-if="loading">
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{ article.title }}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div class="text">
            <p class="name">{{ article.aut_name }}</p>
            <p class="time">{{ article.pubdate | relativeTime }}</p>
          </div>
        </div>
        <van-button
          v-if="!user || article.aut_id !== user.id"
          class="follow-btn"
          :type="article.is_followed ? 'default' : 'info'"
          size="small"
          round
          :loading="isFollowLoading"
          @click="onFollow"
          >{{ article.is_followed ? "已关注" : "+ 关注" }}</van-button
        >
      </div>
      <div class="markdown-body" v-html="article.content"></div>
      <!-- 文章评论 star-->
      <article-comment
        :article-id="articleId"
        ref="article-comment"
        @click-reply='onReplyShow'
      ></article-comment>
      <!-- 文章评论end -->
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network" />
      <p class="text">亲，网络不给力哦~</p>
      <van-button class="btn" type="default" size="small" @click="loadArticle()"
        >点击重试</van-button
      >
    </div>
    <!-- /加载失败提示 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon class="comment-icon" name="comment-o" info="9" />
      <van-icon
        color="orange"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect()"
      />
      <van-icon
        color="#e5645f"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->

    <!-- 发布文章评论弹层 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
      :style="{ height: '20%' }"
    >
      <post-comment v-model="postMessage" @click-post="onPost"
      ></post-comment>
    </van-popup>
    <!-- 发布文章评论弹层 -->

    <!-- 评论回复弹层 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      :style="{ height: '90%' }"
    >
    <comment-reply :comment='currentComment' :article-id='articleId' v-if="isReplyShow" @close-reply="isReplyShow = false"></comment-reply>
    </van-popup>
    <!-- 评论回复弹层 -->
  </div>
</template>

<script>
import {
  getArticleById,
  addCollect,
  deleteCollect,
  deleteLike,
  addLike
} from '@/api/article'
import { mapState } from 'vuex'
import { deleteFollow, addFollow } from '@/api/user'
import ArticleComment from './components/article-commentes'
import PostComment from './components/post-comment'
import CommentReply from './components/comment-reply'
import { addComment } from '@/api/comment'

export default {
  name: 'ArticlePage',
  components: {
    ArticleComment,
    PostComment,
    CommentReply
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true, // 文章加载中的状态
      isFollowLoading: false,
      isPostShow: false,
      postMessage: '',
      isReplyShow: false,
      currentComment: {}// 点击回复的那个评论项
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        // console.log(data)
        this.article = data.data
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async onCollect () {
      this.$toast.loading({
        duration: 0, // 0为持续展示toast
        message: '请稍后...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
          this.article.is_collected = false
          this.$toast.success('取消收藏')
        } else {
          await addCollect(this.articleId)
          this.article.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (error) {
        this.$toast.fail('收藏失败')
      }
    },
    async onLike () {
      this.$toast.loading({
        duration: 0, // 0为持续展示toast
        message: '请稍后...',
        forbidClick: true // 是否禁止北京点击
      })
      try {
        if (this.article.attitude === 1) {
          await deleteLike(this.articleId)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          await addLike(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        this.$toast.fail('点赞失败')
      }
    },
    async onFollow () {
      this.isFollowLoading = true
      try {
        const authorId = this.article.aut_id
        if (this.article.is_followed) {
          await deleteFollow(authorId)
        } else {
          await addFollow(authorId)
        }
        this.article.is_followed = !this.article.is_followed
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.isFollowLoading = false
    },
    async onPost () {
      // 3.开启登录loading
      this.$toast.loading({
        duration: 0, // 0为持续展示toast
        message: '发布中',
        forbidClick: true // 是否禁止北京点击
      })
      try {
        const { data } = await addComment({
          target: this.articleId,
          content: this.postMessage
        })

        this.$toast.success('发布成功')
        this.postMessage = ''
        this.isPostShow = false
        this.$refs['article-comment'].list.unshift(data.data.new_obj)
      } catch (error) {
        this.$toast.success('发布失败')
        this.postMessage = ''
        this.isPostShow = false
      }
    },
    onReplyShow (comment) {
      this.currentComment = comment
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  padding: 46px 20px 50px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3a3a3a;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
