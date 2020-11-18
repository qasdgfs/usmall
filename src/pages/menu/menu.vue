<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @init='init' @edit='edit'></v-list>
    <v-form :info="info" :list="list" @init="init" ref='form'></v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/form";
import vList from "./components/list";
import { reqMenuList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "菜单添加",
      },
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info.isShow = true;
    },
    init() {
      reqMenuList().then((res) => {
        this.list = res.data.list;
      });
    },
    edit(id){
      this.info.isShow=true,
      this.info.title="编辑菜单"
      this.$refs.form.getOne(id)
    }
  },
  components: {
    vForm,
    vList,
  },
  mounted() {
    this.init()
  },
};
</script>

<style>
</style>