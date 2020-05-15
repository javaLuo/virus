<template>
  <nav class="header">
    Logo
  </nav>
</template>

<script>
export default {
  name: "Header",
};
</script>
<style scoped lang="less">
.header {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #222;
  z-index: 10;
}
</style>
