<template>
  <div>
    <el-dialog title="编辑角色" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="昵称" label-width="80px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" label-width="80px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqMemberinfo, reqMemberedit } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        nickname: "",
        phone: "",
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

    getOne(uid) {
      reqMemberinfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = "";
        }
      });
    },
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.form = {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    update() {
      if (this.form.password) {
        reqMemberedit(this.form).then((res) => {
          successAlert(res.data.msg);
        });
      }
      this.cancel();
      this.empty();
    },
  },
  mounted() {},
};
</script>

<style>
</style>