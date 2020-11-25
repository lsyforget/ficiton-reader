<template>
  <el-menu
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="getContent"
    :default-active="activeName"
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
    }
  },
  props: ['keyWord', 'refresh', 'menuList', 'total', 'page', 'pageSize', 'activeName'],
  mounted () {
  },
  methods: {
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
