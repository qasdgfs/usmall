<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @init='init' @edit='edit'></v-list>
    <v-form :info="info" @init='init' ref='form'></v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/form";
import vList from "./components/list";
import { reqRolelist } from "../../utils/http";

export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加角色",
      },
      list:[],
    };
  },

  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

    //添加按钮
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加角色",
      };
    },

    init() {
      reqRolelist().then((res) => {
        this.list = res.data.list;
      });
    },

    edit(uid){
      this.info = {
        isshow: true,
        title: "编辑角色",
      }
      this.$refs.form.getOne(uid)
    }
  },
  components: {
    vForm,
    vList,
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>