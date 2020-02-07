<template>
  <div class="user-profile">
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <van-cell is-link title="头像" @click="onSelectFile">
      <van-image :src="user.photo" round class="avatar" />
    </van-cell>
    <input type="file" hidden name="" id="" ref="file" @change="onFileChange" />
    <van-cell
      is-link
      title="昵称"
      :value="user.name"
      @click="isEditNameShow = true"
    ></van-cell>
    <van-cell is-link title="介绍" value=""></van-cell>
    <van-cell
      is-link
      title="性别"
      :value="user.gender == 0 ? '男' : '女'"
      @click="isEditGenderShow = true"
    ></van-cell>
    <van-cell
      is-link
      title="生日"
      :value="user.birthday"
      @click="isEditBirthdayShow = true"
    ></van-cell>

    <!-- 修改昵称弹出层 -->
    <van-popup v-model="isEditNameShow" position="bottom">
      <van-nav-bar
        title="编辑昵称"
        left-text="取消"
        right-text="确定"
        @click-left="isEditNameShow = false"
        @click-right="onUpDateName"
      ></van-nav-bar>
      <div>
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="昵称"
          type="textarea"
          maxlength="20"
          placeholder="请输入昵称"
          show-word-limit
        />
      </div>
    </van-popup>
    <!-- /修改昵称弹出层 -->

    <!-- 用户性别编辑弹层 -->
    <van-action-sheet
      v-model="isEditGenderShow"
      :actions="actions"
      cancel-text="取消"
      @cancel="isEditNameShow = false"
      @select="onGenderSelect"
    />
    <!-- /用户性别编辑弹层 -->

    <!-- 编辑用户生日 -->
    <van-popup v-model="isEditBirthdayShow" position="bottom">
      <van-datetime-picker
        :value="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="isEditBirthdayShow=false"
        @confirm="onUpdateBirthday"
      />
    </van-popup>

    <!-- /编辑用户生日 -->
  </div>
</template>

<script>
import moment from 'moment'
import { ImagePreview } from 'vant'
import { getUserProfile, updataUserPhoto, updateUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  components: {},
  props: {},
  data () {
    return {
      user: {},
      isEditNameShow: false,
      message: '',
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      // currentDate: new Date(),
      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ]
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  activited () {},
  update () {},
  beforeRouteUpdate () {},
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
        this.message = this.user.name
      } catch (error) {
        this.$toast.fail('获取用户失败')
      }
    },
    onSelectFile () {
      this.file.click()
    },
    onFileChange () {
      // 预览图片
      const that = this
      const filesObj = this.file.files[0]
      const fileData = URL.createObjectURL(filesObj)
      ImagePreview({
        images: [fileData],
        async onClose () {
          try {
            try {
              await this.$dialog.confirm({
                title: '头像选择',
                message: '确定使用该头像吗吗？'
              })
              this.$toast.loading({
                duration: 0,
                message: '保存中...',
                forbidClick: true
              })

              // 请求上传后端
              const fd = new FormData()
              fd.append('photo', filesObj)
              await updataUserPhoto(fd)
              this.$toast.success('保存成功')
              that.user.photo = fileData
              that.$refs.file.value = ''
            } catch (error) {
              that.$refs.file.value = ''
            }
          } catch (error) {
            that.$refs.file.value = ''
            this.$toast.fail('保存失败')
          }
        }
      })
    },
    async updateUserProfile (field, value) {
      this.$toast.loading({
        duration: 0,
        message: '保存中...',
        forbidClick: true
      })
      try {
        await updateUserProfile({
          [field]: value
        })
        this.isEditNameShow = false
        this.user.name = this.message
        this.$toast.success('更改成功')
      } catch (error) {
        this.isEditNameShow = false
        this.$toast.fail('更改失败')
        this.message = this.user.name
      }
    },
    async onUpDateName () {
      await this.updateUserProfile('name', this.message)
    },
    async onGenderSelect (data) {
      await this.updateUserProfile('gender', data.value)
      this.user.gender = data.value
      this.isEditGenderShow = false
    },
    onUpdateBirthday (value) {
      const date = moment(value).format('YYYY-MM-DD')
      this.updateUserProfile('birthday', date)
      this.user.birthday = date
      this.isEditBirthdayShow = false
    }
  },
  filter: {},
  computed: {
    file () {
      return this.$refs['file']
    },
    currentDate () {
      return new Date(this.user.birthday)
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 30px;
    height: 30px;
  }
  .van-nav-bar {
    background-color: #fff;
  }
  .van-nav-bar__title {
    color: #323233;
  }
}
</style>
