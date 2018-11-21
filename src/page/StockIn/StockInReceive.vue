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
            <div class="title">接收地址</div>
            <el-input v-model="receivingRecords.receivingRecordInputs.receivingAddr" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">收货人</div>
            <el-input v-model="receivingRecords.receivingRecordInputs.operUser" clearable placeholder="请输入"></el-input>
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
            <el-input v-model="receivingRecords.receivingRecordInputs.delivery" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">发货地址</div>
            <el-input v-model="receivingRecords.receivingRecordInputs.deliveryAddr" clearable placeholder="请输入"></el-input>
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
          <el-button type="primary">确认收货</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-table
        :data="tableData"
        max-height="400"
        border
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; text-align: center">
        <el-table-column label="序号" width="50" type="index" align="center"></el-table-column>
        <el-table-column prop="code" label="物料编码" align="center"></el-table-column>
        <el-table-column prop="specification" label="规格" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
        <el-table-column prop="planquantity" label="计划到货数量" align="center"></el-table-column>
        <el-table-column prop="quantity" label="到货数量" align="center"></el-table-column>
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
        receivingRecordDetails :{

        }
      },
      receivingRecordOptions: {
        warehouseOptions:[
          {
            value: 1,
            label: "仓库1"
          },
          {
            value: 2,
            label: "仓库2"
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
      
      // inputs: ['', '', '','','','','',''],
      // selects: ['','','','','',''],
      // options:[
      //   [{
      //     value: "选项1",
      //     label: "黄金"
      //   }],
      //   [],
      //   [],
      // ],
      tableData: []
    };
  },
  created: function (){
    const that = this;
    console.log(`route` + that.$route);
    var result = {};
    result = that.$route.query;
    that.receivingRecords.receivingRecordInputs = result;
    
    
    var i = 0;
    for (let key in that.receivingRecords.receivingRecordInputs){
      if (key === "warehouseId"){
        that.receivingRecords.receivingRecordInputs.warehouse = parseInt(result["warehouseId"]);
      }
      if (key === "receivingAddrId"){
        that.receivingRecords.receivingRecordInputs.receivingAddr = result["receivingAddrId"].toString();
      }
      if (key === "operUserId"){
        that.receivingRecords.receivingRecordInputs.operUser = result["operUserId"].toString();
      }
      if (key === "deliveryId"){
        that.receivingRecords.receivingRecordInputs.delivery = result["deliveryId"].toString();
      }
      if (key === "deliveryAddrId"){
        that.receivingRecords.receivingRecordInputs.deliveryAddr = result["deliveryAddrId"].toString();
      }
    }
    console.log(result);
    console.log(that.receivingRecords.receivingRecordInputs);
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
