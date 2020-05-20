<template>
  <div class="home-page">
    <!-- 首屏 -->
    <article class="home">
      <CanvasBack />
    </article>
    <!-- 正式列表 -->
    <article class="content">
      <div class="info-box">
        <VirtualList
          data-key="id"
          :data-sources="sourceData"
          :data-component="listBox"
          :page-mode="true"
        />
      </div>
    </article>
  </div>
</template>

<script>
import ListBox from "@/components/ListBox";
import VirtualList from "vue-virtual-scroll-list";
import CanvasBack from "@/components/CanvasBack";
import dataJson from "@/assets/data.json";

export default {
  name: "Home",
  data() {
    return {
      sourceData: dataJson,
      listBox: ListBox,
    };
  },
  components: {
    VirtualList,
    CanvasBack,
  },
};
</script>
<style lang="less">
.home-page {
  .home {
    display: block;
    height: 100vh;
    min-height: 600px;
    background: #222;
    overflow: hidden;
  }
  .content {
    background: #fdfdfd;
    min-height: 600px;
    padding: 20px;
    .info-box {
      margin: 0 auto;
      width: 100%;
      max-width: 960px;
      background: #fff;
      border-radius: 4px;
    }
  }
}
</style>
