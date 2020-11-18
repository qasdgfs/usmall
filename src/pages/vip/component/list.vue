<template>
  <el-table :data="list" stripe style="width: 100%">
    <el-table-column prop="uid" label="用户编号" sortable width="180"></el-table-column>
    <el-table-column prop="nickname" label="昵称" sortable width="180"></el-table-column>
    <el-table-column prop="phone" label="手机号" sortable></el-table-column>

    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["list"],
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    edit(uid){
      this.$emit('edit',uid)
    }
  },
  mounted() {},
};
</script>

<style>
</style>