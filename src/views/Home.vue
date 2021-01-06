<template>
  <div class="home-wrap">
    <div class="head-wrap">
      <span class="time">
        <label>{{ time }}</label>
        <label>{{ date }}</label>
      </span>
    </div>
    <div class="body-wrap">
      <div class="menu">
        <Menu/>
      </div>
      <div class="router-wrap">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Menu from '@/components/home/Menu.vue'
export default {
  name: 'home',
  components: {
    Menu
  },
  data () {
    return {
      time: '',
      date: ''
    }
  },
  watch: {
    $route: 'routeChange'
  },
  methods: {
    routeChange () {
      console.log('dd', this.$route.fullPath)
    },
    getTime () {
      this.time = dayjs(new Date()).format('HH:mm:ss')
      this.date = dayjs(new Date()).format('YYYY年MM月DD日')
      setInterval(() => {
        this.time = dayjs(new Date()).format('HH:mm:ss')
      }, 1000)
      setInterval(() => {
        this.date = tdayjs(new Date()).format('YYYY年MM月DD日')
      }, 1000 * 60 * 60 * 24)
    }
  },
  mounted () {
    this.getTime()
    // this.$nextTick(() => {
    //   let el = $('#app').find('*')
    //   for (let i = 0; i < el.length; i++) {
    //     var cssText = $(el[i]).attr('style') ? ($(el[i]).attr('style') + ';pointer-events:none!important;') : 'pointer-events:none!important;'
    //     $(el[i]).css('cssText', cssText)
    //   }
    //   let mm = 0
    //   this.inner = setInterval(() => {
    //     if (!this.$refs['zt-earth'].isWar) {
    //       for (let i = 0; i < el.length; i++) {
    //         $(el[i]).css('pointer-events', '')
    //       }
    //       clearInterval(this.inner)
    //     }
    //     mm++
    //   }, 500)
    // })
  }
}
</script>

<style lang="scss">
  .home-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;

    .head-wrap {
      overflow: hidden;
      .time{
        color: #000;
        display: inline-block;
        margin: 5px;
        height: 60px;
        label{
          display: block;
        }
        label:nth-child(1){
          font-size: 16px;
          font-family: 'Arial Regular', 'Arial Regular-Regular';
          font-weight: 400;
          text-align: right;
          color: #000;
          line-height: 18px;
        }
        label:nth-child(2){
          font-size: 14px;
          margin-top: 3px;
        }
      }
    }

    .body-wrap {
      flex: 1;
      display: flex;
      flex-flow: row;
      overflow: hidden;

      .menu {
        flex: 0 0 auto;
        width: 200px;
        background: #001529;
        box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
        z-index: 2;
        overflow: hidden;
      }

      .router-wrap {
        position: relative;
        padding: 20px;
        flex: 1;
        background: $main-background;
        overflow-y: auto;
        overflow-x: hidden;
        border-radius: 4px;

        .el-scrollbar__view {
          height: 100%;
        }

        .dialog-scrollbar__wrap {
          height: 100%;
          width: 100%;
          overflow-x: hidden;
        }
        .table-row-wrap {
          height: 80px;
        }

        .el-table .cell {
          max-height: 50px;
          white-space: nowrap;
        }
      }
    }
  }
</style>
