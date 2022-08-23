
<template>
  <div v-loading="loading" class="content">
    <div class="select-box">
      <el-select
        v-model="selectDay"
        class="select-day"
        placeholder="请选择"
        @change="changChartData"
      >
        <el-option
          v-for="item in dayOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="selectType"
        class="select-type"
        placeholder="请选择"
        @change="changChart"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-radio-group
        v-model="radio"
        size="small"
        class="radio-group clearfix"
        @change="(payload) => $emit('change', payload)"
      >
        <el-radio-button label="chart">水位过程线</el-radio-button>
        <el-radio-button label="table">水位列表</el-radio-button>
      </el-radio-group>
    </div>
    <div
      v-show="radio === 'chart'"
      ref="infocharts"
      element-loading-background="rgba(0, 0, 0, 0.2)"
      class="infocharts"
    />
    <dc-table
      v-show="radio === 'table'"
      element-loading-background="rgba(0, 0, 0, 0.2)"
      :configs="tableConfigs"
      :data="tableData"
      :need-auto-scroll="false"
      class="table"
    />
  </div>
</template>

<script>
// import { getWaterLavleDialogInfo } from '@/apis/mainScreen'
import { NO_DATA_OPTION } from '@/config/constant'
import { parseTime } from '@/utils'
import * as echarts from 'echarts'
import * as dayjs from 'dayjs'
export default {
  props: {
    row: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      color: '#54f9fc',
      rainfall: 3.3,
      selectDay: 3 * 24,
      selectType: 'all',
      dayOptions: [
        {
          value: 1,
          label: '一小时'
        },
        {
          value: 24,
          label: '一天'
        },
        {
          value: 3 * 24,
          label: '三天'
        }
      ],
      typeOptions: [
        {
          value: 'all',
          label: '全部'
        },
        {
          value: '0',
          label: '雨量'
        },
        {
          value: '1',
          label: '水位'
        }
      ],
      radio: 'chart',
      tableConfigs: [
        {
          label: '时间',
          prop: 'tm',
          align: 'center'
        },
        {
          label: '水位（m）',
          prop: 'z',
          align: 'center',
          formatter: (cellValue, index, row) => {
            let color = '#00faff'
            let fontWeight = 'normal'
            if (this.row.sttp === 'RR') {
              if (row.xxsw !== null && row.z !== null && +row.z > +row.xxsw) {
                color = '#ff360d'
                fontWeight = 'bold'
              }
            } else {
              if (row.wrz !== null && row.z !== null && +row.z > +row.wrz) {
                color = '#fff600'
                fontWeight = 'bold'
              }
            }
            return (
              <span style={{ color, fontWeight }}>
                {cellValue !== null ? (+cellValue).toFixed(2) : '--'}
              </span>
            )
          }
        },
        {
          label: this.row.sttp === 'RR' ? '汛限（m）' : '警戒（m）',
          align: 'center',
          formatter: (cellValue, index, row) => {
            return row.sttp === 'RR'
              ? row.xxsw !== null
                ? (+row.xxsw).toFixed(2)
                : '--'
              : row.wrz !== null
              ? (+row.wrz).toFixed(2)
              : '--'
          }
        }
      ],
      loading: false,
      baseInfo: {
        list: []
      },
      chart: '',
      chartType: ''
    }
  },
  computed: {
    chartOptions() {
      let option = {}
      if (this.selectType === 'all') {
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            },
            formatter: (params) => {
              return params[0].seriesName === '雨量'
                ? `<span>${params[0].name}<span>
                        </br>
                      ${params[0].marker}<span>雨量： </span><span> ${
                    this.baseInfo.list[params[0].dataIndex].drp === null ||
                    this.baseInfo.list[params[0].dataIndex].drp === ''
                      ? '--'
                      : params[0].value
                  } mm</span>
                      </br>
                      ${params[1].marker}<span>水位： </span><span> ${
                    this.baseInfo.list[params[0].dataIndex].z === null ||
                    this.baseInfo.list[params[0].dataIndex].z === ''
                      ? '--'
                      : params[1].value
                  } m</span>
              `
                : `<span>${params[0].name}<span>
                        </br>
                      ${params[1].marker}<span>雨量： </span><span> ${
                    this.baseInfo.list[params[0].dataIndex].drp === null ||
                    this.baseInfo.list[params[0].dataIndex].drp === ''
                      ? '--'
                      : params[1].value
                  } mm</span>
                      </br>
                      ${params[0].marker}<span>水位： </span><span> ${
                    this.baseInfo.list[params[0].dataIndex].z === null ||
                    this.baseInfo.list[params[0].dataIndex].z === ''
                      ? '--'
                      : params[0].value
                  } m</span>
              `
            }
          },
          axisPointer: {
            link: {
              xAxisIndex: 'all'
            }
          },

          grid: [
            {
              left: 70,
              right: 50,
              height: '35%',
              top: '8%'
              // containLabel: true
            },
            {
              left: 70,
              right: 50,
              top: '48%',
              height: '35%'
              // containLabel: true
            }
          ],
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: '#3c6aa6'
                  // fontSize: 26
                }
              },
              axisTick: {
                show: false
              },
              data: this.baseInfo.list
                ? this.baseInfo.list.map((el) => {
                    return parseTime(el.tm, '{d}日{h}时')
                  })
                : [],
              axisLabel: {
                show: false
              }
            },
            {
              type: 'category',

              gridIndex: 1,

              boundaryGap: false,
              axisLine: {
                onZero: true
              },
              data: this.baseInfo.list
                ? this.baseInfo.list.map((el) => {
                    return parseTime(el.tm, '{d}日{h}时')
                  })
                : [],
              position: 'bottom',
              axisLabel: {
                color: '#5dbbde',
                fontSize: 16
              }
            }
          ],
          yAxis: [
            {
              name: '雨量（mm）',
              nameLocation: 'start',
              nameRotate: 270,
              nameGap: 0,
              nameTextStyle: {
                padding: [100, -90, 0, 0],
                color: '#5dbbde',
                fontSize: 16
              },
              type: 'value',
              max: this.baseInfo.list
                ? Math.max.apply(null, [
                    ...this.baseInfo.list.map((el) => {
                      return +el.drp
                    })
                  ]) + 1
                : 5,
              inverse: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#3c6aa4',
                  type: 'solid',
                  width: 2
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color: '#5dbbde',
                fontSize: 16
              },
              splitLine: {
                lineStyle: {
                  color: '#3c6aa4',
                  type: 'solid',
                  width: 2
                }
              }
            },
            {
              gridIndex: 1,
              name: '水位（m）',
              nameLocation: 'end',
              nameRotate: 270,
              nameGap: 0,
              nameTextStyle: {
                padding: [120, -70, 0, 0],
                color: '#5dbbde',
                fontSize: 16
              },
              type: 'value',
              inverse: false,
              max: this.findLaverMax(this.baseInfo.list),
              // splitNumber: 6,
              min: this.findLaverMin(this.baseInfo.list),
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#3c6aa4',
                  type: 'solid',
                  width: 2
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color: '#5dbbde',
                fontSize: 16
              },
              splitLine: {
                lineStyle: {
                  color: '#3c6aa4',
                  type: 'solid',
                  width: 2
                }
              }
            }
          ],
          series: [
            {
              name: '水位',
              type: 'line',
              symbolSize: 0,
              xAxisIndex: 1,
              yAxisIndex: 1,
              color: '#00ff6c',
              hoverAnimation: false,
              data:
                this.selectType !== '0'
                  ? this.baseInfo.list.map((el) => {
                      return (+el.z).toFixed(2)
                    })
                  : [],
              markLine: {
                symbol: ['none'],
                data: [
                  {
                    name: '汛限水位',
                    yAxis: this.baseInfo.list.length
                      ? (+this.baseInfo.list[0].xxsw).toFixed(2)
                      : 0,
                    lineStyle: {
                      width: 3,
                      type: 'solid',
                      color: '#ef2225',
                      fontSize: 26
                    },
                    label: {
                      show: true,
                      position: 'middle',
                      formatter: () => {
                        return `汛限水位${
                          this.baseInfo.list.length
                            ? (+this.baseInfo.list[0].xxsw).toFixed(2)
                            : 0
                        }m`
                      }
                    }
                  }
                ]
              }
            },
            {
              name: '雨量',
              type: 'bar',
              symbolSize: 8,
              color: '#0e9ac2',
              hoverAnimation: false,
              data:
                this.selectType !== '1'
                  ? this.baseInfo.list.map((el) => {
                      return (+el.drp).toFixed(2)
                    })
                  : []
            }
          ]
        }
      } else if (this.selectType === '0') {
        option = {
          xAxis: {
            type: 'category',
            name: '雨量（mm）',
            nameLocation: 'start',
            nameRotate: 270,
            nameGap: 35,
            nameTextStyle: {
              padding: [0, -65, 25, 12],
              color: '#5dbbde',
              fontSize: 16
            },
            boundaryGap: false,
            axisLine: {
              onZero: true
            },
            data: this.baseInfo.list
              ? this.baseInfo.list.map((el) => {
                  return parseTime(el.tm, '{d}日{h}时')
                })
              : [],
            position: 'bottom',
            axisLabel: {
              color: '#5dbbde',
              fontSize: 16
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            },
            formatter: (params) => {
              return `<span>${params[0].name}<span>
                        </br>
                      ${params[0].marker}<span>雨量： </span><span> ${
                this.baseInfo.list[params[0].dataIndex].drp === null
                  ? '--'
                  : params[0].value
              } mm</span>
              `
            }
          },
          grid: {
            left: 70,
            right: 50,
            height: '70%',
            top: '8%'
            // containLabel: true
          },
          yAxis: {
            type: 'value',
            inverse: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#3c6aa4',
                type: 'solid',
                width: 2
              }
            },
            max: this.baseInfo.list
              ? Math.max.apply(null, [
                  ...this.baseInfo.list.map((el) => {
                    return +el.drp
                  })
                ]) + 1
              : 5,
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#5dbbde',
              fontSize: 16
            },
            splitLine: {
              lineStyle: {
                color: '#3c6aa4',
                type: 'solid',
                width: 2
              }
            }
          },
          series: [
            {
              data:
                this.baseInfo.list.map((el) => {
                  return (+el.drp).toFixed(2)
                }) || [],
              type: 'bar',
              symbolSize: 0,
              color: '#0e9ac2',
              showBackground: false,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        }
      } else {
        option = {
          grid: {
            left: 70,
            right: 50,
            height: '70%',
            top: '8%'
            // containLabel: true
          },
          xAxis: {
            type: 'category',
            name: '水位（m）',
            nameLocation: 'start',
            nameRotate: 270,
            nameGap: 35,
            nameTextStyle: {
              padding: [20, 510, 65, 62],
              color: '#5dbbde',
              fontSize: 16
            },
            boundaryGap: false,
            axisLine: {
              onZero: true
            },
            data: this.baseInfo.list
              ? this.baseInfo.list.map((el) => {
                  return parseTime(el.tm, '{d}日{h}时')
                })
              : [],
            position: 'bottom',
            axisLabel: {
              color: '#5dbbde',
              fontSize: 16
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            },
            formatter: (params) => {
              return `<span>${params[0].name}<span>
                        </br>
                      ${params[0].marker}<span>水位： </span><span> ${
                this.baseInfo.list[params[0].dataIndex].z === null
                  ? '--'
                  : params[0].value
              } m</span>
              `
            }
          },
          yAxis: {
            type: 'value',
            inverse: false,
            max: this.findLaverMax(this.baseInfo.list),
            // splitNumber: 6,
            min: this.findLaverMin(this.baseInfo.list),
            axisLine: {
              show: true,
              lineStyle: {
                color: '#3c6aa4',
                type: 'solid',
                width: 2
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#5dbbde',
              fontSize: 16
            },
            splitLine: {
              lineStyle: {
                color: '#3c6aa4',
                type: 'solid',
                width: 2
              }
            }
          },
          series: [
            {
              name: '水位',
              type: 'line',
              symbolSize: 0,
              color: '#00ff6c',
              hoverAnimation: false,
              data:
                this.selectType !== '0'
                  ? this.baseInfo.list.map((el) => {
                      return (+el.z).toFixed(2)
                    })
                  : [],
              markLine:
                this.row.sttp !== 'RR'
                  ? {
                      symbol: ['none'],
                      data: [
                        {
                          name: '保证水位',
                          yAxis: this.baseInfo.list.length
                            ? (+this.baseInfo.list[0].grz).toFixed(2)
                            : 0,
                          lineStyle: {
                            width: 3,
                            type: 'solid',
                            color: '#ef2225'
                          },
                          label: {
                            show: true,
                            position: 'middle',
                            formatter: () => {
                              return `保证水位${
                                this.baseInfo.list.length
                                  ? (+this.baseInfo.list[0].grz).toFixed(2)
                                  : 0
                              }m`
                            }
                          }
                        },
                        {
                          name: '警戒水位',
                          symbol: 'none',
                          yAxis: this.baseInfo.list.length
                            ? (+this.baseInfo.list[0].wrz).toFixed(2)
                            : 0,
                          lineStyle: {
                            width: 3,
                            type: 'solid',
                            color: '#ef9e1e'
                          },
                          label: {
                            show: true,
                            position: 'middle',
                            formatter: () => {
                              return `警戒水位${
                                this.baseInfo.list.length
                                  ? (+this.baseInfo.list[0].wrz).toFixed(2)
                                  : 0
                              }m`
                            }
                          }
                        }
                      ]
                    }
                  : {
                      symbol: ['none'],
                      data: [
                        {
                          name: '汛限水位',
                          yAxis: this.baseInfo.list.length
                            ? (+this.baseInfo.list[0].xxsw).toFixed(2)
                            : 0,
                          lineStyle: {
                            width: 3,
                            type: 'solid',
                            color: '#ef2225',
                            fontSize: 26
                          },
                          label: {
                            show: true,
                            position: 'middle',
                            formatter: () => {
                              return `汛限水位${
                                this.baseInfo.list.length
                                  ? (+this.baseInfo.list[0].xxsw).toFixed(2)
                                  : 0
                              }m`
                            }
                          }
                        }
                      ]
                    }
            }
          ]
        }
      }
      return option
    },
    tableData() {
      // return this.baseInfo?.list ? [...this.baseInfo.list].sort((a, b) => new Date(b.tm) - new Date(a.tm)) : []
      return []
    },
    footinfo() {
      return [
        {
          text: '累积雨量',
          num: this.baseInfo.rainFull
            ? (+this.baseInfo.rainFull).toFixed(2)
            : '--',
          unit: 'mm'
        },
        {
          text: '最新水位',
          num: this.baseInfo.lastZ ? (+this.baseInfo.lastZ).toFixed(2) : '--',
          unit: 'm'
        }
      ]
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.infocharts)
    // this.changChartData()
  },
  methods: {
    changChart() {
      this.chart.clear()
      this.chart.setOption(
        this.baseInfo.list.length ? this.chartOptions : NO_DATA_OPTION
      )
    },
    changChartData() {
      this.loading = true
      // eslint-disable-next-line no-undef
      getWaterLavleDialogInfo({
        stcd: this.row.stcd,
        startTime: dayjs()
          .add(-this.selectDay, 'hour')
          .format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
        .then((res) => {
          this.baseInfo = res.message
          // this.chartType = res.message?.list?.length ? res.message.list[0].item : 'PZ'
          this.chartType = 'PZ'
          switch (this.chartType) {
            case 'PZ':
              this.typeOptions = [
                {
                  value: 'all',
                  label: '全部'
                },
                {
                  value: '0',
                  label: '雨量'
                },
                {
                  value: '1',
                  label: '水位'
                }
              ]
              this.selectType = 'all'
              break
            case 'P':
              this.typeOptions = [
                {
                  value: '0',
                  label: '雨量'
                }
              ]
              this.selectType = '0'
              break
            case 'Z':
              this.typeOptions = [
                {
                  value: '1',
                  label: '水位'
                }
              ]
              this.selectType = '1'
              break
            default:
              break
          }
          this.chart.clear()
          this.chart.setOption(
            this.baseInfo.list.length ? this.chartOptions : NO_DATA_OPTION
          )
        })
        .finally(() => {
          this.loading = false
        })
    },
    findLaverMax(list) {
      const data = Math.max.apply(
        null,
        [
          ...this.baseInfo.list.map((el) => {
            return +el.z
          }),
          +list[0].grz,
          +list[0].xxsw
        ],
        +list[0].wrz
      )
      return Math.ceil(data + 2)
    },
    findLaverMin(list) {
      let data = ''
      if (this.row.sttp === 'RR') {
        data =
          Math.min.apply(null, [
            ...this.baseInfo.list.map((el) => {
              return +el.z
            }),
            +this.baseInfo.list[0].xxsw || 0
          ]) - 1
      } else {
        if (this.baseInfo.list[0].grz && this.baseInfo.list[0].wrz) {
          data =
            Math.min.apply(null, [
              ...this.baseInfo.list.map((el) => {
                return +el.z
              }),
              +this.baseInfo.list[0].grz,
              +this.baseInfo.list[0].wrz
            ]) - 1
        } else if (this.baseInfo.list[0].grz) {
          data =
            Math.min.apply(null, [
              ...this.baseInfo.list.map((el) => {
                return +el.z
              }),
              +this.baseInfo.list[0].grz
            ]) - 1
        } else if (this.baseInfo.list[0].wrz) {
          data =
            Math.min.apply(null, [
              ...this.baseInfo.list.map((el) => {
                return +el.z
              }),
              +this.baseInfo.list[0].wrz
            ]) - 1
        } else {
          data =
            Math.min.apply(null, [
              ...this.baseInfo.list.map((el) => {
                return +el.z
              })
            ]) - 1
        }
      }
      return data
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 100%;
}
.select-box {
  .select-day {
    width: 160px;
    height: 30px;
  }
  .select-type {
    width: 160px;
    margin-left: 20px;
  }
}
.info {
  display: flex;
  margin: 20px 0;
  .col {
    width: 50%;
    .type {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #39f4f7;
    }
    .value {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      margin-left: 10px;
      color: #ffffff;
    }
  }
}
.radio-group {
  float: right;
  :deep(.el-radio-button__inner) {
    color: #51f1f4;
    border-color: #54f9fc;
    background-color: #0f5b6b;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    color: #fff600;
    background-color: rgba(12, 33, 19, 0.9);
    border-color: #54f9fc;
    box-shadow: -1px 0 0 0 #54f9fc;
  }
}
.infocharts {
  height: 100%;
}
.table {
  height: calc(100% - 30px);
  color: #fff;
}
.foot-info {
  display: flex;
  justify-content: space-around;
}

.noinfo {
  line-height: 400px;
  text-align: center;
  font-size: 16px;
  color: #39f4f7;
}
:deep(.el-loading-mask) {
  background-color: rgba(29, 26, 26, 0.9);
}
</style>
