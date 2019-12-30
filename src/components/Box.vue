<template>
  <div class="box">
    <div
      class="line-out"
      :key="oneData.id"
      v-for="oneData in itData"
      @click="clickIt(oneData, type)"
    >
      <div
        class="line-center"
        :class="{ active: checkActive(oneData.id, type) }"
      >
        <div class="line-in">
          <img class="line-image" :src="getImage(oneData)" />
          <p class="line-p" :title="oneData.title">{{ oneData.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: ["itData", "clickIt", "getImage", "checkActive", "type"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  border: 1px solid red;
  width: 400px;
  height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 2px;
}

.line-center {
  padding: 10px;
  cursor: pointer;
}

.line-center:hover {
  background-color: rgba(102, 204, 255, 0.4);
}

.line-center.active {
  background-color: rgba(102, 204, 255, 0.8);
}

.line-in {
  display: flex;
  align-items: center;
  width: 380px;
  height: 20px;
}

.line-in .line-image {
  width: 16px;
  height: 16px;
  margin: 2px;
}

.line-in .line-p {
  width: 350px;
  height: 20px;
  margin: 0;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
