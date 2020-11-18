<template>
  <div>
    <v-list :list='list' @edit='edit'></v-list>
    <v-form ref='form' :info='info'></v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./component/list";
import vForm from "./component/form";
import { reqMemberlist } from "../../utils/http";
import { successAlert } from "../../utils/alert";

export default {
  data(){
    return{
      list:[],
      info:{
        isshow:false
      }
    }
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

    init() {
      reqMemberlist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list
        }
      });
    },

    edit(uid){
      this.info.isshow = true
      this.$refs.form.getOne(uid)
    },
  },
  components: {
    vList,
    vForm,
  },
  mounted() {
    this.init()
  },
};
</script>

<style>
</style>