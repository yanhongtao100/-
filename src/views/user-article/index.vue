<template>
  <div class="user-article">
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的收藏/"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    ></van-nav-bar>
    <!-- /导航栏 -->

    <van-tabs v-model="active" color="#3296fa">
      <van-tab title="我的收藏">
            <collect-article></collect-article>
           </van-tab>
      <van-tab title="我的历史">
          <history-article></history-article>
      </van-tab>
      <van-tab title="我的作品">
        <user-article></user-article>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserArticle from './components/article'
import CollectArticle from './components/collect'
import HistoryArticle from './components/history'
export default {
  beforeRouteLeave (to, from, next) {
    // 如果跳转的是文章详情页，则把当前页面缓存起来，否则不缓存
    if (to.name === 'article') {
      this.$store.commit('addCachePage', 'UserArticles')
    } else {
      this.$store.commit('removeCachePage', 'UserArticles')
    }
    // 放行通过
    next()
  },
  name: 'UserArticles',
  components: {
    UserArticle,
    CollectArticle,
    HistoryArticle
  },
  props: {
    type: {
      String
    }
  },
  data () {
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2
    }
    return {
      active,
      routes: ['collect', 'history']
    }
  },
  created () {},
  mounted () {},
  activited () {},
  update () {},
  beforeRouteUpdate () {},
  methods: {},
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
.user-article{
    padding-top: 90px;
    padding-bottom: 50px;
    /deep/ .van-tabs__wrap{
        position: fixed;
        top: 46px;
        left: 0;
        right: 0;
        z-index: 1;
    }
}
</style>
