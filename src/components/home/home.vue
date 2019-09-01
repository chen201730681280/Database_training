<template>
<div class="home">
    <h2>挂号管理系统</h2>
<strong>项目组员信息</strong>
      <table>
        <tr>
          <th>组长</th>
          <th>组员</th>
          <th>使用的技术</th>
        </tr>
        <tr>
          <td>黄安祥</td>
          <td>冼汶婷，陈泳欣，吴晓雨</td>
          <td>vue+koa</td>
        </tr>
        </table>
        <strong>挂号系统部分功能块介绍</strong>
      
        <h4>一、医生系统</h4>
        <p> 
            1、增加信息 姓名，年龄，性别，入职时间，学历，专业，职称，科室<br/>
           2、修改信息（编辑、删除、查询）<br/>
           3、查看医生信息（查询）<br/>
           4、门诊时间安排（包括医生已挂号量和剩余挂号量）</p>
        <h4>二、病人系统</h4>
        <p>
            1、增加信息 ID，年龄，性别，看病日期，电话号码，地址，疾病，病历，科室，医生 <br/>
          2、查看病人信息（已确诊/未确诊）（处方）
        </p>
         <h4>三、挂号缴费系统</h4>
        <p>
            1、挂号办理<br/>
            2、缴费办理<br/>
           3、管理挂号信息
        </p>
        <h4>四、药房管理系统</h4>
        <p>
            1、出药（包括处方号，缴费单号，基本信息，出药按钮，驳回按钮）<br/>
           2、增加药品信息<br/>
            3、查看药品信息<br/>
            4、补药
        </p>
            
</div>
</template>

<script>
export default{
    
}
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .home
    padding:0 20px 0 30px
  .home h2
      font-size: 30px
      text-align: center
      line-height: 90px
      font-weight: 800
      width:100%
      height:100px
      background-color:rgba(50,65,85,0.3)
  .home h3
      padding-right:20px
      text-align: right
      font-size: 14px
  .home h4
      font-size: 18px
      line-height:50px
      background-color:#F0F0F0
      text-align: left
  .home h5
      padding-bottom:20px
  .home p
       text-align:left
      margin:0 auto
      color:#475669
      text-indent: 2em
      line-height: 20px
      font-size:16px
      padding: 17px 0
  .home strong
      font-weight: 500
      font-size: 24px
      line-height:80px
  .home b
      font-weight: 500
      font-size: 24px
      line-height:80px
  /* .homeHead
      width:100%
      height:120px
      background-color:rgba(50,65,85,0.3) */
.home table
  width:100%
.home table th
  width:auto
  padding-top:5px
  padding-bottom:5px
  border:1px solid rgba(50,65,85,0.2)
  font-size:18px
  font-weight:600
.home table td
  border:1px solid rgba(50,65,85,0.2)
  padding: 20px 30px 20px 30px
.home li
  line-height:20px
  padding:0 0 20px 10px

</style>

