<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select v-model="receivingRecords.receivingRecordInputs.vouchType" clearable placeholder="请选择关联单据类型">
            <el-option
              v-for="item in receivingRecordOptions.vouchTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="receivingRecords.receivingRecordInputs.vouchSerialNo" clearable placeholder="请输入关联单号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="bar">
            <div class="title">到货日</div>
            <el-date-picker
              v-model="receivingRecords.receivingRecordInputs.receivingDate"
              type="date"
              placeholder="选择日期"
              clearable>
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">接收仓库</div>
            <el-select v-model="receivingRecords.receivingRecordInputs.warehouse" clearable placeholder="请选择">
              <el-option
                v-for="item in receivingRecordOptions.warehouseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">收货地址</div>
            <el-select v-model="receivingRecords.receivingRecordInputs.receivingAddr" clearable placeholder="请选择">
              <el-option
                v-for="item in receivingRecordOptions.receivingAddrOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">收货人</div>
            <el-select v-model="receivingRecords.receivingRecordInputs.operUser" clearable placeholder="请选择">
              <el-option
                v-for="item in receivingRecordOptions.operUserOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 20px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">到货状况</div>
            <el-select v-model="receivingRecords.receivingRecordInputs.receivingStatus" clearable placeholder="请选择">
              <el-option
                v-for="item in receivingRecordOptions.receivingStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">发货单位</div>
            <el-select v-model="receivingRecords.receivingRecordInputs.delivery" clearable placeholder="请选择">
              <el-option
                v-for="item in receivingRecordOptions.deliveryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">发货地址</div>
            <el-select v-model="receivingRecords.receivingRecordInputs.deliveryAddr" clearable placeholder="请选择">
              <el-option
                v-for="item in receivingRecordOptions.deliveryAddrOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>  
        <el-col :span="6">
          <div class="bar">
            <div class="title">附件id</div>
            <el-input v-model="receivingRecords.receivingRecordInputs.attachmentId" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>          
      </el-row>
      <el-row :gutter="10" style="margin-top: 20px">
        <el-col :span="12">
          <div class="bar">
            <div class="title">备注</div>
            <el-input v-model="receivingRecords.receivingRecordInputs.note" type="textarea" :rows="3" placeholder="请输入" style="margin-left:20px"></el-input>
          </div>
        </el-col>
        <el-col :span="6" style="text-align: center">
          <el-button type="text">查看原始单据</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="receiveClick()">确认收货</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-table
        :data="receivingRecords.receivingRecordDetails"
        max-height="400"
        border
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; text-align: center">
        <el-table-column label="序号" width="50" type="index" align="center"></el-table-column>
        <el-table-column prop="materialCode" label="物料编码" align="center"></el-table-column>
        <el-table-column prop="format" label="规格" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
        <el-table-column prop="planQuantity" label="计划到货数量" align="center"></el-table-column>
        <el-table-column prop="receivingQuantity" label="到货数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="receivingRecords.receivingRecordDetails[scope.$index]['receivingQuantity']"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="到货总金额" align="center"></el-table-column>
        <el-table-column prop="note" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="receivingRecords.receivingRecordDetails[scope.$index]['note']"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StockInReceiveContent",
  data() {
    return {
      searchOptions:{
          searchParams:{
            vouchType: "",
            vouchSerialNo: "",
          },
          options: {
            
          },
      },
      receivingRecords:{
        receivingRecordInputs: {
          planSerialNo: "",
          vouchType: "",
          vouchSerialNo: "",
          entryType:"",
          receivingDate: "",
          warehouse: "",
          receivingAddr: "",
          operUser: "",
          receivingStatus: "",
          delivery: "",
          deliveryAddr: "",
          attachmentId: "",
          note: "",
        },
        receivingRecordDetails :[
          {
            materialCode: "10001",
            format: "规格1",
            unit: "米",
            planQuantity: "100",
            receivingQuantity: "0",
            singlePrice: "100",
            account: "0",
            note: "备注1",
          },
          {
            materialCode: "10002",
            format: "规格2",
            unit: "米",
            planQuantity: "200",
            receivingQuantity: "0",
            singlePrice: "200",
            account: "0",
            note: "备注2",
          }
        ]
      },
      controlData:{
        receivingCount: 0,
        qualityTestCount: 0,
        isAddreceivingRecord: false,
        isAddreceivingRecordDetail: false,
      },
      receivingRecordOptions: {
        warehouseOptions:[
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
        deliveryOptions:[
          {
            value: 66601,
            label: "苏州供应商"
          },
          {
            value: 66602,
            label: "无锡供应商"
          },
        ],
        deliveryAddrOptions:[
          {
            value: 666010,
            label: "苏州制造工厂"
          },
          {
            value: 666020,
            label: "无锡制造工厂"
          },
        ],
        receivingAddrOptions:[
          {
            value: 33100,
            label: "接收地址1"
          },
          {
            value: 33200,
            label: "接收地址2"
          },
          {
            value: 33300,
            label: "接收地址3"
          },
        ],
        operUserOptions:[
          {
            value: 3301,
            label: "收货人1"
          },
          {
            value: 3302,
            label: "收货人2"
          },
          {
            value: 3303,
            label: "收货人3"
          }
        ],
        receivingStatusOptions:[
          {
            value: 0,
            label: "未到货"
          },
          {
            value: 1,
            label: "部分到货"
          },
          {
            value: 2,
            label: "全部到货"
          },
          {
            value: 3,
            label: "超量到货"
          }
        ],
        vouchTypeOptions:[
          {
            value: 1,
            label: "采购单号"
          },
          {
            value: 2,
            label: "委托加工单号"
          },
          {
            value: 3,
            label: "生产单号"
          },
          {
            value: 4,
            label: "销售单号"
          },
          {
            value: 5,
            label: "生产退回单号"
          },
          {
            value: 6,
            label: "其他入库单号"
          }
        ]
      },
      // tableData: [
      //   {
      //     materialCode: "10001",
      //     format: "规格1",
      //     unit: "米",
      //     planQuantity: "100",
      //     receivingQuantity: "0",
      //     singlePrice: "100",
      //     account: "0",
      //     note: "备注1",
      //   }
      // ]
    };
  },
  created: function (){
    const that = this;
    console.log("进入收货画面")
    console.log(`route` + that.$route);
    var result = {};
    result = that.$route.query;
    that.receivingRecords.receivingRecordInputs = result;
    that.controlData.isAddreceivingRecord = false;
    that.controlData.isAddreceivingRecordDetail = false;
    that.getLastReceivingRecord();
    that.getLastQualityTestRecordId();
    var i = 0;
    for (let key in that.receivingRecords.receivingRecordInputs){
      if (key === "warehouseId"){
        that.receivingRecords.receivingRecordInputs.warehouse = parseInt(result["warehouseId"]);
      }
      if (key === "receivingAddrId"){
        that.receivingRecords.receivingRecordInputs.receivingAddr = result["receivingAddrId"]
      }
      if (key === "operUserId"){
        that.receivingRecords.receivingRecordInputs.operUser = result["operUserId"]
      }
      if (key === "deliveryId"){
        that.receivingRecords.receivingRecordInputs.delivery = result["deliveryId"]
      }
      if (key === "deliveryAddrId"){
        that.receivingRecords.receivingRecordInputs.deliveryAddr = result["deliveryAddrId"]
      }
    }
    console.log(result);
    console.log("receivingRecordInputs");
    console.log(that.receivingRecords.receivingRecordInputs);
    let params = {
      planSerialNo: result["planSerialNo"]
    }
    that.getStockInPlanDetailByPlanSerialNo(params);

  },
  methods: {
    // ------------------------------------ 工具函数 ------------------------------------
    changeDate(date){
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
    // 根据入库计划流水号获取相应的入库计划明细
    getStockInPlanDetailByPlanSerialNo(params, callback){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/getStockInPlanDetailByPlanSerialNo`, params)
        .then(response => {
          var result = response.data;
          for (var i = 0; i < result.length; i++){
            var thisResult = result[i];
            result[i]["note"] = "";
            if (thisResult.hasOwnProperty("specification")){
              var format = thisResult["specification"];
              result[i]["format"] = format.toString();
            }
            if (thisResult.hasOwnProperty("unitId")){
              var unit = thisResult["unitId"];
              result[i]["unit"] = "计量单位" + unit.toString();
            }
            if (thisResult.hasOwnProperty("planQuantity")){
              var stockInNum = thisResult["planQuantity"];
              result[i]["planQuantity"] = stockInNum.toString();
            }
            if (thisResult.hasOwnProperty("price")){
              var singlePrice = thisResult["price"];
              result[i]["singlePrice"] = singlePrice.toString();
            }
          }
          that.receivingRecords.receivingRecordDetails = result;
          console.log(`加载明细成功，加载流水号为：`, params.planSerialNo);
        })
        .catch(error => {
            console.log(`加载明细时出错，加载流水号为：`, params.planSerialNo);
        });
    if (callback !== undefined) 
        return callback();
    },  
    // 获取最后一条收货记录的id
    getLastReceivingRecord(){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/getLastReceivingRecordId`)
        .then(response => {
          // console.log(response.data);
          that.controlData.receivingCount = parseInt(response.data) + 1;
          console.log("receivingCount:" + that.controlData.receivingCount);
          console.log(`获取最后一条收货记录的id成功`);
        })
        .catch(error => {
          console.log(`获取最后一条收货记录的id失败`);
        });
    },
    // 获取最后一条检验记录的id
    getLastQualityTestRecordId(){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/getLastQualityTestRecordId`)
        .then(response => {
          // console.log(response.data);
          that.controlData.qualityTestCount = parseInt(response.data) + 1;
          console.log("qualityTestCount:" + that.controlData.qualityTestCount);
          console.log(`获取最后一条检验记录的id成功`);
        })
        .catch(error => {
          console.log(`获取最后一条检验记录的id失败`);
        });
    },
    // 新增收货记录
    addReceivingRecord(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/addReceivingRecord`, params)
        .then(response => {
          // console.log(response.data);
          console.log(`成功新增`+ (response.data).toString() +`条收货记录`);
        })
        .catch(error => {
          console.log(`新增收货记录失败`);
        });
        that.controlData.isAddreceivingRecord = true;
        console.log(that.controlData.isAddreceivingRecord);
    },
    // 新增收货记录明细
    addReceivingRecordDetail(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/addReceivingRecordDetail`, params)
        .then(response => {
          if(response.data == -1){
            console.log(`新增收货记录明细失败`);
          }
          else{
            console.log(`成功新增`+ (response.data).toString() +`条收货记录明细`);
            that.controlData.isAddreceivingRecordDetail = true;
          }
        })
        .catch(error => {
          console.log(`新增收货记录明细失败`);
        });
    },
    // 新增检验记录
    addQualityTestRecord(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/addQualityTestRecord`, params)
        .then(response => {
          if(response.data == -1){
            console.log(`新增检验记录失败`);
          }
          else{
            console.log(`成功新增`+ (response.data).toString() +`条检验记录`);
          }
        })
        .catch(error => {
          console.log(`新增检验记录失败`);
        });
    },
    // ------------------------------------ 业务函数 ------------------------------------
    // 点击确认收货 
    receiveClick(){
      const that = this;
      console.log(`确认收货按钮点击`);
      var receivingRecordsData = that.receivingRecords.receivingRecordInputs;
      var date = that.changeDate(receivingRecordsData.receivingDate);
      // 新增收货记录
      let receivingRecordParams = {
        receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
        planSerialNo: receivingRecordsData.planSerialNo,
        vouchSerialNo: receivingRecordsData.vouchSerialNo,
        vouchType: receivingRecordsData.vouchType,
        entryType: receivingRecordsData.entryType,
        deliveryId: receivingRecordsData.delivery,
        deliveryAddrId: receivingRecordsData.deliveryAddr,
        receivingDate: date,
        warehouseId: receivingRecordsData.warehouse,
        receivingAddrId: receivingRecordsData.receivingAddr,
        operUserId: receivingRecordsData.operUser, 
        receivingStatus: receivingRecordsData.receivingStatus,
        attachmentId: receivingRecordsData.attachmentId,
        note: receivingRecordsData.note,    
      }
      console.log("收货记录params");
      console.log(receivingRecordParams);
      that.addReceivingRecord(receivingRecordParams);
      // console.log(that.controlData.isAddreceivingRecord);
      // that.controlData.isAddreceivingRecord = true;

      // 新增检验记录
      if(that.controlData.isAddreceivingRecord == true){
        let qualityTestRecordParams = {
          qualityTestSerialNo: "test" + (that.controlData.qualityTestCount).toString(),
          receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
        }
        console.log("检验记录params");
        console.log(qualityTestRecordParams);
        that.addQualityTestRecord(qualityTestRecordParams);
      }

      // 新增收货记录明细
      console.log("需要新增" + that.receivingRecords.receivingRecordDetails.length + "条收货记录明细");
      for (var i = 0; i < that.receivingRecords.receivingRecordDetails.length; i++){
        var result = that.receivingRecords.receivingRecordDetails[i];
        that.controlData.isAddreceivingRecordDetail = false;
        // result["note"] = '';
        let receivingRecordDetailsParams = {
          receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
          planSerialNo: that.receivingRecords.receivingRecordInputs.planSerialNo,
          materialCode: result.materialCode,
          unitId: parseInt(result.unitId),
          receivingQuantity: parseInt(result.receivingQuantity),
          note: result.note,
        }
        console.log("receivingRecordDetailsParams");
        console.log(receivingRecordDetailsParams);
        that.addReceivingRecordDetail(receivingRecordDetailsParams);

        // // 新增检验记录明细
        // if(that.controlData.isAddreceivingRecordDetail = true){
        //   let receivingRecordDetailParams = {
        //     qualityTestSerialNo: "test" + (that.controlData.qualityTestCount).toString(),
        //     receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
        //     materialCode: result.materialCode,
        //     unitId: parseInt(result.unitId),
        //   }
        // }
      }     
      if (that.controlData.isAddreceivingRecord = true){
        that.controlData.receivingCount += 1;
        console.log(that.controlData.receivingCount);
      }
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
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 18px;
        min-width: 70px;
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
