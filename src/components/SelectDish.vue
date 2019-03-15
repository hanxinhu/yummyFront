<template>
  <el-container>

    <el-main>
      <el-form ref="billForm">
        <el-form-item label="Address" required>
          <el-select v-model="address">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-table :data="billItems">
            <el-table-column label="name" prop="name">

            </el-table-column>
            <el-table-column label="description" prop="description">

            </el-table-column>
            <el-table-column label="num">
              <template scope="scope">
                <el-input-number v-model="scope.row.num" :min="0" :max="scope.row.max"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="price" prop="price">

            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="deliver time" required>
          <el-time-select v-model="expectedTime" :picker-options="{
    start: startTime,
    step: '00:10',
    end: '24:00' }">
          </el-time-select>
        </el-form-item>
        <el-form-item label="sum">
          {{sum}}
        </el-form-item>
        <el-form-item label="discount">
          {{discount}}
        </el-form-item>
        <el-form-item label="Privilege">
          {{privilege()}}
        </el-form-item>
        <el-form-item label="MoneyToPay">
          {{moneyToPay}}
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="createBill">Submit</el-button>
        </el-form-item>
      </el-form>

    </el-main>
  </el-container>
</template>

<script>
  import app from '../App'

  export default {
    name: 'SelectDish',
    computed: {
      startTime: function () {
        let date = new Date(new Date().getTime() + 10 * 60 * 1000)
        let hour = date.getHours()
        let minute = date.getMinutes()
        return hour + ':' + minute
      },
      sum: function () {
        let count = 0
        for (let i = 0; i < this.billItems.length; i++) {
          count += this.billItems[i].price * this.billItems[i].num
        }
        return count
      },
      discount: function () {
        return this.user.level * 0.01 * this.sum
      },
      moneyToPay: function () {
        return this.sum - this.privilege() - this.discount
      },

    },
    created () {
      this.getRestaurant()
      this.getUser()
    },
    data () {
      return {
        restaurant: {
          combos: [],
        },
        user: {},
        options: [],
        address: '',
        billItems: [],
        bill: {},
        expectedTime: '',
      }
    },
    methods: {

      privilege: function () {
        let combos = this.restaurant.combos
        let count = 0

        for (let i = 0; i < combos.length; i++) {
          let combo = combos[i]
          let dids = []

          for (let j = 0; j < this.billItems.length; j++) {
            let billItem = this.billItems[j]
            let inCombo = false
            let inDids = false
            let did = billItem.did
            if (billItem.num <= 0) {
              continue
            }
            for (let k = 0; k < combo.dishes.length; k++) {
              if (did === combo.dishes[k]) {
                inCombo = true
                break
              }
            }
            for (let k = 0; k < dids.length; k++) {
              if (did === dids[k]) {
                inDids = true
                break
              }
            }
            if (inCombo && (!inDids)) {
              dids.push(did)
            }
          }
          if (dids.length === combo.dishes.length) {
            count += combo.privilege
          }
        }
        return count
      },
      getRestaurant () {
        let restaurantID = localStorage.getItem('restaurant')
        let http = new XMLHttpRequest()
        let path = app.path() + '/restaurant/findByID?ID=' + restaurantID
        http.open('GET', path, true)
        http.send(null)
        let _this = this
        http.onreadystatechange = function () {
          if (http.readyState === 4 && http.status === 200) {
            _this.restaurant = JSON.parse(http.responseText)

            for (let i = 0; i < _this.restaurant.dishes.length; i++) {
              let dish = _this.restaurant.dishes[i]
              let billItem = {
                did: dish.id,
                name: dish.name,
                description: dish.description,
                price: dish.price,
                num: 0,
                max: dish.number - dish.sales,
              }

              _this.billItems.push(billItem)
            }
          }
        }
      },
      getUser () {
        let email = localStorage.getItem('email')
        let http = new XMLHttpRequest()
        let path = app.path() + '/user/findUserByEmail?email=' + email
        http.open('GET', path, true)
        http.send(null)
        http.onreadystatechange = function () {
          if (http.readyState === 4 && http.status === 200) {
            this.user = JSON.parse(http.responseText)
            console.log(this.user.addresses)
            console.log(this.restaurant)
            for (let i = 0; i < this.user.addresses.length; i++) {
              let address = this.user.addresses[i]
              let label = 'Phone : ' + address.phone + 'Name : ' + address.name + 'Address: ' + address.province + address.city + address.district + address.street
              let value = i
              let option = {
                label: label,
                value: value,
              }
              this.options.push(option)
            }
          }
        }.bind(this)
      },
      createBill () {
        //检查账户余额
        let pay = this.moneyToPay
        let balance = this.user.balance
        if (pay > balance) {
          alert('you don\'t have enough money')
          return
        }
        let address = this.user.addresses[this.address]

        let deliverable = this.restaurant.province === address.province && this.restaurant.city === address.city && this.restaurant.district === address.district
        if (!deliverable) {
          alert('unreachable')
          return
        }
        //检查库存
        //创建订单
        let http = new XMLHttpRequest()
        let path = app.path() + '/bill/create'
        let rid = localStorage.getItem('id')
        let uid = localStorage.getItem('uid')
        let items = []
        for (let i = 0; i < this.billItems.length; i++) {
          if (this.billItems[i].num > 0) {
            items.push(this.billItems[i])
          }
        }
        let privilege = this.privilege()
        let discount = this.discount
        let sum = this.sum
        let moneyToPay = this.moneyToPay
        let bill = {
          rid: rid,
          uid: uid,
          province: address.province,
          city: address.city,
          district: address.district,
          street: address.street,
          phone: address.phone,
          name: address.name,
          items: items,
          privilege: privilege,
          discount: discount,
          sum: sum,
          moneyToPay: moneyToPay,
        }
        console.log(bill)
        http.open('POST', path, true)
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        http.send(JSON.stringify(bill))
        console.log()
        let _this = this
        http.onreadystatechange = function () {
          if (http.status === 200 && http.readyState === 4) {
            _this.$router.push('/user/myOrders')
          }
        }
      }
    }

  }
</script>

<style scoped>

</style>
