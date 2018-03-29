<template>
  <div>
    <div class="text1">hello world1e</div>
    <div class="text2">hello world1e</div>
    <img src="../img/pop.jpg" />
    <img src="../img/tao.nobase64.png" />
  </div>
</template>

<style lang="less" rel="stylesheet/less">
@import './index.less';

.text1{
 color: red;
}
</style>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  },

  mounted() {
    const img = require('../img/pipi.jpg');
    const img2 = require('../img/tao.nobase64.png');

    if (process.env.NODE_ENV === "development") {
      console.log('Debug info')
    }

    if (process.env.NODE_ENV !== "development") {
      console.log('Production log')
    }
  }
}
</script>

