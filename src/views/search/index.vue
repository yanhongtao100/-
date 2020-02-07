<template>
  <!-- 搜索栏 star-->
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        @focus="isSearchResultShow = false"
        @input="onSearchInput"
      />
    </form>
    <!-- 搜索栏 end-->

    <!-- 搜索列表 star -->
    <search-result v-if="isSearchResultShow" :q="searchContent" />
    <!-- 搜索列表 end-->
    <!--联想建议  star-->
    <van-cell-group v-else-if="searchContent">
      <van-cell
        icon="search"
        v-for="(item, index) in suggestions"
        :key="index"
        @click="onSearch(item)"
      >
        <div slot="title" v-html="heightlight(item)"></div>
      </van-cell>
    </van-cell-group>

    <!-- 联想建议 end-->

    <!--历史记录 star -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="isDeldteShow">
          <span @click="searchHistorise = []">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeldteShow = false">完成</span>
        </template>
        <van-icon name="delete" v-else @click="isDeldteShow = true"></van-icon>
      </van-cell>
      <van-cell
        v-for="(item, index) in searchHistorise"
        :key="index"
        :title="item"
        @click="onHistoryClick(item, index)"
      >
        <van-icon name="close" v-show="isDeldteShow"> </van-icon>
      </van-cell>
    </van-cell-group>
    <!--历史记录 end-->
  </div>
</template>
<script>
import { debounce } from 'lodash'
import SearchResult from './components/search-result'
import { getSuggestion } from '@/api/search'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: { SearchResult },
  props: {},
  data () {
    return {
      searchContent: '', // 搜索内容
      isSearchResultShow: false, // 是否展示搜索结果
      suggestions: [],
      searchHistorise: getItem('search-histories') || [],
      isDeldteShow: false // 删除历史记录的状态
    }
  },
  computed: {},
  watch: {
    searchHistorise (newValue) {
      setItem('search-histories', newValue)
    }
  },
  created () {},
  methods: {
    onSearch (q) {
      // 更新文本记录
      this.searchContent = q
      // 记录搜索记录
      const searchHistorise = this.searchHistorise
      const index = searchHistorise.indexOf(q)

      if (index !== -1) {
        searchHistorise.splice(index)
      }
      searchHistorise.unshift(q)
      this.isSearchResultShow = true
    },
    onCancel () {},
    onSearchInput: debounce(async function () {
      const searchContent = this.searchContent
      if (!searchContent) {
        return
      }
      const { data } = await getSuggestion(searchContent)
      // console.log(data)
      this.suggestions = data.data.options
    }, 200),
    heightlight (str) {
      const reg = new RegExp(this.searchContent, 'gi')
      return str.replace(
        reg,
        `<span style="color:#3296fa">${this.searchContent}</span>`
      )
      // console.log(str)
    },
    onHistoryClick (item, index) {
      if (this.isDeldteShow) {
        this.searchHistorise.splice(index, 1)
      } else {
        this.onSearch(item)
      }
    }
  }
}
</script>
<style scoped lang="less">
.search-container {
  padding-top: 54px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-icon-delete::before {
    top: 2px;
    position: relative;
  }
}
.van-search__action {
  color: #fff;
}
</style>
