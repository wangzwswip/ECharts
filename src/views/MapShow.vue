<template>
  <div class="two-part-body role-manage">
    <div class="left-part">
      <div class="left-title">地图分类</div>
      <div class="role-list">
        <el-scrollbar style="height: 100%">
          <div
            v-for="(item, index) in mapList"
            :key="index"
            class="role-list-item"
            :class="[selectIndex === index ? 'active-tree-list' : '']"
            @click="searchTableById(item, index)"
          >
            <span>{{ item.name }}</span>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="right-part">
      <div class="image-container" id="container">
        <Scrollbar style="height: 100%">
          <viewer :options="optionsViewer" :images="imageList"
            @inited="inited"
            style="width: 100%;height: 100%;"
            class="viewer"
            ref="viewer">
            <template slot-scope="scope">
              <figure class="images">
                <div :class="[selectIndex === index ? 'image-wrapper active-image' : 'image-wrapper']"
                  v-for="(src, index) in scope.images"
                  :key="index"
                  @click="clickImage(index)">
                  <img :src="src" class="image">
                </div>
              </figure>
            </template>
          </viewer>
        </Scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import Scrollbar from '@assets/libs/scrollbar'
export default {
  name: 'MapShow',
  components: {
    Scrollbar
  },
  data () {
    return {
      viewer: null,
      loading: false,
      filterText: '',
      selectIndex: 0,
      mapList: [
        {
          name: '图片1',
          id: '01'
        },
        {
          name: '图片2',
          id: '02'
        },
        {
          name: '图片3',
          id: '03'
        },
        {
          name: '图片4',
          id: '04'
        },
        {
          name: '图片5',
          id: '05'
        },
        {
          name: '图片6',
          id: '06'
        },
        {
          name: '图片7',
          id: '07'
        },
        {
          name: '图片8',
          id: '08'
        },
        {
          name: '图片9',
          id: '09'
        },
        {
          name: '图片10',
          id: '10'
        },
        {
          name: '图片11',
          id: '11'
        },
        {
          name: '图片12',
          id: '12'
        },
        {
          name: '图片13',
          id: '13'
        },
        {
          name: '图片14',
          id: '14'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      imageList: [
        require('@/assets/images/map_1.jpg'),
        require('@/assets/images/map_2.jpg'),
        require('@/assets/images/map_3.jpg'),
        require('@/assets/images/map_4.jpg'),
        require('@/assets/images/map_5.jpg'),
        require('@/assets/images/map_6.jpg'),
        require('@/assets/images/map_7.jpg'),
        require('@/assets/images/map_1.jpg'),
        require('@/assets/images/map_2.jpg'),
        require('@/assets/images/map_3.jpg'),
        require('@/assets/images/map_4.jpg'),
        require('@/assets/images/map_5.jpg'),
        require('@/assets/images/map_6.jpg'),
        require('@/assets/images/map_7.jpg')
      ],
      optionsViewer: {
        zIndex: 9999,
        inline: false,
        button: true,
        navbar: true,
        title: false,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: true,
        fullscreen: false,
        keyboard: true
        // url: 'data-source'
      }
    }
  },
  watch: {},
  methods: {
    searchTableById (item, index) {
      this.selectIndex = index
      console.log('dd')
      this.$viewer.view(index)
    },
    clickImage (index) {
      this.selectIndex = index
    },
    initPic () {
      // const ViewerDom = document.getElementById('container')
      // if (this.viewer !== null) { this.viewer = null }
      // this.viewer = new Viewer(ViewerDom, {
      //   // 相关配置项,详情见下面
      // })
    },
    inited (viewer) {
      this.$viewer = viewer
    },
    show () {
      console.log('dd')
      this.$viewer.show()
    }
  },
  mounted () {}
}
</script>

<style lang='scss'>
.role-manage {
  .role-list {
    flex: 1;
    padding: 10px 0;
    .role-list-item {
      line-height: 36px;
      // margin: 0 25px;
      display: flex;
      justify-content: space-between;
      padding: 0 10px 0 20px;
      cursor: pointer;
      transition: all .5s;
      &:hover{
        background:rgba(5,157,67, 0.1);
        color:#196E74;
        .handle {
          display: block;
        }
      }
      .handle {
        display: none;
        span {
          font-size: 12px;
          & + span {
            margin-left: 10px;
          }
        }
      }
    }
    .active-tree-list {
      background:rgba(5,157,67, 0.1);
      color: #196E74;
    }
  }
  .image-container {
    margin: 50px;
    height: calc(100% - 100px);
    width: calc(100% - 100px);
    position: relative;
    .images {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      // align-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 5px;
      position: relative;
      overflow: auto;
      .image-wrapper {
        display: inline-block;
        width: calc(33% - 20px);
        height: calc(33% - 20px);
        margin: 10px;
        transition: 0.5s;
        &:hover {
          transform: scale(1.05)
        }
        .image {
          width: 100%;
          height: 100%;
          cursor: pointer;
          display: inline-block;
        }
      }
      .active-image {
        border: 2px solid #196b71;
      }
    }
  }
}
.two-part-body {
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row!important;
  position: relative;
  overflow: hidden;
  .left-part {
    width: 262px;
    overflow: hidden;
    background: #fff;
    margin-right: 20px;
    height: 100%;
    padding: 9px;
    padding-top: 0;
    display: flex;
    flex-direction: column!important;
    .left-title {
      font-size: 14px;
      color:#666;
      line-height: 28px;
      height: 54px;
      line-height: 54px;
      padding-left: 10px;
      font-family: 'Microsoft YaHei Regular';
      border-bottom: 1px solid #CCCCCC;
    }
  }
  .right-part {
    flex: 1;
    background: #fff;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    .right-title{
      height: 54px;
      font-family: 'Microsoft YaHei Regular';
      font-size: 14px;
      line-height: 54px;
      color: #666;
      padding-left: 24px;
      border-bottom: 1px solid #CCCCCC;
    }
    .right-body {
      flex: 1;
      padding: 0 20px;
      overflow: hidden;
      position: relative;
    }
  }
}
</style>
