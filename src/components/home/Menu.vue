<template>
  <div class="header-wrap">
    <div class="header-title-wrap">
      <h1 class="header-title" @click="clickt">
        测试
      </h1>
    </div>
    <div class="header-menu-wrap">
      <Scrollbar
        class="header-scrollbar"
        wrap-class="header-scrollbar__wrap">
        <el-menu
          :default-active="activeIndex"
          class="header-menu"
          mode="vertical"
          background-color="#001529"
          text-color="#ffffffa6"
          active-text-color="#fff"
          @select="handleSelect"
          >
          <el-menu-item
            v-for="item in nav"
            :key="item.name"
            :index="item.name">
            <template>
              <span>{{item.title}}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </Scrollbar>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Scrollbar from '@/assets/libs/scrollbar'

export default {
  data () {
    return {
      nav: [
        {
        name: 'echarts',
        title: 'echarts',
        children: []
        },
        {
          name: 'test',
          title: 'test',
          children: []
        }
      ],
      activeIndex: 'echarts',
      input: ''
    }
  },
  created () {},
  mounted () {
  },
  methods: {
    clickt () {
      console.log('dd')
    },
    handleSelect (_key) {
      console.log('ddd')
      console.log('选择的', _key)
      if (this.$route.name === _key) return
      this.$router.push({ name: _key })
    },
    getRealPath () {
      return this.$route.name
    }
  },
  components: {
    Scrollbar
  }
}
</script>
<style lang="scss">
  .head-collapse {
    .el-scrollbar__view {
      width: initial !important;
    }

    .header-menu {
      .car-font {
        margin-left: 6px;
      }
    }
  }

  .header-wrap {
    display: flex;
    flex-flow: column;
    height: 100%;

    .header-title-wrap {
      height: 60px;
      background: $main-color-active;
      overflow: hidden;
    }

    .header-menu-wrap {
      flex: 1;
      overflow: hidden;

      .header-scrollbar {
        height: 100%;
      }

      .header-scrollbar__wrap {
        overflow: auto;
        overflow-x: hidden;

        .el-scrollbar__view {
          width: 200px;
        }
      }

      .el-submenu__title .el-submenu__icon-arrow {
        font-weight: bold;
      }
    }

    .el-menu--inline {
      background: #000c17 !important;

      .el-menu-item, .el-submenu__title {
        background: #000c17 !important;
      }
    }

    .header-title {
      color: #fff;
      margin: 0;
      line-height: 60px;
      height: 60px;
      font-size: 20px;
      padding: 0 15px;

      .car-font {
        float: left;
        font-size: 34px;
        margin-right: 14px;
        font-weight: initial;
      }
    }

    .header-menu {
      text-align: left;

      .el-menu-item {
        padding: 0 19px;
      }

      &.el-menu {
        border: none !important;
      }

    }

    .el-menu {
      border-bottom: none;

      .el-submenu__title, .el-menu-item {
        &:hover {
          background: none !important;
          color: #fff !important;

          span {
            color: #fff;
          }
        }
      }

      .el-menu-item.is-active {
        background: $main-color !important;
      }

      .car-font {
        color: #909399;
        font-size: 14px;
        margin-right: 10px;
      }
    }
  }
</style>
