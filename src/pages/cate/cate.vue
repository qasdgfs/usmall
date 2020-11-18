<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :info='info' @edit='edit'></v-list>
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
        title: "分类添加",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info = {
        isshow: true,
        title: "分类添加",
      };
    },
    edit(id){
      this.$refs.form.getOne(id)
    }
  },
  components: {
    vForm,
    vList,
  },
  mounted() {},
};
</script>

<style>
</style>