<template>
  <div class="shiftDoctor">
    <span class="tittle">医生轮班信息表</span>
    <div class="search">
     <el-input  style="width: 200px;" placeholder="医生姓名" v-model="searchName"></el-input>
     <el-button  type="warning" icon="search" @click="search">搜索</el-button>
     <el-button  type="warning" icon="getAll" @click="getAll">显示全部</el-button>
    </div>
    <el-table :data="shiftList" border style="width: 100%;" :header-cell-style="getRowClass">
      <el-table-column fixed prop="date" label="轮班日期" width="120">
        <template slot-scope="scope">
          {{scope.row.date}}
        </template> 
      </el-table-column>
      <el-table-column fixed prop="time" label="时段" width="180">
      </el-table-column>
      <el-table-column fixed prop="index" label="序号" width="60">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column fixed prop="name" label="姓名" width="100">
      </el-table-column>
      <el-table-column fixed prop="sex" label="性别" width="120"> 
      </el-table-column>
      <el-table-column fixed prop="department" label="科室" width="120"> 
      </el-table-column>
      <el-table-column fixed prop="phone" label="电话" width="130"> 
      </el-table-column>
      <el-table-column fixed prop="text" label="出勤情况" width="120"> 
      </el-table-column>
      <el-table-column fixed prop="sign" label="主任签名" width="120"> 
      </el-table-column>
      <el-table-column fixed="right" prop="operate" label="操作" width="180"> 
        <template slot-scope="scope">
          <el-button @click.native.prevent="edictDoctor(scope.$index, scope.row)" type="warning" size="small">编辑</el-button>
          <el-button @click.native.prevent="delectDoctor(scope.$index, shiftList)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>     
    </el-table>
    <el-dialog title="轮班信息修改" :visible.sync="dialogFormVisible">

      <el-form>
        <el-form-item label="轮班日期" prop="date" :label-width="formLabelWidth">
            <el-date-picker type="date" placeholder="选择日期" v-model="form1.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="时段" prop="time" :label-width="formLabelWidth">
          <el-select v-model="form1.time" placeholder="请选择" style="width: 100%;">
            <el-option label="早班：6:00~17:00" name="lessMorning" value="早班：6:00~17:00"></el-option>
            <el-option label="日班：10：00~21：00" name="Morning" value="日班：10：00~21：00"></el-option>
            <el-option label="小夜：16：00~00：00" name="lessNinght" value="小夜：16：00~00：00"></el-option>
            <el-option label="大夜：00：00~8：00" name="Ninght" value="大夜：00：00~8：00"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form1.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="ID" prop="id" :label-width="formLabelWidth">
          <el-input v-model="form1.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别"  prop="sex" :label-width="formLabelWidth">
          <el-radio class="radio" v-model="form1.sex" label="男">男</el-radio>
          <el-radio class="radio" v-model="form1.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="科室"  prop="department" :label-width="formLabelWidth">
          <el-input v-model="form1.department" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form1.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出勤情况" prop="text" :label-width="formLabelWidth">
          <el-select v-model="form1.text" placeholder="请选择" style="width: 100%;">
            <el-option label="迟到" name="late" value="迟到"></el-option>
            <el-option label="早退" name="early" value="早退"></el-option>
            <el-option label="工作时间" name="bework" value="工作时间"></el-option>
            <el-option label="加班" name="overtime" value="加班"></el-option>
            <el-option label="病假" name="sickleave" value="病假"></el-option>
            <el-option label="公休" name="generalholiday" value="公休"></el-option>
            <el-option label="其他" name="others" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主任签名" prop="sign" :label-width="formLabelWidth">
          <el-input v-model="form1.sign" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="guanbi()">取消</el-button>
        <el-button type="warning" @click="submitForm('form1')">确 定</el-button>
      </div>
    </el-dialog>
     
    <div class="block">
      <span class="demonstration">调整每页显示条数</span>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="100">
      </el-pagination>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
    // import {api} from '../../../global/api.js';
    export default {
      data () {
        return {
          shiftList: [],
          shiftList1: [],
          form1: [],
          form3:[],
          // 将一行数据存储在form里
          Index: '',
          searchName:'',
          form: [],
          dialogFormVisible: false,
        dialogFormVisible1 : false,
          formLabelWidth: '60px',
          currentPage: 1
        }
      },
      methods: {
        getAll(){
           this.shiftList=this.shiftList1;
        },
        guanbi(){
        this.dialogFormVisible=false;
        },
        getRowClass({ row, column, rowIndex, columnIndex }) {
	if (rowIndex == 0) {
			return 'background:#D2E9FF'
	} else {
			return ''
	}
 },
        search(){
let intendedSearch = this;
          intendedSearch.$http.get('/api/shift/query', {params: {doctorName: intendedSearch.searchName}}).then((res) => {
          //  intendedSearch.$http.get('../static/doctor.json', {params: {nameame: intendedSearch.searchName}}).then((res) => {
           if (res.data.success) {
              this.shiftList = res.body.shifts;
                // 提示信息
              this.$message({
                showClose: true,
                message: '搜索成功！',
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: '搜索失败！',
                type: 'error'
              });
              return false;
            }
          }, response => {
            // error callback
            intendedSearch.$notify.error({
              message: '数据请求失败'
            });
          });
        },

        // 表格点击编辑触发的事件，进行修改
        edictDoctor (index, rows) {
          // console.log(index, row);
          this.dialogFormVisible = true;
          // this.form = row;
          console.log('tt', rows);
          this.form = rows;
          // 深拷贝
          // this.form = JSON.parse(JSON.stringify(rows[index]));
          this.Index = index;
          this.form1=rows;
                  this.form2 = rows;
          
          // rows[index] = this.form;
        },
        // 删除某行数据
        delectDoctor (index, rows) {
          // console.log(rows);
          // rows.splice(index, 1);
          this.form2 = this.shiftList[index];
          this.$http.post('/api/shift/del', {
            id: this.form2.id
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
              });
              
            };
            // console.log('该行对象内容', rows[index]);    // 打印该行对象内容
             console.log('该行对象内容', rows);
            rows.splice(index, 1);    // 1代表从当前列表开始删除的行数
           });
        },
        

        submitForm (formName) {
         
        
        this.dialogFormVisible=false;
        this.form1=this.form;
               this.$http.post('/api/shift/update', {
                 id:this.form1.id,
                name: this.form1.name,
               time:this.form1.time,
                sex: this.form1.sex,
                date: this.form1.date,
               text:this.form1.text,
                sign:this.form1.sign,
                department: this.form1.department
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
        
        //   });
        resetForm (form) {
         
          this.$refs[form].resetFields();
          alert(99);
        },

        formatJson (filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]));
        },
        // 导出信息表
        handleSizeChange (val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
          console.log(`当前页: ${val}`);
        }
      },
      // 获取json数据
      created () {
        this.$http.get('/api/shift/list').then((res) => {             // mark
          this.shiftList = res.body.shifts;//改过
          this.shiftList1 = res.body.shifts;
        }, res => {
          // error callback
          this.$message({
            message: '数据请求失败',
            type: 'error'
          });
        });
        // this.updateDoctor();
      }
      
};
 </script>

<style lang="stylus-loader" rel="stylesheet/stylus">
.shiftDoctor .block
  position:absolute
.shiftDoctor .tittle
  display:block
  text-align: center
  font-size:24px
  font-weight:600
  line-height:80px
.shiftDoctor .search
  margin-bottom:30px

</style>
