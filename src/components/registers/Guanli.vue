<template>
  <div class="registerManage">
    <!-- 搜索条件 -->
    <div class="filter-container">
     
      <el-input placeholder="患者姓名" v-model="searchName"></el-input>
      <el-button type="warning" icon="search" @click="search">搜索</el-button>
      <el-button type="warning" icon="view" @click="showAll">显示全部</el-button>

      <el-button type="warning" icon="document" @click="handleDownload">导出</el-button>
    </div>
    <!-- 患者挂号信息列表 -->
    <el-table :data="patients" border style="width: 100%; text-align:left">
      <el-table-column prop="id" label="挂号编号"></el-table-column>
      <el-table-column prop="patientInfo.name" label="患者姓名"></el-table-column>
      <el-table-column prop="" label="挂号凭证">身份证</el-table-column>
      <el-table-column prop="p_id" label="身份证号"></el-table-column>
      <el-table-column prop="department" label="科室"></el-table-column>
      <el-table-column prop="d_name" label="就诊医生"></el-table-column>
      <el-table-column prop="time" label="就诊时间"></el-table-column>
      <el-table-column prop="expenses" label="挂号费"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="warning" class="btn" @click="checkDetail(scope.$index)">查看</el-button>
          <el-button type="danger" class="btn" @click="deleteDetail(scope.$index,patients)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击查看患者挂号详细信息 -->
    <el-dialog title="患者挂号信息" :visible.sync="dialogVisible" :before-close="handleClose" v-if="patientsdetails.patientInfo">
    
      <ul class="patientsdetail">
        <li style="text-align:left"><h4 style="display: inline-block">挂号编号: </h4><span style="display: inline-block">{{patientsdetails.id}}</span></li>
        <li style="text-align:left"><h4 style="display: inline-block">患者姓名: </h4><span style="display: inline-block">{{patientsdetails.patientInfo.name}}</span></li>
        <li style="text-align:left"><h4 style="display: inline-block">挂号凭证: </h4><span style="display: inline-block"> 身份证</span></li>
        <li style="text-align:left"><h4 style="display: inline-block">身份证号：</h4><span style="display: inline-block">{{patientsdetails.p_id}}</span></li>
        <li style="text-align:left"><h4 style="display: inline-block">性别: </h4><span style="display: inline-block">{{patientsdetails.patientInfo.sex}}</span></li>
        <li style="text-align:left"><h4 style="display: inline-block">年龄: </h4><span style="display: inline-block">{{patientsdetails.patientInfo.age}}</span></li>
        <li style="text-align:left"><h4 style="display: inline-block">家庭地址: </h4><span style="display: inline-block">{{patientsdetails.patientInfo.address}}</span></li>
        <li style="text-align:left"><h4 style="display: inline-block">科室: </h4><span style="display: inline-block">{{patientsdetails.department}}</span></li>
        <li style="text-align:left"><h4 style="display: inline-block">就诊医生: </h4><span style="display: inline-block">{{patientsdetails.d_name}}</span></li>
        <li style="text-align:left"><h4 style="display: inline-block">就诊时间: </h4><span style="display: inline-block">{{patientsdetails.date}}</span></li>
        <li style="text-align:left"><h4 style="display: inline-block">挂号费: </h4><span style="display: inline-block">{{patientsdetails.expenses}}</span></li>
      </ul>
      <h5 slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="dialogVisible = false">确 定</el-button>
      </h5>
    </el-dialog>

  </div>
</template>
<script type="text/ecmascript-6">
  //import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        patients:[],
        intendedpatients: [],
        dialogVisible: false,
        patientsdetails: '',
        searchNumber: '',
        searchName: ''
      };
    },
    mounted () {
      let registerThis = this;
      registerThis.$http.get('/api/reg/list').then(function(res) {
        registerThis.patients= res.body.regs;
        registerThis.intendedpatients = res.body.regs;
   
      }, res => {
        // error callback
        this.$message({
          message: '数据请求失败',
          type: 'error'
        });
      });
    },
    methods: {
   
    
      // 搜索
      search () {
        let search = this;
        search.patients = [];
        search.$http.get('api/reg/query', {params: { patientName: search.searchName}}).then(function(res) {
          // 把数组置空，以便存放搜索到的符合条件的数据
        {

          // 遍历后台数据是否有和传入的参数相同的，有的话就找出来push进prescriptionC[]
          search.patients = res.body.reg;
          }(res) => {
          // error callback
          search.$notify.error({
            message: '数据请求失败'
          });
        };
      })},
      // 显示全部数据
      showAll () {
        this.patients = this.intendedpatients;
        this.searchNumber = '';
        this.searchNamer = '';
      },
      // 确认是否要关闭dialog
      handleClose (done) {
        this.$confirm('确认关闭？').then(_ => {
          done();
        }).catch(_ => {});
      },
      // 查看患者信息详情
      checkDetail (index) {
        this.dialogVisible = true;
        this.patientsdetails = this.patients[index];
      },
      deleteDetail (index, rows) {
        this.$http.post('/api/reg/del', {
          id:this.patients[index].id
        }).then(function(res){
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
              })
            }
        console.log('该行对象内容', rows[index]);   
        rows.splice(index, 1);
        })
      },
      // 把数据表格导出到excel表
      /*handleDownload () {
        var vm = this;
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = ['挂号序号', '患者姓名', '挂号凭证', '凭证号', '科室', '就诊医生', '就诊时间', '候诊号', '挂号费'];
          const filterVal = ['number', 'name', '', '', 'disease', 'doctor', 'date', '', ''];
          const patients = vm.patients;
          const data = vm.formatJson(filterVal, patients);
          export_json_to_excel(tHeader, data, '患者挂号信息列表excel');
        });
      },*/
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      }
    }
};
</script>
<style>
  .registerManage .filter-container
     {padding-bottom:30px;}
    .el-input
      {width: 200px;}
  .registerManage .el-table-column
    {font-weight: bold;}
  .registerManage .patientsdetail
    .h4{ 
    
      width: 400px;
      line-height: 30px;
      font-weight: bold;
    }
    
  
  .registerManage .btn
      {display: inline-block;}

  ul li{

      list-style: none;

}
</style>