<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" label-width="80px">
          <el-select v-model="form.pid" placeholder="请选择" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="80px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" label-width="80px" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="80px" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="item.name+'--/'+item.path"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '菜单添加'">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { routes } from "../../../router";
import { reqMenuAdd, reqMenuDetail, reqMenuUpdate } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-help",
        "el-icon-s-operation",
      ],
      routes: routes,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    cancel() {
      this.info.isShow = false;
    },
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      };
    },
    add() {
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
          
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    getOne(id) {
      reqMenuDetail(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    update() {
      reqMenuUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    closed() {
      if (this.info.title === "编辑菜单") {
        this.empty();
      }
    },
  },

  mounted() {},
};
</script>

<style>
</style>