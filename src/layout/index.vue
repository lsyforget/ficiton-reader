<template>
  <el-container>
    <el-aside>
      <p class="title">Fiction-Reader</p>
      <div>
        <el-input class="search__input" v-model="keyWord">
          <el-button slot="append" icon="el-icon-search" @click="refresh = !refresh"></el-button>
        </el-input>
      </div>
      <side-bar :refresh="refresh" :keyWord="keyWord" @getContent="getContent"></side-bar>
    </el-aside>
    <el-main>
      <div class="fiction__title">{{currentName}}</div>
      <div v-html="content"></div>
      <el-button plain class="set__mark el-icon-collection" @click="setMark">存为书签</el-button>
      <el-button plain class="get__mark el-icon-collection" @click="getMark">获取书签</el-button>
    </el-main>
  </el-container>
</template>

<script>
import SideBar from './SideBar'
export default {
  data () {
    return {
      refresh: true,
      keyWord: '',
      content: '',
      currentName: '',
      currentPath: ''
    }
  },
  components: { SideBar },
  computed: {
    fiction: {
      get () {
        return this.keyWord
      },
      set () {}
    }
  },
  methods: {
    async getContent (path) {
      this.currentName = path.split('-')[0]
      this.currentPath = path.split('-')[1]
      const response = await this.$axios.get('view', {
        params: {
          path: this.currentPath
        }
      })
      if (response.status !== 200) {
        this.$message.error('获取内容失败！')
      }
      this.content = response.data
    },
    // 书签
    setMark () {
      this.$store.commit('setMark', this.fiction, this.currentName, this.currentPath)
    },
    getMark () {
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  position: relative;
}
.el-aside {
  width: 15% !important;
  overflow-y: scroll;
  background-color: #545c64;
  .title {
    color: #fff;
    font-weight: 700;
    font-size: 16px;
  }
  .search__input {
    outline: none !important;
    width: 80%;
    .el-button {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    /deep/ .el-input-group__append {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    /deep/ .el-input__inner {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      &:focus {
        outline: none !important;
      }
    }
  }
}
.el-main {
  background: #FFF2E2;
  position: relative;
  text-align: left;
  .fiction__title {
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 30px;
  }
  .set__mark {
    position: fixed;
    top: 20px;
    right: 20px;
    opacity: .5;
  }
  .get__mark {
    position: fixed;
    top: 20px;
    right: 142px;
    opacity: .5;
  }
}
</style>
