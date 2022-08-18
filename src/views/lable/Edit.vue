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
        style="width: 300px"
        :rules="rules">
        <el-form-item label="标签名称:" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="分类名称" prop="categoryId">
          <el-select v-model="formData.categoryId" clearable filterable>
            <el-option 
              v-for="item in categoryList" 
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formData')">确定</el-button>
          <el-button size="mini" @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/label'
export default {
  name: "Edit",
  props: {
    categoryList: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: true,
    },
    formData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    remoteClose: Function, //! 关闭窗口
  },
  data() {
    return {
       rules: {
        name: [{ required: true, message: "请输入标签名称", trigger: "blur" }],
        categoryId: [{ required: true, message: "请输入分类名称", trigger: "change" }],
      },
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      //! 提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async submitData() {
      let res = null
      if(this.formData.id) {
        res = await api.goUpdate(this.formData)
      }else {
        res = await api.goEdit(this.formData)
      }
      //! 状态判断
      if(res.code === 20000) {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.remoteClose()
      }else {
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      }
    },
    handleClose(done) {
      //! this.visible = false 不能直接修改父组件传递过来的值
      this.$refs['formData'].resetFields()
      //! 关闭窗口
      this.remoteClose()
    }
  }
}
</script>

<style lang="scss" scoped></style>
