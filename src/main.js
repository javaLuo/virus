import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "./assets/normalize.css";

import { BackTop, Tag, Tooltip } from "ant-design-vue";

Vue.use(BackTop);
Vue.use(Tag);
Vue.use(Tooltip);

// message.config({
//   maxCount: 3,
//   duration: 1,
// });
// Vue.prototype.$message = message;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
