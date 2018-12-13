<template>
  <div class="body">
    <el-card class="box-card">
      <el-col :span="21">
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="bar">
              <div class="title">入库单号</div>
              <el-input v-model="warehouseStockInRecord.params.entrySerialNo" clearable placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">入库日期</div>
              <el-date-picker
                v-model="warehouseStockInRecord.params.entryDate"
                type="date"
                placeholder="选择日期"
                clearable>
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">入库人</div>
              <el-select v-model="warehouseStockInRecord.params.operUser" clearable placeholder="请选择">
                <el-option
                  v-for="item in warehouseStockInRecord.options.operUserOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="bar">
              <div class="title">收入仓库</div>
              <el-select v-model="warehouseStockInRecord.params.warehouse" clearable placeholder="请选择">
                <el-option
                  v-for="item in warehouseStockInRecord.options.warehouseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">部门</div>
              <el-select v-model="warehouseStockInRecord.params.dept" clearable placeholder="请选择">
                <el-option
                  v-for="item in warehouseStockInRecord.options.deptOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">供应商</div>
              <el-select v-model="warehouseStockInRecord.params.delivery" clearable placeholder="请选择">
                <el-option
                  v-for="item in warehouseStockInRecord.options.deliveryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="bar">
              <div class="title">采购订单</div>
              <el-input v-model="warehouseStockInRecord.params.vouchSerialNo" clearable placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="16">
            <el-button type="text" disabled>查看采购订单</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="bar">
              <div class="title">备注</div>
              <el-input v-model="warehouseStockInRecord.params.note" type="textarea" :rows="3" style="margin-left:20px"></el-input>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" style="width: 100%; margin: 0 15px 30px" @click="createStockInFormClick">创建入库单</el-button>
        <!-- <div v-else>
          <el-button type="success" style="width: 100%; margin: 0 15px 30px" @click="shelfDetail">上架</el-button>
          <el-button type="danger" style="width: 100%; margin: 0 15px 10px">确认入库</el-button>
        </div> -->
      </el-col>
    </el-card>
    <el-card class="box-card" v-show="controlData.hasDetails">
      <el-row :gutter="10">
        <el-col :span="2">
          <el-button type="info" size="small" disabled>添加</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" size="small" disabled>删除</el-button>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title" style="min-width: 50px">条码</div>
            <el-input v-model="barCode" clearable placeholder="扫描条码增加数据" style="margin-left: 0"></el-input>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="bar">
            <div class="title" style="width: 100px">入库金额：</div>
            <div style="font-size: 18px;margin-right: 30px;width: 100px">{{ammount}}元</div>
            <div class="title" style="width: 180px">入库金额（含税）：</div>
            <div style="font-size: 18px;width: 100px">{{taxAmmount}}元</div>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="warehouseStockInRecord.details"
        max-height="400"
        border
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px">
        <el-table-column width="50" type="selection" align="center"></el-table-column>
        <el-table-column prop="materialCode" label="商品编号" align="center"></el-table-column>
        <el-table-column prop="materialName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="format" label="规格" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
        <!-- ////di -->
        <!-- <el-table-column prop="unitId" label="计量单位" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.unitId">
              <el-option label="米" :value=1></el-option>
              <el-option label="分米" :value=2></el-option>
              <el-option label="厘米" :value=3></el-option>
              <el-option label="毫米" :value=4></el-option>
            </el-select>
          </template>
        </el-table-column> -->
        <!-- ////di -->
        <el-table-column prop="batchCode" label="批号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.batchCode"></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="entryQuantity" label="入库数量" align="center"></el-table-column> -->
        <el-table-column prop="entryQuantity" label="入库数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.entryQuantity"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" align="center"></el-table-column>
        <!-- <el-table-column prop="price" label="单价" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column> -->
        <el-table-column prop="ammount" label="金额" align="center"></el-table-column>
        <el-table-column prop="ticket" label="开票" align="center"></el-table-column>
        <el-table-column prop="tax" label="税率" align="center"></el-table-column>
        <el-table-column prop="taxPrice" label="含税单价" align="center"></el-table-column>
        <el-table-column prop="taxAmmount" label="含税金额" align="center"></el-table-column>
        <el-table-column prop="note" label="备注" align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      warehouseStockInRecord: {
        params: {
          planSerialNo: '',
          entrySerialNo: '',
          entryType: '',
          vouchSerialNo: '',
          vouchType: '',
          warehouse: '',
          dept: '',
          operUser: '',
          delivery: '',
          entryDate: '',
          note: '',
        },
        details:[
          {
            materialCode: '',
            materialName: '',
            format: '',
            unit: '',
            batchCode: '',
            entryQuantity: '',
            price: '',
            ammount: '',
            ticket: '',
            tax: '',
            taxPrice: '',
            taxAmmount: '',
            note: '',
          }
        ],
        options: {
          operUserOptions: [
            {
              value: 333001,
              label: "入库人员1"
            },
            {
              value: 333002,
              label: "入库人员2"
            },
            {
              value: 333003,
              label: "入库人员3"
            },
          ],
          warehouseOptions: [
            {
              value: 3331,
              label: "仓库1"
            },
            {
              value: 3332,
              label: "仓库2"
            },
            {
              value: 3333,
              label: "仓库3"
            }
          ],
          deptOptions: [
            {
              value: 333111,
              label: "入库部门1"
            },
            {
              value: 333112,
              label: "入库部门2"
            },
            {
              value: 333113,
              label: "入库部门3"
            }
          ],
          deliveryOptions: [
            {
              value: 66601,
              label: "苏州供应商"
            },
            {
              value: 66602,
              label: "无锡供应商"
            },
          ],
        },
      },
      controlData:{
        hasDetails: true,
        isFromPlan :false,
        isFromTest: false,
        stockInCount: 0,
      },
      barCode: '',
      ammount: 0,
      taxAmmount: 0,
      // warehouseStockInRecordDetail: [],
      // showCreate: true,
    }
  },
  created() {
    // 获取入库记录数据
    // const that = this;
    // that.warehouseStockInRecord.params = that.$route.params;
    const that = this;
    console.log("进入入库画面");
    console.log(`route` + that.$route);
    that.controlData.isFromPlan = false;
    that.controlData.isFromTest = false;
    var result = {};
    result = that.$route.query;
    if (result != null){
      that.controlData.isFromPlan = result["isFromPlan"];
      that.controlData.isFromTest = result["isFromTest"];
    }
    console.log(`isFromPlan控制数据为` + that.controlData.isFromPlan);
    console.log(`isFromTest控制数据为` + that.controlData.isFromTest);
    that.getLastStockInRecordId();
    if(that.controlData.isFromPlan == true){
      console.log("数据从计划页面读取");
      var i = 0;
      that.warehouseStockInRecord.params = result;
      for (let key in that.warehouseStockInRecord.params){
        if (key === "warehouseId"){
          that.warehouseStockInRecord.params.warehouse = parseInt(result["warehouseId"]);
        }
        if (key === "deptId"){
          that.warehouseStockInRecord.params.dept = parseInt(result["deptId"]);
        }
        if (key === "deliveryId"){
          that.warehouseStockInRecord.params.delivery = parseInt(result["deliveryId"]);
        }
      }
      
      
      console.log("所加载的入库记录信息如下");
      console.log(that.warehouseStockInRecord.params);
      console.log(that.warehouseStockInRecord.params.warehouse);
      let params = {
          planSerialNo: result["planSerialNo"],
          // needEntryQuantity: 1
      }
      that.getStockInPlanDetailByPlanSerialNo(params);
      // that.init();
      // var newResult = that.warehouseStockInRecord.details;
      // console.log(that.warehouseStockInRecord.details);
      // for (var i = 0; i < newResult.length; i++){
      //   var thisResult = newResult[i];
      //   let newParams = {
      //     planSerialNo: result["planSerialNo"],
      //     materialCode: thisResult["thisResult"]
      //   }
      //   console.log("newParams");
      //   console.log(newParams);
      // }
    }
    if(that.controlData.isFromTest == true){
      console.log("数据从检验列表页面读取");
      var qualityTestSerialNo = result["qualityTestSerialNo"];
      
      let params = {
        qualityTestSerialNo: qualityTestSerialNo
      }
      that.getPlanDataByQualityTestSerialNo(params);

      // let newParams = {
      //     planSerialNo : that.warehouseStockInRecord.params.planSerialNo,
      //     needEntryQuantity: 1
      // }
      // that.sleep(1000);
      // that.getStockInPlanDetailByPlanSerialNo(newParams);
      // let newParams = {
      //   planSerialNo : that.warehouseStockInRecord.params.planSerialNo
      // }
      // that.sleep(1000);
      // that.getStockInPlanByPlanSerialNo(newParams);
    }
    
    ////// di
    // that.warehouseStockInRecord.params.entrySerialNo = "110001";
    // that.warehouseStockInRecord.params.entryDate = "Fri Nov 23 2018 00:00:00 GMT+0800";
    // that.warehouseStockInRecord.params.operUserId = 1;
    // that.warehouseStockInRecord.params.warehouseId = 1;
    // that.warehouseStockInRecord.params.deptId = 1;
    // that.warehouseStockInRecord.params.deliveryId = 1;
    // that.warehouseStockInRecord.params.vouchSerialNo = "100001";
    // that.warehouseStockInRecord.params.note = "";
    // that.warehouseStockInRecord.options.operUserOptions = [{
    //   value: 1,
    //   label: "张三"
    // }];
    // that.warehouseStockInRecord.options.warehouseOptions = [{
    //   value: 1,
    //   label: "一号仓库"
    // }];
    // that.warehouseStockInRecord.options.deptOptions = [{
    //   value: 1,
    //   label: "销售部"
    // }];
    // that.warehouseStockInRecord.options.deliveryOptions = [{
    //   value: 1,
    //   label: "锦州生产商",
    // }];

    // // 获取入库记录明细数据
    // that.warehouseStockInRecordDetail = [{
    //   materialCode: '1101',
    //   materialName: '麻布一批',
    //   specification: '匹',
    //   unitId: 1,
    //   batchCode: '110',
    //   entryQuantity: 100,
    //   price: 1000,
    //   ammount: '',
    //   ticket: '已开票',
    //   tax: '',
    //   taxprice: 1005,
    //   taxammount: '',
    //   note: '',
    // }, {
    //   materialCode: '1102',
    //   materialName: '面部一批',
    //   specification: '匹',
    //   unitId: 1,
    //   batchCode: '120',
    //   entryQuantity: 200,
    //   price: 1000,
    //   ammount: '',
    //   ticket: '已开票',
    //   tax: '',
    //   taxprice: 1005,
    //   taxammount: '',
    //   note: '',
    // }];
    // 
    ///// di
  },
  computed: {

  },
  methods: {
    ///// di
    init() {
      const that = this;
      that.warehouseStockInRecordDetail.forEach(element => {
        // 将table中ammount,tax,taxAmmount属性更新
        element.ammount = element.entryQuantity * element.price;
        element.tax = (element.taxPrice-element.price)/element.price*100 + '%';
        element.taxAmmount = element.entryQuantity * element.taxPrice;
        // 获取总入库金额和总入库（含税）金额
        that.ammount += element.ammount;
        that.taxAmmount += element.taxAmmount;
      });
    },
    ///// di
    // ------------------------------------ 工具函数 ------------------------------------
    changeDate(date){
      // console.log(date);
      var date = new Date(date);
      // console.log(date);
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
    // 睡眠
    sleep(numberMillis) {
      var now = new Date();
	    var exitTime = now.getTime() + numberMillis;
	    while (true) {
		    now = new Date();
		    if (now.getTime() > exitTime)
		    return;
	    }
    },
    // 获取最后一条入库记录的id
    getLastStockInRecordId(){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/getLastStockInRecordId`)
        .then(response => {
          // console.log(response.data);
          that.controlData.stockInCount = parseInt(response.data) + 1;
          console.log("stockInCount:" + that.controlData.stockInCount);
          console.log(`获取最后一条入库记录的id成功`);
        })
    },
    // 根据入库计划流水号获取相应的入库计划明细(入库计划流水号跳转时传递)
    getStockInPlanDetailByPlanSerialNo(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/getStockInPlanDetailByPlanSerialNo`, params)
        .then(response => {
          var result = response.data;
          for (var i = 0; i < result.length; i++){
            var thisResult = result[i];
            result[i]["note"] = "";
            result[i]["materialName"] = "商品名称" + result[i]["materialCode"];
            if (thisResult.hasOwnProperty("specification")){ // 规格
              var format = thisResult["specification"];
              result[i]["format"] = format.toString();
            }
            if (thisResult.hasOwnProperty("unitId")){
              var unit = thisResult["unitId"];
              result[i]["unit"] = "计量单位" + unit.toString();
            }
          }
          that.warehouseStockInRecord.details = result;
          that.warehouseStockInRecord.params.entrySerialNo = "entry" + (that.controlData.stockInCount).toString();
          console.log(`加载计划部分读取的明细成功，加载流水号为：`, params.planSerialNo);
        })
        .catch(error => {
            console.log(`加载计划部分读取的明细失败，流水号为：`, params.planSerialNo);
        });
    },
    // 增加入库记录
    addWarehouseStockInRecord(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/addWarehouseStockInRecord`, params)
        .then(response => {
          console.log(`成功新增`+ (response.data).toString() +`条入库记录`);
        })
        .catch(error => {
          console.log(`新增入库记录失败`);
        });
    },
    // 增加入库记录明细
    addWarehouseStockInRecordDetail(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/addWarehouseStockInRecordDetail`, params)
        .then(response => {
          console.log(`成功新增`+ (response.data).toString() +`条入库记录明细`);
        })
        .catch(error => {
          console.log(`新增入库记录明细失败`);
        });
    },
    //根据检验单号获取入库计划信息
    getPlanDataByQualityTestSerialNo(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/getPlanDataByQualityTestSerialNo`, params)
        .then(response => {
          var result = response.data;
          // 计划数据
          var planData = result[0];
          planData[0]["operUserId"] = "";
          planData[0]["entrySerialNo"] = "entry" + (that.controlData.stockInCount).toString();
          if (planData[0].hasOwnProperty("planSerialNo")){
            planData[0]["planSerialNo"] = planData[0]["planSerialNo"];
          }
          if (planData[0].hasOwnProperty("entryType")){
            planData[0]["entryType"] = planData[0]["entryType"];
          }
          if (planData[0].hasOwnProperty("vouchSerialNo")){
            planData[0]["vouchSerialNo"] = planData[0]["vouchSerialNo"];
          }
          if (planData[0].hasOwnProperty("vouchType")){
            planData[0]["vouchType"] = planData[0]["vouchType"];
          }
          if (planData[0].hasOwnProperty("warehouseId")){
            planData[0]["warehouse"] = planData[0]["warehouseId"];
          }
          if (planData[0].hasOwnProperty("deliveryId")){
            planData[0]["delivery"] = planData[0]["deliveryId"];
          }
          console.log(`显示的计划数据如下`);
          console.log(planData[0]);
          that.warehouseStockInRecord.params = planData[0];
          
          // 计划明细数据
          var planDetailData = result[1];
          console.log(planDetailData);
          for (var i = 0; i < planDetailData.length; i++){
            var thisResult = planDetailData[i];
            // console.log(`thisResult`);
            // console.log(thisResult);
            planDetailData[i]["note"] = "";
            planDetailData[i]["materialName"] = "商品名称" + planDetailData[i]["materialCode"];
            if (thisResult.hasOwnProperty("specification")){ // 规格
              var format = thisResult["specification"];
              planDetailData[i]["format"] = format.toString();
            }
            if (thisResult.hasOwnProperty("unitId")){
              var unit = thisResult["unitId"];
              planDetailData[i]["unit"] = "计量单位" + unit.toString();
            }
          }
          that.warehouseStockInRecord.details = planDetailData;
          
          console.log(`获取的入库计划流水号：` + that.warehouseStockInRecord.params.planSerialNo);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // ------------------------------------ 业务函数 ------------------------------------
    // 创建入库单按钮点击
    createStockInFormClick(){
      const that = this;
      console.log(`创建入库单按钮点击`);
      var stockInData = that.warehouseStockInRecord.params;
      var date = that.changeDate(stockInData.entryDate);
      let stockInParams = {
        entrySerialNo:  stockInData.entrySerialNo,
        entryType: stockInData.entryType,
        vouchSerialNo: stockInData.vouchSerialNo,
        vouchType: stockInData.vouchType,
        warehouseId: stockInData.warehouse,
        deptId: stockInData.dept,
        operUserId :stockInData.operUser,
        deliveryId: stockInData.delivery,
        entryDate: date,
        result: 1,
        note: stockInData.note
      }
      console.log("入库记录params");
      console.log(stockInParams);
      that.addWarehouseStockInRecord(stockInParams);
      for (var i = 0; i < that.warehouseStockInRecord.details.length; i++){
        console.log(i);
        var result = that.warehouseStockInRecord.details[i];
        let stockInDetailParams = {
          entrySerialNo:  "entry" + (that.controlData.stockInCount).toString(),
          materialCode: result.materialCode,
          batchCode: result.batchCode,
          unitId: parseInt(result.unitId),
          entryQuantity: result.entryQuantity,
          price : result.price,
          taxPrice: result.taxPrice,
          // note: result.note
        }
        console.log("入库记录明细params");
        console.log(stockInDetailParams);
        that.addWarehouseStockInRecordDetail(stockInDetailParams);
      }
    }
    ///// di
    // createStockInForm() {
    //   const that = this;
    //   // let sendData = {
    //   //   'entrySerialNo' : that.warehouseStockInRecordDetail
    //   //   entryDate
    //   // }
    //   let recordData = that.warehouseStockInRecord.params;
    //   recordData['entryDate'] = that.changeDate(recordData['entryDate']);
    //   recordData['entryType'] = 1;
    //   recordData['vouchType'] = 1;
    //   recordData['result'] = 1;
    //   that.$axios.post(`${window.$config.HOST}/wareHouse/stockIn/addWarehouseStockInRecord`, recordData)
    //   .then(response => {
    //     console.log("添加入库记录结果：" + response.data);
    //     that.showCreate = false;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    //   let detailData = {'data':[]};
    //   that.warehouseStockInRecordDetail.forEach(element => {
    //     detailData.data.push({
    //       'entrySerialNo' : that.warehouseStockInRecord.params.entrySerialNo,
    //       'materialCode' : element.materialCode,
    //       'batchCode' : element.batchCode,
    //       'unitId' : element.unitId,
    //       'entryQuantity' : element.entryQuantity,
    //       'price' : element.price,
    //       'taxPrice' : element.taxprice,
    //       'note' : element.note,
    //     });
    //   })
    //   // console.log(detailData);
    //   that.$axios.post(`${window.$config.HOST}/wareHouse/stockIn/addWarehouseStockInRecordDetail`, detailData)
    //   .then(response => {
    //     console.log("添加入库记录明细结果：" + response.data)
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    //   that.$router.push({name: 'StockInList'})
    // },
    ///// di
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
        width: 80px;
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
