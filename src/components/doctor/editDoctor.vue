<template>
  <div class="editDoctor">
    <span class="tittle">医生信息表</span>
    <div class="search">
    <el-input style="width: 200px;" placeholder="医生姓名" v-model="searchName"></el-input>
    <el-button  type="warning" icon="search" @click="search">搜索</el-button>
    <el-button  type="warning" icon="" @click="getAll">显示全部</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="doctorlist" border style="width: 100%;" :header-cell-style="getRowClass">
      <el-table-column fixed prop="index" label="序号" width="100">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <!-- <el-table-column fixed prop="id" label="序号" width="100">
            </el-table-column> -->
      <el-table-column fixed prop="name" label="姓名" width="150">
      </el-table-column>
      <el-table-column fixed prop="sex" label="性别" width="150"> 
      </el-table-column>
      <el-table-column fixed  label="入职日期" width="150">
        <template slot-scope="scope">
          {{scope.row.date}}
        </template> 
      </el-table-column>
      <el-table-column fixed prop="education" label="学历" width="150"> 
      </el-table-column>
      <el-table-column fixed prop="major" label="专业" width="150"> 
      </el-table-column>
      <el-table-column fixed prop="position" label="职称" width="150"> 
      </el-table-column>
      <el-table-column fixed prop="department" label="科室" width="150"> 
      </el-table-column>
      <el-table-column fixed="right" prop="operate" label="操作" width="150"> 
        <template slot-scope="scope">
          <el-button @click.native.prevent="edictDoctor(scope.$index)" type="warning" size="small">编辑</el-button>
          <el-button @click.native.prevent="delectDoctor(scope.$index, doctorlist)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>     
    </el-table>
    <!-- 表格 -->
    <!-- dialog对话框 -->
    <el-dialog title="医生信息修改" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="doctorlistedit.name" auto-complete="off"></el-input>
        </el-form-item>
 
        <el-form-item label="性别"  :label-width="formLabelWidth">
          <el-radio class="radio" v-model="doctorlistedit.sex" label="男">男</el-radio>
          <el-radio class="radio" v-model="doctorlistedit.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="入职日期" prop="date" :label-width="formLabelWidth">
            <el-date-picker type="date" placeholder="选择日期" v-model="doctorlistedit.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="学历" :label-width="formLabelWidth">
          <el-select v-model="doctorlistedit.education" placeholder="请选择" style="width: 100%;">
            <el-option label="大专" name="junior" value="大专"></el-option>
            <el-option label="本科" name="undergraduate" value="本科"></el-option>
            <el-option label="研究生" name="postgraduate" value="研究生"></el-option>
            <el-option label="博士" name="doctor" value="博士"></el-option>
            <el-option label="硕士" name="master" value="硕士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth">
          <el-input v-model="doctorlistedit.major" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职称"  :label-width="formLabelWidth">
          <el-input v-model="doctorlistedit.position" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="科室"  :label-width="formLabelWidth">
          <el-input v-model="doctorlistedit.department" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="warning" @click="updateDoctor">确 定</el-button>
      </div>
    </el-dialog>
    <!-- dialog对话框 -->
    <!-- <div class="block">
      <span class="demonstration">调整每页显示条数</span>
      <el-pagination 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" :current-page.sync="currentPage1" 
      :page-sizes="[10, 20, 30, 40]" 
      :page-size="pageSize" 
      layout="total,sizes, prev, pager, next,jumper" 
      :total="total1">
      </el-pagination>
    </div> -->
  </div>

</template>

<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          // 获取json存放在doctorlist里面
          doctorlist: [],
          // 对话框的修改存放
          doctorlistedit: [],
          // 搜索相同名字时存放
          doctorlistedit2: [],
          searchList: [],
          doctorlist3:[],
          searchName: '',
          dialogFormVisible: false,
          // 表单input的限制长度
          formLabelWidth: '60px',
          // 获取当前行的序号存放在Index
          Index: '',
          total1:0,
          pageSize:10,
          currentPage1: 1,
          instance:null
        };
      },
      methods: {

        /**
         * 查询医生信息
         * 实现了/api/doctor/query接口
         * 传doctorName过去，返回了Doctor
         */
        getRowClass({ row, column, rowIndex, columnIndex }) {
	if (rowIndex == 0) {
			return 'background:#D2E9FF'
	} else {
			return ''
	}
 },
        search () {
          let intendedSearch = this;
          intendedSearch.$http.get('/api/doctor/query', {params: {doctorName: intendedSearch.searchName}}).then((res) => {
       
           if (res.data.success) {
              this.doctorlist = res.body.Doctor;
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

        //显示全部
        getAll () { 
 this.doctorlist = this.searchList; 
 } ,
        
        // 点击编辑按钮执行的方法
        edictDoctor (index) {
          this.dialogFormVisible = true;
         
          
          this.Index = index;             // 存放当前行的序号
          this.doctorlistedit = this.doctorlist[index];  // 获取当前行的数据
        },
        // 点击删除按钮执行的方法
        delectDoctor (index, rows) {
          this.doctorlistedit2 = this.doctorlist[index];
          this.$http.post('/api/doctor/del', {
            id: this.doctorlistedit2.id
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
              }
          );
            };
             console.log('该行对象内容', rows);
            rows.splice(index, 1);    // 1代表从当前列表开始删除的行数
          });
        },
        /**
         * 实现了修改医生信息接口
         * /api/doctor/update
         */
        updateDoctor () {
          this.dialogFormVisible = false;
          let year = this.doctorlistedit.date.getFullYear();
          let month = this.doctorlistedit.date.getMonth() + 1;
          let day = this.doctorlistedit.date.getDate();
          let dateFormat = year + '-' + month + '-' + day;
          this.doctorlistedit.date = dateFormat;
          this.$http.post('/api/doctor/update', {
            id: this.doctorlistedit.index,
            name: this.doctorlistedit.name,
            sex: this.doctorlistedit.sex,
            date: this.doctorlistedit.date,
            major: this.doctorlistedit.major,
            education: this.doctorlistedit.education,
            position: this.doctorlistedit.position,
            department: this.doctorlistedit.department
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
        handleSizeChange (val) {
           this.pageSize = pageSize
    this.handleCurrentChange1(this.currentPage1);
          // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
         this.currentPage1 = currentPage
    this.currentChangePage(this.doctorlist3,currentPage)

          // console.log(`当前页: ${val}`);
        }
      },
      currentChangePage(list,currentPage) { 
   let from = (currentPage - 1) * this.pageSize;
   let to = currentPage * this.pageSize;
   this.doctorlist = [];
   for (; from < to; from++) {
    if (list[from]) {
     this.doctorlist.push(list[from]);
    }
   }
  },
      created () {
        this.$http.get('/api/doctor/list').then((response) => {             // mark
          this.doctorlist = response.body.doctors;
          this.searchList = response.body.doctors;
          this.doctorlist3 = response.body.doctors;
        }, response => {
          // error callback
          this.$message({
            message: '数据请求失败',
            type: 'error'
          });
        });
      }
    };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
.editDoctor .block
  position:absolute
.editDoctor .tittle
  display:block
  text-align:center
  font-size:24px
  font-weight:500
  line-height:80px
.editDoctor .search
  margin-bottom:30px
</style>
