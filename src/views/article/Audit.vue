<template>
  <div>
    <!--?  文章审核模块 点击出来弹窗页面-->
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :before-close="handleClose"
      width="70%"
    >
      <!--* status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
      <el-form ref="formData" :model="formData" label-width="100px">
        <el-form-item label="标题:">
          <el-input v-model="formData.title" readonly />
        </el-form-item>
        <el-form-item label="标签:">
          <el-cascader
            :options="labelOptions"
            :show-all-levels="false"
            clearable
            :props="{
              multiple: true,
              emitPath: false,
              children: 'labelList',
              value: 'id',
              label: 'name',
            }"
          />
        </el-form-item>
        <el-form-item label="主图:">
          <img
            :src="formData.imageUrl"
            class="avatar"
            style="width: 178px; heigth: 178px; display: block"
          />
        </el-form-item>
        <el-form-item label="是否公开:">
          <el-radio-group v-model="formData.ispublic" disabled>
            <el-radio :label="0">不公开 </el-radio>
            <el-radio :label="1">公开 </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="简介:">
          <el-input
            v-model="formData.summary"
            type="textarea"
            :autosize="{ minRows: 2 }"
            readonly
          />
        </el-form-item>
        <el-form-item label="内容:">
          <mavon-editor
            ref="md"
            v-model="formData.mdContent"
            :editable="false"
          ></mavon-editor>
        </el-form-item>
        <el-form-item v-if="isAudit">
          <el-button @click="auditSuccess()" type="primary">审核通过</el-button>
          <el-button @click="auditFail()" type="danger">审核不通过</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/article";
import category from "@/api/category";
//! 富文本编辑器
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "Audit",
  components: {
    mavonEditor,
  },
  props: {
    id: null,
    isAudit: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    remoteClose: Function,
  },
  data() {
    return {
      //! 标签列表
      labelOptions: [],
      //! 表单数据
      formData: {},
    };
  },
  watch: {
    //* 为true时显示弹窗
    visible(val) {
      if (val) {
        this.getArticleById();
        this.getlabelOptions();
      }
    },
  },
  created() {},
  methods: {
    //* 点击出来弹窗页面
    handleClose() {
      this.remoteClose()
    },
    //* 审核通过
    auditSuccess() {
      this.$confirm("确认审核通过吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          api.auditSuccess(this.id).then((res) => {
            this.$message({
              type: "success",
              message: "审核通过提交成功",
            });
            this.remoteClose()
          })
        })
        .catch(() => {})
    },
    //* 审核不通过
    auditFail() {
      this.$confirm("确认审核不通过吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          api.auditFail(this.id).then((res) => {
            this.$message({
              type: "success",
              message: "审核不通过提交成功",
            })
            this.remoteClose()
          })
        }).catch(() => {
        })
    },
    async getArticleById() {
      const data = await api.goById(this.id);
      this.formData = data.data;
    },
    async getlabelOptions() {
      const data = await category.getCategoryAndLabel();
      this.labelOptions = data.data;
    },
  }, 
};
</script>
<style lang="scss" scoped></style>
