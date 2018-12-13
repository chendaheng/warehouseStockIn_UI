<template>
  <div class="body">
    <!-- <el-card class="box-card">
      <el-form :inline="true" :model="form" :rules="rules" class="form">
        <el-form-item label="检验单号">
          <el-input v-model="form.params.qualityTestSerialNo" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="检验场所" prop="qualityTestAddr">
          <el-input v-model="form.params.qualityTestAddr" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="检验员">
          <el-select v-model="form.params.operUser" clearable placeholder="请选择">
            <el-option 
              v-for="item in form.options.operUserOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="form" :rules="rules" class="form">
        <el-form-item label="收货流水号" class="form-item">
          <el-input v-model="form.params.receivingSerialNo" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="检验部门" prop="dept" class="form-item">
          <el-select v-model="form.params.dept" clearable placeholder="请选择">
            <el-option
              v-for="item in form.options.deptOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="确认者" prop="affirmant" class="form-item">
          <el-select v-model="form.params.affirmant" clearable placeholder="请选择">
            <el-option
              v-for="item in form.options.affirmantOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row :gutter="10">
        <el-col :span="7">
          <div class="bar">
            <div class="title">检验时间</div>
            <el-input v-model="form.params.qualityTestDate" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验领料人</div>
            <el-select v-model="form.params.picker" clearable placeholder="请选择">
              <el-option
                v-for="item in form.options.pickerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </el-card> -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验单号</div>
            <el-input v-model="qualityTestRecord.params.qualityTestSerialNo" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验场所</div>
            <el-input v-model="qualityTestRecord.params.qualityTestAddr" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验员</div>
            <el-select v-model="qualityTestRecord.params.operUser" clearable placeholder="请选择">
              <el-option 
                v-for="item in qualityTestRecord.options.operUserOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">收货流水号</div>
            <el-input v-model="qualityTestRecord.params.receivingSerialNo" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验部门</div>
            <el-select v-model="qualityTestRecord.params.dept" clearable placeholder="请选择">
              <el-option
                v-for="item in qualityTestRecord.options.deptOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">确认者</div>
            <el-select v-model="qualityTestRecord.params.affirmant" clearable placeholder="请选择">
              <el-option
                v-for="item in qualityTestRecord.options.affirmantOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验时间</div>
            <el-date-picker
              v-model="qualityTestRecord.params.qualityTestDate"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期"
              clearable>
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验领料人</div>
            <el-select v-model="qualityTestRecord.params.picker" clearable placeholder="请选择">
              <el-option
                v-for="item in qualityTestRecord.options.pickerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="20">
          <div class="bar">
            <div class="title">备注</div>
            <el-input v-model="qualityTestRecord.params.note" type="textarea" clearable :rows="3" style="margin-left: 30px"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="TestClick()">确认检验单信息</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button type="primary" size="small">新增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" size="small">删除</el-button>
        </el-col>
        <el-col :span="10">
          <div class="bar">
            <div class="title" style="min-width: 50px">条码</div>
            <el-input v-model="barCode" clearable placeholder="扫描条码增加数据" style="margin-left: 0"></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="small" @click="TestDetailClick()">确认物料检验结果</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="qualityTestRecordDetail"
        max-height="400"
        border
        @selection-change="changeCheckBoxFun"
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px">
        <el-table-column width="50" type="selection" align="center"></el-table-column>
        <el-table-column prop="materialCode" label="物料编码" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
        <el-table-column prop="qualityTestQuantity" label="检验数量" align="center"></el-table-column>
        <el-table-column prop="qualityTestMethod" label="检验方法" align="center">
          <template slot-scope="scope">
            <el-input v-model="qualityTestRecordDetail[scope.$index]['qualityTestMethod']"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="qualityTestStandard" label="检验标准" align="center">
          <template slot-scope="scope">
            <el-input v-model="qualityTestRecordDetail[scope.$index]['qualityTestStandard']"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="entryQuantity" label="可入库数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="qualityTestRecordDetail[scope.$index]['entryQuantity']"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="returnQuantity" label="退货数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="qualityTestRecordDetail[scope.$index]['returnQuantity']"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="原因" align="center">
          <template slot-scope="scope">
            <el-input v-model="qualityTestRecordDetail[scope.$index]['reason']"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="result" label="检验结果" align="center">
          <template slot-scope="scope">
            <el-input v-model="qualityTestRecordDetail[scope.$index]['result']"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qualityTestRecord: {
        params: {
          planSerialNo: '',
          qualityTestSerialNo: '',
          qualityTestAddr: '',
          operUser: '',
          receivingSerialNo: '',
          dept: '',
          affirmant: '',
          qualityTestDate: '',
          picker: '',
          status:'',
          note: '',
        },
        options: {
          operUserOptions: [
            {
              value: 550201,
              label: "检验员1"
            },
            {
              value: 550202,
              label: "检验员2"
            },
            {
              value: 550203,
              label: "检验员3"
            }
          ],
          deptOptions: [
            {
              value: 55501,
              label: "检验部门1"
            },
            {
              value: 55502,
              label: "检验部门2"
            },
            {
              value: 55503,
              label: "检验部门3"
            }
          ],
          affirmantOptions: [
            {
              value: 550301,
              label: "确认者1"
            },
            {
              value: 550302,
              label: "确认者2"
            },
            {
              value: 550303,
              label: "确认者3"
            }
          ],
          pickerOptions: [
            {
              value: 550101,
              label: "检验领料人1"
            },
            {
              value: 550102,
              label: "检验领料人2"
            },
            {
              value: 550103,
              label: "检验领料人3"
            }
          ],
        }
      },
      // rules: {
      //   qualityTestAddr: [
      //     { required: true, message: '请输入检验场所', trigger: 'blur'},
      //   ],
      //   dept: [
      //     { required: true, message: '请选择检验部门', trigger: 'blur'},
      //   ],
      //   affirmant: [
      //     { required: true, message: '请选择确认者', trigger: 'blur'},
      //   ]
      // },
      barCode: '',
      qualityTestRecordDetail: [
        {
          materialCode: '',
          unit: '',
          qualityTestQuantity: '',
          qualityTestMethod: '',
          qualityTestStandard: '',
          entryQuantity: '',
          returnQuantity: '',
          reason: '',
          result: '',
        }
      ],
      multipleSelection: [],
      controlData: {
        isAllMaterialGetTestFlag: 0,
        isFromPlan: false,
        isFromTest: false,
      },
    };
  },
  created: function (){
    const that = this;
    console.log("进入检验画面");
    console.log(`route` + that.$route);
    that.controlData.isAllMaterialGetTestFlag = 0;
    that.controlData.isFromPlan = false;
    that.controlData.isFromTest = false;
    var result = {};
    result = that.$route.query;
    if (result != null){
      that.controlData.isFromPlan = result["isFromPlan"];
      that.controlData.isFromTest = result["isFromTest"];
      // console.log(`isFromPlan控制数据为` + that.controlData.isFromPlan);
      // console.log(`isFromTest控制数据为` + that.controlData.isFromTest);
    }
    console.log(`isFromPlan控制数据为` + that.controlData.isFromPlan);
    console.log(`isFromTest控制数据为` + that.controlData.isFromTest);
    if (that.controlData.isFromTest == true){
      console.log(`数据从检验列表加载`);
      that.qualityTestRecord.params.qualityTestSerialNo = result["qualityTestSerialNo"];
      that.qualityTestRecord.params.receivingSerialNo = result["receivingSerialNo"];
      let params = {
        qualityTestSerialNo : result["qualityTestSerialNo"],
      }
      that.getQualityTestRecordDetailByQualityTestSerialNo(params);
      that.getPlanSerialNoByQualityTestSerialNo(params);
    }

    if (that.controlData.isFromPlan == true){
      console.log(`数据从计划列表加载`);
      that.qualityTestRecord.params.planSerialNo = result["planSerialNo"];
      let params = {
        planSerialNo : result["planSerialNo"],
      }
      that.getTestDataByPlanSerialNo(params);
    }
    console.log(`当前的数据为` + that.qualityTestRecord.params.qualityTestSerialNo);
  },
  methods: {
    changeCheckBoxFun(val){
      const that = this;
      that.multipleSelection = val;
      console.log(that.multipleSelection);
    },
    // ------------------------------------ 工具函数 ------------------------------------
    changeDate(date){
      var date = new Date(date);
      var y = date.getFullYear(); 
      var m = date.getMonth() + 1; 
      m = m < 10 ? ('0' + m) : m;  
      var d = date.getDate();  
      d = d < 10 ? ('0' + d) : d;  
      var h = date.getHours();  
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute; 
      var second= date.getSeconds();
      second = minute < 10 ? ('0' + second) : second;  
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second;  
    },
    //更新检验记录
    updateQualityTestRecord(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/updateQualityTestRecord`, params)
        .then(response => {
          console.log(`成功更新`+ (response.data).toString() +`条检验记录`);
        })
        .catch(error => {
          console.log(`更新检验记录失败`);
        });
    },
    // 更新入库计划
    updateStockInPlanByParams(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/updateStockInPlanByParams`, params)
        .then(response => {
          console.log(`成功更新`+ (response.data).toString() +`条入库计划`);
        })
        .catch(error => {
          console.log(`更新入库计划失败`);
        });
    },
    // 根据检验单号获取对应的检验记录明细
    getQualityTestRecordDetailByQualityTestSerialNo(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/getQualityTestRecordDetailByQualityTestSerialNo`, params)
        .then(response => {
          var result = response.data;
          for (var i = 0; i < result.length; i++){
            var thisResult = result[i];
            thisResult["entryQuantity"] = (thisResult["entryQuantity"]).toString();
            thisResult["returnQuantity"] = (thisResult["returnQuantity"]).toString();
            if (thisResult.hasOwnProperty("unitId")){  
              var unit = thisResult["unitId"];
              result[i]["unit"] = "计量单位" + unit.toString();
            }
          }
          that.qualityTestRecordDetail = result;
          // that.qualityTestRecordDetail = response.data;
          console.log(`加载检验记录明细成功，检验单号为：`, params.qualityTestSerialNo);
        })
        .catch(error => {
          console.log(`加载检验记录明细时出错，检验单号为：`, params.qualityTestSerialNo);
        });
    },
    // 更新检验记录明细
    updateQualityTestRecordDetail(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/updateQualityTestRecordDetail`, params)
        .then(response => {
          console.log(`成功更新`+ (response.data).toString() +`条检验记录明细`);
        })
        .catch(error => {
          console.log(`更新检验记录明细失败`);
        });
    },
    //判断一条检验记录的物料是否全部检验
    isAllMaterialGetTest(params, callback){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/isAllMaterialGetTest`, params)
        .then(response => {
          that.controlData.isAllMaterialGetTestFlag = response.data;
          console.log(`一条检验记录的物料是否全部检验标志位为` + that.controlData.isAllMaterialGetTestFlag);
          if(that.controlData.isAllMaterialGetTestFlag === 1){
            console.log(`更新检验记录的状态`);
            let updateParams = {
              qualityTestSerialNo : that.qualityTestRecord.params.qualityTestSerialNo,
              receivingSerialNo: that.qualityTestRecord.params.receivingSerialNo,
              status: 1,
            }
            that.updateQualityTestRecord(updateParams);
          }
        })
        .catch(error => {
          console.log(error);
        });
        if (callback !== undefined)
          return callback();
    },
    // 根据入库计划流水号获取检验信息
    getTestDataByPlanSerialNo(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/getTestDataByPlanSerialNo`, params)
        .then(response => {
          var result = response.data;
          console.log(response.data);
          // 检验记录数据
          var testData = result[0];
          if (testData[0].hasOwnProperty("qualityTestSerialNo")){
            testData[0]["qualityTestSerialNo"] = testData[0]["qualityTestSerialNo"];
          }
          if (testData[0].hasOwnProperty("receivingSerialNo")){
            testData[0]["receivingSerialNo"] = testData[0]["receivingSerialNo"];
          }
          console.log(`显示的检验数据如下`);
          console.log(testData[0]);
          that.qualityTestRecord.params = testData[0];
          
          // 检验记录明细
          var testDataDetail = result[1];
          console.log(testDataDetail);
          for (var i = 0; i < testDataDetail.length; i++){
            testDataDetail[i]["note"] = "";
            var thisResult = testDataDetail[i];
            if (thisResult.hasOwnProperty("unitId")){
              var unit = thisResult["unitId"];
              testDataDetail[i]["unit"] = "计量单位" + unit.toString();
            }
          }
          that.qualityTestRecordDetail = testDataDetail;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 根据检验单号获取入库计划流水号
    getPlanSerialNoByQualityTestSerialNo(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/getPlanSerialNoByQualityTestSerialNo`, params)
        .then(response => {
          that.qualityTestRecord.params.planSerialNo = response.data;
          console.log(`根据检验单号获取入库计划流水号为` + that.qualityTestRecord.params.planSerialNo)
        })
        .catch(error => {
          console.log(error);
        });
    },
    // ------------------------------------ 业务函数 ------------------------------------
    // 点击确认检验单信息
    TestClick(){
      const that = this;
      console.log("确认检验单信息按钮被点击");
      var updateTestRecordData = that.qualityTestRecord.params;
      var date = that.changeDate(updateTestRecordData.qualityTestDate);
      let qualityTestRecordParams = {
        qualityTestSerialNo: updateTestRecordData.qualityTestSerialNo,
        receivingSerialNo: updateTestRecordData.receivingSerialNo,
        qualityTestAddr: updateTestRecordData.qualityTestAddr,
        deptId: updateTestRecordData.dept,
        operUserId: updateTestRecordData.operUser,
        pickerId: updateTestRecordData.picker,
        affirmantId: updateTestRecordData.affirmant,
        qualityTestDate: date,
        note: updateTestRecordData.note,
      }
      console.log("检验记录更新Params如下");
      console.log(qualityTestRecordParams);
      that.updateQualityTestRecord(qualityTestRecordParams);
    },
    // 点击确认物料检验结果
    TestDetailClick(){
      const that = this;
      console.log("确认物料检验结果按钮被点击");
      var updateTestRecordDetailData = that.multipleSelection;
      for (var i = 0; i < updateTestRecordDetailData.length; i++){
        var thisData = updateTestRecordDetailData[i];
        let qualityTestRecordDetailParams = {
          qualityTestSerialNo: thisData.qualityTestSerialNo,
          receivingSerialNo: thisData.receivingSerialNo,
          materialCode: thisData.materialCode,
          qualityTestMethod: thisData.qualityTestMethod,
          qualityTestStandard: thisData.qualityTestStandard,
          entryQuantity: thisData.entryQuantity,
          returnQuantity: thisData.returnQuantity,
          reason: thisData.reason,
          result: thisData.result,
        }
        console.log("检验记录明细更新Params如下");
        console.log(qualityTestRecordDetailParams);
        that.updateQualityTestRecordDetail(qualityTestRecordDetailParams);
      }
      let updatePlanParams = {
        planSerialNo: that.qualityTestRecord.params.planSerialNo,
        qualityTestSerialNo: that.qualityTestRecord.params.qualityTestSerialNo,
        operation: 2
      }
      console.log("入库计划更新Params如下");
      console.log(updatePlanParams);
      that.updateStockInPlanByParams(updatePlanParams);
      let getFlagParams = {
          qualityTestSerialNo: updateTestRecordDetailData[0].qualityTestSerialNo,
        }
      that.isAllMaterialGetTest(getFlagParams);
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 18px;
        width: 90px;
        min-width: 50px;
        text-align: center;
      }
      .el-input {
        width: 70%;
        min-width: 80px;
        margin-left: 20px;
      }
      .el-select {
        width: 70%;
        min-width: 80px;
        margin-left: 20px;
      }
    }
  }
}
</style>
