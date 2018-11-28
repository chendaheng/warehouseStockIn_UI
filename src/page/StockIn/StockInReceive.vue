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
        <el-table-column prop="note" label="备注" align="center"></el-table-column>
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
        receivingCount: 1,
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
    console.log(`route` + that.$route);
    var result = {};
    result = that.$route.query;
    that.receivingRecords.receivingRecordInputs = result;
    that.controlData.isAddreceivingRecord = false;
    that.controlData.isAddreceivingRecordDetail = false;
    
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
    // 新增收货记录
    addReceivingRecord(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/addReceivingRecord`, params)
        .then(response => {
          // console.log(response.data);
          console.log(`成功新增`+ (response.data).toString() +`条收货记录`);
          that.controlData.isAddreceivingRecord = true;
        })
        .catch(error => {
          console.log(`新增收货记录失败`);
        });
    },
    // 新增收货记录明细
    addReceivingRecordDetail(params){
      const that = this;
      var newParams = {};
      if(params.length == 1) {
        console.log("params长度: " + params.length);
        params["planSerialNo"] = that.receivingRecords.receivingRecordInputs.planSerialNo;
        params["receivingSerialNo"] = "receive" + (that.controlData.receivingCount).toString();
        let newParams = params;
      }
      if(params.length > 1){
        console.log("params长度: " + params.length);
        for (var i = 0; i < params.length; i++){
          params[i]["planSerialNo"] = that.receivingRecords.receivingRecordInputs.planSerialNo;
        }
        let newParams = {
          data : params,
        }
      }
      
      console.log(params);
      console.log("newParams");
      console.log(newParams);
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/addReceivingRecordDetail`, newParams)
        .then(response => {
          console.log(`成功新增`+ (response.data).toString() +`条收货记录明细`);
        })
        .catch(error => {
          console.log(`新增收货记录明细失败`);
        });
      
    },
    
    // ------------------------------------ 业务函数 ------------------------------------
    // 点击确认收货 
    receiveClick(){
      const that = this;
      console.log(`确认收货按钮点击`);
      var date = that.changeDate(that.receivingRecords.receivingRecordInputs.receivingDate);
      let params = {
        receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
        planSerialNo: that.receivingRecords.receivingRecordInputs.planSerialNo,
        vouchSerialNo: that.receivingRecords.receivingRecordInputs.vouchSerialNo,
        vouchType: that.receivingRecords.receivingRecordInputs.vouchType,
        entryType: that.receivingRecords.receivingRecordInputs.entryType,
        deliveryId: that.receivingRecords.receivingRecordInputs.delivery,
        deliveryAddrId: that.receivingRecords.receivingRecordInputs.deliveryAddr,
        receivingDate: date,
        warehouseId: that.receivingRecords.receivingRecordInputs.warehouse,
        receivingAddrId: that.receivingRecords.receivingRecordInputs.receivingAddr,
        operUserId: that.receivingRecords.receivingRecordInputs.operUser, 
        receivingStatus: that.receivingRecords.receivingRecordInputs.receivingStatus,
        attachmentId: that.receivingRecords.receivingRecordInputs.attachmentId,
        note: that.receivingRecords.receivingRecordInputs.note,    
      }
      console.log(params);
      that.addReceivingRecord(params);
      that.addReceivingRecordDetail(that.receivingRecords.receivingRecordDetails);
      if (that.controlData.isAddreceivingRecord = true){
        that.controlData.receivingCount += 1;
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
