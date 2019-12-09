<template>
  <div class="box">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
      ref="ruleForm"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from "qs"
import { async } from 'q';
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        username: "GJH",
        password: "123123123"
      },
      rules: {
        username: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 2, message: "输入有效姓名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输密码", trigger: "blur" },
          { message: "请输入有效的年龄", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.$axios({
              method: "post",
              url:"/api/admin/login",
              data:qs.stringify(this.formLabelAlign),
            }).then(res=>{
              if(!res.data.ok){
                this.$message.error(res.data.msg);
              }else{
                this.$message(res.data.msg);
                sessionStorage.setItem("token",res.data.token)
                this.$router.push({
                  path:"/home/user",
                  })
                sessionStorage.setItem("name",this.formLabelAlign.username)
              }
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  height: 180px;
  width: 300px;
  border-radius: 10px;
  padding: 30px 20px;
  border: 1px solid #dddddd;
  box-shadow: 0px 0px 2px #dddddd;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top:-90px;
  margin-left: -150px;
}
</style>
