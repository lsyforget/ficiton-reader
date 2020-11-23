<template>
  <el-menu
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="getContent"
  >
    <el-submenu v-for="(parent, index) in menuList" :index="index+''" :key="index">
      <template slot="title">{{ (index*pageSize + 1) + '~' + (index+1)*pageSize + '章节' }}</template>
      <el-menu-item v-for="(item,i) in parent" :key="i" :index="item.name + '-' + item.path">{{item.name}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      total: 0,
      page: 0,
      pageSize: 100
    }
  },
  props: ['keyWord', 'refresh'],
  mounted () {
    this.getMenuList()
  },
  methods: {
    // 获取章节
    async getMenuList (key) {
      const response = await this.$axios.get(`search/${key}`)
      if (response.status !== 200) {
        return this.$message.error('获取章节失败！')
      }
      this.menuList = this.seprate(response.data, this.pageSize)
      this.total = response.data.length
      this.page = Math.ceil(this.total / this.pageSize)
      console.log(this.menuList)
    },
    // 数组均分
    seprate (arr, num) {
      const newArr = []
      for (let i = 0; i < arr.length; i += num) {
        newArr.push(arr.slice(i, i + num))
      }
      return newArr
    },
    // 获取章节内容
    getContent (path) {
      this.$emit('getContent', path)
    }
  },
  watch: {
    refresh () {
      this.getMenuList(this.keyWord)
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  width: 100%;
}
</style>
