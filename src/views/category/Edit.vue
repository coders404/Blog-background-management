<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="500px"
      :before-close="handleClose"
    >
      <!--*formData是父组件传递过来的一个对象 -->
      <el-form
        ref="formData"
        :model="formData"
        label-width="100px"
        label-position="right"
        status-icon
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="分类名称:" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>

        <el-form-item label="状态:" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁止</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序:" prop="sort">
          <el-input-number
            style="width: 300px"
            v-model="formData.sort"
            :min="1"
            :max="10000"
          />
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input type="textarea" v-model="formData.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formData')"
            >确定</el-button
          >
          <el-button size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/category";
export default {
  name: "Edit",
  props: {
    title: {
      //* 窗口标题
      type: String,
      default: "",
    },
    visible: {
      //* 显示窗口
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    remoteClose: Function, //* 关闭窗口 父组件传递
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        sort: [{ required: true, message: "请选择排序", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClose() {
      //* 点击关闭窗口 父组件传递过来的函数
      this.$refs["formData"].resetFields();
      this.remoteClose();
    },
    submitForm(formName) {
      //* 提交表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //* 异步方法提交数据
    async submitData() {
      let response = null;
      if (this.formData.id) {
        response = await api.update(this.formData);
      } else {
        response = await api.add(this.formData);
      }

      //* 暂停async内部执行 等待后面的api.add()处理完返回结果 继续执行async函数 自定义的变量response用于获取Promise对象返回的resolve状态值
      if (response.code === 20000) {
        this.$message({
          message: "保存成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "保存失败",
          type: "error",
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
