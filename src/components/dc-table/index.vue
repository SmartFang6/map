<template>
  <div class="dc-table">
    <ul>
      <li
        v-for="(item, idx) in _options"
        :key="idx"
        :class="{ checkedStyle: item.isChecked }"
        @click="onClick(item, idx)"
      >
        {{ item.label }}-{{ item.isChecked }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { watch, computed } from "vue";
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [
      {
        label: "tab1",
        value: 1,
      },
      {
        label: "tab2",
        value: 2,
      },
    ],
  },
});

watch(
  () => props.value,
  (value, oldValue) => {
    console.log(value, oldValue);
  },
  { immediate: true }
);

// _options
const _options = computed({
  get: () => {
    return props.options.map((item) => {
      return {
        ...item,
        // isChecked: false,
      };
    });
  },
  set: (val) => {
    console.log(val, "setttttttttttt");
    return val;
  },
});

function onClick(item, idx) {
  console.log("clickkkkkkkkkkkk", item, idx, _options.value);
  _options.value = _options.value.map((itm) => {
    return {
      ...itm,
      isChecked: item.value === itm.value,
    };
  });
  console.log(_options.value);
}
</script>

<style lang="less" scoped>
.dc-table {
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    li {
      box-sizing: border-box;
      padding: 10px 15px;
    }
  }

  .checkedStyle {
    background: url(@/assets/images/checked.png);
    background-size: 100% 100%;
  }
}
</style>
