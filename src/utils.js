/*
 * @Date: 2019-12-29 18:43:35
 * @Author: lyz
 * @Description:
 */
const utils = {
  hasKey(obj, key) {
    return obj.hasOwnProperty(key);
  },
  openUrl(url) {
    window.open(url);
  },
  isContain(long, small) {
    const long0 = long.toLowerCase();
    const small0 = small.toLowerCase();
    return long0.indexOf(small0) > -1;
  },
  searchInInternet(search) {
    const head = "https://cn.bing.com/search?q=";
    utils.openUrl(head + search);
  }
};

export default utils;
