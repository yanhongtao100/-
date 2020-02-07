<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count + '条回复'" @click="$emit('close-reply')">
      <van-icon slot="left" name="cross"></van-icon
    ></van-nav-bar>
    <comment-item :comment="comment"></comment-item>
    <van-cell title="所有回复"></van-cell>
    <!-- 回复列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <comment-item
    :comment="comment"
    v-for="(comment,index) in list"
    :key="index"
    ></comment-item>
    </van-list>
    <!-- /回复列表 -->

<!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
    @click='isPostShow=true'
        >写评论</van-button
      >
      <van-icon
        color="#e5645f"
        name='good-job-o'
      />
    </div>
    <!-- /底部区域 -->

    <!-- 发布回复 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
      :style="{ height: '20%' }"
    >
      <post-comment v-model="postMessage" @click-post="onPost"

      ></post-comment>

    </van-popup>

    <!-- /发布回复 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import { getComments, addComment } from '@/api/comment'
import PostComment from './post-comment'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true

    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limint: 20,
      postMessage: '',
      isPostShow: false
    }
  },
  created () {},
  mounted () {},
  activited () {},
  update () {},
  beforeRouteUpdate () {},
  methods: {
    async onLoad () {
      // 异步更新数据

      const { data } = await getComments({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })

      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
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
          target: this.comment.com_id.toString(),
          content: this.postMessage,
          art_id: this.articleId
        })
        this.$toast.success('发布成功')
        this.postMessage = ''
        this.isPostShow = false
        this.list.unshift(data.data.new_obj)
        this.comment.reply_count++
      } catch (error) {
        this.$toast.success('发布失败')
        this.postMessage = ''
        this.isPostShow = false
      }
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
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
  }</style>
