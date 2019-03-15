<template>
  <el-container>
    <el-main>
      <el-button type="text" @click="gotoMainPage">return main page</el-button>
      <p>Bills</p>

      <el-table :data="bills" ref="bills" show-summary>
        <el-table-column prop="rid" label="restaurant" sortable
                         :filters="restaurantFilters"
                         :filter-method="filterHandler">
        </el-table-column>

        <el-table-column prop="createTime" label="CreatedTime" sortable>
        </el-table-column>
        <el-table-column prop="payTime" label="PayTime" sortable>

        </el-table-column>
        <el-table-column prop="receiveTime" label="receiveTime" sortable>

        </el-table-column>
        <el-table-column prop="moneyToPay" label="MoneyToPay" sortable>
        </el-table-column>
        <el-table-column prop="state" label="State" sortable
                         column-key="state"
                         :filters="[{text:'unpaid',value:'unpaid'},{text:'paid',value:'paid'},{text:'canceled',value:'canceled'},{text:'received',value:'received'}]"
                         :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="address" label="address" sortable>
        </el-table-column>
        <el-table-column label="options">
          <template scope="scope">
            <el-button v-show="scope.row.state === unpaid" @click="pay(scope.$index)">pay</el-button>
            <el-button v-show="scope.row.state === unpaid || scope.row.state === paid" @click="cancel(scope.$index)">
              cancel
            </el-button>
            <el-button v-show="scope.row.state === paid" @click="receive(scope.$index)">receive</el-button>
            <el-button>details</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
  import app from '../App'
  // orders with 付款 或者收货 创建完订单后自动跳转到这里
  export default {
    name: 'MyOrders',
    created () {
      this.getBills()
      let _this = this
      setTimeout(function () {
        _this.cancelOverTime()
      }, 1000 * 30)

    },
    data () {
      return {
        bills: [],
        unpaid: 'unpaid',
        paid: 'paid',
        canceled: 'canceled',
        received: 'received',
        restaurantFilters: [],
      }
    },
    methods: {
      gotoMainPage () {
        this.$router.push('/user/main')
      },
      getBills () {
        let uid = localStorage.getItem('uid')
        let path = app.path() + '/bill/findByUid?uid=' + uid
        let http = new XMLHttpRequest()
        http.open('GET', path)
        http.send(null)
        let _this = this
        http.onreadystatechange = function () {
          if (http.status === 200 && http.readyState === 4) {
            _this.bills = JSON.parse(http.responseText)
            let restaurants = []
            for (let i = 0; i < _this.bills.length; i++) {
              let bill = _this.bills[i]
              restaurants.push(bill.rid)
              bill.address = bill.province + bill.city + bill.district + bill.street
            }
            const removeDuplicateItems = arr => [...new Set(arr)]

            restaurants = removeDuplicateItems(restaurants)
            console.log(users)
            for (let i = 0; i < restaurants.length; i++) {
              _this.restaurantFilters.push({
                text: restaurants[i],
                value: restaurants[i],
              })
            }
          }
        }

      },
      pay (row) {

        let path = app.path() + '/bill/pay'
        let http = new XMLHttpRequest()
        let bill = this.bills[row]

        http.open('POST', path)
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        http.send(JSON.stringify(bill))
        let _this = this
        http.onreadystatechange = function () {
          if (http.status === 200 && http.readyState === 4) {
            let result = JSON.parse(http.responseText)
            if (result === 'NOTENOUGHMONEY') {
              alert('your balance is not enough')
            } else if (result === 'SUCCESS') {
              _this.getBills()
              alert('pay successfully')
              setTimeout(function () {
                _this.receiveOverTime()
              }, 1000 * 60 * 60 * 24)
            }

          }
        }
      },
      cancel (row) {
        this.update('cancel', row)

      },
      receive (row) {
        this.update('receive', row)
      },
      update (opt, row) {
        let path = app.path() + '/bill/' + opt
        let http = new XMLHttpRequest()
        let bill = this.bills[row]
        http.open('POST', path)
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        http.send(JSON.stringify(bill))
        let _this = this
        http.onreadystatechange = function () {
          if (http.status === 200 && http.readyState === 4) {
            _this.getBills()
          }
        }

      },
      cancelOverTime () {
        let can = false
        for (let i = 0; i < this.bills.length; i++) {
          let bill = this.bills[i]
          if (bill.state === this.unpaid) {
            this.cancel(i)
            can = true
          }
        }
        if (can) {
          alert('your bill is over time, so it has been canceled')
        }
      },
      receiveOverTime () {
        for (let i = 0; i < this.bills.length; i++) {
          let bill = this.bills[i]
          if (bill.state === this.paid) {
            this.receive(i)
          }
        }

      },
      clearFilter () {
        this.$refs.bills.clearFilter()
      },
      filterHandler (value, row, column) {
        const property = column['property']
        return row[property] === value
      },
    }
  }
</script>

<style scoped>

</style>
