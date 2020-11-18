<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope" v-if="JSON.parse(scope.row.attrs)">
          <el-tag v-for="item in JSON.parse(scope.row.attrs)" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqspecsdelete } from "../../../utils/http";
import {successAlert} from '../../../utils/alert'
export default {
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  methods: {
    ...mapActions({}),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqspecsdelete(id).then((res) => {
        successAlert(res.data.msg);
        this.$emit('init')
      });
    },
  },
  mounted() {},
};
</script>

<style>
</style>