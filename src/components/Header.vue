<template>
  <nav :class="['header', { isDark }]" ref="header">
    <span class="iconfont icon-swwh logo" />
    <ul class="nav-ul">
      <li class="hover-underline-animation">
        <router-link to="/">首页</router-link>
      </li>
      <li class="hover-underline-animation">
        <router-link to="/about">关于</router-link>
      </li>
      <li class="zw"></li>
      <li>
        <a
          href="https://github.com/javaLuo/virus"
          target="_blank"
          class="icon"
          title="Github"
          rel="nofollow me noopener noreferrer"
        >
          <span class="iconfont icon-git" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isDark: false,
    };
  },
  mounted() {
    document.addEventListener("scroll", this.onScrollChange, { passive: true });
    this.onScrollChange();
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.onScrollChange, {
      passive: true,
    });
  },
  watch: {
    "$route.path"(newV) {
      if (newV.includes("about")) {
        this.isDark = true;
      } else {
        this.isDark = false;
      }
    },
  },
  methods: {
    onScrollChange() {
      this.$refs.header.style.height = `${Math.max(
        45,
        60 - window.pageYOffset / 4
      )}px`;
      this.$refs.header.style.backgroundColor = `rgba(0,0,0,${Math.min(
        0.8,
        -0.8 + window.pageYOffset / 200
      )})`;
    },
  },
};
</script>
<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  position: fixed;
  flex: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 10;
  color: #fcfcfc;
  padding: 0 20px;
  font-size: 16px;
  backdrop-filter: blur(4px);
  &.isDark {
    background: rgba(0, 0, 0, 0.8) !important;
    height: 40px !important;
  }
  .logo {
    font-size: 36px;
    color: #cc2222;
  }
  .icon {
    font-size: 18px;
    padding-right: 0 !important;
  }
  .nav-ul {
    flex: 1;
    display: flex;
    height: 100%;
    & > li {
      height: 100%;
      margin-left: 20px;
      &.zw {
        flex: 1;
      }
      a {
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        transition: color 256ms;
        padding: 0 10px;
        color: #fcfcfc;
        &:hover {
          color: rgb(48, 144, 223);
        }
      }
    }
    .hover-underline-animation {
      position: relative;
    }
    .hover-underline-animation.active::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
    .hover-underline-animation::after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: rgb(48, 144, 223);
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }
    .hover-underline-animation:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
}
</style>
