<template>
  <div>
    <div class="header">
      <a-page-header style="background: lavender" sub-title="微助教" title="投票结果">
      </a-page-header>
    </div>
    <div class="charts">
      <div id="chartPie" class="pie-wrap"></div>
    </div>
    <div class="echarts">
      <div id="main" style="width: auto;height:400px;"></div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import * as echarts from 'echarts'

require('echarts/theme/macarons2')// 引入主题
export default {
  name: 'voteDetail',
  store,
  data () {
    return {
      voteTitle: null,
      voteData: [],
      chartPie: null,
      paramId: null,
      option: []
    }
  },
  async created () {
    document.title = '投票详情'
    this.paramId = this.$route.query.id
    this.voteTitle = await this.$Http.findVoteName(this.paramId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.voteTitle = this.voteTitle.theme
    let res = []
    res = await this.$Http.getVoteDetail(this.paramId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    for (let i = 0; i < res.length; i++) {
      this.voteData.push({
        name: res[i].choiceName,
        value: res[i].count
      })
      this.option.push(res[i].choiceName)
    }
    this.$nextTick(() => {
      this.drawPieChart()
      this.myEcharts()
    })
  },
  methods: {
    drawPieChart () {
      const mylabel = {
        show: true,
        position: 'right',
        offset: [30, 40],
        formatter: '{b} : {c} ({d}%)',
        color: '#333',
        fontSize: 18
      }
      this.chartPie = echarts.init(document.getElementById('chartPie'), 'macarons')
      this.chartPie.setOption({
        title: {
          text: '选项分布',
          subtext: this.voteTitle,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          data: this.option,
          left: 'center',
          top: 'bottom',
          orient: 'horizontal',
          icon: 'circle'
        },
        series: [
          {
            name: '选项',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: this.voteData,
            animationEasing: 'cubicInOut',
            animationDuration: 600,
            emphasis: {
              label: mylabel
            }
          }
        ]
      })
    },
    myEcharts () {
      const myChart = echarts.init(document.getElementById('main'))
      const option = {
        title: {
          text: this.voteTitle
        },
        tooltip: {},
        xAxis: {
          data: this.option
        },
        yAxis: {},
        series: [{
          name: '选项',
          type: 'bar',
          data: this.voteData
        }]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang='less' scoped>
.pie-wrap {
  width: 100%;
  height: 400px;
}
</style>
