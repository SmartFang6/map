# 使用说明
``` javascript
/**
 * props :
 *      list 数据源
 *      step 滚动步进
 *      identification 唯一标识,默认为 id(用于获取当前点击项信息)
 * event :
 *      clicked 当前选中数据项信息通过该事件回调获取
 * slot  : 
 *      1.外部需有一个唯一标签,影响到滚动的默认可视区域
 *      2.需给滚动元素添加 data-id 属性用于在数据源中查询当前点击项的信息
 */
<SeamlessScoll :list="list" @clicked="handleClick">
  <div>
    <div
      class="item"
      v-for="(item, idx) in list"
      :key="item.id"
      :data-id="item.id"
    >
      {{ item.name }}
    </div>
  </div>
</SeamlessScoll>

```
