<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <div class="searchOptions">
        <el-row :gutter="10">
          <!-- 搜索输入部分 -->
          <el-col :span="22">
            <!-- 第一行 -->
            <el-row :gutter="10" style="padding-bottom: 10px">
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">关联单号</div>
                  <div class="inputBar">
                    <el-input v-model=searchOptions.searchParams.vouchSerialNo placeholder="请输入关联单号"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">物料编码</div>
                  <div class="inputBar">
                    <el-input v-model=searchOptions.searchParams.materialCode placeholder="请输入物料编码"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="inputBox">
                  <div class="label">时间范围</div>
                  <el-date-picker
                  class="inputBar"
                  v-model='searchOptions.searchParams.dateRange'
                  type="daterange"
                  range-separator="至"
                  start-placeholde="开始日期"
                  end-placeholde="结束日期">
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row :gutter="10">
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">入库仓库</div>
                  <el-select class="inputBar" v-model="searchOptions.searchParams.warehouse" filterable placeholder="请选择入库仓库">
                    <el-option
                      v-for="item in searchOptions.options.warehouseOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option> 
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">入库人员</div>
                  <el-select class="inputBar" v-model="searchOptions.searchParams.operUser" filterable placeholder="请选择入库人员">
                    <el-option
                      v-for="item in searchOptions.options.operUserOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option> 
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">发货单位</div>
                  <el-select class="inputBar" v-model="searchOptions.searchParams.delivery" filterable placeholder="请选择发货单位">
                    <el-option
                      v-for="item in searchOptions.options.deliveryOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option> 
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <!-- 搜索按钮部分 -->
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="handleRecordTableSearch()">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin-bottom: 20px">
      <div class="stockInRecords">
        <div class="stockInRecordTables" style="padding-bottom: 10px">
          <el-table
            :data="stockInRecords.stockInRecords"
            border
            :stripe='true'
            :highlight-current-row="true"
            @row-click='handleRecordTableClick'
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="entrySerialNo"
              label="入库单号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="entryType"
              label="入库类型"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="vouchSerialNo"
              label="关联单号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="result"
              label="入库结果"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="entryDate"
              label="入库时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="warehouse"
              label="入库仓库"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="dept"
              label="入库部门"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="operUser"
              label="入库人员"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="delivery"
              label="发货单位"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleSheftFunction(scope.row)">上架</el-button>
                <el-button type="text" size="small" @click="handleVerifyFunction(scope.row)">确认入库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page=stockInRecords.pagination.currentPage
            :page-sizes=stockInRecords.pagination.pageSizes
            :page-size=stockInRecords.pagination.pageSize
            layout="total, sizes, prev, pager, next, jumper"
            :total=stockInRecords.pagination.total>
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-card style="margin-bottom: 20px" v-show="stockInRecordDetails.hasStockInRecordDetails">
      <div class="stockInRecordDetails">
        <el-table
          :data=stockInRecordDetails.stockInRecordDetails
          border
          :stripe='true'
          :highlight-current-row='true'
          style="width: 100%">
          <el-table-column
            fixed="left"
            label="序号"
            prop="index"
            width="90">
          </el-table-column>
          <el-table-column
            prop="materialCode"
            label="物料编码"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="format"
            label="规格"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="unit"
            label="计量单位"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="entryQuantity"
            label="入库数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="price"
            label="物料单价"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="taxPrice"
            label="含税单价"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="note"
            label="备注"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StockInListContent",
  data() {
    return {
      searchOptions:{
        searchParams:{
          vouchSerialNo: "", // 关联单号
          materialCode: "", // 物料编码
          warehouse: "", // 入库仓库
          operUser: "", // 入库员
          delivery: "", // 发货单位
          dateRange: "", // 时间范围
        },
        options: {
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
            },
          ],
          deliveryOptions: [
            {
              value: 66601,
              label: "苏州供应商"
            },
            {
              value: 66602,
              label: "无锡供应商"
            }
          ],
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
          supplierOptions: [
            {
              value: 66601,
              label: "苏州供应商"
            },
            {
              value: 66602,
              label: "无锡供应商"
            }
          ],
        },
      },
      stockInRecords: {
        stockInRecords:[
          {
            entrySerialNo: "entry001",
            entryType: 1,
            vouchSerialNo: "pur001",
            vouchType: 1,
            entryDate: "2018-10-03",
            warehouse: "仓库1",
            dept: "入库部门1",
            operUser: "入库员1",
            delivery: "江阴供应商",
            result: "已入库",
            note: "备注1",
          },
          {
            entrySerialNo: "entry002",
            entryType: 1,
            vouchSerialNo: "pur002",
            vouchType: 1,
            entryDate: "2018-10-06",
            warehouse: "仓库2",
            dept: "入库部门2",
            operUser: "入库员2",
            delivery: "无锡供应商",
            result: "已入库",
            note: "备注2",
          }
        ],
        pagination: {
          currentPage: 1,
          pageSizes: [5, 10, 20, 30, 50],
          pageSize: 5,
          total: 400,
        }
      },
      stockInRecordDetails:{
        hasStockInRecordDetails: false,
        stockInRecordDetails: [
          {
            index: "1",
            materialCode: "10001",
            format: "规格1",
            unit: "米",
            entryQuantity: "100",
            price: "50",
            taxPrice: "55",
            note: "备注1",
          },
          {
            index: "2",
            materialCode: "10002",
            format: "规格2",
            unit: "米",
            entryQuantity: "150",
            price: "60",
            taxPrice: "65",
            note: "备注5",
          }
        ],
      }
    };
  },
  created: function () {

  },
  props: ['preDefinedType', 'paramsType'],
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
    //获取当前入库类型下所有入库记录
    getAllWarehouseStockInRecordByEntryType(params){
      const that = this;
      var jsonLength = 0;
      that.$axios
      .post(`http://localhost:8090/wareHouse/stockIn/getAllWarehouseStockInRecordByEntryType`, params)
      .then(response => {
        for (var item in response.data){
          jsonLength++;
        }
        that.stockInRecords.pagination.total = jsonLength;
        console.log(`该入库类型下所有的入库单数量为`+ that.stockInRecords.pagination.total);
        
      })
      .catch(error => {
        console.log(`加载出错，加载类别为` + that.paramsType, error);
      });
    },
    // 根据入库单号获取入库记录明细
    getWarehouseStockInRecordDetailByEntrySerialNo(params){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/getWarehouseStockInRecordDetailByEntrySerialNo`, params)
        .then(response => {
          var result = response.data;
          for (var i = 0; i < result.length; i++){
            var thisResult = result[i];
            result[i]["index"] = (i + 1).toString();
            if (thisResult.hasOwnProperty("specification")){
              var format = thisResult["specification"];
              result[i]["format"] = format.toString();
            }
            if (thisResult.hasOwnProperty("unitId")){
              var unit = thisResult["unitId"];
              result[i]["unit"] = "计量单位" + unit.toString();
            }
          }
          that.stockInRecordDetails.hasStockInRecordDetails = true;
          that.stockInRecordDetails.stockInRecordDetails = result;
          console.log(`加载明细成功，加载流水号为：`, params.entrySerialNo);
        })
    },
    // 改变入库计划显示内容
    changeStockInPlan(result){
      
    },
    // ------------------------------------ 业务函数 ------------------------------------
    // 点击表格显示明细
    handleRecordTableClick(row, event, column){
      const that = this;
      console.log(`row`, row);
      if (column.label !== "操作") {
        console.log(`本行被点击，显示入库明细`);
        let params = {
          entrySerialNo: row.entrySerialNo,
        }
        that.getWarehouseStockInRecordDetailByEntrySerialNo(entrySerialNo);
      }
    }
  },
}
</script>

<style lang="less" scoped>
    .inputBox {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .label {
            padding-left: 15px;
            font-size: 14px;
            min-width: 75px;
            white-space: nowrap;
        }
        .inputBar {
            width: 100%;
        }
    }
    .stockInRecords {
        .stockInRecordTables {
            max-height: 550px;
        }
        .pagination {
            display: flex;
            flex-direction: row-reverse;
        }
    }
    .stockInRecordDetails {
        max-height: 550px;
    }
</style>