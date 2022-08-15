<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{name}}</div>
  </div>
</template>

<script>
import api from "@/api/test"
export default {
  name: "index",
  data() {
    return {
      name: {}
    }
  },
  created() {
    this._testAddress()
  },
  methods: {
    _testAddress() {
      api.test().then( res => {
        this.name = res
        console.log(res)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
