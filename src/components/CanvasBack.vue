<template>
  <canvas id="canvas1" class="canvas-dom"></canvas>
</template>

<script>
let canvas = {};
let ctx = {};
let timer = null; // resize 防抖
let animateTimer = null;
// 文字相关
let dashOffset = 0; // 虚线偏移量
let nowx = 0; // 鼠标的当前位置
let nowy = 0; // 鼠标的当前位置
let theR = 60; // 当前半径
let theRRes = 60; // 目标半径
const text = "传染病数据列表"; // "infectious disease"; // 要显示的文字
const textSize = 80; // 文字大小
let titleShowAlpha = 0; // 文字初始透明度
let titleShowFillAlpha = 0;
let vertex; // 生成所有的小球
let virusImgs = [];
let virusImgsData = [];

import virus1 from "@/assets/virus1.png";
import virus2 from "@/assets/virus2.png";
import virus3 from "@/assets/virus3.png";

export default {
  name: "CanvasBack",
  data() {
    return {
      ctxBdata: null,
      virusImgs: [virus1, virus2, virus3],
    };
  },
  mounted() {
    window.noise.seed(Math.random());
    canvas.a = document.getElementById("canvas1");
    canvas.b = document.createElement("canvas");
    ctx.a = canvas.a.getContext("2d");
    ctx.b = canvas.b.getContext("2d");

    this.resize(null, true);
    this.init();
  },

  beforeDestroy() {
    cancelAnimationFrame(animateTimer);
    canvas.a.removeEventListener("mousemove", this.onMousemove, false);
    canvas.a.removeEventListener("mousedown", this.onMouseDown, false);
    canvas.a.removeEventListener("mouseup", this.onMouseUp, false);
    window.removeEventListener("resize", this.resize, false);

    clearTimeout(timer);
    canvas = {};
    ctx = {};

    dashOffset = 0; // 虚线偏移量
    nowx = 0; // 鼠标的当前位置
    nowy = 0; // 鼠标的当前位置
    theR = 60;
    theRRes = 60; // 目标半径
    titleShowAlpha = 0; // 文字初始透明度
    titleShowFillAlpha = 0;
    vertex = null; // 生成所有的小球
    virusImgs = [];
    virusImgsData = [];
  },

  methods: {
    init() {
      canvas.a.addEventListener("mousemove", this.onMousemove, false);
      canvas.a.addEventListener("mousedown", this.onMouseDown, false);
      canvas.a.addEventListener("mouseup", this.onMouseUp, false);
      window.addEventListener("resize", this.resize, false);
      this.createBack();
      this.initVertext(300);
      this.loadVirusImgs();
      this.animate();
    },

    // 创建背景图片
    createBack() {
      const rect = canvas.a.getBoundingClientRect();
      const w = Math.ceil(rect.width);
      const h = Math.ceil(rect.height);
      canvas.b.width = w;
      canvas.b.height = h;

      const image = ctx.b.createImageData(w, h);
      const data = image.data;

      for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
          let value = Math.abs(window.noise.perlin2(x / 1600, y / 1600));
          value *= 255;
          value += 30;
          value = Math.min(value, 255);
          let cell = (x + y * w) * 4;
          data[cell] = data[cell + 1] = data[cell + 2] = value; // r,g,b
          data[cell + 3] = 255; // alpha.
        }
      }
      this.ctxBdata = image;

      ctx.b.putImageData(this.ctxBdata, 0, 0);
    },

    /**
     * 取范围随机数
     * @param min 最小值
     * @param max 最大值
     * @param int 是否需要四舍五入为整数
     */
    getRandom(m1, m2, int = false) {
      const max = Math.max(m1, m2);
      const min = Math.min(m1, m2);
      let res = Math.random() * (max - min) + min;
      if (int) {
        res = Math.round(res);
      }
      return res;
    },

    // 鼠标在canvas上移动时记录最新坐标
    onMousemove(event) {
      nowx = event.offsetX;
      nowy = event.offsetY;
    },

    onMouseDown() {
      theRRes = 120;
    },

    onMouseUp() {
      theRRes = 60;
    },

    animate() {
      animateTimer = requestAnimationFrame(this.animate);
      this.draw();
    },

    draw() {
      ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

      this.drawTitle();

      this.drawVirusImgs();

      ctx.a.save();
      ctx.a.globalAlpha = titleShowFillAlpha;
      ctx.a.globalCompositeOperation = "destination-over";
      ctx.a.drawImage(canvas.b, 0, 0);
      ctx.a.restore();
    },

    drawTitle() {
      // 文字的初始设置

      ctx.a.font = `${textSize}px SimHei`;
      ctx.a.textBaseline = "top";
      ctx.a.strokeStyle = `rgba(250,250,250,${titleShowAlpha})`;
      ctx.a.lineCap = "round";
      ctx.a.lineWidth = 4;

      const textInfo = ctx.a.measureText(text);
      const textLeft = (canvas.a.width - textInfo.width) / 2;
      const textTop = canvas.a.height / 2.5;

      // 画第1层文字
      ctx.a.save();
      if (titleShowAlpha <= 1) {
        ctx.a.setLineDash([200 * titleShowAlpha, 200 - 200 * titleShowAlpha]);
      }
      ctx.a.strokeText(text, textLeft, textTop);
      ctx.a.restore();

      ctx.a.save();
      if (titleShowAlpha >= 1 && titleShowFillAlpha < 1) {
        titleShowFillAlpha += 0.025;
      }
      ctx.a.fillStyle = `rgba(250,250,250,${titleShowFillAlpha})`;
      ctx.a.fillText(text, textLeft, textTop);
      ctx.a.restore();

      // 擦除一个圆形区域，跟随鼠标坐标
      ctx.a.save();
      ctx.a.globalCompositeOperation = "destination-out";
      ctx.a.beginPath();
      ctx.a.arc(nowx, nowy, theR, 0, Math.PI * 2);
      ctx.a.fill();
      ctx.a.restore();

      if (titleShowAlpha < 1) {
        titleShowAlpha += 0.01;
      } else {
        // 画第2层文字，虚线
        ctx.a.save();
        ctx.a.lineWidth = 2;
        ctx.a.setLineDash([200, 100]);
        dashOffset += 0.25;
        if (dashOffset > 480) {
          dashOffset = 0;
        }
        ctx.a.lineDashOffset = dashOffset;
        ctx.a.strokeText(text, textLeft, textTop);
        ctx.a.restore();

        this.updateBallAndLines();
      }
    },
    // 初始化病毒图片
    loadVirusImgs() {
      for (let i = 0; i < 3; i++) {
        const img = document.createElement("img");
        img.onload = () => {
          virusImgs.push(img);
          this.initVirusImgs();
        };
        img.src = this.virusImgs[i];
      }
    },

    initVirusImgs() {
      const len = 20;
      if (virusImgs.length === 3) {
        for (let i = 0; i < len; i++) {
          const size = this.getRandom(10, 1000 - i * 50);
          virusImgsData.push({
            img: virusImgs[this.getRandom(0, 2, true)],
            x: this.getRandom(-200, canvas.a.width + 200),
            y: this.getRandom(-200, canvas.a.height + 200),
            size,
            alpha: 0.5 - size / 2000,
            speed: 1 - size / 1000,
            rotateSpeed: this.getRandom(-0.01, 0.01), // 旋转速度
            rotateNow: this.getRandom(0, Math.PI * 2), // 当前的旋转弧度
          });
        }
      }
    },

    updateVirusItem(item) {
      item.rotateSpeed = this.getRandom(-0.01, 0.01); // 旋转速度
      item.rotateNow = this.getRandom(0, Math.PI * 2); // 当前的旋转弧度
      item.x = this.getRandom(-200, -item.size);
      item.y = this.getRandom(0, canvas.a.height + 200);
    },

    // 初始化所有顶点信息
    initVertext(num) {
      ctx.a.font = `${textSize}px SimHei`;
      ctx.a.textBaseline = "top";
      ctx.a.lineCap = "round";
      ctx.a.lineWidth = 4;

      const textInfo = ctx.a.measureText(text);
      const textLeft = (canvas.a.width - textInfo.width) * 0.5 * 0.9;
      const textTop = (canvas.a.height - textSize) * 0.5 * 0.9;
      const res = [];
      for (let i = 0; i < num; i++) {
        const x = this.getRandom(textLeft, textLeft + textInfo.width * 1.1);
        const y = this.getRandom(textTop, textTop + textSize * 1.1);
        res.push({
          x, // 原始坐标
          y,
          resX: x, // 目标X
          resY: y, // 目标Y
          nowX: x, // 当前坐标
          nowY: y,
          zX: 0, // 缓慢蠕动的目标坐标
          zY: 0,
          zXnow: 0, // 缓慢蠕动的当前坐标
          zYnow: 0,
          zXStep: 100, // 步数，移动完此步数后重新判定蠕动的目标坐标
          zYStep: 100,
          size: this.getRandom(0.1, 2), // 半径
          maxLeng: this.getRandom(5, 80), // 连线的距离必须小于此值才连线
        });
      }
      vertex = res;
    },

    drawVirusImgs() {
      for (let i = 0; i < virusImgsData.length; i++) {
        const item = virusImgsData[i];
        // 超出屏幕，重新初始化该virus
        if (item.x > canvas.a.width + 200 || item.y < -200 - item.size) {
          this.updateVirusItem(item);
        }
        item.x = item.x + item.speed;
        item.y = item.y - item.speed / 2;

        ctx.a.save();
        ctx.a.globalCompositeOperation = "destination-over";
        ctx.a.translate(item.x + item.size / 2, item.y + item.size / 2);
        item.rotateNow += item.rotateSpeed;
        if (Math.abs(item.rotateNow) > Math.PI * 2) {
          item.rotateNow = 0;
        }
        const ran =
          Math.abs(window.noise.perlin2(item.x / 1000, item.y / 1000)) * 50;
        ctx.a.rotate(item.rotateNow);
        ctx.a.translate(-item.x - item.size / 2, -item.y - item.size / 2);
        ctx.a.globalAlpha = item.alpha * titleShowFillAlpha;

        ctx.a.drawImage(
          item.img,
          item.x + ran,
          item.y + ran,
          item.size,
          item.size
        );
        ctx.a.restore();
      }
    },

    updateBallAndLines() {
      // 根据鼠标位置，放置顶点位置
      ctx.a.save();
      ctx.a.fillStyle = "rgba(250,250,250,1)";
      const showBalls = [];
      if (theR > theRRes) {
        theR = theR - 10;
      } else if (theR < theRRes) {
        theR = theR + 10;
      }

      for (let i = 0; i < vertex.length; i++) {
        const item = vertex[i];
        const leng = Math.sqrt((item.x - nowx) ** 2 + (item.y - nowy) ** 2); // 当前点与鼠标的距离

        // 小球与鼠标的距离，如果小于theR/4,则归到内圈去
        if (leng <= theR) {
          let R = theR;
          if (leng < theR / 4) {
            R = theR / 4;
          }

          // 算出目标坐标，小球最终应该去往该坐标
          item.resX = ((item.x - nowx) / leng) * R + nowx;
          item.resY = ((item.y - nowy) / leng) * R + nowy;

          // 不停的改变nowX，让小球缓慢接近目标坐标
          const offset = Math.abs((item.resX - item.x) / 20);
          if (item.nowX < item.resX && item.nowX - item.resX < -offset) {
            item.nowX += offset;
          } else if (item.nowX > item.resX && item.nowX - item.resX > offset) {
            item.nowX -= offset;
          }
          if (item.nowY < item.resY && item.nowY - item.resY < -offset) {
            item.nowY += offset;
          } else if (item.nowY > item.resY && item.nowY - item.resY > offset) {
            item.nowY -= offset;
          }

          // 小球可以在小范围内游离
          const baseNum = 6;
          if (item.zXStep >= 100) {
            let min = -baseNum;
            let max = baseNum;
            if (item.zXnow <= -baseNum) {
              min = 0;
            } else if (item.zXnow >= baseNum) {
              max = 0;
            }

            item.zX = this.getRandom(min, max, true);
            item.zXStep = 0;
          } else {
            item.zXnow += item.zX * 0.01;
            item.zXStep++;
          }
          if (item.zYStep >= 100) {
            let min = -baseNum;
            let max = baseNum;
            if (item.zYnow < -baseNum) {
              min = 0;
            } else if (item.zYnow > baseNum) {
              max = 0;
            }
            item.zY = this.getRandom(min, max, true);
            item.zYStep = 0;
          } else {
            item.zYnow += item.zY * 0.01;
            item.zYStep++;
          }
          showBalls.push({
            x: item.nowX + item.zXnow,
            y: item.nowY + item.zYnow,
            lines: 0,
            maxLeng: item.maxLeng,
          });
          ctx.a.beginPath();
          ctx.a.arc(
            item.nowX + item.zXnow,
            item.nowY + item.zYnow,
            item.size,
            0,
            Math.PI * 2
          );
          ctx.a.fill();
        }
      }
      // 设置小球和小球间的连线
      for (let i = 0; i < showBalls.length; i++) {
        for (let j = i + 1; j < showBalls.length; j++) {
          const a = showBalls[i];
          const b = showBalls[j];
          if (a && b) {
            const leng = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2); // 两点间距离
            if (
              leng < a.maxLeng &&
              leng < b.maxLeng &&
              a.lines < 1 &&
              b.lines < 1
            ) {
              ctx.a.save();
              ctx.a.strokeStyle = `rgba(250,250,250,${1 - leng / a.maxLeng})`;
              ctx.a.lineWidth = 1;
              ctx.a.beginPath();
              ctx.a.moveTo(a.x, a.y);
              ctx.a.lineTo(b.x, b.y);
              ctx.a.stroke();
              ctx.a.restore();
              a.lines++;
              b.lines++;
            }
          }
        }
      }
      ctx.a.restore();
    },

    resize(event, first) {
      if (first) {
        const clientRect = canvas.a.getBoundingClientRect();
        canvas.a.setAttribute("width", clientRect.width);
        canvas.a.setAttribute("height", clientRect.height);
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const clientRect = canvas.a.getBoundingClientRect();
          canvas.a.setAttribute("width", clientRect.width);
          canvas.a.setAttribute("height", clientRect.height);
          this.initVertext(300); // 重新初始化小球的数据
          setTimeout(() => this.createBack());
        }, 200);
      }
    },
  },
};
</script>

<style scoped lang="less">
.canvas-dom {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
