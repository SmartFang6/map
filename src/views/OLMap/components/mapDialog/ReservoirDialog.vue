<script>
import columnEchart from './components/columnEchart'
export default {
  props: {
    row: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      visible: false,
      title: '紧水滩水库',
      barEchartSeriesOne: [],
      barEchartSeriesTwo: [],
      tabsList: [
        { name: '工程实况', value: 1 },
        { name: '水库风采', value: 2 },
        { name: '巡查记录', value: 3 },
        { name: '视频监控', value: 4 },
        { name: '责任人信息', value: 5 },
      ],
      activeKey: 1,
    }
  },
  computed: {
    statisticalConfig() {
      return [
        { label: '总库容', value: 139300.0, unit: '万m³' },
        { label: '正常库容', value: 103500.0, unit: '万m³' },
        { label: '正常水位', value: 184.0, unit: 'm' },
        { label: '集雨面积', value: 139300.0, unit: 'k㎡' },
        { label: '当前库容', value: 139300.0, unit: '万m³' },
        { label: '蓄水率', value: 59.0, unit: '%' },
        { label: '可纳雨量', value: 178.0, unit: 'mm' },
      ]
    },
    leftLine() {
      return [
        {
          text: '校核洪水位',
          color: '#2dea9c',
          num: this.row.chfllv !== null ? (+this.row.chfllv).toFixed(2) : '--',
        },
        {
          text: '设计洪水位',
          color: '#00c0ff',
          num: this.row.desFlStag !== null ? (+this.row.desFlStag).toFixed(2) : '--',
        },
        {
          text: '防洪高水位',
          color: '#bfdff7',
          num: this.row.uppLevFlco !== null ? (+this.row.uppLevFlco).toFixed(2) : '--',
        },
        {
          text: '汛限水位',
          color: '#fff600',
          num: this.row.fsltdz !== null ? (+this.row.fsltdz || +this.row.xxsw).toFixed(2) : '--',
        },
        {
          text: '当前水位',
          color: '#54f9fc',
          num: this.curWaterLevel,
        },
        {
          text: '死水位',
          color: '#ffffff',
          num: this.row.deadLev !== null ? (+this.row.deadLev).toFixed(2) : '--',
        },
      ]
    },
  },
  watch: {
    row() {
      console.log(this.row)
    },
  },
  created() {},
  mounted() {
    this.setBarEchartSeries()
  },
  methods: {
    setBarEchartSeries() {
      this.barEchartSeriesOne = [
        {
          name: '雨量',
          barMinHeight: 10,
          yAxisIndex: 0,
          type: 'bar',
          barWidth: 7,
          data: [11, 8, 13, 15, 14, 18, 14, 12, 7, 15, 13, 11],
          itemStyle: {
            color: '#47d9e6',
            shadowColor: 'rgba(84,249,255, .7)',
            shadowBlur: 20,
            barBorderRadius: [30, 30, 0, 0],
          },
        },
      ]
      this.barEchartSeriesTwo = [
        {
          name: '水位',
          type: 'line',
          data: [11, 8, 13, 15, 14, 18, 14, 12, 7, 15, 13, 11],
          itemStyle: { color: '#01fcb8' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 1, color: 'rgba(1,219,255, 0)' },
                { offset: 0.5, color: 'rgba(9,154,150, .3)' },
                { offset: 0, color: 'rgba(9,154,150, .6)' },
              ],
              globalCoord: false,
            },
          },
        },
        {
          name: '汛限水位',
          type: 'line',
          symbol: 'none',
          data: Array.from({ length: 12 }, (v, k) => 12),
          itemStyle: { color: '#ec441d' },
        },
      ]
    },
  },
  render() {
    return (
      <dc-dialog
        class="detail-dialog"
        size="small"
        top="8vh"
        visible={this.visible}
        beforeClose={() => {
          this.onCancel()
        }}
        close-on-click-modal={false}
        close-on-press-escape={false}
        needDefaultFooter={false}
      >
        <div slot="title">
          安地水库
          <span class="type">中型</span>
        </div>
        <div class="dialog-content">
          <div class="tabs-box">
            {this.tabsList.map(item => (
              <div
                class={['item-warp', this.activeKey === item.value ? 'active' : null]}
                onClick={() => this.handleTabsChange(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div class="reservoir-fun">
            <span style={{ color: '#3b81c3', fontWeight: 'bold' }}>主要功能：</span>
            <span style={{ color: '#fff' }}>发电、泄洪</span>
          </div>
          <div class="statistical">
            {this.statisticalConfig.map(item => {
              return (
                <div class="statistical-item">
                  <div class="item-label">{item.label}</div>
                  <div class="item-value">
                    <div class="item-count">{item.value}</div>
                    <div class="item-unit">{item.unit}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div class="statistical-echart">
            <div class="echart-left">
              <div class="dam-con">
                <div class="dam">
                  {this.title === '紧水滩水库' ? (
                    <img src={require('@/assets/images/new-dam-img/jinshuitan.png')} alt="" />
                  ) : (
                    ''
                  )}
                  {this.title === '滩坑水库' ? (
                    <img src={require('@/assets/images/new-dam-img/tankeng.png')} alt="" />
                  ) : (
                    ''
                  )}
                  {this.title !== '紧水滩水库' && this.title !== '紧水滩水库' ? (
                    <img src={require('@/assets/images/new-dam-img/normal.png')} alt="" />
                  ) : (
                    ''
                  )}
                  <div class="dam-height">
                    <span class="type">坝顶高程</span>
                    <span class="num">{this.row.damTopElev || '--'}</span>m
                  </div>
                  <div class="dam-width">
                    <span class="type">坝顶宽</span>
                    <span class="num">{this.row.damTopWid || '--'}</span>m
                  </div>
                  <div class="dam-lang">
                    <span class="type">坝顶长度</span>
                    <span class="num">{this.row.damTopLen || '--'}</span>m
                  </div>
                  <div class="dam-max-height">
                    <span class="type">最大坝高</span>
                    <span class="num">{this.row.damMaxHeig || '--'}</span>m
                  </div>
                  <div class="dam-type">
                    <span class="num">{this.row.hasSluiceGate === '1' ? '闸门式' : '溢流式'}</span>
                  </div>
                  <div class="dam-max-flow">
                    <span class="type">下泄流量</span>
                    <span class="num">{'--'}</span> m³/s
                  </div>
                </div>
                {this.leftLine.map((item, index) => {
                  return (
                    <div class={['left-line', 'line' + index]} style={{ borderColor: item.color }}>
                      <div style={{ color: item.color }} class="text">
                        <span>{item.text}</span>
                        <span class="num">{item.num || '--'}</span>
                        <span class="unit">m</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div class="echart-right">
              <div class="search">
                <el-date-picker
                  vModel={this.time}
                  type="daterange"
                  format="yyyy-MM-dd"
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  popper-class="custom-picker"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <el-select vModel={this.select} size="small">
                  <el-option label="全部" value="" />
                </el-select>
              </div>
              <div class="echart-box">
                <div class="box-top">
                  <columnEchart
                    coordinatesTitle="雨量（mm）"
                    barEchartSeries={this.barEchartSeriesOne}
                  />
                </div>
                <div class="box-bottom">
                  <columnEchart
                    coordinatesTitle="水位（m）"
                    barEchartSeries={this.barEchartSeriesTwo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </dc-dialog>
    )
  },
}
</script>

<style scoped lang="less">
.detail-dialog {
  :deep(.el-dialog) {
    height: 780px;
    max-width: 1450px;
    width: 1450px;
    .el-dialog__body {
      height: calc(100% - 52px);
      .dialog-content {
        height: 100%;
        .tabs-box {
          margin: 6px 0;
          // display: flex;
          .item-warp {
            font-size: 14px;
            color: #ffffff;
            padding: 5px 16px;
            background: rgba(51, 179, 253, 0.4);
            margin-right: 5px;
            cursor: pointer;
            &.active {
              background-color: #33b3fd;
            }
          }
        }
        .statistical {
          // display: flex;
          justify-content: space-between;
          margin-top: 10px;
          padding: 10px 100px 10px 20px;
          color: #bbe5f7;
          background: #20a0d0;
          background-image: linear-gradient(
              90deg,
              rgba(15, 143, 191, 0.7) 10%,
              rgba(0, 0, 0, 0) 10%
            ),
            linear-gradient(rgba(15, 143, 191, 0.7) 10%, rgba(0, 0, 0, 0) 10%);
          background-size: 10px 10px;
          .item-label {
            margin-bottom: 10px;
          }
          .item-value {
            // display: flex;
            align-items: center;
            color: #fff;
            font-size: 20px;
            .item-unit {
              font-size: 16px;
              padding-left: 4px;
            }
          }
        }
        .statistical-echart {
          height: calc(100% - 167px);
          // display: flex;
          .echart-left,
          .echart-right {
            flex: 1;
            .dam {
              position: relative;
              img {
                margin-top: 90px;
              }
              .dam-height {
                position: absolute;
                top: 62px;
                left: 156px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0;
                color: #2d7d96;
              }
              .dam-width {
                position: absolute;
                top: 62px;
                left: 306px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0;
                color: #2d7d96;
              }
              .hour-6 {
                position: absolute;
                top: 62px;
                left: 376px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0;
                color: #2d7d96;
              }
              .dam-lang {
                position: absolute;
                top: 208px;
                left: 476px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0;
                color: #2d7d96;
              }
              .dam-max-height {
                position: absolute;
                top: 248px;
                left: 180px;
                font-family: MicrosoftYaHei;
                transform: rotate(270deg);
                font-size: 14px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0;
                color: #2d7d96;
              }
              .dam-type {
                position: absolute;
                top: 362px;
                left: 496px;
                font-size: 14px;
                font-weight: bold;
                color: #2d7d96;
                .num {
                  margin-left: 0;
                  font-size: 16px;
                }
              }
              .dam-max-flow {
                position: absolute;
                top: 398px;
                left: 480px;
                font-family: MicrosoftYaHei;
                // transform: rotate(270deg);
                font-size: 14px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0;
                color: #2d7d96;
              }
              .type {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: bold;
                color: #ffffff;
              }
              .num {
                font-family: AgencyFB;
                font-size: 20px;
                font-weight: bold;
                color: #54f9fc;
                margin-left: 6px;
              }
            }
            .left-line {
              width: 30px;
              height: 1px;
              left: 60px;
              border-bottom: dashed 4px #2dea9c;
              position: absolute;
              .text {
                position: absolute;
                // display: inline-block;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: bold;

                width: 160px;
                left: 40px;
                top: -10px;
                .num {
                  font-family: AgencyFB;
                  font-size: 20px;
                  font-weight: bold;
                  margin-left: 6px;
                }
                .unit {
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  font-weight: bold;

                  color: #32525c;
                }
              }
            }
            .line0 {
              top: 330px;
            }
            .line1 {
              top: 360px;
            }
            .line2 {
              top: 390px;
            }
            .line3 {
              top: 430px;
            }
            .line4 {
              top: 460px;
            }
            .line5 {
              top: 500px;
            }
            .search {
              padding-top: 20px;
              .el-date-editor {
                margin-right: 20px;
                background: #0c3759;
                border: none;
                .el-range-input {
                  background: #0c3759;
                  color: #346fa8;
                }
              }
              .el-input__inner {
                background: #0c3759;
                border: none;
              }
            }
            .echart-box {
              height: calc(100% - 53px);
              display: flex;
              flex-direction: column;
              .box-top,
              .box-bottom {
                flex: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
