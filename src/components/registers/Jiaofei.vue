    
<template>
  <div class="takecash">
    <p class="takecash-title">缴费办理</p>
    
    <!-- 处理缴费表单 -->
    <el-form :model="takecash" :rules="rules" ref="takecashForm" label-width="100px" label-position:right class="takecash-ruleForm">
      <el-form-item label="患者姓名" prop="patientName">
        <el-input v-model="takecash.patientName"></el-input>
      </el-form-item>  
        <el-form-item label="身份证号" prop="cardNumber">
          <el-input v-model="takecash.cardNumber"></el-input>
        </el-form-item>
         <el-form-item label="缴费类型" prop="cashtype">
        <el-select v-model="takecash.cashtype" placeholder="请选择缴费类型">
          <el-option label="处方缴费" value="处方收费"></el-option>
           <el-option label="挂号缴费" value ="挂号收费"></el-option>
          </el-select>
          </el-form-item>
          <p class="cash-isshow" v-if ="takecash.cashtype==='处方收费'">
            <el-form-item label="处方编号" prop="prescript_number">
        <el-input v-model="number"></el-input>
      </el-form-item>
      <!-- 下面实时监听number的值，找到该值的话就会赋值给isShow，这样isShow也是实时变化的了 -->
      <!-- 如果找到输入的处方编号就把处方的药品数据展示出来，否则隐藏数据表格-->
      <template v-if="number!=''" >
        <el-table :data="prescription[0].drugs">
          <el-table-column prop="sort" label="药品分类">
          </el-table-column>
          <el-table-column prop="drugName" label="药品名称">
          </el-table-column>
          <el-table-column prop="quantity" label="用量（件/克）">
          </el-table-column>
          <el-table-column prop="usage" label="用法">
          </el-table-column>                
        </el-table>
      </template>
      <template v-else >
      </template>
      </p>
      <p class = "cash-isshow" v-if="takecash.cashtype ==='挂号收费'">
        <el-form-item label="挂号编号" prop="appoint_number">
        <el-input v-model="takecash.appoint_number"></el-input>
      </el-form-item>
      </p>
      
      <el-form-item label="应收金额 " class="shouldMoney" label-width="100px">
          <span v-show="showMoney" class="money" style="display:inline-block" >{{ takecash.shouldMoney }} </span>
        <el-button type="warning" class="computeBtn" @click="compute()" style="margin-left:340px;display:inline-block">计算应收金额</el-button>
       </el-form-item>
       <el-form-item label="支付方式" prop="paytype">
        <el-select v-model="takecash.paytype" placeholder="请选择缴费类型">
          <el-option label="微信支付" value="WeChat"></el-option>
           <el-option label="支付宝支付" value ="ALi"></el-option>
           <el-option label="现金支付" value ="cash"></el-option>    
          </el-select>
          </el-form-item>
       <el-form-item label="实收金额" prop="exactMoney">
        <el-input v-model="takecash.exactMoney"></el-input>
      </el-form-item>
               
        <el-form-item label="找零 " class="theChange" label-width="100">
          <span v-show="showChange" class="money">{{ takecash.theChange }}</span>
   
        <el-button type="primary" class="changeBtn" @click="change()" style="margin-left:350px">计算找零</el-button>
      </el-form-item>   

      <el-button type="reset" @click="resetForm('takecashForm')" class="reset">重置</el-button>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  //import {api} from '../../../global/api.js';
  export default {
    data () {
      // 验证患者姓名是否存在的方法
      let checkName = (rule, value, callback) => {
        for (let k = 0; k < this.patients.length; k++) {
          if(value === this.patients[k].name){
            
            break;
            callback();
          }
          if (value !== this.patients[k].name && k=== this.patients.length-1) {
            callback(new Error('无此患者姓名！'));
          } 
        }
      };
      // 验证挂号是否存在的方法
      let checkAppoint = (rule, value, callback) => {
        var s = parseInt(value);
        for (let k = 0; k < this.patients_reg.length; k++) {
          if (s === this.patients_reg[k].id) {
            
             break;
            callback();
          } 
          if(s !== this.patients_reg[k].id && k===this.patients_reg.length-1)
          {
            
            callback(new Error('无此挂号！'));
          }
        }
      };

      let checkPrescription = (rule, value, callback) => {
        var s = parseInt(value);
        for (let k = 0; k < this.patients_pre.length; k++) {
          if (s === this.patients_pre[k].prescription.id) {
            callback();
            break;
          }
          if (s !== this.patients_pre[k].prescription.id && k === this.patients_pre.length-1){
            callback(new Error('无此处方！'));
          }
        }
      };
      
      // 验证输入的实收金额是否是数字值的方法
      let checkexactMoney = (rule, value, callback) => {
        if (/^\d+$/.test(value) === false) {
          callback(new Error('请输入实收金额！'));
        } else {
          if ((value - this.takecash.shouldMoney) < 0) {
            callback(new Error('请输入实收金额！'));
          } else {
            callback();
          }
        }
      };
      // 验证患者身份证号是否与输入的姓名对应以及格式是否正确的方法
      let checkCertificate = (rule, value, callback) => {
        if (/^\d+$/.test(value) !== false) {
          if (value.length !== 18) {
            callback(new Error('身份证号应为18位数！'));
          } else {
            for (let k = 0; k < this.patients.length; k++) {
              if (value === this.patients[k].id) {
                if (this.patients[k].name === this.takecash.patientName) {
                  callback();
                } else {
                  callback(new Error('身份证号与姓名不对应！'));
                }
                break;
              } 
              if(value !== this.patients[k].id && k === this.patients.length-1)
              {
                callback(new Error('身份证号与姓名不对应！'));
              }
              }
            }
          }
         else {
          callback(new Error('请输入数字值！'));
        }
      };
      return {
        takecash: {
          patientName: '',
          certificate_value: '',
          cardNumber: '',
          cashtype:'',
          paytype:'',
          prescript_number: '',
          appoint_number:'',
          
          shouldMoney: '',
          exactMoney: '',
          theChange: ''
        },
        prescription: [],
        number: '',   // 处方编号 （被监听）
        isShow: '',   // 存放处方编号在被监听的过程中的最终值
        showMoney: false,
        showChange: false,
        patients: [],
        patients_reg:[],
        patients_pre:[],  // 存放患者信息
        rules: {
          patientName: [
            {required: true, validator: checkName, trigger: 'blur'}
          ],
          certificate_value: [
            { required: true, message: '请输入证件号码', trigger: 'change' }
          ],
          cardNumber: [
            {required: true, validator: checkCertificate, trigger: 'blur'}
          ],
          prescript_number: [
            {required: true, validator: checkPrescription, trigger: 'blur'}
          ],
          appoint_number:[
            {required:true,validator: checkAppoint,trigger:'blur'}
          ],
          exactMoney: [
            {required: true, validator: checkexactMoney, trigger: 'blur'}
          ]
        }
      };
    },
    created () {
      let takecashThis = this;
      takecashThis.$http.get('/api/patient/list').then(function(res){
        // 把json接口获取的数据赋给当前对象
        takecashThis.patients = res.body.patients;
      }, res => {
        // error callback
        takecashThis.$notify.error({
          message: '数据请求失败'
        });
      });
      takecashThis.$http.get('/api/reg/list').then(function(res){
        takecashThis.patients_reg = res.body.regs;
       
      },res => {
        // error callback
        takecashThis.$notify.error({
          message: '数据请求失败'
        });
      });
      takecashThis.$http.get('/api/pre/list').then(function(res){
        takecashThis.patients_pre = res.body.res;
        
      },res => {
        // error callback
        takecashThis.$notify.error({
          message: '数据请求失败'
        });
      });

    },
    methods: {
      // 计算应收金额
      compute () {
        
        this.showMoney = true;
       
          console.log(this.takecash.cashtype)
        if(this.takecash.cashtype === '挂号收费'){
          this.$http.post('/api/pay/add',{
            type:this.takecash.cashtype,
            appointId:this.takecash.appoint_number,
            p_id:this.takecash.cardNumber,
            form:this.takecash.paytype
          }).then(function(res) {
              if (res.data.success) {
                this.$notify({
                  message: "提交成功",
                  type: "success"
                });
              } else {
                this.$notify.error({
                  message: "提交失败"
                });
                return false;}
           }) 
            this.$http.get('/api/pay/price',{params:{type:this.takecash.cashtype,appointId:this.takecash.appoint_number}}).then(function(res){
          console.log(this.takecash.appoint_number)
          this.takecash.shouldMoney = res.body.price[0].expenses
          console.log(res.body.price.expenses)
        }),(res) => {
          // error callback
          this.$notify.error({
            message: '数据请求失败'
          });
        }
           
           
           
           
           }
        if(this.takecash.cashtype === '处方收费'){
          this.$http.post('/api/pay/add',{
            type:this.takecash.cashtype,
            preId:this.takecash.prescript_number,
            p_id:this.takecash.cardNumber,
            form:this.takecash.paytype
          }). then(function(res) {
              if (res.data.success) {
                this.$notify({
                  message: "提交成功",
                  type: "success"
                });
              } else {
                this.$notify.error({
                  message: "提交失败"
                });
                return false;
              }
            });
           this.$http.get('/api/pay/price',{params:{type:this.takecash.cashtype,preId:this.takecash.prescript_number}})
           .then(function(res){
          this.takecash.shouldMoney = res.body.price.price
          console.log(this.takecash.shouldMoney)
        }),(res) => {
          // error callback
          this.$notify.error({
            message: '数据请求失败'
          });
        }

        }

      },
        
      
      // 重置
      resetForm (formName) {
        this.$refs.takecashForm.resetFields();
        this.isShow = '';
        this.number = '';
        this.showMoney = false;
        this.showChange = false;
      },
      // 找零
      change () {
         if ((this.takecash.exactMoney - this.takecash.shouldMoney) < 0) {
              this.takecash.theChange = '实收金额有误！';
              this.showChange = true;
            } else {
              if (this.takecash.shouldMoney === '') {
                this.showChange = false;
              } else {
                this.takecash.theChange = this.takecash.exactMoney - this.takecash.shouldMoney;
                this.showChange = true;
              }
           
      }},},
        // 实时监听number，当输入处方编号时，开始执行下面的操作
    // 如果能找到该处方编号，则把处方里的药品信息拿出来存在prescription[]数组里
    // 同时把处方编号赋值给this.isShow，以便前面的判断是否要把数据表格展示出来
    watch: {
     number: function () {
       this.takecash.prescript_number=this.number;
      this.takecash.prescript_number=this.number;
  this.$http.get('/api/pre/namequery',{params:{patientName:this.takecash.patientName}}).then(function(res){
  this.prescription = res.body.datalist;
  this.isShow = this.takecash.prescription_number;
// 暂时写死数据
  }),res => {
this.$message({
message: '数据请求失败',
type: 'error'
});
}
        }
  }}
    
  
</script>

<style>
  .takecash 

    .takecash-title{
      font-weight: bold;
      font-size: 28px;
      width: 50%;
      margin: 0 auto;
      text-align: center;
      padding-bottom: 40px;}

    .takecash-ruleForm{
      width: 50% !important;
      margin: 0 auto;}

      .el-form-item{
        width: 100% !important;}

        .el-select
          {width: 100% !important;}
      .takecash_p{
        overflow: hidden;
        padding-left: 30px;
        padding-top: 20px;}
        .shouldMoney{
          
          display: inline-block;
          width:800px;
          /*top: 325px*/
        margin-left: 0px;}
        .theChange{
          
          width:770px;
          margin-left: 40px;
          display: inline-block;}
        .computeBtn{
          
          display: inline-block;}
        .changeBtn{
          display: inline-block;
          
          /*top: 460px*/
          /*right: 335px*/}
      .exactMoney{
          margin-left: 20px;
          width: 100%;}
        .money{
          font-size: 20px;
          color: black;
          font-weight: bold;}
      .reset{
        margin-left: 45%;
        margin-top: 50px;}
        
</style>