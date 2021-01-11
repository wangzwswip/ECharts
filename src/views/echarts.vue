<template>
  <div class="echart">
    <div><Rings :dataObj="data_1"></Rings></div>
    <div><Ring :dataObj="data_2"></Ring></div>
    <div><RingPercent :dataObj="data_3"></RingPercent></div>
    <div><Wave :dataObj="data_4"></Wave></div>
    <div><Bar :dataObj="data_5"></Bar></div>
    <div><LineSingle :dataObj="data_6"></LineSingle></div>
    <div><LineDouble :dataObj="data_7"></LineDouble></div>
    <div><Dail :dataObj="data_8"></Dail></div>
    <div><GaleRose :dataObj="data_9"></GaleRose></div>
    <div><StackBar :dataObj="data_10"></StackBar></div>
    <div><TwoDreBar :dataObj="data_11"></TwoDreBar></div>
    <div><Radar :dataObj="data_12"></Radar></div>
  </div>
</template>

<script>
export default {
  name: 'echarts',
  data () {
    return {
      data_1: {
        id: 'echarts_1',
        unit: '个',
        data: [
          {
            name: '数据1',
            value: 200
          },
          {
            name: '数据2',
            value: 178
          },
          {
            name: '数据3',
            value: 22
          }
        ]
      },
      data_2: {
        id: 'echarts_2',
        radius: ['50%', '70%'],
        center: ['50%', '45%'],
        data: [
          { name: '数据1', value: 15 },
          { name: '数据2', value: 15 },
          { name: '数据3', value: 15 },
          { name: '数据4', value: 15 }
        ]
      },
      data_3: {
        id: 'echarts_3',
        value: 75
      },
      data_4: {
        id: 'echarts_4',
        value: 0.78
      },
      data_5: {
        id: 'echarts_5',
        data: [
          {
            name: 'A',
            value: 89
          },
          {
            name: 'B',
            value: 42
          },
          {
            name: 'C',
            value: 67
          },
          {
            name: 'D',
            value: 55
          },
          {
            name: 'E',
            value: 20
          },
          {
            name: 'F',
            value: 30
          }
        ]
      },
      data_6: {
        id: 'echarts_6',
        data: [
          { name: '0', value: 0 },
          { name: '1', value: 7 },
          { name: '2', value: 16 },
          { name: '3', value: 11 },
          { name: '4', value: 7 },
          { name: '5', value: 9 },
          { name: '6', value: 18 },
          { name: '7', value: 37 },
          { name: '8', value: 44 },
          { name: '9', value: 48 },
          { name: '10', value: 62 },
          { name: '11', value: 50 },
          { name: '12', value: 48 },
          { name: '13', value: 40 },
          { name: '14', value: 35 },
          { name: '15', value: 40 },
          { name: '16', value: 44 },
          { name: '17', value: 60 },
          { name: '18', value: 80 },
          { name: '19', value: 50 },
          { name: '20', value: 42 },
          { name: '21', value: 36 },
          { name: '22', value: 22 },
          { name: '23', value: 26 },
          { name: '24', value: 5 }
        ]
      },
      data_7: {
        id: 'echarts_7',
        data: [
          { name: '1月', value: 12 },
          { name: '2月', value: 22 },
          { name: '3月', value: 42 },
          { name: '4月', value: 62 },
          { name: '5月', value: 82 },
          { name: '6月', value: 12 },
          { name: '7月', value: 92 },
          { name: '8月', value: 32 }
        ],
        data1: [
          { name: '1月', value: 22 },
          { name: '2月', value: 12 },
          { name: '3月', value: 22 },
          { name: '4月', value: 42 },
          { name: '5月', value: 62 },
          { name: '6月', value: 82 },
          { name: '7月', value: 32 },
          { name: '8月', value: 92 }
        ]
      },
      data_8: {
        id: 'echarts_8',
        data: 10,
        max: 40
      },
      data_9: {
        id: 'echarts_9',
        data: [
          {
            name: '数据1',
            value: 10
          },
          {
            name: '数据2',
            value: 20
          },
          {
            name: '数据3',
            value: 30
          }
        ],
        legend: { show: true, top: 40, right: 40 },
        unit: '个',
        label: false,
        radius: ['55%', '80%'],
        center: ['40%', '50%']
      },
      data_10: {
        id: 'echarts_10',
        datapre: [{name: 'A', value: 23}, {name: 'B', value: 13}, {name: 'C', value: 22}],
        databac: [{name: 'A', value: 5}, {name: 'B', value: 14}, {name: 'C', value: 18}],
        legendName: ['数据1', '数据2']
      },
      data_11: {
        id: 'echarts_11',
        data: [{name: 'A', value: 23}, {name: 'B', value: -13}, {name: 'C', value: 22}, {name: 'D', value: -22}]
      },
      data_12: {
        id: 'echarts_12',
        data: [40, 30, 60, 40, 50, 70]
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
