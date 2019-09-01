<template>
  <div class="patientInfo">
      <h1 align='center'>查看患者信息</h1>
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="搜索关键字" style="width:195px;"></el-input>
      <el-select v-model="listQuery.select" placeholder="搜索类型" style="width:150px;">
        <el-option label="名字" value="1"></el-option>
        <el-option label="主治医生" value="2"></el-option>
        <el-option label="日期" value="3"></el-option>
      </el-select>
      <el-button type="warning" icon="search" @click="handleSearch">搜索</el-button>
       <el-button  type="warning" icon="" @click="getAll">显示全部</el-button>
    </div><br><br>
    <el-table :data="tableData" border style="width:100%;" :header-cell-style="getRowClass" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
      <el-table-column label="名字" prop="name"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="主治医生" prop="doctor"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="建档日期">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="患者姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="患者年龄">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="联系方式">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="患者性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="家庭地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="联系人姓名">
              <span>{{ props.row.l_name }}</span>
            </el-form-item>
            <el-form-item label="联系人号码">
              <span>{{ props.row.l_phone }}</span>
            </el-form-item>
            <el-form-item label="病症">
              <span>{{ props.row.disease }}</span>
            </el-form-item>
            <el-form-item label="病史">
              <span>{{ props.row.history }}</span>
            </el-form-item>
            <el-form-item label="科室">
              <span>{{ props.row.department }}</span>
            </el-form-item>
            <el-form-item label="主治医生">
              <span>{{ props.row.doctor }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="warning" size="small"  @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
     </el-table-column>
    </el-table>
    
    <!-- 编辑表单 -->
    <el-dialog title="编辑表单" :visible.sync="dialogFormEditVisible">
      <el-form class="small-space" :model="Edit" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="建档日期">
          <el-input v-model="Edit.date"></el-input>
        </el-form-item>
        <el-form-item label="患者姓名">
          <el-input v-model="Edit.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="Edit.id"></el-input>
        </el-form-item>
        <el-form-item label="患者年龄">
          <el-input v-model="Edit.age"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="Edit.phone"></el-input>
        </el-form-item>
        <el-form-item label="患者性别">
          <el-input v-model="Edit.sex"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址">
          <el-input v-model="Edit.address"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model="Edit.l_name"></el-input>
        </el-form-item>
        <el-form-item label="联系人号码">
          <el-input v-model="Edit.l_phone"></el-input>
        </el-form-item>
        <el-form-item label="病症">
          <el-input v-model="Edit.disease"></el-input>
        </el-form-item>
        <el-form-item label="病史">
          <el-input v-model="Edit.history"></el-input>
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="Edit.department"></el-input>
        </el-form-item>
        <el-form-item label="主治医生">
         <el-input v-model="Edit.doctor"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">取 消</el-button>
        <el-button type="warning" @click="handleEditSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';
export default {
  data () {
    return {
      tableData: [],
      listData:[],
      tableData1:[],
      listQuery: {
        select: '',
        title: ''
      },
      Edit: [],
      dialogFormEditVisible: false,
      dialogFormVisible: false,
      multipleSelection: []
    };
  },
  created () {
    let vm = this;
    Vue.http.get('/api/patient/list').then(function (response) {
      console.log(response);
      console.log('这是我们需要的json数据', response.patients);
      vm.tableData = response.body.patients;
      vm.listData = response.body.patients;
    }, function (response) {
      alert('请求失败了');
    });
  },
  methods: {
    getAll () { 
 this.tableData = this.listData; 
 } ,
    
    getRowClass({ row, column, rowIndex, columnIndex }) {
	if (rowIndex == 0) {
			return 'background:#D2E9FF'
	} else {
			return ''
	}
 },
      //搜索功能
     handleSearch () {
      let me = this;
      me.$http.get('/api/patient/query', {params: {keyword: me.listQuery.title}}).then(function (response) {
        console.log(response);
        console.log('这是我们需要的json数据', response.body.patients);
        
        // me.tableData = response.data.tableData;
        me.tableData = response.body.patients
        console.log(response.body.patients);
      }, function (response) {
        alert('请求失败了');
      });
    },
    handleEdit (index, row) {
    
      this.dialogFormEditVisible = true;
          this.Index = index;             // 存放当前行的序号
          this.Edit = this.tableData[index];  // 获取当前行的数据
    },
    handleEditSubmit () {
      this.dialogFormEditVisible = false;
          this.$http.post('/api/patient/update', {
            id: this.Edit.id,
            name: this.Edit.name,
            sex: this.Edit.sex,
            date: this.Edit.date,
            age: this.Edit.age,
            phone: this.Edit.phone,
            address: this.Edit.address,
            l_name: this.Edit.l_name,
            l_phone: this.Edit.l_phone,
            disease: this.Edit.disease,
            history: this.Edit.history,
            doctor: this.Edit.doctor,
            department: this.Edit.department
          }).then(function (res) {
            if (res.data.success) {
              // 提示信息
              this.$message({
                showClose: true,
                message: '修改成功！',
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: '修改失败！',
                type: 'error'
              });
              return false;
            }
          });
    },
    handleDelete (index, row) {
          this.tableData1 = this.tableData[index];
          this.$http.post('/api/patient/del', {
            id: this.tableData1.id
          }).then(function (res) {
            if (res.body.success) {
              this.$message({
                showClose: true,
                message: '删除成功！',
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: '删除失败！',
                type: 'error'
              }
          );
            };
            var vm = this;
      console.log('单个删除选择的row：', index, '-----', row);
      vm.tableData.splice(index, 1);
          });
        },
      handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    
    
  }
};

</script>
<style type="text/css">
.patientInfo .demo-table-expand {
    font-size: 0;
  }
 .patientInfo .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
 .patientInfo .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
</style>