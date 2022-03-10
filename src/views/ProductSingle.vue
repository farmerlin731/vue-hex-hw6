<template>
  <div>
    <Loading :active="loadingStatus"></Loading>
    <h2>商品名稱：{{ this.tmpProd.title }}</h2>
    <h2>商品價格：{{ this.tmpProd.price }}</h2>
    <img height="400" :src="this.tmpProd.imageUrl" alt="" />
    <button @click="buyProd" type="button" class="btn btn-success">
      我要購買
    </button>
  </div>
</template>

<style lang="scss">
img {
  display: block;
  margin: 20px auto;
}
button {
  margin-bottom: 20px;
}
</style>
<script>
export default {
  data() {
    return {
      tmpProd: {},
      tmpString: "",
      loadingStatus: false,
    };
  },
  methods: {
    getProdData() {
      const { id } = this.$route.params;
      this.loadingStatus = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((response) => {
          this.tmpProd = response.data.product;
          this.loadingStatus = false;
        })
        .catch((err) => {
          alert(err.data.message);
          this.loadingStatus = false;
        });
    },
    buyProd() {
      this.loadingStatus = true;

      let tmpCart = {
        product_id: this.$route.params.id,
        qty: 1,
      };

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, { data: tmpCart })
        .then(() => {
          this.loadingStatus = false;
          this.$router.push("/products/");
        })
        .catch((err) => {
          this.loadingStatus = false;
          console.dir(err);
        });
    },
  },
  mounted() {
    this.tmpString = this.$route.params.id;
    this.getProdData();
  },
};
</script>
