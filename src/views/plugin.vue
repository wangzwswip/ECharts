<template>
  <div class="rooming-statistic">
    <div class="calendar">
      <FullCalendar class='demo-app-calendar' ref="fullCalendar" :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { deepClone } from '@/assets/libs/util'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '@fullcalendar/core/locales/zh-cn' // 支持中文
export default {
  name: 'plugin',
  data () {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today', // today
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay' // dayGridMonth,timeGridWeek,timeGridDay
        },
        initialView: 'dayGridMonth',
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        // editable: true,
        selectable: true,
        locale: 'zh-cn',
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        // eventsSet: this.handleEvents,
        firstDay: '1',
        weekNumberCalculation: 'ISO',
        allDayText: '全天',
        aspectRatio: 2.4,
        // height: 'auto', //日历高度
        // contentHeight: 'auto',
        showNonCurrentDates: true, // 是否显示上下月
        fixedWeekCount: false,
        buttonText: {
          today: '今天',
          month: '月',
          week: '周',
          day: '天'
        },
        events: []
        // events: [
        //   {
        //     id: '01',
        //     start: 1607678308000,
        //     end: 1608023908000,
        //     title: '测试会议',
        //     color: 'green'
        //   }
        // ]
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
      colors: ['#f29b76', '#89c997', '#88abda', '#aa89bd', '#f19ec2']
    }
  },
  methods: {
    // 日历方法
    handleDateSelect (selectInfo) {
      const title = prompt('输入事件标题')
      const calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      if (title) {
        calendarApi.addEvent({
          id: (new Date()).valueOf(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },
    handleEventClick (clickInfo) {
      console.log(clickInfo.event.extendedProps)
      const info = deepClone(clickInfo.event.extendedProps)
      info.hykssj = dayjs(info.hykssj).format('YYYY-MM-DD HH:mm:ss')
      info.hyjssj = dayjs(info.hyjssj).format('YYYY-MM-DD HH:mm:ss')
      this.$alert(`<div>会议标题: ${info.hymc} </div><div>开始时间:${info.hykssj}</div><div>结束时间:${info.hyjssj}</div><div>使用单位:${info.sydw}</div>`, '会议信息', {
        dangerouslyUseHTMLString: true
      })
      // if (confirm(`确定要删除 '${clickInfo.event.title}'`)) {
      //   clickInfo.event.remove()
      // }
    },
    handleEvents (events) {
      this.currentEvents = events
    },
    getRoomPlan () {
      const tmp = this.$refs.fullCalendar.getApi()
      const date1 = tmp.currentData.dateProfile.currentRange.start
      const date2 = tmp.currentData.dateProfile.currentRange.end
      const startTime = date1.valueOf() - 8 * 60 * 60 * 1000
      const endTime = date2.valueOf() - 8 * 60 * 60 * 1000
      console.log('开始时间：', startTime, '结束时间', endTime)
      const params = {
        hykssj: dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'),
        hyjssj: dayjs(endTime).format('YYYY-MM-DD HH:mm:ss'),
        current: 1,
        limit: 999
      }
      // this.$http.office.getRoomPlan(params).then((resp) => {
      //   console.log('日历结果', resp)
      //   this.updateEvent(resp.rows)
      // })
    },
    updateEvent (eventData) {
      const calendarApi = this.$refs.fullCalendar.getApi()
      const events = calendarApi.getEvents()
      if (events.length > 0) {
        events.forEach(event => {
          event.remove()
        })
      }
      // const tmpEvent = []
      if (eventData && eventData.length > 0) {
        let num = 0
        eventData.forEach((item, index) => {
          if (num > this.colors.length) {
            num = 0
          }
          calendarApi.addEvent({
            id: item.id,
            title: item.hymc,
            start: item.hykssj,
            end: item.hyjssj,
            color: this.colors[num],
            hykssj: item.hykssj,
            hyjssj: item.hyjssj,
            sydw: item.sydw,
            hymc: item.hymc,
            chrs: item.chrs,
            hysdd: item.hysdd
          })
          num += 1
        })
      }
      // calendarApi.addEvent(tmpEvent)
      console.log('结束', this.calendarOptions.events)
    },
    addListener () {
      const _this = this
      document.getElementsByClassName('fc-prev-button')[0].addEventListener('click', function () {
        _this.getRoomPlan()
      })
      document.getElementsByClassName('fc-next-button')[0].addEventListener('click', function () {
        _this.getRoomPlan()
      })
      document.getElementsByClassName('fc-dayGridMonth-button')[0].addEventListener('click', function () {
        _this.getRoomPlan()
      })
      document.getElementsByClassName('fc-timeGridWeek-button')[0].addEventListener('click', function () {
        _this.getRoomPlan()
      })
      document.getElementsByClassName('fc-timeGridDay-button')[0].addEventListener('click', function () {
        _this.getRoomPlan()
      })
      document.getElementsByClassName('fc-today-button')[0].addEventListener('click', function () {
        _this.getRoomPlan()
      })
    }
  },
  mounted () {
    this.getRoomPlan()
    this.addListener()
  }
}
</script>

<style lang='scss'>
  .rooming-statistic {
    position: relative;
    width: 100%;
    height: 100%;
    .calendar {
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      background: #fff;
      margin: 20px;
      padding: 20px;
      padding-top: 60px;
      .fc-daygrid-event {
        span {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .fc-button-primary {
        background: transparent;
        color: rgba(0, 0, 0, 0.6);
        border-color: #dddddd;
        &:hover {
          color: rgba(0, 0, 0, 1);
        }
      }
      .fc-button-active {
        background: #009999;
        color: rgba(255, 255, 255, 1);
        border-color: #009999;
      }
      .fc .fc-button-primary:not(:disabled).fc-button-active {
        background: #009999;
        color: rgba(255, 255, 255, 1);
        border-color: #009999;
      }
      .fc .fc-button-primary:not(:disabled):active {
        background: transparent;
        color: rgba(0, 0, 0, 1);
        border-color: #dddddd;
      }
      .fc .fc-button-primary:focus {
        box-shadow: none;
      }
    }
  }
</style>
