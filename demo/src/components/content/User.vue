<template>
  <div>
    <!-- //添加的表单 -->
    <el-dialog
      title="添加数据"
      :visible.sync="centerDialogVisible"
      width="50%"
      center
      v-loading="loading"
      element-loading-text="上传数据中"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名字" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age" placeholder="请输入年龄" type="number" class="deal"></el-input>
        </el-form-item>
        <el-form-item label="生日" required>
          <el-col>
            <el-form-item prop="birthday">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.birthday"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- //地址 -->
        <el-form-item label="地址" prop="city">
          <el-cascader v-model="ruleForm.city" :options="options" style="width: 100%;"></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm',switchGJH)">提 交</el-button>
      </span>
    </el-dialog>
    <el-button type="text" @click="add('ruleForm')">添加</el-button>
    <!-- 显示的用户信息 -->
    <el-table :data="tableData" style="width: 100%" ref="multipleTable" stripe @select="select">
      <!-- 全选和单选 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <!--序号-->
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column label="名字" width="100" sortable align="center">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="100" sortable align="center">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.sex | sex}}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="100" sortable align="center">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生日" width="180" sortable align="center">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.birthday | date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="300" sortable align="left">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.value }}{{ scope.row.label}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fun">
      <div>
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="selectionAll()">全选</el-button>
        <el-button @click="delSelection(tableData)" disabled>批量删除</el-button>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :page-count=" datas | setLength"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
import siteJson from "../../assets/areaData.json";
import qs from "qs";
export default {
  data() {
    return {
      //临时存要编辑的内容
      row: {},
      startIndex: 0,
      switchGJH: true,
      options: siteJson,
      loading: false,
      centerDialogVisible: false,
      //操作的ID
      operatedID: [],
      multipleSelection: [],
      tableData: [],
      ruleForm: {
        username: "",
        age: "",
        birthday: "",
        sex: "",
        city: []
        // site: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 2, message: "输入有效姓名", trigger: "blur" }
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          {
            type: "number",
            min: 1,
            max: 130,
            message: "请输入有效的年龄",
            trigger: "blur"
          }
        ],
        birthday: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        city: [{ required: true, message: "请填写地址", trigger: "blur" }]
      },

      datas: []
    };
  },
  filters: {
    sex(v) {
      return v == 0 ? "女" : "男";
    },
    setLength(v) {
      return Math.ceil(v.length / 10);
    },
    date(v) {
      return new Date(v).toLocaleDateString();
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.startIndex = (val - 1) * 10;
    },
    //添加按钮
    add(formName) {
      this.centerDialogVisible = true;
      this.switchGJH = true;
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    //上传的数据做格式处理
    setUpData(data) {
      data.value = data.city[0];
      data.label = data.city[1];
      data.birthday = data.birthday.valueOf();
      data.city = null;
      // return data;
    },
    //添加提交数据
    submitForm(formName, bool) {
      if (bool) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading = true;
            this.setUpData(this.ruleForm);
            this.$axios({
              method: "post",
              url: "/api/user/add",
              data: qs.stringify(this.ruleForm)
            }).then(res => {
              if (res.data.ok) {
                this.upData();
                this.$message("上传成功");
                this.loading = false;
                this.centerDialogVisible = false;
              } else {
                this.$message("上传失败");
                this.loading = false;
                this.centerDialogVisible = true;
              }
            });
          } else {
            return false;
          }
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading = true;
            this.setUpData(this.ruleForm);
            this.ruleForm._id = this.row._id;
            console.log(this.ruleForm);
            this.$axios({
              method: "post",
              url: "/api/user/set",
              data: qs.stringify(this.ruleForm)
            }).then(res => {
              if (res.data.ok) {
                this.upData();
                this.$message("修改成功");
                this.loading = false;
                this.centerDialogVisible = false;
              } else {
                this.$message("修改失败");
                this.loading = false;
                this.centerDialogVisible = true;
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    //更新全部数据
    upData() {
      this.$axios({
        url: "/api/user/getall"
      }).then(res => {
        this.datas = res.data.result;
        this.cutArray();
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs.ruleForm.resetFields();
    },

    // indexMethod(index) {
    //   return index * 2;
    // },
    //全选删除 没写
    select(selection, row) {
      let arr = [];
      selection.map(val => {
        if (val.id) {
          arr.push(val.id);
        }
      });
      this.operatedID = arr;
      console.log(this.operatedID);
    },
    //取消选择
    toggleSelection(rows) {
      this.$refs.multipleTable.clearSelection();
    },
    //全选
    selectionAll() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    //批量删除  没写
    delSelection(rows) {
      console.log(rows);
    },
    //编辑
    handleEdit(index, row) {
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields();
        this.row = row;
        row.sex = String(row.sex);
        let arr = {};
        arr.sex = String(row.sex);
        arr.city = [row.value, row.label];
        arr.birthday = new Date(row.birthday);
        arr.username = row.username;
        arr.age = row.age;
        this.ruleForm = arr;
        this.switchGJH = false;
      });
    },
    //删除
    handleDelete(index, row) {
      let { _id } = row;
      this.$axios({
        url: "/api/user/del",
        params: { _id }
      }).then(res => {
        if (res.data.ok) {
          this.upData();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    //切割数组
    cutArray() {
      if (this.datas.length < this.startIndex + 10) {
        this.tableData = this.datas.slice(this.startIndex);
      } else {
        this.tableData = this.datas.slice(
          this.startIndex,
          10 + this.startIndex
        );
      }
    }
  },
  mounted() {
    this.$axios({
      url: "/api/user/getall"
    }).then(res => {
      this.datas = res.data.result;
      this.cutArray();
    });
  },
  watch: {
    datas() {
      this.cutArray();
    },
    startIndex() {
      this.cutArray();
    }
  }
};
</script>

<style lang="less" >
.fun {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.deal input::-webkit-textfield-decoration-container {
  background-color: #fff;
} //添加背景色
// 下边两行是去掉input 输入框右边的上下箭头按钮
.deal input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.deal input::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>
