<template>
  <div class="l">
    <img class="photo" :src="source.img || defaultImg" />
    <div>
      <div>
        <a-tag :color="source.class | classType">{{ source.class }}</a-tag>
        <a-tag :color="source.level | levelType">{{ source.level }}</a-tag>
        <span class="title">{{ source.name }}</span>
        <a-tooltip placement="top">
          <template slot="title">
            <span>致死率</span>
          </template>
          <span>
            <span class="iconfont icon-siwang" />
            {{ source.lethalRate | pointer }}
          </span>
        </a-tooltip>
        <a-tag v-if="source.wipeOut" color="#cccccc">已消灭</a-tag>
      </div>
      <div class="info">{{ source.info }}</div>
      <div v-if="source.symptom" class="info-l">
        <span>症状：</span>{{ source.symptom }}
      </div>
      <div v-if="source.spread" class="info-l">
        <span>传播方式：</span>{{ source.spread }}
      </div>
      <div v-if="source.video" class="info-v">
        <span
          :class="`iconfont tv ${
            videoOpen ? 'icon-bilibili_tv' : 'icon-bilibili'
          }`"
          @click="videoOpen = !videoOpen"
        ></span>
        <div :class="['video-box', { isShow: videoOpen }]">
          <iframe
            :src="videoOpen ? source.video : ''"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
            allowfullscreen="true"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from "@/assets/default.png";
import tools from "@/utils/tools";

export default {
  name: "Footer",
  data() {
    return {
      defaultImg,
      videoOpen: false,
    };
  },
  filters: {
    pointer(num) {
      if (num <= 0) {
        return "一般不会死";
      }
      return `${tools.toFixedAuto(tools.toFixedPoint(num * 100, 8))}%`;
    },
    classType(str) {
      switch (str) {
        case "甲":
          return "#ff2222";
        case "乙":
          return "#ee5d0c";
        case "丙":
          return "#54ed13";
        case "尚未定级":
          return "#000";
        default:
          return "#d6d6d6";
      }
    },
    levelType(str) {
      switch (str) {
        case "病毒":
          return "#ff2222";
        case "细菌":
          return "#cb03e1";
        case "寄生虫":
          return "#8a71ca";
        case "螺旋体微生物":
          return "#2d5e14";
        default:
          return "#d6d6d6";
      }
    },
  },
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
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: 40px;
  .title {
    font-weight: 600;
    margin-right: 10px;
    letter-spacing: 1px;
    color: #000;
  }
  .photo {
    width: 120px;
    height: auto;
    margin-right: 10px;
    flex: none;
    border-radius: 4px;
  }
  .info {
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    margin: 10px 0 20px 0;
  }
  .info-l {
    span {
      color: #000;
    }
  }
  .info-v {
    .tv {
      color: #02b0e3;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: #00c6ff;
      }
    }
    .video-box {
      position: relative;
      padding: 0;
      height: 0;
      background: #000;
      overflow: hidden;
      transition: padding 300ms;
      &.isShow {
        padding: 34%;
      }
      iframe {
        position: absolute;
        width: 100%;
        height: calc(100% - 30px);
        top: 30px;
        left: 0;
        border-radius: 4px;
      }
    }
  }
}
</style>
