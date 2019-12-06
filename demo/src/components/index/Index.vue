<template>
  <div>
    <el-container>
      <el-aside width="auto" ref="aside">
        <div @click="Collapse">
          <i class="el-icon-s-fold" ref="i"></i>
        </div>
        <!-- default-active="1-4-1" 当前激活的菜单的index -->
        <el-menu
          default-active="/home/goods"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          router
        >
          <el-menu-item index="/home/user">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户信息</span>
          </el-menu-item>
          <el-submenu index="/home/goods">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">生活用品</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <!-- disabled  设置不能点击-->
          <el-menu-item index="3">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-data-line"></i>
            <span slot="title">数据试图</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header ref="header">
          <p>后台管理系统</p>
          <div>
            <span>数据用户名</span>
          </div>
        </el-header>
        <el-main ref="content">
          <router-view />
        </el-main>
        <el-footer ref="footer">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    Collapse() {
      this.isCollapse = !this.isCollapse;
      this.$refs.i.className =
        this.$refs.i.className == "el-icon-s-fold"
          ? "el-icon-s-unfold"
          : "el-icon-s-fold";
    }
  },
  mounted() {
    let heightW = document.documentElement.clientHeight;
    let headerH = parseInt(this.$refs.header.$el.style.height);
    let footerH = parseInt(this.$refs.footer.$el.style.height);
    this.$refs.aside.$el.style.height = heightW + "px";
    this.$refs.content.$el.style.minHeight = heightW - headerH - headerH + "px";
  }
};
</script>

<style lang="less">
.el-aside {
  > div {
    height: 40px;
    > i {
      height: 40px;
      line-height: 40px;
      display: block;
    }
  }
}
.el-header {
  text-align: initial !important;
  top: 0;
  display: flex;
  justify-content: space-between;
  p {
    height: 60px;
    width: 200px;
    font-size: 30px;
    display: block;
    line-height: 60px;
  }
  div {
    height: 60px;
    line-height: 60px;
  }
}
.el-footer {
  bottom: 0;
}

.el-radio-button__inner {
  padding: 10px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 80px;
  position: sticky;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
  position: sticky;
  top: 0;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
