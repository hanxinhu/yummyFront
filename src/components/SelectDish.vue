<template>
  <el-container>

    <el-main>
      <el-select>

      </el-select>
      <el-table :data="billItems">
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="description" label="Description"></el-table-column>
        <el-table-column prop="num" label="Num">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number" :min=0 :max=scope.row.num></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="createOrder()">Submit</el-button>
    </el-main>
  </el-container>
</template>

<script>
  import app from '../App'

  export default {
    name: 'SelectDish',
    created () {
      this.getBillItems()
    },
    data () {
      return {
        bill: {},
        billItems: [],
      }
    },
    methods: {
      getBillItems () {
        let _this = this
        let rid = localStorage.getItem('rid')
        let http = new XMLHttpRequest()
        let path = app.path() + '/restaurant/getDishItems?rid=' + 1
        http.open('GET', path, true)
        http.send(null)
        http.onreadystatechange = function () {
          if (http.readyState === 4 && http.status === 200) {
            _this.billItems = JSON.parse(http.responseText)
            for (var i = 0; i < _this.billItems.length; i++) {
              _this.billItems[i].number = 0
            }
          }
        }
      },
      createOrder () {
        localStorage.setItem("items",JSON.stringify(this.billItems))
        this.$router.push("/user/orderGenerate")
        // let uid = localStorage.getItem('uid')
        // let rid = localStorage.getItem('rid')
        // const items = []
        // for (let i = 0; i < this.billItems.length; i++) {
        //   if (this.billItems[i].number > 0) {
        //     let item = billItems[i]
        //     // delete  item.num
        //     // delete  item.description
        //     items.push(item)
        //   }
        // }
        // this.bill.items = items
        // this.bill.uid = uid
        // this.bill.rid = rid
        // let http = new XMLHttpRequest()
        // let path = app.path() + '/bill/create'
        // http.open('POST', path, true)
        // http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        // http.send(JSON.stringify(this.bill))
        // http.onreadystatechange = function () {
        //   if (http.readyState === 4 && http.status === 200) {
        //        console.log(http.responseText)
        //   }
        // }
      }

    }

  }
</script>

<style scoped>

</style>
