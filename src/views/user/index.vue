<template>
  <div class="user-container">
      <van-nav-bar :title="user.name" left-arrow @click-left="$router.back()" />
          <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image
          class="col1"
          fit="cover"
          round
          :src="user.photo"
        />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">{{user.art_count}}</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">{{user.follow_count}}</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">{{user.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">{{user.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <van-button
              type="primary"
              size="small"
            >私信</van-button>
            <van-button
              type="default"
              size="small"
            >编辑资料</van-button>
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>{{user.certi}}</span>
        </div>
        <div>
          <span>简介：</span>
          <span>{{user.intro}}</span>
        </div>
      </div>
    </div>
    <!-- /用户信息 -->
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
    v-for="(item,index) in list"
    :key="index"
    :title="item.title"
  />
</van-list>
  </div>
</template>

<script>
import { getUserById } from '@/api/user'
import { getArticlesByUser } from '@/api/article'
export default {
  name: 'Userpage',
  data () {
    return {
      user: {},
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    async loadUser () {
      try {
        const { data } = await getUserById(this.$route.params.userId)
        this.user = data.data
      } catch (error) {
        this.$toast('获取用户信息失败')
      }
    },
    async onLoad () {
      // 异步更新数据
      const { data } = await getArticlesByUser(this.$route.params.userId, {
        page: this.page, per_page: 20
      })
      const { results } = data.data
      this.list.push(...results)
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
  created () {
    this.loadUser()
  }

}
</script>

<style scoped lang="less">
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    >.row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      >.col1 {
        width: 80px;
        height: 80px;
      }
      >.col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
        height: 80px;
        padding: 0 12px;
        >.row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
  }
}
</style>
