<template>
  <div>
    <el-table :data="list" style="width: 100%" row-key="id">
      <el-table-column prop="title" label="活动名称" sortable></el-table-column>

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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "seck/list",
    }),
  },
  methods: {
    ...mapActions({}),
  },
  mounted() {},
};
</script>

<style>
</style>