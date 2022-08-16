<template>
  <div class="app-container">
    <el-form
      :inline="true"
      v-model="query"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="分类名称">
        <el-input v-model="query.name" placeholder="分类"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="query.status"
          clearable
          filterable
          style="wdith: 85px"
        >
          <!--clearable 清空按钮 filterable 是否可搜索 -->
          <el-option
            v-for="item in statusOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          @click="queryData"
          size="mini"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="reload"
          >重置</el-button
        >
        <el-button icon="el-icon-circle-plus-outline" type="primary" size="mini"
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
        label="分类名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
      ></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <!--传入status的状态 执行filters -->
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status ? "正常" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handleEdit(scope.row.id)"
            >添加</el-button
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
      :page-size="50"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import api from "@/api/category";
const statusOptions = [
  { code: 0, name: "禁止" },
  { code: 1, name: "正常" },
];
export default {
  name: "Article",
  data() {
    return {
      list: [],
      page: {
        //! 分页相关的
        total: 0, //! 总记录数
        current: 1, //! 当前页码
        size: 20, //! 总条数
      },
      //! 查询条件
      query: {},
      statusOptions,
    };
  },
  created() {
    this.tolist();
  },

  //* 过滤添加按钮的状态 info默认状态 danger禁止状态
  filters: {
    statusFilter(status) {
      const show = { 0: "info", 1: "danger" };
      return show[status];
    },
  },

  methods: {
    tolist() {
      api.goList(this.query, this.page.current, this.page.size).then((res) => {
        //! 获取当前页码20条数据
        this.list = res.data.records;
        //! 获取总记录
        this.page.total = res.data.total;
      });
    },

    handleEdit(id) {},

    handleDelete(id) {},

    //*每页显示条数改变后被触发(比如20---->50) ---> 页面改变后触发的方法 ---> val是最新的每页显示条数
    handleSizeChange(val) {
      this.page.list = val;
      this.tolist();
    },
    //* 当页码改变后 触发此方法 val 是当前点击(或输入)的那个页码 最新的页面
    handleCurrentChange(val) {
      this.current = val;
      this.tolist();
    },
    queryData() {},
    reload() {},
  },
};
</script>

<style lang="scss" scoped></style>
