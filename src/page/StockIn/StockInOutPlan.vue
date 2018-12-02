<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">关联单据</div>
            <el-select v-model="outPlanReceive.params.vouchSerialNo1" clearable placeholder="请选择">
              <el-option 
                v-for="item in outPlanReceive.options.vouchSerialNo1Options"
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
            <el-input v-model="outPlanReceive.params.vouchSerialNo2" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">到货日期</div>
            <el-date-picker v-model="outPlanReceive.params.receivingDate" type="date" placeholder="请选择日期"></el-date-picker>
          </div>
        </el-col>
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
      </el-row>
      <el-row :gutter="20">
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
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <div class="bar">
            <div class="title">收货备注</div>
            <el-input v-model="outPlanReceive.params.note" type="textarea" clearable :rows="3" style="margin-left: 30px"></el-input>
          </div>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button type="primary">确认收货</el-button>
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
          vouchSerialNo1: '',
          vouchSerialNo2: '',
          receivingDate: '',
          warehouse: '',
          receivingAddr: '',
          operUser: '',
          delivery: '',
          deliveryAddr: '',
        },
        options: {
          vouchSerialNo1Options: [],
          warehouseOptions: [],
          receivingAddrOptions: [],
          operUserOptions: [],
          deliveryOptions: [],
          deliveryAddrOptions: [],
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
