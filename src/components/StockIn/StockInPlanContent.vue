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
                                    <div class="label">采购订单号</div>
                                    <div class="inputBar">
                                        <el-input v-model=searchOptions.searchParams.vouchSerialNo placeholder="请输入采购订单号"></el-input>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="inputBox">
                                    <div class="label">物料编码</div>
                                    <el-input v-model=searchOptions.searchParams.materialCode placeholder="请输入物料编码"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="inputBox">
                                    <div class="label">SPU名称</div>
                                    <el-input v-model=searchOptions.searchParams.spuCode placeholder="请输入SPU名称"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="inputBox">
                                    <div class="label">仓库</div>
                                    <el-select class="inputBar" v-model="searchOptions.searchParams.warehouse" filterable placeholder="请选择仓库">
                                        <el-option
                                            v-for="item in searchOptions.options.warehouseOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>
                        <!-- 第二行 -->
                        <el-row :gutter="10">
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
                            <el-col :span="6">
                                <div class="inputBox">
                                    <div class="label">供应商</div>
                                    <el-select class="inputBar" v-model="searchOptions.searchParams.supplier" filterable placeholder="请选择供应商">
                                        <el-option
                                            v-for="item in searchOptions.options.supplierOptions"
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
                        <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card style="margin-bottom: 20px">
            <div class="plans">
                <div class="planTables" style="padding-bottom: 10px">
                    <el-table
                        :data="plans.plans"
                        border
                        :stripe='true'
                        :highlight-current-row="true"
                        @row-click='handlePlanTableClick'
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="55">
                         </el-table-column>
                        <el-table-column
                            prop="planSerialNo"
                            label="入库计划流水号"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="stockInType"
                            label="入库类型"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="vouchSerialNo"
                            label="关联单据编码"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="计划状态"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="dept"
                            label="发起部门"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="owner"
                            label="发起人"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="startDate"
                            label="发起时间"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="arrivalDate"
                            label="到货时间"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="delivery"
                            label="发货单位"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="deliveryAdd"
                            label="发货地址"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="warehouse"
                            label="接收仓库"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="receivingAdd"
                            label="收货地址"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="operUser"
                            label="收货人"
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
                                <el-button type="text" size="small" @click="handlePlanTableReceiveFunction(scope.row)">收货</el-button>
                                <el-button type="text" size="small" @click="handlePlanTableTestFunction(scope.row)">检验</el-button>
                                <el-button type="text" size="small" @click="handlePlanTableStockInFunction(scope.row)">入库</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="pagination">
                    <el-pagination
                        :current-page=plans.pagination.currentPage
                        :page-sizes=plans.pagination.pageSizes
                        :page-size=plans.pagination.pageSize
                        layout="total, sizes, prev, pager, next, jumper"
                        :total=plans.pagination.total>
                    </el-pagination>
                </div>
            </div>
        </el-card>
        <el-card style="margin-bottom: 20px" v-show="planDetails.hasPlanDetails">
            <div class="planDetails">
                <el-table
                    :data=planDetails.planDetails
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
                        prop="stockInNum"
                        label="入库数量"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="singlePrice"
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
    name: "StockInPlanContent",
    data() {
        return {
            searchOptions: {
                searchParams: {
                    vouchSerialNo: "",
                    materialCode: "",
                    spuCode: "",
                    warehouse: "",
                    dateRange: "",
                    supplier: "",
                },
                options: {
                    warehouseOptions: [
                        {
                            value: 1,
                            label: "仓库1"
                        },
                        {
                            value: 2,
                            label: "仓库2"
                        },
                    ],
                    supplierOptions: [
                        {
                            value: 1,
                            label: "供应商1"
                        },
                        {
                            value: 2,
                            label: "供应商2"
                        }
                    ],
                },
            },
            plans: {
                plans: [
                    {
                        planSerialNo: "plan001",
                        stockInType: "采购入库",
                        vouchSerialNo: "pur001",
                        status: "未到货",
                        dept: "部门1",
                        owner: "发起人1",
                        startDate: "2018-10-01",
                        arrivalDate: "2018-10-03",
                        delivery: "江阴供应商",
                        deliveryAdd: "江苏江阴",
                        warehouse: "仓库1",
                        receivingAdd: "收货地址1",
                        operUser: "收货人1",
                        note: "备注1"
                    },
                    {
                        planSerialNo: "plan002",
                        stockInType: "采购入库",
                        vouchSerialNo: "pur002",
                        status: "未到货",
                        dept: "部门2",
                        owner: "发起人2",
                        startDate: "2018-10-02",
                        arrivalDate: "2018-10-05",
                        delivery: "杭州供应商",
                        deliveryAdd: "浙江杭州",
                        warehouse: "仓库2",
                        receivingAdd: "收货地址2",
                        operUser: "收货人2",
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
            planDetails: {
                hasPlanDetails: false,
                planDetails: [
                    {
                        index: "1",
                        materialCode: "10001",
                        format: "规格1",
                        unit: "米",
                        stockInNum: "100",
                        singlePrice: "20元/米",
                        taxPrice: "22元/米",
                        note: "备注1"
                    },
                    {
                        index: "2",
                        materialCode: "10002",
                        format: "规格2",
                        unit: "米",
                        stockInNum: "200",
                        singlePrice: "30元/米",
                        taxPrice: "33元/米",
                        note: "备注2"
                    }
                ],
            },
            controlData: {
                hasUpdated: false,
            },
        };
    },
    created: function () {
        const that = this;
        console.log(`paramsType`, that.paramsType);
        console.log(`preDefinedType`, that.preDefinedType);
        if (that.preDefinedType === that.paramsType) {
            console.log('获取类型'+that.paramsType+'的所有入库计划')
            that.getAllStockInPlanByEntryType(that.paramsType);
        }
    },
    // preDefinedType:事先已经定义好了 paramsType:根据tabs切换进行改变
    props: ['preDefinedType', 'paramsType'],
    methods: {
        // ------------------------------------ 工具函数 ------------------------------------
        // 根据入库类型获得所有的入库计划
        getAllStockInPlanByEntryType(paramsType, callback){
            const that = this;
            that.$axios
                .post(`http://localhost:8180/warehouse/stockIn/getAllStockInPlan`, paramsType)
                .then(response => {
                    that.plans.plans = response.data;
                    that.plans.pagination.total = response.data.lenth;
                })
                .catch(error => {
                    console.log(`加载出错，加载类别为` + that.paramsType, error);
                });
            if (callback !== undefined)
                return callback();
        },
        // 根据页码获取所有的入库计划
        getStockInPlanByPage(params, callback){
            const that = this;
            that.$axios
                .post(`http://localhost:8180/warehouse/stockIn/getStockInPlanByPage`, {
                    page : 1,
                    number : that.plans.pagination.pageSize,
                    entryType : that.paramsType 
                })
                .then(response => {
                    console.log(response);
                    that.plans.plans = response.data;
                })
            if (callback !== undefined)
                return callback();
        },
        // 根据入库计划流水号获取相应的入库计划明细
        getStockInPlanDetailByPlanSerialNo(params, callback){
            const that = this;
            that.$axios
                .post(`http://localhost:8180/warehouse/stockIn/getStockInPlanByPage`, params)
                .then(response => {
                    console.log(`加载计划明细成功，加载流水号为：`, params.planSerialNo);
                    that.planDetails.hasPlanDetails = true;
                    that.planDetails.planDetails = response.data;
                })
                .catch(error => {
                    console.log(`加载计划明细时出错，加载流水号为：`, params.planSerialNo);
                });
            if (callback !== undefined) 
                return callback();
        },
        // ------------------------------------ 业务函数 ------------------------------------
        // 通过paramsType和页码更新数据
        updatePlanTableData() {
            const that = this;
            console.log("in update");
            if (that.controlData.hasUpdated === false){
                let params = {
                    page : 1,
                    number : that.plans.pagination.pageSize,
                    entryType : that.paramsType
                };
                that.getStockInPlanByPage(params, () => {
                    that.controlData.hasUpdated = true;
                })
            }
            else {
                params['page'] = that.plans.pagination.currentPage;
                params['number'] = that.plans.pagination.pageSize;
                params['entryType'] = that.paramsType;
                that.getStockInPlanByPage(params);
            }
        },
        handlePlanTableReceiveFunction(row) {
            console.log(`row = `, row);
            console.log(`点击了本行的收货按钮`);
        },
        handlePlanTableTestFunction(row) {
            console.log(`row = `, row);
            console.log(`点击了本行的检验按钮`);
        },
        handlePlanTableStockInFunction(row) {
            console.log(`row = `, row);
            console.log(`点击了本行的入库按钮`);
        },
        handlePlanTableClick(row, event, column){
            const that = this;
            console.log(`row`, row);
            if (column.label !== "操作") {
                console.log(`本行被点击，显示明细`);
                let params = {
                    planSerialNo: row.planSerialNo
                }
                that.planDetails.hasPlanDetails = true;
            }
        }
    },
    // 监控paramsType的变化
    watch: {
            paramsType: function (val) {
                const that = this;
                console.log(`paramsType`, val);
                if (val === that.preDefinedType) {
                    that.updatePlanTableData();
                }
            }
        }
};
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
    .plans {
        .planTables {
            max-height: 550px;
        }
        .pagination {
            display: flex;
            flex-direction: row-reverse;
        }
    }
    .planDetails {
        max-height: 550px;
    }
</style>