<template>
  <div class="prescriptionCManageC">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input placeholder="患者姓名" v-model="searchName"></el-input>
      <el-button type="warning" icon="search" @click="search">搜索</el-button>
      <el-button type="warning" icon="view" @click="showAll">显示全部</el-button>
    </div>    
    <el-table :data="prescription" >
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="form-expand">
            <el-form-item label="科别：">
              <span>{{ props.row.prescription.department }}</span>
            </el-form-item>
            <el-form-item label="医生：">
              <span>{{ props.row.prescription.doctor }}</span>
            </el-form-item>
            <el-form-item label="开具日期：">
              <span>{{ props.row.prescription.date }}</span>
            </el-form-item>
            <hr class="hr">
            <el-form-item label="临床诊断：" class="symptoms">
              <span>{{ props.row.prescription.diease }}</span>
            </el-form-item>
            <hr class="hr">
            <h5 class="prescription-title">R</h5>
            <template>
              <el-table :data="props.row.drugs" style="width: 80%; margin: 0 auto;">
                <el-table-column prop="sort" label="药品分类" width="100">
                </el-table-column>
                <el-table-column prop="drugName" label="药品名称" width="200">
                </el-table-column>
                <el-table-column prop="quantity" label="用量（件/克）" width="180">
                </el-table-column>
                <el-table-column prop="usage" label="用法" width="260">
                </el-table-column>                
              </el-table>
            </template>
            <el-form-item label="备注：" class="Rp">
              <span>{{ props.row.prescription.text }}</span>
            </el-form-item>                         
          </el-form> 
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="prescription.id">
      </el-table-column>
      <el-table-column label="患者姓名" prop="prescription.patientName">
      </el-table-column>
      <el-table-column label="性别" prop="prescription.patientInfo.sex">
      </el-table-column>
      <el-table-column label="年龄" prop="prescription.patientInfo.age">
      </el-table-column>
      <el-table-column label="地址" prop="prescription.patientInfo.address">
      </el-table-column>    
      <el-table-column label="联系方式" prop="prescription.patientInfo.phone">
      </el-table-column>      
      <el-table-column label="审核药师" prop="prescription.auditor">
      </el-table-column>
      <el-table-column label="操作" width="210">
        <template scope="scope">
          <el-button type="warning" @click="refuseprescriptionW(scope.$index)">驳回药方</el-button>
          <el-button type="warning" @click="acceptprescriptionW(scope.$index)">出药</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
 // import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
          prescription: [],
          drugs: [],
          storageDrugs:[],
        intendedprescription: [],
        
        searchNumber: '',
        searchName: ''
      };
    },
    mounted () {
      let prescriptionWThis = this;
      prescriptionWThis.$http.get('/api/pre/list').then(function(res){
        prescriptionWThis.prescription = res.body.res;
        prescriptionWThis.intendedprescription =res.body.res;
         console.log(prescriptionWThis.prescription.drugs)
          
      }, res => {
        // error callback
        prescriptionWThis.$notify.error({
          message: '数据请求失败'
        });
      });

      prescriptionWThis.$http.get('/api/pre/list').then(function(res){
        // 把json接口获取的数据赋给当前对象
        prescriptionWThis.drugs = res.body.res.drugs;
       
      }, res => {
        // error callback
        prescriptionWThis.$notify.error({
          message: '数据请求失败'
        });
      });
    },
    methods: {
      // 搜索
      search () {
        let search = this;
        search.prescription = [];
       
        search.$http.get('/api/pre/namequery', {params: {patientName: search.searchName}}).then(function(res) {
          // 把数组置空，以便存放搜索到的符合条件的数据
             
          // 遍历后台数据是否有和传入的参数相同的，有的话就找出来push进prescriptionC[]{
             search.prescription = res.body.datalist;
            console.log(res.body.datalist)
            
          
        },(res) => {
          // error callback
          search.$notify.error({
            message: '数据请求失败'
          });
        })
      },

      // 显示全部数据
      showAll () {
        this.prescription = this.intendedprescription;
        this.searchNumber = '';
        this.searchNamer = '';
      },
      refuseprescriptionW: function (index) {
        // 这里应该有个操作可以提醒医生他的处方被驳回了
        this.$message({
          message: '已通知' + this.prescription[index].prescription.doctor + '医生，处方被驳回！',
          type: 'success'
        });
      },
      acceptprescriptionW: function (index) {
        // 这里应该获取当前登陆的账户名，将其赋值给this.prescriptionC[index].pharmacist，从而获取当前操作的审核药师
        // 这里假装当前登陆的账户名是 “唐静”，暂时写死数据为该名字
        
        this.$message({
          message: '该处方已被' + this.prescription[index].prescription.auditor+ '审核药师处理！',
          type: 'success'
        });
        // mark!!! 这里需要遍历数组，比较药品名称，修改药品库存：库存-出药数量
        
        
        
    }}}
  
</script>

<style>
  .prescriptionManageW .filter-container
    {padding-bottom:30px;}
    .el-input
    {  width: 200px ;} 
  .prescriptionManageW
    .form-expand
      {/* background: #99FF66 */
      width:80%;
      margin: 0 auto;}
      .el-form-item
        {width: 29%;
        display: inline-block;
        margin-left: 20px}
      .symptoms
        {width: 100%;}
      .Rp
        {width: 80%;
        margin-left: 10%}
      .hr
        {margin-top: -25px;
        border-top: 1px solid #4A7C32}
      .prescriptionW-title
        {font-size: 26px;
        margin-left: 20px;}
  .prescriptionManageW .form-expand .el-form-item span
  {
    display: block;
    font-size: 15px;
    font-weight: bold;}
</style>