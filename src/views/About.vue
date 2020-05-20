<template>
  <div class="about">
    <div class="content">
      <h1>这个网站是做什么的？</h1>
      <p>
        收集了所有已知的传染病信息，做一些科普。<br />资料大多来自于中国疾病预防控制中心，世界卫生组织。
      </p>
      <div>
        中国疾病预防控制中心：<a
          href="http://www.chinacdc.cn/"
          target="_blank"
          rel="nofollow me noopener noreferrer"
          >http://www.chinacdc.cn/</a
        >
        <br />
        世界卫生组织：<a
          href="https://www.who.int/zh/"
          target="_blank"
          rel="nofollow me noopener noreferrer"
          >https://www.who.int/zh</a
        >
      </div>
      <h1>免责声明</h1>
      <p>
        除了来源于中国疾病预防控制中心和世界卫生组织的资料，还收集了互联网上查询所得的各种零碎信息。<br />插图均源自互联网，仅供参考。<br /><b
          >致死率</b
        >的数字均源自互联网查询所得的历史数据；不同地区不同时间有较大出入，不保证准确性，仅供参考了解。
      </p>

      <div class="git">
        <a
          href="https://github.com/javaLuo/virus"
          target="_blank"
          rel="nofollow me noopener noreferrer"
        >
          <span class="iconfont icon-git"></span>
          <br />
          <span>GitHub源代码</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.about {
  flex: auto;
  padding-top: 60px;
  .content {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
  }
  .git {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    a {
      text-align: center;
      color: #222;
      .iconfont {
        font-size: 32px;
      }
      &:hover {
        color: cadetblue;
      }
    }
  }
}
</style>
