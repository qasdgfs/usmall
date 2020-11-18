<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="顶级分类" label-width="80px">
          <el-select v-model="form.pid" placeholder="请选择分类">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="80px" v-if='this.form.pid != 0'>
          <div class="myupload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt />
            <input v-if="info.isshow" type="file" class="ipt" @change="changeFile" />
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '分类添加'">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { mapGetters, mapActions } from "vuex";
import { reqCateadd, reqCateinfo, reqCateedit } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
      reqInfo: "cate/reqInfo",
    }),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      };
    },
    changeFile(e) {
      let file = e.target.files[0];
      let extname = path.extname(file.name);
      let arr = [".jpg", ".jpeg", ".png", ".gif"];
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2M");
      } else if (!arr.includes(extname)) {
        errorAlert("请上传正确的图片格式！");
      } else {
        this.form.img = file;
        this.imgUrl = URL.createObjectURL(file);
      }
    },
    add() {
      reqCateadd(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.empty();
        this.reqList();
      });
    },
    getOne(id) {
      reqCateinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.imgUrl = this.$imgPre + res.data.list.img;
          this.form.id = id;
        }
      });
    },
    update() {
      console.log(this.form);
      reqCateedit(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.empty();
        this.reqList()
      });
    },

    closed() {
      if (this.info.title == "分类编辑") {
        this.empty();
        this.imgUrl = "";
      }
    },
  },

  mounted() {
  },
};
</script>

<style scoped>
.myupload {
  width: 180px;
  height: 180px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}

.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 180px;
  color: #666;
  font-weight: 100;
}

.myupload .ipt {
  width: 180px;
  height: 180px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.myupload .img {
  width: 180px;
  height: 180px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>