<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号" sortable></el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable></el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuDel } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["list"],
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    del(id) {
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqMenuDel(id).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.$emit("init");
            } else {
              errorAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message("取消删除");
        });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
  },
};
</script>

<style>
</style>