<template>
  <div class="container">
    <h3>我是產品列表唷 ^_^</h3>
    <Loading :active="loadingStatus"></Loading>
    <div class="mt-4">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <div
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
                style="
                  height: 100px;
                  background-size: cover;
                  background-position: center;
                "
              ></div>
            </td>
            <td>
              {{ item.title }}
            </td>
            <td>
              <del class="h6">原價 {{ item.origin_price }} 元</del>
              <div class="h5">現在只要 {{ item.price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="checkProdInfo(item)"
                >
                  <!-- :disabled="loadingItemId == item.id" -->
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="btnAddToCart(item)"
                >
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tmpData: "hahaProdAll!",
      products: [],
      loadingStatus: false,
    };
  },
  methods: {
    checkProdInfo(item) {
      this.$router.push(`/product/${item.id}`);
    },

    btnAddToCart(item, quantity = 1) {
      this.loadingStatus = true;
      let tmpCart = {
        product_id: item.id,
        qty: quantity,
      };

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, { data: tmpCart })
        .then(() => {
          this.loadingStatus = false;
        })
        .catch((err) => {
          console.dir(err);
          this.loadingStatus = false;
        });
    },

    getData() {
      this.loadingStatus = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.loadingStatus = false;
        })
        .catch((err) => {
          console.dir(err);
          alert("擷取失敗。 ");
          this.loadingStatus = false;
        });
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
