<template>
  <DialogTwo :title="stationInfo.stationName">
    <div class="content">
      <div class="base-info">
        <div class="item">
          <div class="label">站号</div>
          <div class="value">{{ stationInfo.stationCode }}</div>
        </div>
        <div class="item">
          <div class="label">站类</div>
          <div class="value">{{ stationInfo.stationTypeLabel }}</div>
        </div>
      </div>
      <div class="filter-area">
        <el-select v-model="time" class="select" @change="timeChange">
          <el-option label="一小时" :value="1" />
          <el-option label="一天" :value="24" />
          <el-option label="三天" :value="72" />
        </el-select>
      </div>
      <div
        ref="chart"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
        class="chart"
      />
    </div>
    <div slot="footer" class="footer">
      <div class="label">累计雨量</div>
      <div class="value">{{ stationInfo.accumulatedRainfall }}<span class="unit">mm</span></div>
    </div>
  </DialogTwo>
</template>

<script>
import DialogTwo from './DialogTwo'
import { NO_DATA_OPTION } from '@/config/constant'
import * as echarts from 'echarts'
import * as dayjs from 'dayjs'
export default {
  components: { DialogTwo },
  props: {
    baseInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      time: 72,
      stationInfo: {},
      chart: null,
      chartData: [],
    }
  },
  mounted() {
    this.getStationInfo()
  },
  methods: {
    timeChange() {
      this.getStationInfo()
    },
    getStationInfo() {
      this.stationInfo = {
        stationCode: this.baseInfo.stcd,
        stationName: this.baseInfo.stnm,
        stationType: 'RR',
        stationTypeLabel: '雨量',
        rainfall: 3.3,
        unit: 'mm',
        accumulatedRainfall: '--',
      }
      this.getChartData()
    },
    async getChartData() {
      this.loading = true
      try {
        const params = {
          stcd: this.baseInfo.stcd,
          startTime: dayjs().add(-this.time, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          endTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        }
        // 雨量-近x小时雨量数据 列表
        // 监测评率：每5分钟
        const res = await this.$post(
          '/api/floodSituation/rainfall/listHistoryRainfallByStcd',
          params
        )
        const { message } = res
        if (Array.isArray(message) && message.length) {
          // 后台给出的数据时间顺序不对，需要排序
          const rainfallData = message.sort((a, b) => { 
            return dayjs(a.tm).valueOf() - dayjs(b.tm).valueOf()
          })
          let list = rainfallData.map(item => {
            return [dayjs(item.tm).format('DD日HH时mm分'), item.drp]
          })
          if (this.time === 72) {
            // 三天的雨量数据X轴只显示小时，需要将每小时的数据合并
            list = []
            const obj = {}
            const data = [...rainfallData]
            // 过滤掉头部不以整点开始的数据
            const i = 0
            let minute = +dayjs(data[i].tm).get('minute')
            while (minute !== 0) {
              // 分钟不为0时，删除第一个，并重新给minute赋值
              data.shift()
              minute = +dayjst(data[i].tm).get('minute')
            }
            // 过滤掉头尾的数据后，将同一小时内的数据累积相加
            data.forEach(item => {
              const time = dayjs(item.tm).format('DD日HH时')
              if (obj[time]) {
                obj[time] = obj[time] + item.drp
              } else {
                obj[time] = item.drp
              }
            })
            list = Object.entries(obj)
          }
          this.chartData = [['', ''], ...list]
          const rainfall = res.message.reduce((a, b) => a + b.drp, 0)
          this.stationInfo.accumulatedRainfall = rainfall !== null ? rainfall.toFixed(2) : '--'
        }
        this.initChart()
      } catch (error) {
        console.error(error)
      }
      this.loading = false
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      if (!this.chartData.length) {
        this.chart.setOption(NO_DATA_OPTION)
        return
      }
      const option = {
        xAxis: {
          type: 'category',
          position: 'top',
          axisTick: { show: false },
          axisLine: {
            onZero: true,
            lineStyle: {
              color: '#3c6aa4',
            },
          },
          axisLabel: {
            margin: 9,
            color: '#5dbbde',
            fontSize: 16,
          },
        },
        yAxis: {
          type: 'value',
          name: '雨量(mm)',
          nameLocation: 'start',
          nameGap: 10,
          nameRotate: -90,
          nameTextStyle: {
            color: '#5dbbde',
            fontSize: 14,
            align: 'left',
            verticalAlign: 'top',
            lineHeight: 80,
          },
          inverse: true,
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#3c6aa4',
            },
          },
          axisLabel: {
            margin: 6,
            color: '#5dbbde',
            fontSize: 14,
          },
          splitLine: { show: false },
        },
        dataZoom: [
          {
            type: 'inside',
            brushSelect: false,
          },
        ],
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            return (
              `<div>${params[0].name}</div>` +
              params
                .map((param, index) => {
                  return `<div>
                  ${param.marker}
                  <span>${param.value[1].toFixed(2)}mm</span>
                </div>`
                })
                .join('')
            )
          },
        },
        dataset: {
          source: this.chartData,
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              color: '#0e9ac2',
              barBorderRadius: [0, 0, 3, 3],
            },
            barWidth: 6,
          },
        ],
      }
      this.chart.setOption(option)
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  .base-info {
    margin-top: 18px;
    display: flex;
    font-size: 16px;
    .item {
      flex: auto;
      display: flex;
      .label {
        color: #39f4f7;
      }
      .value {
        margin-left: 15px;
        color: #ffffff;
      }
    }
  }
  .filter-area {
    margin-top: 18px;
    .select {
      width: 160px;
    }
  }
  .chart {
    margin-top: 20px;
    width: 650px;
    height: 295px;
  }
}
.footer {
  .label {
    color: #39f4f7;
    font-size: 16px;
  }
  .value {
    margin-top: 15px;
    color: #ffffff;
    font-size: 30px;
    font-weight: bold;
    .unit {
      margin-left: 8px;
      color: #618e9f;
      font-size: 14px;
      font-weight: normal;
      vertical-align: baseline;
    }
  }
}
</style>
