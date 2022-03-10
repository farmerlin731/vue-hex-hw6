<template>
  <div class="container">
    <h3>我是購物車列表唷 ^_^</h3>
    <Loading :active="loadingStatus"></Loading>
    <div class="mt-4">
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="deleteCartAll"
        >
          清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cartData.carts">
            <tr></tr>
            <tr v-for="item in cartData.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteCart(item)"
                >
                  x
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <input
                      v-model.number="item.qty"
                      @blur="updateCart(item)"
                      min="1"
                      type="number"
                      class="form-control"
                    />
                    <span class="input-group-text" id="basic-addon2">{{
                      item.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <small
                  v-if="item.final_total != item.total"
                  class="text-success"
                  >折扣價：</small
                >
                {{ item.final_total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cartData.total }}</td>
          </tr>
          <tr v-if="cartData.final_total != cartData.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ cartData.final_total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingStatus: false,
      cartData: {},
    };
  },
  methods: {
    getCart() {
      this.loadingStatus = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          this.cartData = res.data.data;
          this.loadingStatus = false;
        })
        .catch((err) => {
          alert("CART ERROR");
          console.dir(err);
          this.loadingStatus = false;
        });
    },
    updateCart(item) {
      this.loadingStatus = true;
      let tmpCart = {
        product_id: item.id,
        qty: item.qty,
      };
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .put(url, { data: tmpCart })
        .then(() => {
          this.getCart();
          this.loadingStatus = false;
        })
        .catch((err) => {
          console.dir(err);
          this.loadingStatus = false;
        });
    },
    deleteCart(item) {
      this.loadingStatus = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .delete(url)
        .then(() => {
          this.loadingStatus = false;
          this.getCart();
        })
        .catch((err) => {
          console.dir(err);
          this.loadingStatus = false;
        });
    },
    deleteCartAll() {
      this.loadingStatus = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then(() => {
          this.loadingStatus = false;
          this.getCart();
        })
        .catch((err) => {
          console.dir(err);
          this.loadingStatus = false;
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
