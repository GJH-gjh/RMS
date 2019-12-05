<template>
  <div>
    <el-container>
      <el-aside width="auto" ref="aside">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          router
        >
          <!-- <el-submenu index="1">
          <template slot="title">-->
          <el-menu-item index="/home/user"  >
            <i class="el-icon-location"></i>
            <span slot="title">用户信息</span>
          </el-menu-item>
          <!-- </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>-->
          <!-- <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>-->
          <!-- <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>-->
          <!-- </el-submenu> -->
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header ref="header">
          <div class="el-icon-menu" @click="Collapse"></div>
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
.el-header {
  text-align: initial !important;
  top: 0;
  div {
    height: 20px;
    width: 20px;
    font-size: 30px;
    margin-top: 20px;
    margin-left: -20px;
    display: block;
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
