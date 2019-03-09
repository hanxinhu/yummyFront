<template>
  <el-container>
    <el-main>
        <el-table :data="updates" border style="width: 100%">
          <el-table-column fixed="left" prop="id" label="ID"></el-table-column>
          <el-table-column prop="rid" label="restaurant"></el-table-column>
          <el-table-column label="name">
            <el-table-column prop="nameBefore" label="before"></el-table-column>
            <el-table-column prop="nameAfter" label="after"></el-table-column>
          </el-table-column>
          <el-table-column label="description">
            <el-table-column prop="descriptionBefore" label="before"></el-table-column>
            <el-table-column prop="descriptionAfter" label="after"></el-table-column>
          </el-table-column>
          <el-table-column label="address">
            <el-table-column label="before">
              <el-table-column prop="provinceBefore" label="province">
              </el-table-column>
              <el-table-column prop="cityBefore" label="city"></el-table-column>
              <el-table-column prop="districtBefore" label="district"></el-table-column>
              <el-table-column prop="streetBefore" label="street"></el-table-column>
            </el-table-column>
            <el-table-column label="after">
              <el-table-column prop="provinceAfter" label="province"></el-table-column>
              <el-table-column prop="cityAfter" label="city"></el-table-column>
              <el-table-column prop="districtAfter" label="district"></el-table-column>
              <el-table-column prop="streetAfter" label="street"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column fixed = "right" label="options">
            <template slot-scope="scope">
              <el-button @click.native.prevent="approve(scope.$index)" type="primary">approve</el-button>
              <el-button @click.native.prevent="reject(scope.$index)" type="danger">reject</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-table :data="settlements" border style="width: 100%">
            <el-table-column label="restaurant" prop="rid"></el-table-column>
            <el-table-column label="bill" prop="id"></el-table-column>
            <el-table-column label="time" prop="receiveTime"></el-table-column>
            <el-table-column label="sum" prop="sum"></el-table-column>
            <el-table-column label="options">
              <template slot-scope="scope">
                <el-button @click.native.prevent="settle(scope.$index)" type="text">settle account</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="settleAll()">
            Settle Account All
          </el-button>
          <div>balance : {{balance}}</div>
        </div>
    </el-main>
  </el-container>
</template>

<script>
  //审批更改 table
  // 目前还没有结账的账单
  //结账按钮
  //y余额
  //统计信息
  //餐厅
  //日增长量 类型分布图
  //会员
  //日增长量 等级分布图
  //财务 每天的财务变化图
  //

  import app from '../App.vue'

  export default {
    name: 'Admin',
    created () {
      this.getUpdates()
      this.getSettlements()
    },
    data () {
      return {
        updates: [],
        settlements: [],
        balance: 0,
      }
    },
    methods: {
      approve (row) {
        this.modify("approved",row)
      },
      reject (row) {
        this.modify("rejected",row)
      },
      modify(str,row){
        let infoUpdate = this.updates[row]
        this.updates.splice(row,1)
        infoUpdate.state = str
        let http = new XMLHttpRequest()
        let path = app.path() + "/infoUpdate/update"
        http.open('POST',path,true)
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        http.send(JSON.stringify(infoUpdate))
      },
      getUpdates () {
        let _this = this
        let http = new XMLHttpRequest()
        let address = app.path() + '/infoUpdate/getAll'
        http.open('GET', address, true)
        http.send(null)
        http.onreadystatechange = function () {
          if (http.readyState === 4 && http.status === 200) {
            _this.updates = JSON.parse(http.responseText);
          }
        }
      },
      getSettlements(){
        let _this = this
        let http = new XMLHttpRequest()
        let address = app.path() + '/admin/getSettlements'
        http.open('GET', address, true)
        http.send(null)
        http.onreadystatechange = function () {
          if (http.readyState === 4 && http.status === 200) {
            _this.settlements = JSON.parse(http.responseText);
          }
        }
      },
      settleAll(){
        for(var i = 0 ; i < this.settlements.length;i++){
          settlements[i].settled = true;
        }
        let http = new XMLHttpRequest()
        let address = app.path() + '/admin/settle'
        http.open('POST',address,true)
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        http.send(JSON.stringify(this.settlements))
      },
      settle(row){
        this.settlements[row].settled = true
        let http = new XMLHttpRequest()
        let address = app.path() + '/admin/settle'
        http.open('POST',address,true)
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        http.send(JSON.stringify(this.settlements[row]))
        this.openSuccess();
      },
      openSuccess(){
        this.$notify({
          title:'Success',
          message :'done perfectly',
          type : 'success'
        })
      },
      getBalance(){
        let _this = this
        let http = new XMLHttpRequest()
        let address = app.path() + '/admin/getBalance'
        http.open('GET', address, true)
        http.send(null)
        http.onreadystatechange = function () {
          if (http.readyState === 4 && http.status === 200) {
            _this.balance = http.responseText
          }
        }
      }

    }
  }
</script>

<style scoped>

</style>
