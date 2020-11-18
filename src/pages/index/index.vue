<template>
  <div>
    <el-container class="con">
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222A"
          text-color="#fff"
          active-text-color="#FFD04B"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="i in userInfo.menus" :key="i.id">
            <el-submenu v-if="i.children" :index="i.id+''">
              <template slot="title">
                <i :class="i.icon"></i>
                <span>{{i.title}}</span>
              </template>
              <el-menu-item v-for="v in i.children" :key="v.id" :index="v.url">{{v.title}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="i.url">{{i.title}}</el-menu-item>
          </div>
          
          <!-- <el-submenu index="1" v-if="userInfo.menus">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/manage">管理员管理</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商场管理</span>
            </template>
            <el-menu-item index="/cate">商品分类</el-menu-item>
            <el-menu-item index="/specs">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/vip">会员管理</el-menu-item>
            <el-menu-item index="/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/seckill">秒杀活动</el-menu-item>
          </el-submenu>-->
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <span>{{userInfo.username}}</span>
          <el-button type="primary" @click="logout">退出</el-button>
        </el-header>

        <el-main>
          <el-breadcrumb separator="›" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="main"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    logout() {
      this.changeUser({});
      this.$router.push("/login");
    },
  },
  mounted() {}
};
</script>

<style scoped>
.con {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #B3C0D1;
}
.main {
  padding-top: 20px;
}
</style>