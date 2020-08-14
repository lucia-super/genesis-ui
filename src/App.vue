<template>
  <el-container>
    <el-header>
      <p>Genesis 配置</p>
    </el-header>
    <el-main>
      <el-row>
        <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>当前</el-breadcrumb-item>
      </el-row>
      <router-view />
    </el-main>
    <!-- <el-footer>
      <p>genesis tools support.</p>
    </el-footer>-->
  </el-container>
</template>
<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
header {
  font-size: 20px;
  color: white;
  background: #409eff;
}
footer {
  background: #ebeef5;
}
.el-row {
  margin-bottom: 20px;
}
</style>
