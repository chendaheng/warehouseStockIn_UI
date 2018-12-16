<template>
  <div class="body">
    <el-card class="box-card">
      <el-row>
        <el-table
          ref="multiTable"
          :data="shelfRecordDetail"
          max-height="400"
          border
          @selection-change="selectionChange"
          :stripe="true"
          :highlight-current-row="true"
          style="width: 100%; margin-top: 20px">
          <el-table-column width="50" type="selection" :selectable="disableCheckbox" align="center"></el-table-column>
          <el-table-column width="150" prop="shelfSerialNo" label="上架单号" align="center"></el-table-column>
          <el-table-column width="150" prop="materialCode" label="物料编码" align="center"></el-table-column>
          <el-table-column width="150" prop="batchCode" label="批号" align="center"></el-table-column>
          <el-table-column width="100" prop="unitId" label="计量单位" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.unitId" disabled>
                <el-option label="米" :value=1></el-option>
                <el-option label="分米" :value=2></el-option>
                <el-option label="厘米" :value=3></el-option>
                <el-option label="毫米" :value=4></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column width="300" prop="location" label="库位" align="center">
            <template slot-scope="scope">
              <el-cascader
                :options="groupOptions"
                change-on-select
                v-model="scope.row.location"
                :props="groupProps"
                clearable>
              </el-cascader>
            </template>
          </el-table-column>
          <el-table-column width="120" prop="restQuantity" label="剩余数量" align="center"></el-table-column>
          <el-table-column width="120" prop="shelfQuantity" label="上架数量" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.shelfQuantity" placeholder="请输入数字"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="note" label="备注" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.note"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column width="80" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text">上架</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </el-row>
      <el-row style="margin: 50px 0 10px 0">
        <el-col :span="2" :offset="10">
          <el-button type="primary" @click="shelf">上架</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="info" @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      entrySerialNo: '',
      warehouseId: null,
      // 这个是上架单号
      shelfCounter: 0,
      shelfRecordDetail: [],
      groupOptions: [],
      groupProps: {
        value: "id",
        label: "label",
        children: "children",
      },
      checked: true,
      selectedData: [],
    }
  },
  created() {
    const that = this;
    let result = that.$route.query;
    that.entrySerialNo = result.entrySerialNo;
    that.warehouseId = result.warehouseId;
    that.getLastShelfRecordId();
    
    // that.entrySerialNo = '110001';
    // that.warehouseId = 1;
    that.$axios.post(`http://localhost:8090/wareHouse/stockIn/getWarehouseStockInRecordDetailByEntrySerialNo`,{'entrySerialNo': that.entrySerialNo})
    .then(response => {
      let data = response.data;
      console.log(`data` , data);
      data.forEach(element => {
        that.shelfRecordDetail.push({
          shelfSerialNo: that.shelfCounter + '',
          materialCode: element.materialCode,
          batchCode: element.batchCode,
          unitId: element.unitId,
          location: [],
          restQuantity: element.entryQuantity,
          shelfQuantity: element.entryQuantity,
          note: '',
        })
      })
    })
    .catch(error => {console.log(error)});
    // 这里添加上架记录，你自己设置下字段
    
    that.getGroupOptions();
  },
  methods: {
    //获取最后一条上架记录的id
    getLastShelfRecordId(){
      const that = this;
      that.$axios
        .post(`http://localhost:8090/wareHouse/stockIn/getLastShelfRecordId`,{})
        .then(response => {
          console.log(`shelfCounter`,that.shelfCounter);
          that.shelfCounter = parseInt(response.data) + 1;
          console.log("shelfCounter:" + that.shelfCounter);
          console.log(`获取最后一条上架记录的id成功`);
        })
    },
    getGroupOptions() {
      const that = this;
      console.log( that.warehouseId);
      that.$axios.post(`http://localhost:8090/WarehouseBase/getWarehouseLocation`,{'id': that.warehouseId})
      .then(response => {
        console.log("warehouseTree:",response.data);
        let data = response.data;
        that.preOrder(data);
        that.groupOptions = data.children;
      })
      .catch(error => {console.log(error)});
    },
    preOrder(T) {
      if (T.children !== null) {
        T.children.forEach(element => {
          this.preOrder(element);
        })
      } else {
        // console.log("查看树位置:",T);
        if(T.child !== null) {
          T.children = [];
          T.child.forEach(element => {
            T.children.push({
              id: element.id,
              label: element.name,
              children: null,
            })
          })
        }
      }
    },
    selectionChange(val) {
      console.log(val);
      const that = this;
      that.selectedData = val;
    },
    disableCheckbox(row, index) {
      if(row.restQuantity === 0) {
        return false;
      }
      return true;
    },
    shelf() {
      const that = this;
      that.$axios.post(`http://localhost:8090/wareHouse/stockIn/addShelfRecord`, {
        "shelfSerialNo" : `shelf` + (that.shelfCounter).toString(),
        "entrySerialNo" : that.entrySerialNo,
        "operUserId" : 1,
        "shelfDate" : that.getNowFormatDate(),
        "result" : 1,
        "note" : '',
      })
      .then(response => {
        console.log("添加入库记录",response.data);
      })
      .catch(error => {console.log(`出错` ,error)})
      for(let i=0; i<that.selectedData.length; i++) {
        if(that.selectedData[i].restQuantity < parseInt(that.selectedData[i].shelfQuantity)) {
          alert("输入数据有误，请检查！");
          break;
        }
        let len = that.selectedData[i].location.length;
        that.selectedData[i].locationId = that.selectedData[i].location[len-1];
        console.log("发送数据前：",that.selectedData[i]);
        that.$axios.post(`http://localhost:8090/wareHouse/stockIn/addShelfRecordDetail`, that.selectedData[i])
        .then(response => {
          console.log("添加入库记录明细",response.data);
          console.log("当前data:",that);
          this.selectedData[i].restQuantity -= parseInt(this.selectedData[i].shelfQuantity);
          this.selectedData[i].shelfQuantity = this.selectedData[i].restQuantity;
          this.$refs.multiTable.clearSelection();
        })
        .catch(error => {console.log(error)});
        
      }
    },
    cancel() {
      console.log(this.selectedData);
      this.$router.push({name : "StockInTestList"})
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
    
  }
}
</script>


<style lang="less" scoped>
.body {
  margin: 20px 30px;
  height: 100%;
  
}
</style>