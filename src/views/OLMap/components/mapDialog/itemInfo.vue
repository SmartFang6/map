<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    config: {
      type: Array,
      default: () => [],
    },
  },
  render() {
    return (
      <div class="detail-box">
        {this.config.map(item => {
          const type = typeof item.label
          return (
            <div class={['item-box', item.flex ? 'item-flex' : null]}>
              <div class="label">{type === 'string' ? item.label : item.label(this.data)}</div>
              <div class="value">
                {item.render
                  ? item.render(this.data)
                  : this.data[item.key] === 0
                  ? 0
                  : this.data[item.key]
                  ? this.data[item.key]
                  : '-'}
                {item.unit ? <span>{item.unit}</span> : ''}
              </div>
            </div>
          )
        })}
      </div>
    )
  },
}
</script>
<style lang="less" scoped>
.detail-box {
  display: flex;
  flex-wrap: wrap;
  .item-box {
    margin-right: 40px;
    flex-grow: 1;
    &.item-flex {
      flex-grow: 4;
      width: 100%;
      max-width: 100%;
    }
    .label {
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #ccf1ff;
    }
    .value {
      font-size: 24px;
      margin-top: 4px;
      color: #ffffff;
      font-family: 'digiface';
      span {
        font-size: 14px;
        color: #6fcbed;
      }
    }
  }
}
</style>
