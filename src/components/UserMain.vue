<template>
  <el-main>
    <div>
      <div style="position: absolute; top: 10px;width: 100%; left: 0;">
        <div
          style="position: absolute; top: 20px;width: 1100px; left: 50%; margin-left: -550px; background-color: white; height: 700px">
          <div id="account_info" style="width: 100%; height: 171px; position: absolute; left: 0px; top: 0px;">
            <span style="font-size: 18px;position: absolute;left: 30px; top: 20px;">User Profile</span>
            <div style="position: absolute; left: 35px; top: 70px">
              ID：<span style="font-size: 16px;color: #767676">{{User.uid}}</span>
            </div>
            <div style="position: absolute; left: 400px; top: 70px">
              NAME：<span style="font-size: 16px;color: #767676">{{User.name}}</span>
            </div>

            <div style="position: absolute; left: 35px; top:110px">
              PHONE：<span style="font-size: 16px;color: #767676">{{User.phone}}</span>
            </div>
            <div style="position: absolute; left: 400px; top:110px">
              EMAIL：<span style="font-size: 16px;color: #767676">{{User.email}}</span>
            </div>
            <div style="position: absolute;left:35px;top:150px">
              POINTS: <span style="font-size: 16px;color: #767676">{{User.score}}</span>
            </div>
            <div style="position: absolute;left:400px;top:150px">
              LEVEL: <span style="font-size: 16px;color: #767676">{{User.level}}</span>
            </div>
            <div style="position: absolute;left: 800px;top: 70px">
              BALANCE: <span style="font-size: 16px ;color: #767676">{{User.balance}} </span>
            </div>
            <div
              style="width: 94%;height: 1px;background-color: #dadada;left: 3%; top: 170px;position: absolute;"></div>
            <el-button id="edit_name" style="position: absolute; top: 30px; right: 50px" icon="el-icon-edit-outline"
                       type="text" @click="profileDialogVisible = true">Edit Profile
            </el-button>
            <el-button style="position: absolute; top: 130px; right: 50px;" type="danger" @click="cancelUser">Cancel
              User
            </el-button>
          </div>
        </div>
        <el-dialog title="Update Profile" :visible.sync="profileDialogVisible">
          <el-form :model="userInfo" ref="userInfo">
            <el-form-item prop="name">
              <el-input placeholder="New name"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input placeholder="New phone"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="New password"></el-input>
            </el-form-item>
            <el-form-item>
              <span>
              <el-button @click="profileDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="updateProfile">Submit</el-button>
              </span>
            </el-form-item>
          </el-form>

        </el-dialog>
        <el-button style="position: absolute; top: 200px; left: 200px " @click="newDialogVisible = true">Add Address
        </el-button>
        <el-dialog title="add new address"
                   :visible.sync="newDialogVisible">
          <el-form :model="newAddress">
            <el-form-item prop="name">
              <el-input v-model="newAddress.name" placeholder="NAME"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input placeholder="PHONE" v-model="newAddress.phone"></el-input>
            </el-form-item>
            <template>
              <div id="app">
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange">
                </el-cascader>
              </div>
            </template>
            <el-form-item prop="street">
              <el-input placeholder="STREET" v-model="newAddress.street"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
    <el-button @click="newDialogVisible = false">cancel</el-button>
    <el-button type="primary" @click="addRow">submit</el-button>
  </span>
        </el-dialog>


        <el-dialog title="modify address"
                   :visible.sync="modifyDialogVisible">
          <el-form :model="modifyAddress">
            <el-form-item prop="name">
              <el-input v-model="modifyAddress.name" placeholder="NAME"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input placeholder="PHONE" v-model="modifyAddress.phone"></el-input>
            </el-form-item>
            <template>
              <div>
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange">
                </el-cascader>
              </div>
            </template>
            <el-form-item prop="street">
              <el-input placeholder="STREET" v-model="modifyAddress.street"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
    <el-button @click="modifyDialogVisible = false">cancel</el-button>
    <el-button type="primary" @click="updateAddress">submit</el-button>
  </span>
        </el-dialog>


        <div style="position: absolute; top: 250px; left: 190px; padding-left: 20px;background-color: white;">

          <el-table :data="User.addresses" style="width:100%" max-height="300">
            <el-table-column fixed prop="name" label="NAME" width="120"></el-table-column>
            <el-table-column fixed prop="phone" label="PHONE" width="150"></el-table-column>
            <el-table-column fixed prop="province" label="PROVINCE" width="130"></el-table-column>
            <el-table-column fixed prop="city" label="CITY" width="130"></el-table-column>
            <el-table-column fixed prop="district" label="DISTRICT" width="130"></el-table-column>
            <el-table-column fixed prop="street" label="STREET" width="300"></el-table-column>
            <el-table-column label="OPERATION" width="130">
              <template slot-scope="scope">
                <el-button @click.native.prevent="updateRow(scope.$index,User.addresses)" type="text" size="small">
                  EDIT
                </el-button>
                <el-button @click.native.prevent="deleteRow(scope.$index,User.addresses)" type="text" size="small">
                  DELETE
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-button type="primary" style="position: absolute; top: 700px; left: 50%;" @click="startOrder"> Start Order
        </el-button>
        <el-button type="primary" style="position: absolute; top: 750px; left: 50%;" @click="gotoMyOrders">My Orders
        </el-button>

      </div>

    </div>

  </el-main>
</template>

<script>
  import {provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode}
    from 'element-china-area-data'
  import App from '@/App'

  export default {

    name: 'UserMain',
    created () {
      this.getUser()

    },
    computed: {
      province: function () {
        return CodeToText[this.selectedOptions[0]]
      },
      city: function () {
        return CodeToText[this.selectedOptions[1]]
      },
      district: function () {
        return CodeToText[this.selectedOptions[2]]
      }
    },
    data () {

      return {

        User: {
          uid: '',
          name: '',
          password: '',
          email: '',
          phone: '',
          addresses: [],
          state: '',
          level: '',
          balance: '',
          score: '',
        },
        userInfo: {
          name: '',
          password: '',
          phone: '',
        },
        address: {
          phone: '',
          name: '',
          province: '',
          city: '',
          district: '',
          street: '',
        },
        newAddress: {
          phone: '',
          name: '',
          street: '',
        },
        newDialogVisible: false,
        modifyDialogVisible: false,
        modifyAddress: {
          phone: '',
          name: '',
          province: '',
          city: '',
          district: '',
          street: '',
        },
        options: regionData,
        selectedOptions: []
        ,
        labelWidth: '80px'
        ,
        modifyIndex: '',
        profileDialogVisible: false,
      }
    },
    methods: {
      startOrder () {
        this.$router.push('/user/selectRestaurant')
      },
      updateProfile () {
        this.$refs.userInfo.validate((valid) => {
          if (valid) {
            this.profileDialogVisible = false
            this.User.name = this.userInfo.name
            this.User.password = this.userInfo.password
            this.User.phone = this.userInfo.phone
            this.updateUser()
          } else {
            alert('Please fill the form correctly first')
          }
        })
      }
      ,
      cancelUser () {
        let _this = this
        let http = new XMLHttpRequest()
        let path = App.path() + '/user/cancel'
        http.open('POST', path, true)
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        http.send(JSON.stringify(this.User))
        http.onreadystatechange = function () {
          if (http.readyState === 4 && http.status === 200) {
            _this.$router.push('/')
            alert('you have canceled successfully')
          }
        }

      },
      handleChange (value) {

      },

      updateAddress () {
        this.modifyDialogVisible = true

        let address = {
          name: this.modifyAddress.name,
          phone: this.modifyAddress.phone,
          province: this.province,
          city: this.city,
          district: this.district,
          street: this.modifyAddress.street,
        }
        this.User.addresses.splice(this.modifyIndex, 1, address)
        this.modifyDialogVisible = false
        this.modifyIndex = ''
        this.updateUser()

      },
      getUser () {
        let email = localStorage.getItem('email')
        let http = new XMLHttpRequest()
        let path = App.path() + '/user/findUserByEmail?email=' + email
        http.open('GET', path, true)
        http.send(null)
        http.onreadystatechange = function () {
          if (http.readyState === 4 && http.status === 200) {
            this.User = JSON.parse(http.responseText)
            console.log(http.responseText)
          }
        }.bind(this)
      },
      updateUser () {
        let user = this.User
        let path = App.path() + '/user/update'
        let http = new XMLHttpRequest()

        http.open('POST', path, true)
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        http.send(JSON.stringify(user))
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
        console.log(this.User)
        this.updateUser()
      },

      updateRow (index, rows) {
        this.modifyAddress = rows
        this.modifyIndex = index
        this.modifyDialogVisible = true
      },
      addRow () {
        let address = {
          name: this.newAddress.name,
          phone: this.newAddress.phone,
          province: this.province,
          city: this.city,
          district: this.district,
          street: this.newAddress.street
        }
        this.newAddress = {
          phone: '',
          name: '',
          street: '',
        }
        this.selectedOptions = []
        this.newDialogVisible = false
        this.User.addresses.push(address)
        this.updateUser()
      },
      gotoMyOrders () {
        localStorage.setItem('uid', this.User.uid)
        this.$router.push('/user/myOrders')
      },


    },

  }

</script>

<style scoped>
  .el_card {
    margin: 10px;
    padding: 5px;
    width: 260px;
    height: 245px;
    float: left;
    position: relative;
  }

</style>
