<template>
<div class="home-container">
  <van-nav-bar title="主页" fixed=""/>
  <van-tabs v-model="active" >

    <van-icon name="wap-nav"
     class="wap-nav"
      slot="nav-right"
     @click="isChannelEditShow=true" />

  <van-tab :title="channel.name"
   v-for="channel in userChannels"
   :key="channel.id">
<article-list :channel="channel"  />
    </van-tab>
</van-tabs>
<van-popup
  v-model="isChannelEditShow"
  round
  position="bottom"
  :style="{ height: '100%' }"
  closeable
  close-icon-position=top-left>
  <channel-edit :user-channels="userChannels"
  :active="active"
   @switch="onChannelSwitch"></channel-edit>
</van-popup>
</div>
</template>

<script>
import ChannelEdit from './components/channel-edit'
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import { getItem } from '../../utils/storage'
export default {
  name: 'Home',
  data () {
    return {
      active: 1,
      userChannels: [],
      isChannelEditShow: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  methods: {
    async loadUserChannels () {
      let channels = []
      const localUserChannels = getItem('user-channels')
      if (localUserChannels) {
        channels = localUserChannels
      } else {
        const { data } = await getUserChannels()
        channels = data.data.channels
      }
      this.userChannels = channels
    },
    onChannelSwitch (index) {
      this.isChannelEditShow = false
      this.active = index
    }
  },
  created () {
    this.loadUserChannels()
  }
}
</script>

<style scoped  >
  .home-container{
    padding-top:90px;
    padding-bottom:50px;
  }
    ::v-deep .van-tabs__wrap{
      position: fixed;
      top: 46px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .wap-nav{
      position: fixed;
      right: 0;
      background-color: #fff;
      opacity: .7;
      line-height: 44px
    }
</style>
