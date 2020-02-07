<template>
  <div class="">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >

      <van-cell v-for="(item,index) in list"
      :key="index"
      @click="$router.push({
          name:'article',
          params:{
              articleId:item.art_id.toString()
          }
      })"
      :title="item.title"
       />
    </van-list>
  </div>
</template>

<script>
import { getCollectArticles } from '@/api/article'
export default {
  name: 'UserArticle',
  components: {},
  props: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  created () {},
  mounted () {},
  activited () {},
  update () {},
  beforeRouteUpdate () {},
  methods: {
    async onLoad () {
      const { data } = await getCollectArticles({
        page: this.page,
        per_page: this.perPage
      })
      const { results } = data.data
      this.list.push(...results)

      this.loading = false

      if (results.length) {
        this.page++
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
