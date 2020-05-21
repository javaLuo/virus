<template>
  <footer>
    © 2020
    <a
      href="https://github.com/javaLuo/"
      rel="nofollow me noopener noreferrer"
      target="_blank"
      >VRLUO</a
    >, Inc.
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
footer {
  display: block;
  height: 40px;
  line-height: 40px;
  background-color: #222;
  color: #aaa;
  text-align: center;
  flex: none;
  a {
    color: #aaa;
    &:hover {
      color: #f0f0f0;
    }
  }
}
</style>
