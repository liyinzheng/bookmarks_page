<template>
  <div id="app">
    <div class="search-box">
      <p class="search-label">{{ searchLabel }}</p>
      <input
        class="search-input"
        id="search-input"
        type="text"
        v-model="search"
        @keyup.enter="searchIt"
        @keyup.esc="clearIt"
        @keyup.tab="changeIt"
      />
    </div>
    <div class="boxes">
      <Box
        type="1"
        :it-data="firstArr"
        :click-it="clickLine"
        :get-image="getImage"
        :check-active="checkActive"
      ></Box>
      <Box
        type="2"
        :it-data="secondArr"
        :click-it="clickLine"
        :get-image="getImage"
        :check-active="checkActive"
      ></Box>
      <Box
        type="3"
        :it-data="thirdArr"
        :click-it="clickLine"
        :get-image="getImage"
        :check-active="checkActive"
      ></Box>
    </div>
  </div>
</template>

<script>
import Box from "./components/Box.vue";
import utils from "./utils.js";
import folderPng from "./assets/folder.png";

const isDev = () => process.env.NODE_ENV == "development";
const getFolderIcon = () => folderPng;
const iconHead = "chrome://favicon/size/32@2x/";
const CONSTANT = {
  MODE1: "书签模式",
  MODE2: "搜索模式"
};

let iconPng = "",
  testDataJson = { children: [] },
  getIconByUrl = () => "",
  dataJson = [];

export default {
  name: "app",
  components: {
    Box
  },
  data() {
    return {
      firstArr: [],
      firstSelectId: null,
      secondArr: [],
      secondSelectId: null,
      thirdArr: [],
      search: "",
      searchLabel: CONSTANT.MODE1
    };
  },
  methods: {
    clickLine(bookData, type) {
      if (utils.hasKey(bookData, "children")) {
        this.updateArrByType(bookData, type);
      } else if (utils.hasKey(bookData, "url")) {
        utils.openUrl(bookData.url);
      } else {
        console.log("数据异常，请检查！");
      }
    },
    updateArrByType(bookData, type) {
      const { id, children } = bookData;
      switch (Number(type)) {
        case 1:
          {
            if (this.firstSelectId == id) {
              return;
            }
            this.secondArr = this.getArrHasCurrentTitle(children);
            this.firstSelectId = id;
            this.secondSelectId = null;
            this.thirdArr = [];
          }
          break;
        case 2:
          {
            if (this.secondSelectId == id) {
              return;
            }
            this.thirdArr = this.getArrHasCurrentTitle(children);
            this.secondSelectId = id;
          }
          break;
      }
    },
    getArrHasCurrentTitle(arr) {
      const search = this.search.trim();
      if (this.title == "") {
        return arr;
      }
      return this.getArrByTitleAndArr(search, arr);
    },
    getArrByTitleAndArr(search, arr) {
      return arr.reduce((total, current) => {
        if (utils.isContain(current.title, search)) {
          total.push(current);
        }
        return total;
      }, []);
    },
    checkActive(id, type) {
      switch (Number(type)) {
        case 1: {
          return this.firstSelectId == id;
        }
        case 2: {
          return this.secondSelectId == id;
        }
      }
    },
    getImage(e) {
      if (utils.hasKey(e, "children")) {
        return getFolderIcon();
      } else if (utils.hasKey(e, "url")) {
        return getIconByUrl(e.url);
      } else {
        console.log("数据异常，请检查！");
      }
    },
    clearIt() {
      this.search = "";
      this.searchUpdateByArr(dataJson);
    },
    searchIt() {
      const { search, searchLabel } = this;
      const { MODE1, MODE2 } = CONSTANT;
      switch (searchLabel) {
        case MODE1:
          this.searchBookmark(search);
          break;
        case MODE2:
          utils.searchInInternet(search);
          break;
      }
    },
    searchBookmark(search) {
      const result = [];
      dataJson.forEach(e => {
        if (this.checkBookDataDeepHasTitle(search, e)) {
          result.push(e);
        }
      });
      this.searchUpdateByArr(result);
    },
    checkBookDataDeepHasTitle(search, bookData) {
      if (utils.isContain(bookData.title, search)) {
        return true;
      } else if (utils.hasKey(bookData, "children")) {
        return bookData.children.some(current => {
          return this.checkBookDataDeepHasTitle(search, current);
        });
      }
      return false;
    },
    searchUpdateByArr(arr) {
      this.firstArr = arr;
      this.firstSelectId = null;
      this.secondArr = [];
      this.secondSelectId = null;
      this.thirdArr = [];
    },
    changeIt() {
      const { searchLabel } = this;
      const { MODE1, MODE2 } = CONSTANT;
      switch (searchLabel) {
        case MODE1:
          this.searchLabel = MODE2;
          break;
        case MODE2:
          this.searchLabel = MODE1;
          break;
      }
    }
  },
  mounted() {
    if (isDev()) {
      // 测试
      import("./assets/icon.png").then(e => {
        iconPng = e.default;
      });
      import("./data.json").then(e => {
        testDataJson = e.default;
        dataJson = testDataJson.children;
        this.firstArr = testDataJson.children;
      });
      getIconByUrl = () => iconPng;
    } else {
      // 生产
      const { bookmarks } = chrome;
      bookmarks.getTree(e => {
        const root = e[0].children[0];
        dataJson = root.children;
        this.firstArr = root.children;
      });
      getIconByUrl = url => iconHead + url;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: rgba(204, 204, 204, 0.5);
}

.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 50px 0;
  width: 900px;
  height: 40px;
}

.search-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  margin-right: 10px;
}

.search-input {
  width: 500px;
  height: 40px;
}

.boxes {
  display: flex;
  align-items: center;
}
</style>
