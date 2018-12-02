<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="7">
          <div class="bar">
            <div class="title">入库单号</div>
            <el-input v-model="warehouseStockInRecord.params.entrySerialNo" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="7">
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
        <el-col :span="7">
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
        <el-col :span="3">
          <el-button type="primary" style="width: 100%">创建入库单</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="7">
          <div class="bar">
            <div class="title">收入仓库</div>
            <el-select v-model="warehouseStockInRecord.params.warehouse" clearable placeholder="请选择">
              <el-option
                v-for="item in warehouseStockInRecord.options.warehouseOpitons"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="7">
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
        <el-col :span="7">
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
        <el-col :span="3">
          <el-button type="success" style="width: 100%">上架</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="7">
          <div class="bar">
            <div class="title">采购订单</div>
            <el-select v-model="warehouseStockInRecord.params.vouchSerialNo" clearable placeholder="请选择">
              <el-option
                v-for="item in warehouseStockInRecord.options.vouchSerialOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="14">
          <el-button type="text">查看采购订单</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" style="width: 100%">确认入库</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="21">
          <div class="bar">
            <div class="title">备注</div>
            <el-input v-model="warehouseStockInRecord.params.note" type="textarea" :rows="3" style="margin-left:20px"></el-input>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="2">
          <el-button type="info" size="small">添加</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" size="small">删除</el-button>
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
            <div style="font-size: 18px;width: 100px">{{taxammount}}元</div>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="warehouseStockInRecordDetail"
        max-height="400"
        border
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px">
        <el-table-column width="50" type="selection" align="center"></el-table-column>
        <el-table-column prop="code" label="商品编号" align="center"></el-table-column>
        <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
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
        <el-table-column prop="batch" label="批号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.batch"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="入库数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.number"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>          
        </el-table-column>
        <el-table-column prop="ammount" label="金额" align="center"></el-table-column>
        <el-table-column prop="ticket" label="开票" align="center"></el-table-column>
        <el-table-column prop="tax" label="税率" align="center"></el-table-column>
        <el-table-column prop="taxprice" label="含税单价" align="center"></el-table-column>
        <el-table-column prop="taxammount" label="含税金额" align="center"></el-table-column>
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
          entrySerialNo: '',
          entryDate: '',
          operUser: '',
          warehouse: '',
          dept: '',
          delivery: '',
          vouchSerialNo: '',
          note: '',
        },
        options: {
          operUserOptions: [],
          warehouseOptions: [],
          deptOptions: [],
          delivery: [],
          vouchSerialNoOptions: [],
        },
      },
      barCode: '',
      ammount: 10000,
      taxammount:10500,
      warehouseStockInRecordDetail: [{
        code: '',
        name: '',
        specification: '',
        unit: '',
        batch: '',
        number: '',
        price: '',
        ammount: '',
        ticket: '',
        tax: '',
        taxprice: '',
        taxammount: '',
        note: '',
      }],
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
