/*
 * @Date: 2019-12-29 18:27:29
 * @Author: lyz
 * @Description:
 */
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

/**
 * 按住 Ctrl+, 即可聚焦输入框
 *
 */
let searchInput;
const getSearchInput = () => {
  if (!searchInput) {
    searchInput = document.getElementById("search-input");
  }
  return searchInput;
};

document.addEventListener("keyup", e => {
  const mySearchInput = getSearchInput();
  // 按住 Ctrl 和 逗号键
  if (e.keyCode == "188" && e.ctrlKey == true) {
    mySearchInput.focus();
  }
});
