<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">关联类型</div>
            <el-select v-model="outPlanReceive.params.vouchType" clearable placeholder="请选择">
              <el-option 
                v-for="item in outPlanReceive.options.vouchTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">关联单号</div>
            <el-input v-model="outPlanReceive.params.vouchSerialNo" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">到货日期</div>
            <el-date-picker v-model="outPlanReceive.params.receivingDate" type="date" placeholder="请选择日期"></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">接收仓库</div>
            <el-select v-model="outPlanReceive.params.warehouse" clearable placeholder="请选择">
              <el-option
                v-for="item in outPlanReceive.options.warehouseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">收货地址</div>
            <el-select v-model="outPlanReceive.params.receivingAddr" clearable placeholder="请选择">
              <el-option
                v-for="item in outPlanReceive.options.receivingAddrOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">收货人</div>
            <el-select v-model="outPlanReceive.params.operUser" clearable placeholder="请选择">
              <el-option
                v-for="item in outPlanReceive.options.operUserOptions"
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
            <div class="title">发货单位</div>
            <el-select v-model="outPlanReceive.params.delivery" clearable placeholder="请选择">
              <el-option
                v-for="item in outPlanReceive.options.deliveryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">发货地址</div>
            <el-select v-model="outPlanReceive.params.deliveryAddr" clearable placeholder="请选择">
              <el-option
                v-for="item in outPlanReceive.options.deliveryAddrOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">附件id</div>
            <el-input v-model="outPlanReceive.params.attachmentId" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>        
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <div class="bar">
            <div class="title">收货备注</div>
            <el-input v-model="outPlanReceive.params.note" type="textarea" clearable :rows="3" style="margin-left: 30px"></el-input>
          </div>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button type="primary" @click="receiveClick()">确认收货信息</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row>
        <el-col :span="2">
          <el-button type="primary" size="medium">新增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" size="medium">删除</el-button>
        </el-col>
        <el-col :span="4" :offset="15">
          <el-button type="primary" @click="receiveDetailClick()">确认收货明细</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="outPlanDetail"
        max-height="400"
        border
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px">
        <el-table-column width="50" type="selection" align="center"></el-table-column>
        <el-table-column prop="materialCode" label="物料编码" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.materialCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="specification" label="规格" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.unit">
              <el-option label="米" value="1"></el-option>
              <el-option label="分米" value="2"></el-option>
              <el-option label="厘米" value="3"></el-option>
              <el-option label="毫米" value="4"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="receivingQuantity" label="到货数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.receivingQuantity"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" align="center"></el-table-column>
        <el-table-column prop="totalPrice" label="到货总金额" align="center"></el-table-column>
        <el-table-column prop="note" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.note"></el-input>
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
      outPlanReceive: {
        params: {
          vouchType: "",
          vouchSerialNo: "",
          receivingDate: "",
          warehouse: "",
          receivingAddr: "",
          operUser: "",
          delivery: "",
          deliveryAddr: "",
          attachmentId: 0,
          note: "",
        },
        options: {
          vouchTypeOptions: [
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
          receivingAddrOptions: [
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
          operUserOptions: [
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
          deliveryAddrOptions: [
            {
              value: 666010,
              label: "苏州制造工厂"
            },
            {
              value: 666020,
              label: "无锡制造工厂"
            },
          ],
        }
      },
      value: '',
      outPlanDetail: [
        {
          materialCode: '',
          specification: '',
          unit: '',
          receivingQuantity: '',
          price: '',
          totalPrice: '',
          note: '',
        },
        {
          materialCode: '',
          specification: '',
          unit: '',
          receivingQuantity: '',
          price: '',
          totalPrice: '',
          note: '',
        }
      ],
      controlData:{
        receivingCount: 0,
        qualityTestCount: 0,
        isAddreceivingRecord: false,
        isAddreceivingRecordDetail: false,
      },
    };
  },
  created: function (){
    const that = this;
    console.log("进入非计划收货画面");
    that.controlData.isAddreceivingRecord = false;
    that.controlData.isAddreceivingRecordDetail = false;
    console.log("重置标志位成功");
    that.getLastReceivingRecord();
    that.getLastQualityTestRecordId();
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
    // 新增检验记录明细
    addQualityTestRecordDetail(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/addQualityTestRecordDetail`, params)
        .then(response => {
          if(response.data == -1){
            console.log(`新增检验记录明细失败`);
          }
          else{
            console.log(`成功新增`+ (response.data).toString() +`条检验记录明细`);
          }
        })
        .catch(error => {
          console.log(`新增检验记录明细失败`);
        });
    },
    // ------------------------------------ 业务函数 ------------------------------------
    // 确认收货信息
    receiveClick(){
      const that = this;
      console.log(`确认收货信息按钮点击`);
      var receivingRecordsData = that.outPlanReceive.params;
      var date = that.changeDate(receivingRecordsData.receivingDate);
      // 新增收货记录
      let receivingRecordParams = {
        receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
        planSerialNo: "noPlan",
        vouchSerialNo: receivingRecordsData.vouchType,
        vouchType: receivingRecordsData.vouchType,
        entryType: receivingRecordsData.vouchType, // entryType和vouchType一样
        deliveryId: receivingRecordsData.delivery,
        deliveryAddrId: receivingRecordsData.deliveryAddr,
        receivingDate: date,
        warehouseId: receivingRecordsData.warehouse,
        receivingAddrId: receivingRecordsData.receivingAddr,
        operUserId: receivingRecordsData.operUser, 
        attachmentId: receivingRecordsData.attachmentId,
        note: receivingRecordsData.note, 
        noPlanFlag: 0,
      }
      console.log("收货记录params");
      console.log(receivingRecordParams);
      that.addReceivingRecord(receivingRecordParams);
      if(that.controlData.isAddreceivingRecord == true){
        // 新增检验记录
        let qualityTestRecordParams = {
          qualityTestSerialNo: "test" + (that.controlData.qualityTestCount).toString(),
          receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
        }
        console.log("检验记录params");
        console.log(qualityTestRecordParams);
        that.addQualityTestRecord(qualityTestRecordParams);
      }
    },
    // 确认收货明细
    receiveDetailClick(){
      const that = this;
      console.log(`确认收货明细按钮点击`);
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
