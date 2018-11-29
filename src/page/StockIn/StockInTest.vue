<template>
  <div class="body">
    <!-- <el-card class="box-card">
      <el-form :inline="true" :model="form" :rules="rules" class="form">
        <el-form-item label="检验单号">
          <el-input v-model="form.params.qualityTestSerialNo" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="检验场所" prop="qualityTestAddr">
          <el-input v-model="form.params.qualityTestAddr" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="检验员">
          <el-select v-model="form.params.operUser" clearable placeholder="请选择">
            <el-option 
              v-for="item in form.options.operUserOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="form" :rules="rules" class="form">
        <el-form-item label="收货流水号" class="form-item">
          <el-input v-model="form.params.receivingSerialNo" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="检验部门" prop="dept" class="form-item">
          <el-select v-model="form.params.dept" clearable placeholder="请选择">
            <el-option
              v-for="item in form.options.deptOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="确认者" prop="affirmant" class="form-item">
          <el-select v-model="form.params.affirmant" clearable placeholder="请选择">
            <el-option
              v-for="item in form.options.affirmantOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row :gutter="10">
        <el-col :span="7">
          <div class="bar">
            <div class="title">检验时间</div>
            <el-input v-model="form.params.qualityTestDate" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验领料人</div>
            <el-select v-model="form.params.picker" clearable placeholder="请选择">
              <el-option
                v-for="item in form.options.pickerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </el-card> -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验单号</div>
            <el-input v-model="qualityTestRecord.params.qualityTestSerialNo" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验场所</div>
            <el-input v-model="qualityTestRecord.params.qualityTestAddr" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验员</div>
            <el-select v-model="qualityTestRecord.params.operUser" clearable placeholder="请选择">
              <el-option 
                v-for="item in qualityTestRecord.options.operUserOptions"
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
            <div class="title">收货流水号</div>
            <el-input v-model="qualityTestRecord.params.receivingSerialNo" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验部门</div>
            <el-select v-model="qualityTestRecord.params.dept" clearable placeholder="请选择">
              <el-option
                v-for="item in qualityTestRecord.options.deptOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">确认者</div>
            <el-select v-model="qualityTestRecord.params.affirmant" clearable placeholder="请选择">
              <el-option
                v-for="item in qualityTestRecord.options.affirmantOptions"
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
            <div class="title">检验时间</div>
            <el-input v-model="qualityTestRecord.params.qualityTestDate" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">检验领料人</div>
            <el-select v-model="qualityTestRecord.params.picker" clearable placeholder="请选择">
              <el-option
                v-for="item in qualityTestRecord.options.pickerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="21">
          <div class="bar">
            <div class="title">备注</div>
            <el-input v-model="qualityTestRecord.params.note" type="textarea" clearable :rows="3" style="margin-left: 30px"></el-input>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button type="primary" size="small">新增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" size="small">删除</el-button>
        </el-col>
        <el-col :span="10">
          <div class="bar">
            <div class="title" style="min-width: 50px">条码</div>
            <el-input v-model="barCode" clearable placeholder="扫描条码增加数据" style="margin-left: 0"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="qualityTestRecordDetail"
        max-height="400"
        border
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px">
        <el-table-column width="50" type="selection" align="center"></el-table-column>
        <el-table-column prop="materialCode" label="物料编码" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
        <el-table-column prop="qualityTestQuantity" label="检验数量" align="center"></el-table-column>
        <el-table-column prop="qualityTestMethod" label="检验方法" align="center"></el-table-column>
        <el-table-column prop="qualityTestStandard" label="检验标准" align="center"></el-table-column>
        <el-table-column prop="entryQuantity" label="可入库数量" align="center"></el-table-column>
        <el-table-column prop="returnQuantity" label="退货数量" align="center"></el-table-column>
        <el-table-column prop="reason" label="原因" align="center"></el-table-column>
        <el-table-column prop="result" label="检验结果" align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qualityTestRecord: {
        params: {
          qualityTestSerialNo: '',
          qualityTestAddr: '',
          operUser: '',
          receivingSerialNo: '',
          dept: '',
          affirmant: '',
          qualityTestDate: '',
          picker: '',
          note: '',
        },
        options: {
          operUserOptions: [],
          deptOptions: [],
          affirmantOptions: [],
          pickerOptions: [],
        }
      },
      // rules: {
      //   qualityTestAddr: [
      //     { required: true, message: '请输入检验场所', trigger: 'blur'},
      //   ],
      //   dept: [
      //     { required: true, message: '请选择检验部门', trigger: 'blur'},
      //   ],
      //   affirmant: [
      //     { required: true, message: '请选择确认者', trigger: 'blur'},
      //   ]
      // },
      barCode: '',
      qualityTestRecordDetail: [
        {
          materialCode: '',
          unit: '',
          qualityTestQuantity: '',
          qualityTestMethod: '',
          qualityTestStandard: '',
          entryQuantity: '',
          returnQuantity: '',
          reason: '',
          result: '',
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
