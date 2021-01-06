<template>
  <div class="echart">
    <div><Rings :dataObj="data_1"></Rings></div>
    <div>dsfsdf</div>
  </div>
</template>

<script>
export default {
  name: 'echarts',
  data () {
    return {
      data_1: {
        id: 'echarts_1',
        data: [
          {
            name: '数据1',
            value: 200,
            unit: '个'
          },
          {
            name: '数据2',
            value: 178,
            unit: '个'
          },
          {
            name: '数据3',
            value: 22,
            unit: '个'
          }
        ]
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .echart {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: scroll;
    background: #fff;
    >div {
      width: 25%;
      height: 30%;
    }
  }
</style>
