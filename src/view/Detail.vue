<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="模块ID">
          <label>{{form.name}}</label>
        </el-form-item>
        <el-form-item label="模块名称">
          <label>{{form.title}}</label>
        </el-form-item>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>APIs</span>
          </div>
          <el-form-item label="列表">
            <label>{{form.apis.list}}</label>
          </el-form-item>
          <el-form-item label="详情">
            <label>{{form.apis.detail}}</label>
          </el-form-item>
          <el-form-item label="编辑">
            <label>{{form.apis.edit}}</label>
          </el-form-item>
          <el-form-item label="删除">
            <label>{{form.apis.delete}}</label>
          </el-form-item>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>字段</span>
          </div>
          <el-table :data="form.fields" style="width: 100%">
            <el-table-column prop="key" label="名字"></el-table-column>
            <el-table-column prop="name" label="描述"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
          </el-table>
        </el-card>
      </el-form>
    </el-card>
    <el-row type="flex" class="row-bg" justify="end">
      <el-button @click="onBack()">返回</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.form = this.$route.params.data;
    },
    onBack() {
      this.$router.back();
    },
    onHome() {
      this.$router.push("/");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
  margin-top: 20px;
}
</style>
