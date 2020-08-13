<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="模块ID">
          <el-input v-model="form.name" :disabled="isEditMode" @change="setCommondValue"></el-input>
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
    <el-row type="flex" class="row-bg" justify="end">
      <el-button @click="onBack">取消</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { cloneDeep, forEach } from "lodash";
export default {
  data() {
    return {
      isEditMode: false,
      form: {
        name: "",
        title: "",
        apis: {},
        fields: []
      }
    };
  },
  computed: mapState({
    tableData: state => state.store.data
  }),
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["updateAll"]),
    init() {
      this.isEditMode = this.$route.name === "Edit";
      if (this.isEditMode) {
        this.form = this.$route.params.data;
      }
    },
    onBack() {
      this.$router.back();
    },
    onHome() {
      this.$router.push("/");
    },
    setCommondValue() {
      this.form.apis = {
        list: this.form.name + "/list",
        detail: this.form.name + "/detail",
        edit: this.form.name + "/detail",
        delete: this.form.name
      };
    },
    onSave() {
      const updateData = cloneDeep(this.tableData);
      if (!this.isEditMode) {
        updateData.push(this.form);
      } else {
        forEach(updateData, (item, index) => {
          if (item.name === this.form.name) {
            updateData[index] = this.form;
          }
        });
      }

      this.updateAll(updateData);
      this.onBack();
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
