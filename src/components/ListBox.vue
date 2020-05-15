<template>
  <div class="l">
    {{ index }}
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    index: { type: Number },
    source: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="less">
.l {
  width: 100%;
  height: 300px;
  & + l {
    margin-top: 10px;
    border-top: solid 1px #ccc;
  }
}
</style>
