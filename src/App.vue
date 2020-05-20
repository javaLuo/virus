<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: transparent;
  border-radius: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #222;
}
.ant-back-top {
  right: 20px;
}
</style>
