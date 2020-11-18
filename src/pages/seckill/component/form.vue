<template>
  <div>
    <div>
      <el-dialog :title="info.title" :visible.sync="info.isshow">
        <el-form :model="form">
          <el-form-item label="菜单名称" label-width="80px">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="一级分类" label-width="80px">
            <el-select v-model="form.title" placeholder="请选择">
              <el-option label="顶级菜单" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" label-width="80px">
            <el-select v-model="form.title" placeholder="请选择">
              <el-option label="顶级菜单" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品" label-width="80px">
            <el-select v-model="form.title" placeholder="请选择">
              <el-option label="顶级菜单" :value="0"></el-option>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "haha",
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
    empty() {},
    add() {},
    getOne() {},
    update() {},
  },
  mounted() {},
};
</script>

<style>
</style>