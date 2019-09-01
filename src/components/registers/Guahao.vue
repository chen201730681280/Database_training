<template>
  <div class="register">
    <p class="register-title">挂 号 办 理</p>
    <el-form
      :model="register"
      :rules="rules"
      ref="register"
      label-width="100px"
      class="register-ruleForm"
    >
      <el-form-item label="患者姓名" prop="patientName" class="register-name">
        <el-input v-model="register.patientName"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="cardNumber" class="register-certificate">
        <el-input v-model="register.cardNumber"></el-input>
      </el-form-item>

      <el-form-item label="科室" prop="department_value" class="register-department">
        <el-select v-model="departmentvalue" placeholder="请选择科室" style="width:250px;">
          <el-option
            v-for="items in register.department"
            :key="items.department"
            :label="items.department"
            :value="items.department"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="就诊医生" prop="doctor_value" span="11">
        <el-select v-model="register.doctor_value" placeholder="请选择就诊医生" style="width:250px;">
          <el-option
            v-for="items in register.doctor"
            :key="items.id"
            :label="items.name"
            :value="items.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <p v-if="register.doctor_value">
        <el-form-item label="就诊时间：" class="register-name">
          <span>{{ visit_date }} {{ visit_time }}</span>
        </el-form-item>
      </p>
      <p v-if="register.doctor_value">
        <el-form-item label="候诊号：" class="register-name">
          <span>待计算</span>
        </el-form-item>
      </p>
      <el-form-item>
       <el-button class="register-addButton" @click="resetForm('register')">重置</el-button>
      <el-button  class="register-addButton" type="warning" @click="submitForm('registerForm')">提交挂号</el-button>
      </el-form-item>
     
    </el-form>      
  </div>

</template>

<script type="text/ecmascript-6">
export default {
  data() {
    // 验证输入身份证号格式是否正确的方法
    let checkCertificate = (rule, value, callback) => {
      if (/^\d+$/.test(value) !== false) {
        if (value.length !== 18) {
          callback(new Error("身份证号应为18位数！"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入数字值！"));
      }
    };
    return {
      register: {
        patientName: "",
        cardNumber: "",
        department: [],
        doctor: [],
        doctor_value: "",
        visit_time: "",
        expense: "",
        visit_date: "",
        department_value: ""
      },
      departmentvalue: "",
      rules: {
        patientName: [
          { required: true, message: "请输入患者姓名", trigger: "blur" }
        ],

        cardNumber: [
          { required: true, validator: checkCertificate, trigger: "blur" }
        ],
        department_value: [
          { required: true, message: "请至少选择一个科室", trigger: "change" }
        ],
        doctor_value: [
          { required: true, message: "请选择医生", trigger: "change" }
        ],
        visit_time: [
          { required: true, message: "请填写活动形式", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.visit_time = this.compute_visitTime();
    this.visit_date = new Date().toLocaleDateString();
    // console.log(this.visit_date);
    let registerThis = this;
    //缺少了提供给挂号的科室信息
    registerThis.$http.get('/api/reg/department').then(function(res){
      registerThis.register.department = res.body.departmentList;
         res=> {
        // error callback
        registerThis.$notify.error({
          message: "数据请求失败"
        });
      }


    })
      
        
  
  },
  methods: {
    submitForm(register) {
      this.$refs.register.validate(valid => {
        if (valid) {
          this.$http.post('/api/reg/add', {
               time: this.visit_date,            
              p_name: this.register.patientName,
              d_name: this.register.doctor_value,
              department: this.register.department_value,
              p_id:this.register.cardNumber,
             
            })
            .then(function(res) {
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
        }
      });
    },
    resetForm(formName) {
      this.$refs.registerForm.resetFields();
      this.departmentvalue = "";
    },
    compute_visitTime() {
      var hour = new Date().getHours();
      var minutes = new Date().getMinutes();
      var time = "";
      if (hour < 11) {
        time = "8:00 - 11:30";
      } else if (hour === 11) {
        if (minutes < 30) {
          time = "8:00 - 11:30";
        }
      } else {
        time = "14:00 - 17:30";
      }
      return time;
    }
  },
  watch: {
    departmentvalue: function() {
      // mark: 为什么监听的属性只能是一个字符串???
      let registerThis = this;
      registerThis.register.department_value = registerThis.departmentvalue;
      registerThis.$http.get('/api/doctor/list').then(function(res)
      {
        registerThis.register.doctor = [];
          // 把json接口获取的数据赋给当前对象
          // console.log('dsf', this.department_value);
      for (let i = 0; i < res.body.doctors.length; i++) {
            if (
              registerThis.departmentvalue ===
              res.body.doctors[i].department
            ) {
              
              registerThis.register.doctor.push(res.body.doctors[i]); 
            }     
          }
        res => {
          // error callback
          registerThis.$notify.error({
            message: "数据请求失败"
          });
        }
    



      })
        
          
    }
  }
};
</script>

<style>

.register-title {
  font-weight: bold;
  font-size: 28px;
  width: 50%;
  margin: 0 auto;
  margin-left:24%;
  text-align: center;
  padding-bottom: 40px;
}
.register-ruleForm {
  width: 40% !important;
  margin: 0 auto;
  margin-left: 35%;
  padding-left: 0px;
}
.register-name {
  width: 71% !important;
}
.register-certificate {
  width: 71% !important;
}
.register-addButton {
  width: 90px;
  text-align: center;
  
}
.submitBtn {
  margin-left: 85px;
  width:70px;
  margin-right:5px;
}
</style>