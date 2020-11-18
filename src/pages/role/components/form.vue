<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="80px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="80px">
          <el-tree
            :data="roleList"
            show-checkbox
            node-key="id"
            :props="{children: 'children',label: 'title'}"
            ref="label"
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="info.title=='添加角色'">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqRoleadd,
  reqMenuList,
  reqRoleinfo,
  reqRoleedit,
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      roleList: [],
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    off() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.label.setCheckedKeys([]);
    },
    submit() {
      this.user.menus = JSON.stringify(this.$refs.label.getCheckedKeys());
      reqRoleadd(this.user).then((res) => {
        successAlert(res.data.list);
        this.empty();
        this.off();
        this.$emit("init");
      });
    },
    getOne(uid) {
      reqRoleinfo(uid).then((res) => {
        this.user = {
          id: uid,
          rolename: res.data.list.rolename,
          menus: res.data.list.menus,
          status: res.data.list.status,
        };
        this.$refs.label.setCheckedKeys(JSON.parse(res.data.list.menus));
      });
    },
    update() {
      this.user.menus = JSON.stringify(this.$refs.label.getCheckedKeys());
      reqRoleedit(this.user).then((res) => {
        successAlert(res.data.msg);
        this.empty();
        this.off();
        this.$emit("init");
      });
    },
    closed() {
      if (this.info.title == "编辑角色") {
        this.empty();
      }
    },
  },
  mounted() {
    reqMenuList().then((res) => {
      this.roleList = res.data.list;
    });
  },
};
</script>

<style>
</style>