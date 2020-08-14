<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" :model="form" :rules="formRules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="模块ID" prop="name">
          <el-input v-model="form.name" :disabled="isEditMode" @change="setCommondValue"></el-input>
        </el-form-item>
        <el-form-item label="模块名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-card class="box-card" v-if="form.name">
          <div slot="header" class="clearfix">
            <span>APIs</span>
          </div>
          <el-form-item label="列表" prop="apis.list">
            <el-input v-model="form.apis.list"></el-input>
          </el-form-item>
          <el-form-item label="详情" prop="apis.detail">
            <el-input v-model="form.apis.detail"></el-input>
          </el-form-item>
          <el-form-item label="编辑" prop="apis.edit">
            <el-input v-model="form.apis.edit"></el-input>
          </el-form-item>
          <el-form-item label="删除" prop="apis.delete">
            <el-input v-model="form.apis.delete"></el-input>
          </el-form-item>
        </el-card>
        <el-card class="box-card" v-if="form.name">
          <div slot="header" class="clearfix">
            <span>字段</span>
          </div>
          <el-row type="flex" class="row-bg" justify="end">
            <el-button @click="dialogFormVisible=true" type="success">添加</el-button>
          </el-row>
          <el-table :data="form.fields" style="width: 100%">
            <el-table-column prop="key" label="名字"></el-table-column>
            <el-table-column prop="name" label="描述"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-popconfirm
                  confirmButtonText="确定"
                  cancelButtonText="取消"
                  icon="el-icon-info"
                  @onConfirm="handleClickDeleteField(scope.row)"
                  iconColor="red"
                  title="确定删除该字段吗？"
                >
                  <el-button slot="reference" type="text" size="small">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-form>
    </el-card>
    <el-row type="flex" class="row-bg" justify="end">
      <el-button @click="onBack">取消</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </el-row>
    <!-- dialog -->
    <el-dialog title="添加字段" :visible.sync="dialogFormVisible" @close="resetForm('addForm')">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" class="demo-ruleForm">
        <el-form-item label="名字" :label-width="formLabelWidth" prop="key">
          <el-input v-model="addForm.key" placeholder="key" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" placeholder="name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择字段类型type">
            <el-option label="String" value="string"></el-option>
            <el-option label="Number" value="number"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClickAddField">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { cloneDeep, forEach, find } from "lodash";
export default {
  data() {
    return {
      isEditMode: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        name: "",
        title: "",
        apis: {},
        fields: []
      },
      formRules: {
        name: [
          { required: true, message: "请输入模块ID值", trigger: "change" },
          { min: 3, message: "长度至少为 3个字符", trigger: "blur" }
        ],
        title: [
          { required: true, message: "请输入模块名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        "apis.list": [
          { required: true, message: "请输入列表模块的API", trigger: "blur" }
        ],
        "apis.detail": [
          { required: true, message: "请输入详情模块的API", trigger: "blur" }
        ],
        "apis.edit": [
          { required: true, message: "请输入编辑模块的API", trigger: "blur" }
        ],
        "apis.delete": [
          { required: true, message: "请输入删除模块的API", trigger: "blur" }
        ]
      },
      addForm: {
        key: null,
        name: null,
        type: null
      },
      addFormRules: {
        key: [
          { required: true, message: "请输入字段KEY值", trigger: "change" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入字段名称描述", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        type: [
          {
            type: "string",
            required: true,
            message: "请选择一个类型",
            trigger: "change"
          }
        ]
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
    handleClickAddField(oEvent) {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          const isExist = find(this.form.fields, { key: this.addForm.key });
          if (!isExist) {
            this.form.fields.push(cloneDeep(this.addForm));
            this.addForm = { key: null, name: null, type: null };
            this.dialogFormVisible = false;
          } else {
            this.$alert("字段名称已经存在，请保证字段唯一", "提示", {
              confirmButtonText: "确定"
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClickDeleteField(data) {
      const updateData = [];
      forEach(this.form.fields, item => {
        if (item.name != data.name) updateData.push(item);
      });
      this.form.fields = updateData;
    },
    onSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
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
        } else {
          return false;
        }
      });
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
