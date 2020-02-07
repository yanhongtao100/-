<template>
  <div class="post-comment">
    <van-field
      :value="value"
      @input="$emit('input',$event)"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
     size="small"
      type="primary"
       class="post-btn"
       @click="$emit('click-post')"
       >发布</van-button>
  </div>
</template>

<script>
export default {
  name: 'PostComment',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  created () {},
  mounted () {},
  activited () {},
  update () {},
  beforeRouteUpdate () {},
  methods: {

  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
.post-comment {
  display: flex;
  align-items: center;
  padding: 20px;

}
</style>
