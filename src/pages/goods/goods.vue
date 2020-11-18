<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- <v-list @edit="edit" @init="init"></v-list>
    <v-form :info="info" ref="form" @init="init"></v-form>-->

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="Pagination.size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqgoodscount,reqgoodslist } from "../../utils/http";
export default {
  data() {
    return {
      Pagination: {
        size: 2,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      total: "goods/total",
    }),
  },
  methods: {
    ...mapActions({
      reqTotal: "goods/reqTotal",
    }),
    changePage(page){
      this.Pagination.page = page
    },
    willAdd() {},
  },
  mounted() {
    this.reqTotal();
    reqgoodslist()
  },
};
</script>

<style>
</style>