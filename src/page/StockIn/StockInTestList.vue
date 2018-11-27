<template>
  <div>
    <el-card style="margin: 0 30px 20px 30px">
      <div class="searchOptions" style="padding-bottom: 10px">
        <el-row :gutter="10">
          <!-- 搜索输入部分 -->
          <el-col :span="22">
            <!-- 第一行 -->
            <el-row :gutter="10" style="padding-bottom: 10px">
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">检验员</div>
                    <el-select class="inputBar" v-model="searchOptions.searchParams.operUser" filterable placeholder="请选择检验员">
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
                  <div class="label">物料编码</div>
                    <div class="inputBar">
                      <el-input v-model=searchOptions.searchParams.materialCode placeholder="请输入物料编码"></el-input>
                    </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">SPU名称</div>
                    <div class="inputBar">
                      <el-input v-model=searchOptions.searchParams.spuName placeholder="请输入SPU名称"></el-input>
                    </div>
                </div>
              </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="inputBox">
                  <div class="label">检验时间</div>
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
          </el-col>
          <!-- 搜索按钮部分 -->
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin: 0 30px 20px 30px">
      <div class="tests">
        <div class="testTables" style="padding-bottom: 10px">
          <el-table
            :data="tests.tests"
            border
            :stripe='true'
            :highlight-current-row="true"
            @row-click='handleTestTableClick'
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="qualityTestSerialNo"
              label="检验单号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="receivingSerialNo"
              label="收货流水号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="qualityTestDate"
              label="检验时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="qualityTestAddr"
              label="检验场所"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="dept"
              label="检验部门"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="picker"
              label="检验领料人"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="operUser"
              label="检验员"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="affirmant"
              label="确认者"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="status"
              label="检验状态"
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
                <el-button type="text" size="small" @click="handleTestTableTestFunction(scope.row)">检验</el-button>
                <el-button type="text" size="small" @click="handleTestTableStockInFunction(scope.row)">入库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            :current-page=tests.pagination.currentPage
            :page-sizes=tests.pagination.pageSizes
            :page-size=tests.pagination.pageSize
            layout="total, sizes, prev, pager, next, jumper"
            :total=tests.pagination.total>
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-card style="margin: 0 30px 20px 30px" v-show="testDetails.hasTestDetails">
      <div class="testDetails">
        <el-table
          :data=testDetails.testDetails
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
            prop="unit"
            label="计量单位"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="qualityTestQuantity"
            label="检验数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="qualityTestMethod"
            label="检验方法"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="qualityTestStandard"
            label="检验标准"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="entryQuantity"
            label="可入库数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="returnQuantity"
            label="退货数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="reason"
            label="原因"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="result"
            label="检验结果"
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
  name: 'StockInTest',
  data() {
    return {
      searchOptions: {
        searchParams: {
          operUser: "",
          materialCode: "",
          spuName: "",
          dateRange: "",
        },
        options: {
          operUserOptions: [
            {
              value: 1,
              label: "检验员1"
            },
            {
              value: 2,
              label: "检验员2"
            }
          ]
        }
      },
      tests: {
        tests: [
          {
            qualityTestSerialNo: "test001",
            receivingSerialNo: "receive001",
            qualityTestDate: "2018-10-01",
            qualityTestAddr: "检验场所1",
            dept: "检验部门1",
            picker: "张三", 
            operUser: "王二",
            affirmant: "李四",
            status: "全部通过",
            note: "备注1"
          },
          {
            qualityTestSerialNo: "test002",
            receivingSerialNo: "receive002",
            qualityTestDate: "2018-10-02",
            qualityTestAddr: "检验场所2",
            dept: "检验部门2",
            picker: "张三", 
            operUser: "王二",
            affirmant: "李四",
            status: "全部通过",
            note: "备注2"
          }
        ],
        pagination: {
          currentPage: 1,
          pageSizes: [10, 20, 30, 50, 100],
          pageSize: 10,
          total: 400,
        }
      },
      testDetails: {
        hasTestDetails: true,
        testDetails: [
          {
            index: "1",
            materialCode: "10001",
            unit: "米",
            qualityTestQuantity: "200",
            qualityTestMethod: "方法1",
            qualityTestStandard: "标准1",
            entryQuantity: "200",
            returnQuantity: "0",
            reason: "无",
            result: "通过",
            note: "备注1"
          },
          {
            index: "2",
            materialCode: "20001",
            unit: "米",
            qualityTestQuantity: "200",
            qualityTestMethod: "方法2",
            qualityTestStandard: "标准2",
            entryQuantity: "200",
            returnQuantity: "0",
            reason: "无",
            result: "通过",
            note: "备注2"
          }
        ]
      },
      controlData: {
        hasUpdated: false,
      },
    };
  },
  created: function () {
    const that = this;
    console.log(`进入页面`);
  }
}
</script>


<style lang="less" scoped>
    .searchOptions {
      margin: 20px 50px;
      padding: 0 20px;
    }
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
    .tests {
        .testTables {
            max-height: 550px;
        }
        .pagination {
            display: flex;
            flex-direction: row-reverse;
        }
    }
    .testDetails {
        max-height: 550px;
    }
</style>
