// 处理日期时间
import moment from 'moment'
import Vue from 'vue'
// 配置中文语言
moment.locale('zh-cn')

Vue.filter('relativeTime', value => {
  return moment(value).startOf('hour').fromNow()
})
