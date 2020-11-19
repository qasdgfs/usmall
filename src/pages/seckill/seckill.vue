<template>
  <div>
    <el-button type="primary" @click="add()">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-form :info="info" ref="cate"></v-form>
  </div>
</template>

<script>
import vList from "./component/list.vue";
import vForm from "./component/form.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      Total: "goods/Total",
      size: "goods/size",
    }),
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "商品管理添加",
      },
    };
  },
  components: {
    vList,
    vForm,
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal",
      changPage: "goods/changPage",
    }),
    edit(id) {
      this.info = {
        isShow: true,
        title: "商品管理编辑",
      };
      this.$refs.cate.getOne(id);
    },
    add() {
      this.info = {
        isShow: true,
        title: "商品管理添加",
      };
    },
  },
  mounted() {
    this.reqTotal();
  },
};
</script>

<style>
</style>