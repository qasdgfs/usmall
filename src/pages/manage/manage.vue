<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list :list="list" @edit="edit" @init='init'></v-list>
    <v-form :info="info" @init="init" ref="form"></v-form>
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
import vList from "./component/list";
import vForm from "./component/form";
import { reqUsercount, reqUserlist } from "../../utils/http";

export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加管理员",
      },
      list: [],
      total: 0,
      Pagination: {
        size: 2,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    //总数
    getTotal() {
      reqUsercount().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
    //页数改变
    changePage(page) {
      this.Pagination.page = page;
      this.getList();
    },
    //请求列表
    getList() {
      reqUserlist(this.Pagination).then((res) => {
        let list = res.data.list ? res.data.list : [];
        if (list.length == 0 && this.Pagination.page > 1) {
          this.Pagination.page--
          this.init()
        }else{
          this.list = list
        }
      });
    },
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加管理员",
      };
    },
    init() {
      this.getTotal();
      this.getList();
    },
    edit(uid) {
      this.info = {
        isshow: true,
        title: "编辑管理员",
      };
      this.$refs.form.getOne(uid);
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