<template>
  <div class="slide-show">
    <el-carousel
      :autoplay="false"
      trigger="click"
      ref="carousel"
      indicator-position: none
      @click.native="activeIndex"
    >
      <el-carousel-item v-for="(item, index) in urlList" :key="index" name="index">
        <span
          class="el-carousel__arro el-carousel__arrow--left el-icon-arrow-left"
          @click.stop="prevIndex"
        ></span>
        <span
          class="el-carousel__arro el-carousel__arrow--right el-icon-arrow-right"
          @click.stop="nextIndex"
        ></span>
        <img class="shufflingImg"  v-if="item.type === 1 " :src="item.url" alt="" style="object-fit: contain">
        <video
          v-else
          class="shufflingVideo"
          :id="'v_' + index"
          :src="item.url"
          :autoplay="false"
          ref="audio"
          controls
        ></video>
        <!-- <div class="lengthTime" v-if="item.type==2">
            <span>{{item.time}}</span>
        </div> -->
        <!-- <div class="imgControls" v-if="item.type==2">
          <span v-if="currentPlay" @click.stop="currentState(0, index)"><i class="iconfont icon-bofang1"></i></span>
          <span v-if="currentPause" @click.stop="currentState(1, index)"><i class="iconfont icon-bofang"></i></span>
        </div> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: 'SlideShow',
  props: {
    urlList: {
      type: Array,
      required: true
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      // autoPlay:'',//自动播放
      // videoPlay:'',//是否可播放
      // Id: '',//视频数组id
      currentVideoId:'',//当前video
      currentPause:'',//当前暂停
      dataList: []
    };
  },
  mounted() {
    this.dataList = this.urlList
    this.centerList = this.centerlist;
    this.bannerWidth = this.width;
    this.bannerHeight = this.height;
    console.log('传入的数据', this.dataList);
    // this.Id = this.id;
    // this.videoPlay = this.videoplay;
    // this.centerList = [
    //   {
    //     type: this.centerList.sampleCoverType, //type1.2
    //     url:this.centerList.sampleCoverType == 1? this.centerList.sampleCover.split(',')[0]: this.centerList.sampleCover, //轮播数
    //     time:Math.round(this.centerList.sampleCoverVideoDuration)
    //   },
    //   {
    //     type:this.centerList.sampleWork1Type,
    //     url:this.centerList.sampleWork1Type==null?'':(this.centerList.sampleWork1Type==1?(this.centerList.sampleWork1 || '').split(',')[0]: this.centerList.sampleWork1),
    //     time:Math.round(this.centerlist.sampleWork1VideoDuration)
    //   },
    //   {
    //     type: this.centerList.sampleWork2Type,
    //     url:this.centerList.sampleWork2Type==null?'':(this.centerList.sampleWork2Type==1?(this.centerList.sampleWork2 || '').split(',')[0]: this.centerList.sampleWork2),
    //     time:Math.round(this.centerlist.sampleWork2VideoDuration)
    //   },
    //   {
    //     type: this.centerList.sampleWork3Type,
    //     url:this.centerList.sampleWork3Type==null?'':(this.centerList.sampleWork3Type==1?(this.centerList.sampleWork3 || '').split(',')[0]: this.centerList.sampleWork3),
    //     time:Math.round(this.centerlist.sampleWork3VideoDuration)
    //   },
    //   {
    //     type: this.centerList.sampleWork4Type,
    //     url:this.centerList.sampleWork4Type==null?'':(this.centerList.sampleWork4Type==1?(this.centerList.sampleWork4 || '').split(',')[0]: this.centerList.sampleWork4),
    //     time:Math.round(this.centerlist.sampleWork4VideoDuration)
    //   },
    //   {
    //     type: this.centerList.sampleWork5Type,
    //     url:this.centerList.sampleWork5Type==null?'':(this.centerList.sampleWork5Type==1?(this.centerList.sampleWork5 || '').split(',')[0]: this.centerList.sampleWork5),
    //     time:Math.round(this.centerList.sampleWork5VideoDuration)
    //   },
    // ];
//后台的数据不是很好用就进行了重新组合，type判断视频还是图片，url是地址，time是时长
    // this.centerList=this.centerList.filter(item=>item.type!=null)
    // for (var i = 0; i <this.centerList.length; i++) {
    //        this.centerList[i]["time"]=this.lengthTime(this.centerList[i].time)
    //   }
  },
  beforeDestroy () {
    this.currentVideoId = document.getElementById('v_' + this.activeIndex())
    // let allVideo=document.getElementsByTagName('video')
    // console.log('所有video---->',allVideo)
    this.currentVideoId !== null ? this.currentVideoId.pause() : ''
  },
  methods: {
    //当前id
    activeIndex() {
      let activeIndex = this.$refs.carousel.activeIndex;//element ui内置方法获取点击轮播对id
      return activeIndex;
    },
    //上
    prevIndex(){
      this.currentVideoId = document.getElementById('v_' + this.activeIndex())
      this.currentVideoId === null ? '' : this.currentVideoId.pause()
      this.$refs.carousel.setActiveItem(this.activeIndex() - 1)
      this.currentVideoId = document.getElementById('v_' + this.activeIndex())
      this.currentVideoId === null ? '' : this.currentVideoId.currentTime=0
      this.currentVideoId === null ? '' : this.currentVideoId.play()
    },
    //下
    nextIndex(){
      this.currentVideoId = document.getElementById('v_' + this.activeIndex())
      this.currentVideoId === null ? '' : this.currentVideoId.pause()
      console.log('设置前', this.currentVideoId)
      this.$refs.carousel.setActiveItem(this.activeIndex() + 1)
      console.log('哪一个', this.activeIndex() + 1)
      this.currentVideoId = document.getElementById('v_' + this.activeIndex())
      console.log('设置后', this.currentVideoId)
      this.currentVideoId === null ? '' : this.currentVideoId.currentTime=0
      this.currentVideoId === null ? '' : this.currentVideoId.play()
    }
  }
//后台传过来的是秒，所以需要对时间进行处理，播放时间倒计时没做出来，欢迎大佬补充讨论
    
};
</script>
<style lang="scss" scope>
.slide-show {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  .el-carousel {
    height: 100%;
    width: 100%;
    position: relative;
    .el-carousel__container {
      width: 100%;
      height: 100%;
    }
  }
  .shufflingImg {
    width: 100%;
    height: 100%;
  }
  .shufflingVideo{
    width: 100%;
    height: 100%;
  }
  // .el-carousel__item {
  //   z-index: -4;
  // }
  .el-carousel__indicators {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .el-carousel__indicator {
    display: inline-block;
    padding: 4px 4px;
    pointer-events: none!important;
  }
  .el-carousel__indicators > .is-active > .el-carousel__button {
    width: 10px;
    height: 10px;
    pointer-events: none!important;
  }
  .el-carousel__button {
    width: 8px;
    height: 8px;
    background: rgba(254, 254, 254, 1);
    border-radius: 50%;
    pointer-events: none!important;
  }
  .el-carousel__arrow--left {
    left: 10px;
  }
  .el-carousel__arrow--right {
    right: 10px;
  }
  .el-carousel__arrow {
    display: none;//因为需要点击下一个停止播放，所以重新写了elemennt 的左右切换按钮
  
  }
  .el-carousel__arrow:hover {
    color: #929292;
    background-color: #ffffff;
  }
  .el-carousel__arro {
    display: none;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: 0.3s;
    position: absolute;
    top: 50%;
    z-index: 9963;
    transform: translateY(-50%);
    text-align: center;
    font-size: 30px;
    height: 30px;
    width: 30px;
    color: rgb(122, 118, 118);
  }
  .el-carousel__item:hover .el-carousel__arro{
    display: block;
  }
  .el-carousel__arro:hover {
    color: #fff;
  }
  .imgControls{
  z-index:256;
  width:30px;
  height:30px;
  position: absolute;
  top: 10px;
  right: 10px;   
  }
  .lengthTime{
    z-index:256;
    width:36px;
    height:15px;
    line-height: 15px;
    text-align: center;
    position: absolute;
    bottom: 10px;
    right: 10px; 
    background:rgba(33,33,33,1);
    opacity:0.6;
    border-radius:8px;
    span{
      font-size:12px;
      color:rgba(255,255,255,1);
      text-align: center;
    }  
  }
}
</style>