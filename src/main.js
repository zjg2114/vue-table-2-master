/*
 * @Author: your name
 * @Date: 2021-12-07 10:18:55
 * @LastEditTime: 2021-12-09 20:45:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-table/src/main.js
 */
import 'vant/lib/index.css';
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Popover, Toast } from 'vant';

Vue.use(Popover).use(Toast);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
