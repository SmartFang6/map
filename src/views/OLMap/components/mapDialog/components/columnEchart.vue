<script>
import * as echarts from 'echarts'
export default {
  name: 'PictorialBar', // 象形柱状图
  props: {
    barEchartSeries: {
      // 图表的series
      type: Array,
      default: () => {
        return []
      },
    },
    barEchartXData: {
      type: Array,
      default: () => [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
    isTransverse: {
      // 是否横向布局
      type: Boolean,
      default: false,
    },
    coordinatesTitle: {
      // x或y的name
      type: String,
      default: '（万m³）',
    },
    yAxisTwoSeriesName: {
      type: String,
      default: '（万m³）',
    },
    yAxisNamePadding: {
      type: Array,
      default: () => [0, 0, 5, 0],
    },
    axisLabelInterval: {
      type: Number,
      default: 0,
    },
    yAxisTwoSeriesShow: {
      type: Boolean,
      default: false,
    },
    dataZoom: {
      type: [Object, Array],
      default: () => {
        return {
          start: 0,
          type: 'inside',
          disabled: true,
        }
      },
    },
    barGrid: {
      type: Object,
      default: () => {
        return {
          left: 20,
          right: 20,
          bottom: 5,
          top: 35,
          containLabel: true,
        }
      },
    },
  },
  data() {
    return {
      barEchart: null,
    }
  },
  watch: {
    barEchartSeries: {
      handler: function (news) {
        this.setPictorialBar()
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {
    this.setPictorialBar()
    window.addEventListener('resize', this.setPictorialBarSize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setPictorialBarSize)
  },
  methods: {
    // 重置图表大小
    setPictorialBarSize() {
      if (this.barEchart) {
        this.barEchart.resize()
      }
    },
    // 渲染图表，
    setPictorialBar() {
      const that = this
      const newPromise = new Promise(resolve => {
        resolve()
      })
      newPromise.then(() => {
        this.barEchart = echarts.init(this.$refs['pictorialBar'])
        const options = {
          backgroundColor: 'transparent', // 背景色
          tooltip: {
            trigger: 'axis',
            confine: true, // 提示浮层限制在容器中]
            formatter: function (params) {
              let html = null
              if (params.length !== 1) {
                // todo  replaceAll方法和core-js版本不和
                const htmlarr = [`<div><div>${params[0].name.replace('\n', '')}</div>`]
                params.map((e, i) => {
                  htmlarr.push(`<div style="display:flex;align-items:center;">
                    <div style="width:10px;height:10px;background: ${
                      e.color
                    };margin-right:10px"></div>
                      ${e.seriesName}：<span style="font-family:AgencyFB-Reg">${e.value}${
                    e.seriesType === 'line' ? that.yAxisTwoSeriesName : that.coordinatesTitle
                  }</span></div>`)
                })
                htmlarr.push(`</div>`)
                html = htmlarr.join('')
              } else {
                html = `<div>
                  <div>${params[0].name}</div><div style="display:flex;align-items:center;">
                  <div style="width:10px;height:10px;background: rgb(112, 144, 247);margin-right:10px">
                  </div>${params[0].seriesName}：<span style="font-family:AgencyFB-Reg">${params[0].value}</span>${that.coordinatesTitle})</div></div>`
              }
              return html
            },
            backgroundColor: 'rgba(0, 0, 0, .7)',
            axisPointer: {
              type: 'shadow',
              axis: 'x',
            },
          },
          grid: this.barGrid,
          xAxis: {
            data: this.barEchartXData,
            type: 'category',
            nameLocation: 'start',
            triggerEvent: true,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: '#658598',
                opacity: 0.5,
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
              },
            },
            axisLabel: {
              show: true,
              rotate: 0,
              interval: this.axisLabelInterval,
              textStyle: {
                fontSize: 12,
                color: 'rgba(255,255,255,1)',
              },
            },
          },
          legend: {
            show: true,
            icon: 'rect',
            left: 'center',
            top: 10,
            itemWidth: 8,
            itemHeight: 8,
            textStyle: {
              color: '#fff',
              fontSize: 12,
            },
          },
          yAxis: [
            {
              name: this.coordinatesTitle,
              type: 'value',
              nameLocation: 'end',
              triggerEvent: true,
              nameTextStyle: {
                color: '#fff',
                fontSize: 12,
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: '#a5cbe1',
                  opacity: 0.2,
                },
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  type: 'solid',
                  color: '#658598',
                  opacity: 0.5,
                },
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'rgba(255,255,255,1)',
                  fontSize: 12,
                },
              },
            },
            {
              name: this.yAxisTwoSeriesName,
              type: 'value',
              show: this.yAxisTwoSeriesShow,
              nameTextStyle: {
                color: '#7b9ba7',
                fontSize: 12,
              },
              splitLine: {
                show: false,
                lineStyle: {
                  type: 'dashed',
                  color: '#a5cbe1',
                  opacity: 0.2,
                },
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  type: 'solid',
                  color: '#658598',
                  opacity: 0.5,
                },
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'rgba(255,255,255,1)',
                  fontSize: 12,
                },
              },
            },
          ],
          dataZoom: this.dataZoom,
          series: this.barEchartSeries,
        }
        this.barEchart.clear()
        this.barEchart.setOption(options)
      })
    },
  },
  render() {
    return <div ref="pictorialBar" class="pictoris-bar"></div>
  },
}
</script>

<style scoped lang='less'>
.pictoris-bar {
  width: 100%;
  height: 100%;
}
</style>
