<template>
  <div>
    <h2 style="margin-top: 50px">你在前臺！</h2>
    <div id="nav">
      <router-link to="/">首頁</router-link> |
      <router-link to="/products">前台產品列表</router-link> |
      <router-link to="/cart">前台購物車</router-link> | Ver2
    </div>
  </div>
  <router-view></router-view>
</template>


<style lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
