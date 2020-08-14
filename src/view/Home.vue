<template>
  <div>
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="search.key"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row type="flex" class="row-bg" justify="end">
      <el-button @click="handleClickAdd" type="success">添加</el-button>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="模块ID" sortable></el-table-column>
      <el-table-column prop="title" label="模块名字"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClickView(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleClickEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-popconfirm
            confirmButtonText="确定"
            cancelButtonText="取消"
            icon="el-icon-info"
            @onConfirm="handleClickDelete(scope.row)"
            iconColor="red"
            title="确定删除该模块吗？"
          >
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { cloneDeep, forEach } from "lodash";
export default {
  data() {
    return {
      search: {
        key: ""
      },
      dialogVisible: false
    };
  },
  computed: mapState({
    tableData: state => state.store.data
  }),
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["listAll", "updateAll"]),
    init() {
      this.listAll();
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClickAdd() {
      this.$router.push({ name: "Add" });
    },
    handleClickView(data) {
      this.$router.push({ name: "Detail", params: { data } });
    },
    handleClickEdit(data) {
      this.$router.push({ name: "Edit", params: { data } });
    },
    handleClickDelete(data) {
      const updateData = [];
      forEach(this.tableData, item => {
        if (item.name != data.name) updateData.push(item);
      });
      this.updateAll(updateData);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
