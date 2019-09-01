<template>
    <div class="login">
      <div class="loginContainer">
        <h2 class="title">门诊挂号管理系统</h2>
        <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="登录" name="first">
          <el-form ref="form" :model="form" label-width="100px"  >
          <el-form-item>
            <el-input v-model.trim="form.username" placeholder="用户名" @keyup.enter.native="nextInput"></el-input>
          </el-form-item>
          <el-form-item @keyup.enter.native="_login">
            <el-input id="psw" v-model="form.password" type="password" class="inputpsw" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="_login">登录</el-button>
            <el-button type="warning" @click="_reset">重置</el-button>
          </el-form-item>
        </el-form>
        </el-tab-pane>
        <el-tab-pane label="需知" name="second">
            <p class="tips">本系统分为五个级别用户</p>
            <p class="tips">账号：root 密码:root</p>
            <p class="tips">账号：doctor 密码:doctor</p>
            <p class="tips">账号：checkstand 密码:checkstand</p>
            <p class="tips">账号：pharmacist 密码:pharmacist</p>
            
            
        </el-tab-pane>
        </el-tabs>

        
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
 import {mapActions} from 'vuex'; // 引入vuex中各个模块的actions
  // import {api} from '../../global/api.js';
  export default {
    name: 'login',
    beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#4F9D9D')
  },
    beforeDestroy () {
    document.querySelector('body').setAttribute('style', '')

  },
    data () {
      return {
        activeName:'second',
        tips: '',
        form: {
          username: '',
          password: '',
          type: ''
        },
        user: ''
      };
    },
    
    methods: {
     ...mapActions({setUserInfo: 'setUserInfo'}),  // 本组件注册VUEX输出的actions中的setUserInfo方法
      // 用户登录验证不能为空

      handleClick(){

      },

      _reset(){
          this.form.username=null;
          this.form.password=null;

      },

      _login () {
        if (!this.form.username || !this.form.password) {
          if (!this.form.username) {
            this.tips = '用户名不能为空！';
          } else {
            this.tips = '密码不能为空！';
          }
          this.$message({
            message: this.tips,
            type: 'warning'
          });
          return;
        }

        this.$http.post('/api/user/login', {
          username: this.form.username,
          password: this.form.password
        }).then(function (res) {
          if (res.data.success) {
            this.tips = '登录成功！';
            this.$message({
              message: this.tips
            });
            this.form.type = res.data.role;
            this.setUserInfo(this.form);
            // this.$router.push( '/internal/home');
            this.$router.push({path: 'home'});
            return;
          } else {
            this.tips = '密码不正确！';
            this.$message({
              message: this.tips,
              type: 'warning'
            });
          }
        }, res => {
          this.$message({
            message: '数据请求失败',
            type: 'error'
          });
        });
      },
      // 用户名文本框回车跳到密码文本框
      nextInput () {
        document.querySelector('#psw input').focus();
      },

    }
  };
</script>

<style>
  .login 
    .loginContainer{
      max-width:500px;
      margin: 90px auto 0 auto;
      background-color:#4F9D9D;
      padding:25px 30px;
      border-radius: 20px;}

      .title{
        font-size: 35px;
        text-align: center;
        color: rgb(255,255,255);
        font-weight: 900;
        margin-bottom: 40px;
        padding: 20px 0 10px 0;
      }
    .el-tabs{
       
        text-align: center;
    }
    .el-form-item__content
      {margin-right: 80px;}
    
    .tips
     {color:#fff;
      font-size:16px;
      text-indent:2em;
      text-align:left;}
    
    .el-input
      input
        {
        color: black;}
</style>
