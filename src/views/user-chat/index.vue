<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- /导航栏 -->

    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <div
        class="message-item"
        :class="{ reverse:item.isMe }"
        v-for="(item,index) in messages"
        :key="index"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          width="30"
          height="30"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="title">
          <span>{{item.msg}}</span>
        </div>
      </div>
    </div>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field v-model.trim="message" center clearable>
        <van-button
        slot="button"
        size="small"
        type="primary"
        @click="onSend"
        >发送</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'
export default {
  data () {
    return {
      message: '',
      socket: null,
      messages: getItem('chat-messages') || []
    }
  },
  watch: {
    messages (value) {
      setItem('chat-messages', value)
      this.$nextTick(() => {
        this.toButtom()
      })
    }
  },
  created () {
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket
    socket.on('connect', function () {

    })
    socket.on('message', message => {
      this.messages.push(message)
    })
  },

  mounted () {
    window.list = this.$refs['message-list']
    this.toButtom()
  },
  methods: {
    onSend () {
      const message = this.message
      if (!message.length) {
        return
      }
      const data = {
        msg: message,
        timestamp: Date.now(),
        isMe: true
      }

      this.socket.emit('message', data)
      this.messages.push(data)
      this.message = ''
    },
    toButtom () {
      const lstContainer = this.$refs['message-list']
      lstContainer.scrollTop = lstContainer.scrollHeight
    }
  }
}
</script>

<style scoped lang="less">
  .chat-container {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 46px 0 50px 0;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background: #f5f5f6;
    .message-list {
      height: 100%;
      overflow-y: scroll;
      .message-item {
        display: flex;
        align-items: center;
        padding: 10px;
        .title {
          background: #fff;
          padding: 5px;
          border-radius: 6px;
        }
        .avatar {
          margin-right: 5px;
        }
      }
      .reverse {
        flex-direction: row-reverse;
        .title {
          margin-right: 5px;
        }
      }
    }

    .send-message {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f5f5f6 !important;
    }
  }
</style>
