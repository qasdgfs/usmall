<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit='edit'></v-list>
    <v-form :info='info' ref='form'></v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./component/list";
import vForm from "./component/form";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加轮播图",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList",
    }),
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加轮播图",
      };
    },
    edit(id){
      console.log(id);
      this.info = {
        isshow: true,
        title: "编辑轮播图",
      }
      this.$refs.form.getOne(id)
    }
  },
  components:{
    vList,
    vForm
  },
  mounted() {
    this.reqList();
  },
};
</script>

<style>
</style>