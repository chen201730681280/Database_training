<template>
    <div class="addShift">
      <span class="tittle">添加医生轮班</span>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      
        <el-form-item label="性别" prop="sex">
          <el-radio class="radio" v-model="form.sex" label="男">男</el-radio>
          <el-radio class="radio" v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="轮班日期" prop="date" >
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="时段" prop='time'>
          <el-select v-model="form.time" placeholder="请选择" style="width: 100%;">
            <el-option label="早班：6:00~17:00" name="lessMorning" value="早班：6:00~17:00"></el-option>
            <el-option label="日班：10：00~21：00" name="Morning" value="日班：10：00~21：00"></el-option>
            <el-option label="小夜：16：00~00：00" name="lessNinght" value="小夜：16：00~00：00"></el-option>
            <el-option label="大夜：00：00~8：00" name="Ninght" value="大夜：00：00~8：00"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="ID" prop='id'>
          <el-input v-model="form.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="科室" prop="department">
          <el-input v-model="form.department"></el-input>
        </el-form-item>
        
        <el-form-item label="电话"  prop='phone'>
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出勤情况" prop='text' >
          <el-select v-model="form.text" placeholder="请选择" style="width: 100%;">
            <el-option label="迟到" name="late" value="迟到"></el-option>
            <el-option label="早退" name="early" value="早退"></el-option>
            <el-option label="工作时间" name="bework" value="工作时间"></el-option>
            <el-option label="加班" name="overtime" value="加班"></el-option>
            <el-option label="病假" name="sickleave" value="病假"></el-option>
            <el-option label="公休" name="generalholiday" value="公休"></el-option>
            <el-option label="其他" name="others" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主任签名" prop='sign' >
          <el-input v-model="form.sign" auto-complete="off"></el-input>
        </el-form-item>

        
        <el-form-item class="buttonAdd">
          <el-button type="warning" @click="submitForm('form')">增 加</el-button>
          <el-button type="primary" @click="resetForm ('form')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          form: {
            name: '',
           id:'',
            sex: '男',
            date: '',
            department:'',
            sign:'',
            text:'',
            time:'',
            phone:''
           
           
            
          },
          // 验证规则
          rules: {
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
             
            sex: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            date: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
            ],
            time: [
              { required: true, message: '请选择时段', trigger: 'change' }
            ],
            phone: [
              { required: true, message: '请填写电话', trigger: 'blur' },
              {min:11,max:11,message:'请输入正确的电话号码',trigger:'blur'}
            ],
            id: [
              { required: true, message: '请填写身份证号', trigger: 'blur' }
            ],
            department: [
              { required: true, message: '请填写科室', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        // 增加的方法
        submitForm (form) {
        // 规则验证
        this.$refs[form].validate((valid) => {
            if (valid) {
              

              this.$http.post('/api/shift/add', {
                name: this.form.name,
               time:this.form.time,
                sex: this.form.sex,
                date: this.form.date,
                id:this.form.id,
                phone:this.form.phone,
                text:this.form.text,
                sign:this.form.sign,
                department: this.form.department
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
        }
        }
        );
        },
        // 重置方法
        resetForm (form) {
          this.$refs[form].resetFields();
        }
      }
};

</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
.addShift .el-input
  width:384px

.addShift .tittle
  display:block
  text-align: center
  font-size:24px
  font-weight:600
  line-height:80px
.addShift .addForm
  width:470px
  margin:auto
.addShift .addForm .buttonAdd
  text-align: center;
</style>
