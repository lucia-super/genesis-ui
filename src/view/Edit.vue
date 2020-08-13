<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="模块ID">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="模块名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-card class="box-card" v-if="form.name">
          <div slot="header" class="clearfix">
            <span>APIs</span>
          </div>
          <el-form-item label="列表">
            <el-input v-model="form.apis.list"></el-input>
          </el-form-item>
          <el-form-item label="详情">
            <el-input v-model="form.apis.detail"></el-input>
          </el-form-item>
          <el-form-item label="编辑">
            <el-input v-model="form.apis.edit"></el-input>
          </el-form-item>
          <el-form-item label="删除">
            <el-input v-model="form.apis.delete"></el-input>
          </el-form-item>
        </el-card>
        <el-card class="box-card" v-if="form.name">
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
    <el-row>
      <el-button @click="onBack()">取消</el-button>
      <el-button type="primary" @click="onBack()">确定</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        title: "",
        apis: {},
        fields: []
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {},
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
