<template>
<div class='channel-edit'>
    <van-cell title="我的频道"  :border="false">
        <van-button type="danger" round plain @click="isEditShow=!isEditShow" size="mini" >
            {{isEditShow?'完成':'编辑'}}
        </van-button>
    </van-cell>
    <van-grid :gutter="10">
  <van-grid-item
    v-for="(value,index) in userChannels"
    :key="value.id"
    @click="onUserChannelClick(index)"
  >
        <span class="text" slot="text"
        :class="{active:index===active}"
        >{{value.name}}</span>
  <van-icon slot="icon" name="close" v-if="isEditShow&&index!==0" />
  </van-grid-item>
</van-grid>
    <van-cell title="推荐频道"  :border="false">
    </van-cell>
    <van-grid :gutter="10">
  <van-grid-item
    v-for="value in remainingChannels"
    :key="value.id"
    :text="value.name"
    @click="onAdd(value)"
  />

</van-grid>
</div>
</template>
<script>
import { getAllChannels } from '@/api/channel'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEditShow: false
    }
  },
  computed: {
    remainingChannels () {
      const channels = []
      const { allChannels, userChannels } = this
      allChannels.forEach(item => {
        if (!userChannels.find(i => i.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  watch: {
    userChannels (newval) {
      setItem('user-channels', newval)
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAdd (value) {
      this.userChannels.push(value)
    },
    onUserChannelClick (index) {
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1)
      } else {
        this.$emit('switch', index)
      }
    }

  }
}
</script>
 <style scoped lang="less">
 .channel-edit{
     padding-top:40px
 }
 .channel-header{
     font-size: 16px;
     color: #333;
 }
 /deep/ .van-grid-item{
     width: 80px;
     height: 43px;
     position: relative;
.van-grid-item__icon-wrapper{
    position: absolute;
    top: -14px;
    right: -7px;
    .van-icon-close{
        font-size: 16px;
    }
 }
 .text{
     font-size: 14px;
     color: #222;
 }
 .active{
     color: red;
 }

 }
 </style>
