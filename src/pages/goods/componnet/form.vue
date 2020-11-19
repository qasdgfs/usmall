<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened" @closed="closed">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="80px" prop="first_cateid">
          <el-select placeholder="请选择一级分类" v-model="form.first_cateid" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="80px" prop="second_cateid">
          <el-select placeholder="请选择二级分类" v-model="form.second_cateid">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="80px" prop="goodsname">
          <el-input v-model="form.goodsname" placeholder="请输入商品名称"></el-input>
        </el-form-item>

        <el-form-item label="价格" label-width="80px" prop="price">
          <el-input v-model="form.price" placeholder="请输入价格"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" label-width="80px" prop="market_price">
          <el-input v-model="form.market_price" placeholder="请输入市场价格"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="80px">
          <div class="myupload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt />
            <input v-if="info.isshow" type="file" class="ipt" @change="changeFile" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" label-width="80px" prop="specsid">
          <el-select placeholder="请选择商品规格" v-model="form.specsid" @change="changeSpecsId">
            <el-option
              v-for="item in specslist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="80px" prop="specsattr">
          <el-select placeholder="请选择二级分类" v-model="form.specsattr" multiple>
            <el-option v-for="item in attrsList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="描述" label-width="80px">
          <div v-if="info.isshow" id="edit"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加商品'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import {
  reqspecslist,
  reqCatelist,
  reqgoodscount,
  reqgoodsadd,
  reqgoodsinfo,
} from "../../../utils/http";
import path from "path";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      secondCateList: [],
      imgUrl: "",
      attrsList: [],
      specslist: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqcatelist: "cate/reqList",
      reqgoodscount: "goods/reqTotal",
      reqgoodslist: "goods/reqList",
    }),
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
    },
    cancel() {
      this.info.isshow = false;
    },
    closed() {
      if (this.info.title == "编辑商品") {
        this.empty();
      }
    },
    changeFirst() {
      this.form.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqCatelist({ pid: this.form.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
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
    changeSpecsId() {
      this.form.specsattr = [];
      this.getAttrs();
    },
    getAttrs() {
        console.log(this.form.specsid);
        console.log(this.specslist);
      let obj = this.specslist.find((item) => item.id == this.form.specsid);
      console.log(obj);
      this.attrsList = JSON.parse(obj.attrs);
    },
    addAttr() {
      this.attrArr.push();
    },
    add() {
      this.form.description = this.editor.txt.html();
      let d = { ...this.form };
      d.specsattr = JSON.stringify(d.specsattr);
      reqgoodsadd(d).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqgoodscount();
          this.reqgoodslist();
        }
      });
    },
    getOne(id) {
      this.form.id = id;
      reqgoodsinfo(id).then((res) => {
        this.form = res.data.list;
        this.getSecondList();
        this.imgUrl = this.$imgPre + this.form.img;
        this.form.specsattr = JSON.parse(this.form.specsattr);
        this.getAttrs();
        if (this.editor) {
          this.editor.txt.html(this.form.description);
        }
      });
    },
    update() {
      this.form.description = this.editor.txt.html();
      let d = { ...this.user };
      d.specsattr = JSON.stringify(d.specsattr);
      reqgoodsUpdate(d).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqgoodslist();
        }
      });
    },
    opened() {
      this.editor = new E("#edit");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
  },
  mounted() {
    this.reqcatelist();
    reqspecslist().then((res) => {
      if (res.data.code == 200) {
        this.specslist = res.data.list;
      }
    });
  },
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
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}
.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}
.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>