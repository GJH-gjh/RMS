<template>
  <div>
    <el-table :data="tableData" style="width: 100%" ref="multipleTable">
      <!-- 全选和单选 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <!--序号-->
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column label="名字" width="100" sortable align="center">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.name }}</span>
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
          <span style="margin-left: -10px">{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="300" sortable align="left">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="姓名" width="180" sortable>
      <template slot-scope="scope">
      <span style="margin-left: 10px">{{ scope.row.name }}</span>-->
      <!-- <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
      </el-popover>-->
      <!-- </template>
      </el-table-column>-->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      multipleSelection: [],
      tableData: [
        {
          birthday: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          sex: 0,
          age: 12
        },
        {
          birthday: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
          sex: 0,
          age: 12
        },
        {
          birthday: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
          sex: 0,
          age: 12
        },
        {
          birthday: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
          sex: 0,
          age: 12
        }
      ]
    };
  },
  filters: {
    sex(v) {
      return v == 0 ? "女" : "男";
    }
  },
  methods: {
    // indexMethod(index) {
    //   return index * 2;
    // },
    //取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  mounted() {}
};
</script>

<style lang="less" >
</style>
