<template>
  <el-image :src="src" class="image-pic" :preview-src-list="[src]">
    <div slot="placeholder" class="image-slot">
      加载中<span class="dot">...</span>
    </div>
    <div slot="error" class="image-slot">
      <span class="el-icon-picture-outline"></span>
    </div>
  </el-image>
</template>

<script>
export default {  
  name: 'ImagePic',
  props: {
    src: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.image-pic{
  display: flex;
  min-width: 70px;
  min-height: 70px;
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  .image-slot{
    span {
      display: block;
      height: 80px;
      width: 80px;
      font-size: 40px;
      line-height: 80px;
      // border: 1px solid #F2F2F2;
    }
    i{
      font-size: 26px;
    }
  }
}
</style>
