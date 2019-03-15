<template>
  <el-container>
    <el-main>
      <p>Statistics</p>
      <el-button @click="clearFilter">clear all filters</el-button>
      <el-table :data="bills" border show-summary ref="bills">
        <el-table-column prop="id" label="id" sortable>

        </el-table-column>
        <el-table-column
          prop="uid" label="user" sortable
          :filters="userFilters"
          :filter-method="filterHandler">

        </el-table-column>
        <el-table-column prop="createTime" label="CreateTime" sortable>

        </el-table-column>
        <el-table-column prop="payTime" label="PayTime" sortable>

        </el-table-column>
        <el-table-column prop="receiveTime" label="ReceiveTime" sortable>

        </el-table-column>
        <el-table-column prop="state" label="State"
                         column-key="state"
                         sortable
                         :filters="[{text:'unpaid',value:'unpaid'},{text:'paid',value:'paid'},{text:'canceled',value:'canceled'},{text:'received',value:'received'}]"
                         :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="sum" label="original price" sortable></el-table-column>
        <el-table-column prop="privilege" label="Privilege" sortable></el-table-column>
        <el-table-column prop="discount" label="discount" sortable></el-table-column>
        <el-table-column prop="moneyToPay" label="Money" sortable>
        </el-table-column>
      </el-table>
      <p> deliver records</p>
      <el-table :data="bills">
        <el-table-column prop="id" label="BillID" sortable>
        </el-table-column>
        <el-table-column
          prop="uid" label="user" sortable
          :filters="userFilters"
          :filter-method="filterHandler"></el-table-column>
        <el-table-column prop="name" label="name" sortable></el-table-column>
        <el-table-column prop="phone" label="phone" sortable></el-table-column>
        <el-table-column prop="province" label="province" sortable></el-table-column>
        <el-table-column prop="city" label="city" sortable></el-table-column>
        <el-table-column prop="district" label="district" sortable></el-table-column>
        <el-table-column prop="street" label="street" sortable></el-table-column>
        <el-table-column prop="receiveTime" label="ReceiveTime" sortable></el-table-column>
      </el-table>
      <el-button @click="returnMainPage">Return Main Page</el-button>
    </el-main>
  </el-container>

</template>

<script>
  import app from '../App'

  export default {
    name: 'RestStat',
    created () {
      this.initTable()
    },
    data () {
      return {
        bills: [],
        userFilters: [],

      }
    },
    methods: {
      initTable () {
        let rid = localStorage.getItem('restaurant')
        let path = app.path() + '/bill/findByRid?rid=' + rid
        let http = new XMLHttpRequest()
        http.open('GET', path)
        http.send(null)
        let _this = this
        http.onreadystatechange = function () {
          if (http.status === 200 && http.readyState === 4) {
            _this.bills = JSON.parse(http.responseText)
            let users = []
            for (let i = 0; i < _this.bills.length; i++) {
              users.push(_this.bills[i].uid)
            }
            const removeDuplicateItems = arr => [...new Set(arr)]

            users = removeDuplicateItems(users)
            console.log(users)
            for (let i = 0; i < users.length; i++) {
              _this.userFilters.push({
                text: users[i],
                value: users[i],
              })
            }

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
      returnMainPage () {
        this.$router.push('/user/main')

      }
    }
  }
</script>

<style scoped>

</style>
