<template>
  <div class="search-result">

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    q: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
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
      const { data } = await getSearch({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      const { results } = data.data
      this.list.push(...results)
      // console.log(result)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
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

<style lang="less" scoped>

</style>
