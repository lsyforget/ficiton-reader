<template>
  <el-container>
    <el-aside :style="'width:'+width+'px'">
      <p class="title">Fiction-Reader</p>
      <div>
        <el-input class="search__input" v-model="keyWord">
          <el-button slot="append" icon="el-icon-search" @click="getMenuList"></el-button>
        </el-input>
      </div>
      <p class="title">{{title}}</p>
      <img :src="imgUrl" alt="">
      <side-bar :activeName="activeName" :refresh="refresh" :keyWord="keyWord" @getContent="getContent" :menuList="menuList" :total="total" :page="page" :pageSize="pageSize"></side-bar>
    </el-aside>
    <el-main id="main">
      <el-button :class="{'el-icon-s-fold':isCollapse, 'el-icon-s-unfold':!isCollapse, 'expend': isCollapse, 'collapse': !isCollapse }" @click="toggle"></el-button>
      <div class="btn__group" v-if="this.content">
        <el-button plain @click="toggleChapter('prev')">上一页</el-button>
        <el-button plain @click="toggleChapter('next')">下一页</el-button>
      </div>
      <div class="fiction__title">{{currentName}}</div>
      <div v-html="content"></div>
      <div class="btn__group" v-if="this.content">
        <el-button plain @click="toggleChapter('prev')">上一页</el-button>
        <el-button plain @click="toggleChapter('next')">下一页</el-button>
      </div>
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
      currentPath: '',
      menuList: [],
      page: 0,
      pageSize: 100,
      total: 0,
      title: '',
      imgUrl: '',
      isCollapse: true,
      width: 300,
      originData: [],
      activeName: ''
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
  mounted () {
  },
  methods: {
    async getContent (path) {
      if (!path) {
        return false
      }
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
    // 获取章节
    async getMenuList () {
      const response = await this.$axios.get(`search/${this.keyWord}`)
      if (response.status !== 200) {
        return this.$message.error('获取章节失败！')
      }
      this.originData = response.data.list
      this.menuList = this.seprate(response.data.list, this.pageSize)
      this.total = response.data.length
      this.page = Math.ceil(this.total / this.pageSize)
      this.content = ''
      this.currentName = ''
      this.title = response.data.novelName
      this.imgUrl = response.data.img
    },
    // 数组均分
    seprate (arr, num) {
      const newArr = []
      for (let i = 0; i < arr.length; i += num) {
        newArr.push(arr.slice(i, i + num))
      }
      return newArr
    },
    // 展开收起
    toggle () {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.width = 300
      } else {
        this.width = 0
      }
    },
    // 更换章节
    toggleChapter (type) {
      let chapter = ''
      this.originData.forEach((item, index) => {
        if (item.name === this.currentName) {
          if (type === 'prev') {
            chapter = this.originData[index - 1] && this.originData[index - 1].name + '-' + this.originData[index - 1].path
            return true
          } else {
            chapter = this.originData[index + 1] && this.originData[index + 1].name + '-' + this.originData[index + 1].path
            return true
          }
        }
      })
      console.log(chapter)
      this.activeName = chapter
      document.getElementById('main').scrollTop = 0
    },
    // 书签
    setMark () {
      this.$store.commit('setMark', this.fiction, this.currentName, this.currentPath)
    },
    getMark () {
    }
  },
  watch: {
    activeName () {
      this.getContent(this.activeName)
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  position: relative;
}
.el-aside {
  // width: 15% !important;
  overflow-y: scroll;
  background-color: #545c64;
  position: relative;
  z-index: 999;
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
  .expend {
    width: 30px;
    height: 30px;
    position: fixed;
    left: 300px;
    top: 0px;
    box-sizing: border-box;
    background: #545c64;
    border: none;
    border-radius: 0 4px 4px 0;
    padding: 0;
    transition: none;
    z-index: 999;
    opacity: .5;
    &::before {
      color: #fff;
    }
  }
  .collapse {
    width: 30px;
    height: 30px;
    position: fixed;
    left: 0px;
    top: 0px;
    box-sizing: border-box;
    background: #545c64;
    border: none;
    border-radius: 0 4px 4px 0;
    padding: 0;
    transition: none;
    z-index: 999;
    opacity: .5;
    &::before {
      color: #fff;
    }
  }
  .btn__group {
    text-align: center;
  }
}
</style>
