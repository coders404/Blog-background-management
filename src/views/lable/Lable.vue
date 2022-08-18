<template>
  <div class="app-container">
    <el-form
      :inline="true"
      v-model="query"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="分类名称">
        <el-input v-model="query.name"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="query.status"
          clearable
          filterable
          style="wdith: 85px"
        >
          <!--! clearable 清空按钮 filterable 是否可搜索 -->
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          size="mini"
          @click="queryData"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="reload"
          >重置</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          type="primary"
          size="mini"
          @click="openAdd"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="list" border style="width: 100%">
      <el-table-column
        type="index"
        prop="date"
        label="序号"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="标签名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="categoryName"
        label="分类名称"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 20, 50]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
    <edit
      :categoryList="categoryList"
      :title="edit.title"
      :visible="edit.visible"
      :fromData="edit.fromData"
      :remoteClose="remoteClose"
    />
  </div>
</template>

<script>
import api from "@/api/label";
import categoryApi from "@/api/category";
import Edit from "./Edit";
export default {
  name: "Lable",
  components: {
    Edit,
  },
  data() {
    return {
      list: [],
      page: {
        size: 20,
        current: 1,
        total: 0,
      },
      query: {},
      categoryList: [],
      edit: {
        visible: false,
        title: "",
        formData: {},
      },
    };
  },
  created() {
    this.fetchData();
    this.getCategoryList();
  },
  methods: {
    fetchData() {
      //! 抓取数据
      api.goList(this.query,this.page.current = 1, this.page.size = 20)
        .then(res => {
          console.log(res);
          this.list = res.data.records;
          this.page.total = res.data.total;
        });
    },
    getCategoryList() {
      categoryApi.categoryList().then(res => {
        //! 赋值给data中categoryList
        this.categoryList = res.data;
      });
    },
    async handleEdit(id) {
      //! 编辑 根据当前传入的id操作
      let res = await api.goEdit(id);
      this.edit.formData = res.data;
      this.edit.title = "编辑", this.edit.visible = true;
    },
    handleDelete(id) {  //! 删除
      this.$confirm("确认删除这个标签吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          api.goDelete(id).then( res => {
            this.$message({
              type: res.code === 20000 ? "success" : "error",
              message: res.message
            })
          })
            this.fetchData()
        })
        .catch(() => {
        })
    },
    handleSizeChange(val) {
      //* 每页显示条数改变后被触发(比如20---->50) ---> 页面改变后触发的方法 ---> val是最新的每页显示条数
      this.page.size = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      //* 当页码改变后 触发此方法 val 是当前点击(或输入)的那个页码 最新的页面
      this.page.current = val;
      this.fetchData();
    },
    queryData() {
      this.current = 1;
      this.fetchData();
    },
    reload() {
      this.query = {};
      this.fetchData();
    },
    openAdd() {
      this.edit.visible = true;
      this.edit.title = "新增";
    },
    remoteClose() {
      this.edit.visible = false;
      this.edit.formData = {};
      this.fetchData();
    },
  },
};
</script>
<style lang="scss" scoped></style>
