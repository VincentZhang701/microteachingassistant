<template>
<div>
  <div class="header">
    <a-page-header title="投票结果" sub-title="微助教" style="background: lavender">
    </a-page-header>
  </div>
  <div class="charts">
    <div id="chartPie" class="pie-wrap"></div>
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
      voteTitle: '测试用例',
      voteData: [],
      chartPie: null
    }
  },
  async created () {
    document.title = '投票详情'
    const paramId = this.$route.query.id
    this.$message.info(paramId)
    let res = []
    res = await this.$Http.getVoteDetail(paramId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    for (let i = 0; i < res.length; i++) {
      this.voteData.push({
        name: res[i].choiceName,
        value: res[i].count
      })
    }
    console.log(res)
    console.log(this.voteData)
    this.$nextTick(() => {
      this.drawPieChart()
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
          data: this.voteData[name],
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
    }
  }
}
</script>

<style lang='less' scoped>
.pie-wrap{
  width:100%;
  height:400px;
}
</style>
