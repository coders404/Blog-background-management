<template>
  <div class="app-container">

    <!--? 条件查询模块 -->
     <el-form
      :inline="true"
      v-model="query"
      class="demo-form-inline"
      size="mini">
      <el-form-item label="分类名称">
        <el-input v-model="query.name"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <!--* clearable 清空 filterable 是否可搜索 -->
        <el-select v-model="query.status" filterable clearable style="width:100px">
          <el-option :value="1" label="未审核"></el-option>
          <el-option :value="2" label="审核通过"></el-option>
          <el-option :value="3" label="未通过审核"></el-option>
          <el-option :value="0" label="已删除"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" size="mini" @click="queryData">查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="reload">重置</el-button>
      </el-form-item>
    </el-form>

    <!--? 渲染表格 -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
      <el-table-column align="center"  prop="title" label="文章标题" ></el-table-column>
      <el-table-column align="center"  prop="viewCount" label="浏览量" ></el-table-column>
      <el-table-column align="center"  prop="thumhup" label="点赞数" ></el-table-column>
      <!--* ispublic   显示的是编码号 我们需要显示对应的名称 -->
      <el-table-column align="center"  prop="ispublic" label="是否公开" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.ispublic === 0" type="danger">不公开</el-tag>
          <el-tag v-if="scope.row.ispublic === 1" type="warning">公开</el-tag>
        </template>1
      </el-table-column>
      <!--* status 显示的是编码号 status 0 已经删除 1 未审核 2 审核通过 3 审核未通过-->
      <el-table-column align="center"  prop="status" label="状态" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1">未审核</el-tag>
          <el-tag v-if="scope.row.status === 2">审核通过</el-tag>
          <el-tag v-if="scope.row.status === 3">审核未通过</el-tag>
          <el-tag v-if="scope.row.status === 0">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center"  prop="updateDate" label="最后更新时间" >
        <template slot-scope="scope">
        {{ getFormat(scope.row.updateDate) }}
        </template>
      </el-table-column>
      <el-table-column align="left"  label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" @click="openView(scope.row.id)" type="primary">查看</el-button>
          <el-button size="mini" v-if="scope.row.status === 1" @click="openAudit(scope.row.id)" type="success">审核</el-button>
          <el-button size="mini" v-if="scope.row.status !== 0" @click="handleDelete(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--? 分页功能 -->
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

    <!--? 文章查询模块 -->
    <audit :title="audit.title" :id="audit.id"  :visible="audit.visible" :isAudit="audit.isAudit"                  :remoteClose="remoteClose"></audit>
  </div>
</template>

<script>
import api from "@/api/article"
import { format } from "@/utils/date"
import  Audit from './Audit'
export default {
  name: "fetchData",
  components: {
    Audit
  },
  data() {
    return {
      list: [],
      page: {
        total: 0,
        current: 1,
        size: 20,
      },
      query: {},
      audit: {
        id: null,
        isAudit: false,
        title: '',
        visible: false
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    getFormat(date) {  //* 格式化日期 格式:8:00:00
      return format(date)
    },
    openView(id) {
      this.audit.id = id
      this.audit.isAudit = false
      this.audit.title = '查看',
      this.audit.visible = true
    },
    openAudit(id) {
      this.audit.id = id
      this.audit.isAudit = true
      this.audit.visible = true
      this.audit.title = '审核文章'
    },
    handleDelete(id) {
       this.$confirm("确认删除文章吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          api.auditDelete(this.id).then((res) => {
            this.$message({
              type: "success",
              message: "删除文章成功",
            })
            //! 重新刷新文章列表
            this.fetchData()
          })
        }).catch(() => {
        })
    },
    //* 分页方法  切换每页多少条触发 20-50
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },  
    //* 更换页码触发 1-2-3
    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    },
    //* 查询模块
    queryData() {
      this.page.current = 1
      this.fetchData()
    },
    reload() {
      this.query = {}
      this.fetchData()
    },
    //* 关闭弹窗 父传子
    remoteClose() {
      this.audit.visible = false
      this.fetchData()
    },
    async fetchData() {
      const { data } = await api.goSearch(this.query, this.current, this.size);
      this.list = data.records;
      this.page.total = data.total;
    }
  }
};
</script>

<style lang="scss" scoped></style>