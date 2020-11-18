<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit" @init="init"></v-list>
    <v-form :info="info" ref="form" @init="init"></v-form>
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
import { reqspecscount } from "../../utils/http";
import vList from "./component/list";
import vForm from "./component/form";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加商品规格",
      },
      total: 0,
      Pagination: {
        size: 2,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
    }),
    changePage(page) {
      this.Pagination.page = page;
      this.init();
    },
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加商品规格",
      };
      this.init();
    },
    edit(id) {
      this.info.isshow = true;
      this.info.title = "修改商品规格";
      this.$refs.form.getOne(id);
    },
    init() {
      this.reqList(this.Pagination);
      reqspecscount().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
  },
  components: {
    vList,
    vForm,
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>