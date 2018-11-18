<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select v-model="selects[1]" clearable placeholder="请选中">
            <el-option
              v-for="item in options[1]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="inputs[1]" clearable placeholder="请输入"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="7">
          <div class="bar">
            <div class="title">到货日</div>
            <el-date-picker
              v-model="inputs[2]"
              type="date"
              placeholder="选择日期"
              clearable>
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="bar">
            <div class="title">接收仓库</div>
            <el-select v-model="selects[2]" clearable placeholder="请选择">
              <el-option
                v-for="item in options[2]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="bar">
            <div class="title">接待地址</div>
            <el-input v-model="inputs[3]" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 20px;">
        <el-col :span="7">
          <div class="bar">
            <div class="title">收货人</div>
            <el-input v-model="inputs[4]" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="bar">
            <div class="title">到货状况</div>
            <el-select v-model="selects[3]" clearable placeholder="请选择">
              <el-option
                v-for="item in options[3]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="bar">
            <div class="title">发货地址</div>
            <el-input v-model="inputs[5]" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>        
      </el-row>
      <el-row :gutter="10" style="margin-top: 20px">
        <el-col :span="12">
          <div class="bar">
            <div class="title">备注</div>
            <el-input v-model="inputs[6]" type="textarea" :rows="3" placeholder="请输入" style="margin-left:20px"></el-input>
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
        row-style="height: 10px"
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
  data() {
    return {
      inputs: ['', '', '','','','',''],
      selects: ['','','','','',''],
      options:[
        [{
          value: "选项1",
          label: "黄金"
        }],
        [],
        [],
      ],
      tableData: []
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
