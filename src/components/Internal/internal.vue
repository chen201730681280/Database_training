
<template>

    <div class="innnerApp">
    <div class="app-body">
    <!-- 菜单开始 -->
      <div class="menu" :class="{ smallNav: isCollapse }">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse"  theme="dark">
          <el-menu-item index="1"  @click="navToggle">
            <template>
              <!-- <i :class="{ 'icon-guahaoshouqi': !isCollapse ,'icon-spread': isCollapse }"></i> -->
              <i class="icon-guahaoshouqi"></i>
              <span slot="title">收起/展开面板</span>
            </template>
          </el-menu-item>
          
          <el-submenu index="2" v-if="type === '01' || type === '02'">
            <template slot="title">
              <i class="icon-guahaoyisheng"></i>
              <span slot="title">医生管理系统</span>
            </template>
            <el-menu-item-group>
              <span slot="title">医生人员信息管理</span>
              <el-menu-item index="2-1"><router-link to="addDoctor">增加医生信息</router-link></el-menu-item>
              <el-menu-item index="2-2"><router-link to="editDoctor">修改医生信息</router-link></el-menu-item>
           
            </el-menu-item-group>
            <el-menu-item-group title="日常工作">
               <el-menu-item index="2-3"><router-link to="addShift">添加医生轮班</router-link></el-menu-item>

              <el-menu-item index="2-4"><router-link to="shiftDoctor">门诊值班安排</router-link></el-menu-item>
             
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" v-if="type === '01' || type === '03'">
            <template slot="title">
              <i class="icon-guahaojiaofei"></i>
              <span slot="title">挂号缴费系统</span>
            </template>
            <el-menu-item-group>
              <span slot="title">挂号收银</span>
              <el-menu-item index="3-1"><router-link to="Guahao">挂号</router-link></el-menu-item>
              <el-menu-item index="3-2"><router-link to="Guanli">管理挂号信息</router-link></el-menu-item>
              <el-menu-item index="3-3"><router-link to="Jiaofei">缴费办理</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        
        
          <el-submenu index="4" v-if="type === '01' || type === '04'">
            <template slot="title">
              <i class="icon-guahaoyao"></i>
              <span slot="title">药房管理系统</span>
            </template>
            <el-menu-item-group>
                <span slot="title">药房管理系统</span>
              <el-menu-item index="4-1"><router-link to="Chakan">查看药品信息</router-link></el-menu-item>
              <el-menu-item index="4-2"><router-link to="Chuyao">出药</router-link></el-menu-item>
              <el-menu-item index="4-4"><router-link to="Buyao">补药</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="icon-guahaohotel"></i>
              <span slot="title">病人管理系统</span>
            </template>
            <el-menu-item-group>
                <span slot="title">病人管理系统</span>
              <el-menu-item index="5-1" v-if="type === '01'  || type === '03'"><router-link to="addPatient">增加病人信息</router-link></el-menu-item>
              <el-menu-item index="5-2"><router-link to="patientInfo">查看患者信息</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          
        </el-menu>
      </div>
    <!-- 菜单结束 -->
      <!-- 内容显示区块 -->
      <div class="content" @mouseover="navColse">
        <!-- 右侧头部区域 -->
        <v-header></v-header>
         <div class="tagcontent">
          <transition name="HISshow">
            <router-view />
          </transition>
        </div>
    </div> 
  </div>
  </div>


</template>

<script type="text/ecmascript-6">
  import header from '../header/header';
  export default {
    
    name: 'app',
      data () {
        return {
          isCollapse: true,
          userLogin: '',
          type: ''
        };
      },
    methods: {
      // 左侧导航打开、关闭切换
      navToggle () {
        this.isCollapse = !this.isCollapse;
      },
      // 左侧导航关闭
      navColse () {
        this.isCollapse = true;
      }
    },
      created: function () {
      //获取用户相关信息、判断用户是否登录
      if (sessionStorage.getItem('easeHis')) {
        this.userLogin = true;
        this.type = sessionStorage.getItem('easeHisType');
        console.log(this.type);
      } else {
        this.userLogin = false;
      }
    },
    components: {
      'v-header': header
    } 
}
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
.innnerApp
  background-color:#fff
  min-height: 800px
  .el-menu-item>a
    display:inline-block
    height:100%
    width:100%
    /* click时淡蓝色 */
    color:#bfcbd9 
    &.router-link-active
      color: #20a0ff
  .app-body
    .menu
      position:fixed
      /* 出现的优先级 */
      z-index:9999
      height:100%
      width:230px
      transition: width 0.4s
      background-color:#4f9d9d
      /* 裁剪溢出内容 并使用滚动机制*/
      overflow-y: scroll
    
      .el-menu--dark
        background-color: transparent
      &.smallNav
        width:64px
        overflow-y: visible
        .el-menu-item
        .el-submenu__title
          span
            display:none
          .el-submenu__icon-arrow
            display:none
    .content
      padding-left:60px
      .tagcontent
        padding:20px
      .HISshow
        opacity:1
        transition:all 0.5s
      .HISshow-enter,.HISshow-leave-active
        opacity:0
        transition:all 0.5s
    
</style>

