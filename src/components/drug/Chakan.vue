<template>
  <div class="drugInfosW">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input placeholder="药品名" v-model="searchValue"></el-input>
      <el-button type="warning" icon="search" @click="search()">搜索</el-button>

     
      <el-button type="warning" icon="view" @click="showAll">显示全部</el-button>
    </div>
    <!-- 药物信息列表 -->
    <el-table :data="tableData" border style="width: 100%; text-align:left">
      <el-table-column prop="id" label="序号" width="100"></el-table-column>
      <el-table-column prop="type" label="类别" width="80"></el-table-column>
      <el-table-column prop="name" label="药品名称" width="170"></el-table-column>
      <el-table-column prop="OTC" label="OTC标志" width="80"></el-table-column>
      <el-table-column prop="specification" label="规格" width="130"></el-table-column>
      <el-table-column prop="dosageForm" label="剂型" width="100"></el-table-column>
      <el-table-column prop="productionDate" label="生产日期" width="130"></el-table-column>
      <el-table-column prop="manufacturer" label="厂家" width="238"></el-table-column>
      <el-table-column prop="inventory" label="库存（件/克）" width="110"></el-table-column>
      <el-table-column prop="singlePrice" label="单价（元）" width="110"></el-table-column>
      <el-table-column label="操作" width="90">
        <template scope="scope">
          <el-button type="warning" @click="checkDetail(scope.$index)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击查看药物详细信息 -->
    <el-dialog title="产品参数" :visible.sync="dialogVisible" :before-close="handleClose">
      <ul class="drugdetail">
        <li style="text-align:left" ><h4 style="display:inline-block">产品名称：</h4><span style="display: inline-block">{{drugdetails.name}}</span></li>
        <li style="text-align:left"><h4 style="display:inline-block">产品剂型:</h4><span style="display:inline-block">{{drugdetails.dosageForm}}</span></li>
        <li style="text-align:left" ><h4 style="display:inline-block">使用剂量:</h4 ><span style="display:inline-block">{{drugdetails.use_quantity}}</span></li>
        <li style="text-align:left"><h4 style="display:inline-block">品牌:</h4><span style="display:inline-block">{{drugdetails.brand}}</span></li>
        <li style="text-align:left"><h4 style="display:inline-block">有效期:</h4><span style="display:inline-block">{{drugdetails.shelfLife}}</span></li>
        <li style="text-align:left"><h4 style="display:inline-block">用法:</h4><span style="display:inline-block">{{drugdetails.usage}}</span></li>
        <li style="text-align:left"><h4 style="display:inline-block">药品分类:</h4><span style="display:inline-block">{{drugdetails.OTC}}</span></li>
        <li style="text-align:left"><h4 style="display:inline-block">批准文号:</h4><span style="display:inline-block">{{drugdetails.certificate}}</span></li>
        <li style="text-align:left"><h4 style="display:inline-block">生产企业:</h4><span style="display:inline-block">{{drugdetails.manufacturer}}</span></li>
        <li style="text-align:left"><h4 style="display:inline-block">规格: </h4><span style="display:inline-block">{{drugdetails.specification}}</span></li>
        <li style="text-align:left"><h4 style="display:inline-block">类别: </h4><span style="display:inline-block">{{drugdetails.type}}</span></li>
      </ul>
      <h5 slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </h5>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  //import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        tableData: [],
        assistanttableData: [],
        dialogVisible: false,
        drugdetails: '',
        searchValue: ''
      };
    },
    mounted () {
      let druginfosThis = this;
      druginfosThis.$http.get('/api/drug/list').then(function(res){
        // 测试语句，测试是否能获取response
        // console.log(druginfosThis.tableData, response);
        // 把json接口获取的数据赋给当前对象
        druginfosThis.tableData = res.body.drugs;
        druginfosThis.assistanttableData = res.body.drugs;
      }, res=> {
        // error callback
        druginfosThis.$notify.error({
          message: '数据请求失败'
        });
      });
    },
    methods: {
      // 确认是否要关闭dialog
      handleClose (done) {
        this.$confirm('确认关闭？').then(_ => {
          done();
        }).catch(_ => {});
      },
      // 查看药品详情参数
      checkDetail (index) {
        // console.log(index);
        this.dialogVisible = true;
        this.drugdetails = this.tableData[index];
      },
       // 搜索
      search () {
        let intendedSearch = this;
         intendedSearch.tableData = [];
        intendedSearch.$http.get('api/drug/namequery',{params:{name:intendedSearch.searchValue}}).then(function(res) {
          // 遍历接口里的所有信息，查找drugname为搜索框里输入的内容的数据，然后把所有找到的数据push进this.tableData里
          // 在把查找到的数据存进this.tableData里之前，需要把它置为空
         intendedSearch.tableData = res.body.Drug
         console.log(res.body.Drug)
         console.log(intendedSearch.tableData)
          
        }, res => {
          // error callback
          intendedSearch.$notify.error({
            message: '数据请求失败'
          });
        });
      },
      // 显示全部数据
      showAll () {
        this.tableData = this.assistanttableData;
        this.searchValue = '';
      },
      // 把数据表格导出到excel表
/*      handleDownload () {
        var vm = this;
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = ['序号', '类别', '药品名称', 'OTC标志', '规格', '剂型', '厂家', '库存（件）', '单价（元）'];
          const filterVal = ['index', 'type', 'drugname', 'OTC', 'specification', 'form', 'vender', 'quantity', 'price'];
          const tableData = vm.tableData;
          const data = vm.formatJson(filterVal, tableData);
          export_json_to_excel(tHeader, data, '药房药物信息列表excel');
        });
      },*/
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      }
    }
};
</script>

<style >
  .drugInfosW .filter-container
    {padding-bottom:30px；}
    .el-input
     {width: 400px;}
  .drugInfosW .el-table-column
   { font-weight: bold;}

  .drugInfosW .drugdetail
    h4
      {
        
      width: 100px;
      line-height: 30px;
      font-weight: bold;
      }

    ul{margin:0;padding:0}
     ul li{
    
      list-style: none;
      padding-left:0px;
}
</style>