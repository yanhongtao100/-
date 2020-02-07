<template>
  <div class="article-comments">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
      @click-reply="$emit('click-reply',$event)"
      v-for="(item,index) in list"
       :key="index"
       :comment="item"
        />

    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'ArticleComment',
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20
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
        type: 'a',
        source: this.articleId,
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
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
