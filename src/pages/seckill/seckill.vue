<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list></v-list>
    <v-form :info='info'></v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vList from './component/list'
import vForm from './component/form'
export default {
  data(){
    return{
      info:{
        isshow:true,
        title:'添加秒杀'
      }
    }
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList:'seck/reqList'
    }),
    willAdd(){
      
    }
  },
  components:{
    vForm,
    vList
  },
  mounted() {
    this.reqList()
  },
};
</script>

<style>
</style>