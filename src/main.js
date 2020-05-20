import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "./assets/normalize.css";

import {
  Button,
  Icon,
  Input,
  Modal,
  message,
  Popover,
  Select,
  BackTop,
  Dropdown,
  Menu,
  Tag,
  Tooltip,
} from "ant-design-vue";

Vue.use(Button);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Modal);
Vue.use(Popover);
Vue.use(Select);
Vue.use(BackTop);
Vue.use(Dropdown);
Vue.use(Menu);
Vue.use(Tag);
Vue.use(Tooltip);
message.config({
  maxCount: 3,
  duration: 1,
});
Vue.prototype.$message = message;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
