<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          label-width="80px"
          v-for="(item,index) in user.attrs"
          :key="index"
        >
          <div class="line">
            <el-input v-model="user.attrs[index]" autocomplete="off"></el-input>
            <el-button type="primary" v-if="index==0" @click="addAttr">添加规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加商品规格'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqspecsadd, reqspecsinfo, reqspecsedit } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: [""],
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
      this.user = {
        specsname: "",
        attrs: [""],
        status: 1,
      };
    },
    closed() {
      if (this.info.title == "编辑商品规格") {
        this.empty();
      }
    },
    addAttr() {
      this.user.attrs.push("");
    },
    delAttr(index) {
      this.user.attrs.splice(index, 1);
    },
    add() {
      this.user.attrs = JSON.stringify(this.user.attrs);
      reqspecsadd(this.user).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.empty();
        this.$emit("init");
      });
    },
    getOne(id) {
      reqspecsinfo(id).then((res) => {
        this.user = res.data.list[0];
        this.user.attrs = JSON.parse(this.user.attrs);
      });
      this.user.id = id;
    },
    update() {
      reqspecsedit(this.user).then(res=>{
        console.log(res.data.list.msg);
        successAlert(res.data.list.msg)
        this.cancel();
        this.empty();
        this.$emit("init");
      })
    },
  },
  mounted() {},
};
</script>

<style scoped>
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
</style>