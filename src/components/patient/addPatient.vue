<template>
  <div class="addPatient">
    <el-form
      :model="ruleForm"
      class="demo-ruleForm"
      ref="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <h1 class="record">
        新建患者档案:
        <span class="demonstration">建档日期</span>
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          prop="date"
        ></el-date-picker>
      </h1>
      <br />
      <br />
      <div>
        <el-form-item label="患者姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="id">
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="患者年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
 <el-form-item label="性别" prop="sex">
          <el-radio class="radio" v-model="ruleForm.sex" label="男">男</el-radio>
          <el-radio class="radio" v-model="ruleForm.sex" label="女">女</el-radio>
        </el-form-item>         <div>
        <el-form-item label="病症" prop="disease">
          <el-input  v-model="ruleForm.disease"></el-input>
        </el-form-item>
      </div>
      </div>
      <div>
        <el-form-item label="家庭地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
      </div>
      <br />
      <h3>联系人资料</h3>
      <br />
      <div>
        <el-form-item label="联系人姓名" prop="l_name">
          <el-input v-model="ruleForm.l_name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="l_phone">
          <el-input v-model.number="ruleForm.l_phone"></el-input>
        </el-form-item>
      </div>

      <div>
        <h3>是否有病史？如果有，请简单说明</h3>
        <br />
        <el-form-item label="病史简单说明" prop="history">
          <el-input type="textarea" v-model="ruleForm.history"></el-input>
        </el-form-item>
      </div>
      <div>
        <h3>医生信息</h3>
        <el-form-item label="主治医生姓名" prop="doctor">
          <el-input v-model="ruleForm.doctor"></el-input>
        </el-form-item>
        <el-form-item label="科室" prop="department">
          <el-select v-model="ruleForm.department" placeholder="选择科室">
            <el-option label="外科" value="外科"></el-option>
            <el-option label="内科" value="内科"></el-option>
            <el-option label="妇产科" value="妇产科"></el-option>
            <el-option label="骨科" value="骨科"></el-option>
            <el-option label="儿科学" value="儿科学"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item class="center">
          <el-button type="warning" @click="onSubmit">立即创建</el-button>
          <el-button @click="offReset('ruleForm')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      };
      setTimeout(() => {
        if (/^\d+$/.test(value) === false) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }, 300);
    };
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话不能为空'));
      };
      setTimeout(() => {
        if (/^\d+$/.test(value) === false) {
          callback(new Error('请输入数字值'));
        } else if (value.length > 11) {
          callback(new Error('请输入正确号码'));
        } else {
          callback();
        }
      }, 500);
    };
    var checkidCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号不能为空'));
      };
      setTimeout(() => {
        if (/^(\w){6,20}$/.test(value) === false) {
          callback(new Error('请输入正确身份证号码'));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      ruleForm: {
        date: '',
        name: '',
        region: '',
        id: '',
        sex: '男',
        age: '',
        phone: '',
        l_name: '',
        l_phone: '',
        address: '',
        disease:'',
        history:'',
        doctor: '',
        department: ''
      },
    
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now - 8.64e7;
        }
      },
      rules: {
        name: [
          { required: true, validator: checkName, trigger: 'blur' }
        ],
        age: [
          { required: true, validator: checkAge, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],
        region: [
          { required: true, trigger: 'blur' }
        ],
        id: [
          { required: true, validator: checkidCard, trigger: 'blur' }
        ],
        sex: [
          { required: true, trigger: 'blur' }
        ]
      }
    };
  },
  // mounted () {
  //   let me = this;
  //   me.$http.get(api.provinces).then(function (response) {
  //     me.ruleForm.provinces = response.data.provinces;
  //   }, function (response) {
  //     alert('请求失败了');
  //   });
  // },
  methods: {
    onSubmit (ruleForm) {
    //   // let me = this;
    //   // this.$http.post('../static/addPatient.json').then(function (response) {
    //   //   console.log('这是我们需要的json数据', response.ruleForm);
    //   //   me.ruleForm = me.data.ruleForm;
    //   // }, function (response) {
    //   //   alert('请求失败了');
    //   // });
       this.$http.post('/api/patient/add', {
      //  this.$http.post('/static/add.json', {
       date: this.ruleForm.date,
       name: this.ruleForm.name,
      //  region: this.ruleForm.region,
       id: this.ruleForm.id,
       sex: this.ruleForm.sex,
       age: this.ruleForm.age,
       phone: this.ruleForm.phone,
        l_name: this.ruleForm.l_name,
        l_phone: this.ruleForm.l_phone,
        // relation: this.ruleForm.relation,
        address: this.ruleForm.address,
        disease:this.ruleForm.disease,
      history:this.ruleForm.history,
        doctor: this.ruleForm.doctor,
        department: this.ruleForm.department,  
      }).then(function (res) {
                if (res.data.success) {
        // 提示信息
              this.$message({
                showClose: true,
                message: '添加成功！',
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: '添加失败！',
                type: 'error'
              });
              return false;
            }
              });
    //   // console.log('您修改后的参数为：', JSON.stringify(this.ruleForm));
    },
    

    offReset (form) {
      this.$refs[form].resetFields();
      this.ruleForm.date = '';
      this.ruleForm.address = '';
     
    }
  },
  watch: {
    
  }
};
</script>s
<style type="text/css">
.addPatient .el-input,
.addPatient .el-input__inner {
  display: inline-block;
  width: 192px;
}
.addPatient .el-form-item {
  padding-right: 30px;
}
.addPatient .el-form {
  padding-bottom: 20px;
}
.addPatient .el-textarea__inner {
  width: 500px;
}
.addPatient .center {
  padding-left: 200px;
}
.addPatient .demonstration {
  color: #333;
  font-size: 24px;
}
.addPatient .record {
  font-size: 28px;
}
.addPatient .el-form-item {
  display: inline-block;
}
</style>
