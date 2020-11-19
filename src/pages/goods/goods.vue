<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit" ></v-list>
    <v-form :info="info" ref='form'></v-form>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqgoodscount, reqgoodslist } from "../../utils/http";
import vList from "./componnet/list";
import vForm from "./componnet/form";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加商品",
      },
    };
  },
  computed: {
    ...mapGetters({
      total: "goods/total",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      reqTotal: "goods/reqTotal",
      changePage: "goods/changePage",
      reqList: "goods/reqList",
    }),
    edit(id) {
      this.info = {
        isshow: true,
        title: "编辑商品",
      }
      this.$refs.form.getOne(id)
    },
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加商品",
      };
    },
  },
  components: {
    vForm,
    vList,
  },
  mounted() {
    this.reqTotal();
    this.reqList();
  },
};
</script>

<style>
</style>