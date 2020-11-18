<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed='closed'>
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="80px">
          <el-select v-model="form.roleid" placeholder="请选择角色">
            <el-option v-for="item in role" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加管理员'">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqRolelist,
  reqUseradd,
  reqUserinfo,
  reqUseredit,
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      role: [],
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    add() {
      reqUseradd(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.empty();
        this.$emit("init");
      });
    },
    getOne(uid) {
      this.form.uid = uid;
      reqUserinfo(uid).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    update() {
      reqUseredit(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.empty();
        this.$emit("init");
      });
    },
    closed(){
      if(this.info.title == '编辑管理员'){
        this.empty()
      }
    }
  },

  mounted() {
    reqRolelist().then((res) => {
      this.role = res.data.list;
    });
  },
};
</script>

<style>
</style>