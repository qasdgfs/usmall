<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="80px" v-if="this.form.pid != 0">
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
        <el-button type="primary" @click="add" v-if="info.title == '添加轮播图'">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqbanneradd, reqbannerinfo,reqbanneredit  } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "",
        img: "",
        status: 1,
      },
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList",
    }),
    cancel() {
      this.info.isshow = false;
    },
    closed() {
      if (this.info.title == "编辑轮播图") {
        this.empty();
      }
    },
    empty() {
      this.form = {
        title: "",
        img: "",
        status: 1,
      };
      this.imgUrl = "";
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
      reqbanneradd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqList();
        }
      });
    },
    getOne(id) {
      reqbannerinfo(id).then(res=>{
        if(res.data.code == 200){
          this.form = res.data.list
          this.imgUrl = this.$imgPre + res.data.list.img
          this.form.id = id
        }
      })
    },
    update() {
      console.log(this.form);
      reqbanneredit(this.form).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg)
          this.reqList()
          this.cancel()
          this.empty()
        }
      })
    },
  },
  mounted() {},
};
</script>

<style>
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