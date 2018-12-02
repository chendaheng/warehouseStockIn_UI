<template>
  <div class="body">
    <el-col :span="4" style="height: 80%; min-width:180px">
      <el-card class="inner-card" style="text-align: center">
        <div slot="header">
          <span style="font-weight: bold; font-size: 18px;">库位信息</span>
        </div>
        <el-tree :data="treeData" :props="treeProps" @node-click="handleNodeClick" default-expand-all></el-tree>
      </el-card>
    </el-col>
    <el-col :span="18" style="height: 80%">
      <el-card class="inner-card">
        <el-row :gutter="10" style="margin: 10px 50px">
          <el-col :span="7">
            <div class="title">物料编号：</div>
            <div class="content">{{materialCode}}</div>
          </el-col>
          <el-col :span="7">
            <div class="title">物料名称：</div>
            <div class="content">{{name}}</div>
          </el-col>
          <el-col :span="7">
            <div class="title">批号：</div>
            <div class="content">{{batchCode}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 30px 50px 50px">
          <el-col :span="7">
            <div class="title">入库数量：</div>
            <div class="content">{{entryQuantity}}</div>
          </el-col>
          <el-col :span="7">
            <div class="title">剩余数量：</div>
            <div class="content">{{remainQuantity}}</div>
          </el-col> 
        </el-row>
        <div style="margin: 0 50px">
          <el-table
            :data="tableData"
            max-height="400"
            border
            :stripe="true"
            :highlight-current-row="true"
            style="width: 100%">
            <el-table-column label="序号" width="50" type="index" align="center"></el-table-column>
            <el-table-column prop="shelfQuantity" label="上架数量" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.shelfQuantity"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="location" label="库区" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="addRecord(scope.row)">添加</el-button>
                <el-button type="text" @click="deleteRecord(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: [{
        label: '仓库一部',
        children: [{
          label: '面料区',
          children: [{
            label: '库区1',
          }, {
            label: '库区2',
          }]
        }, {
          label: '辅料区',
        }, {
          label: '半成品区'
        }]
      }],
      treeProps: {
        children: 'children',
        label: 'label',
      },
      materialCode: '',
      name: '',
      batchCode: '',
      entryQuantity: '',
      remainQuantity: '',
      tableData: [{
        shelfQuantity: "100",
        location: "一号库"
      }]
    }
  },
  methods: {
    handleNodeClick(val1,val2,val3) {
      console.log(val1,val2,val3);
    },
    addRecord(row) {
      console.log(row);
    },
    deleteRecord(row) {
      console.log(row);
    }
  }
}
</script>

<style lang="less" scoped>
.body {
  margin: 20px 25px;
  height: 100%;
  .inner-card {
    margin: 0 25px;
    height: 100%;
    .title {
      font-size: 18px;
    }
  }
}
</style>
