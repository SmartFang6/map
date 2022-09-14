/*------------------------------------------------------
¦ 全局联动过滤参数
¦ 
¦ Author: 大风
¦ Date: 2022-09-14 13:40:28
¦ FilePath: src/views/useActiveFilter.js
¦------------------------------------------------------*/

import { computed } from "vue";
import { useStore } from "vuex";

/**
 * 全局联动过滤参数
 * @returns {Object<any>}
 */
export default function () {
  const store = useStore();

  return computed(() => {
    // 这里数据需要处理，后端已办结跟消耗率用了同一个字段
    // (总数不用传，未办结是eventCompleteStatus为0 ，已办结
    // 和销号率是eventCompleteStatus为1)

    const params = {};
    const activeFilter = store.state.activeFilter;
    if (!activeFilter) {
      return params;
    }

    if (activeFilter.type === "eventStat") {
      switch (activeFilter.value) {
        // 问题总数，直接传空对象
        case "eventNum":
          return params;
        // 未办结
        case "eventUnSolveNum":
          params.eventCompleteStatus = 0;
          break;
        // 已办结
        case "eventSolveNum":
          params.eventCompleteStatus = 1;
          break;
        // 消耗率
        case "eventSourceSolveRate":
          params.eventCompleteStatus = 1;
          break;
        default:
          return params;
      }
    } else {
      params[activeFilter.type] = activeFilter.value;
    }

    return params;
  });
}
