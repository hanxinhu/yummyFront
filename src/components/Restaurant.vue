<template>
  <el-container>
    <el-main>
      <p>Already Have An Account?</p>
      <el-form :model="simpleInfo" ref="simpleInfo" :inline="true">
        <el-form-item label="ID">
          <el-input v-model="simpleInfo.account"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="simpleInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="logIn">Log In</el-button>
        </el-form-item>
      </el-form>
      <p>Sign Up</p>
      <el-form :model="info" ref="info">
        <el-form-item prop="name">
          <el-input v-model="info.name" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="info.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="info.password" placeholder="New password"></el-input>
        </el-form-item>
        <el-form-item prop="description">
          <el-input v-model="info.description" placeholder="Describe your restaurant"></el-input>
        </el-form-item>
        <el-form-item>
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            placeholder="Select location">
          </el-cascader>

        </el-form-item>
        <el-form-item prop="street">
          <el-input v-model="info.street" placeholder="Street"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="type" placeholder="Your Type">
          </el-input>
        </el-form-item>
        <h5>By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS
          Notifications from us and can opt out any time.</h5>

        <el-form-item>
          <el-button @click="signUp" type="primary">Sign Up</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  import {provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode}
    from 'element-china-area-data'
  import App from '@/App'

  export default {
    name: 'restaurant',
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
        simpleInfo: {
          account: '',
          password: ''
        },
        info: {
          name: '',
          password: '',
          email: '',
          province: '',
          city: '',
          description: '',
          district: '',
          street: '',
        },
        type: '',
        options: regionData,
        selectedOptions: [],
      }
    },
    methods: {
      signUp () {
        this.$refs.info.validate((valid) => {
          if (valid) {
            let http = new XMLHttpRequest()
            let path = App.path() + '/restaurant/signUp'
            http.open('POST', path, true)
            http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
            console.log(CodeToText[this.selectedOptions[0]])
            let restaurant = {
              name: this.info.name,
              password: this.info.password,
              email: this.info.email,
              province: this.province,
              city: this.city,
              district: this.district,
              street: this.info.street,
              type: this.type,
              description: this.info.description
            }
            console.log(restaurant)
            http.send(JSON.stringify(restaurant))
            http.onreadystatechange = function () {
              if (http.readyState === 4 && http.status === 200) {
                let id = http.responseText
                alert('your id is ' + id + ' please wait for approving')
              }
            }
          } else {
            alert('please fill the form first')
          }
        })
      },
      logIn () {
        this.$refs.simpleInfo.validate((valid) => {
          if (valid) {
            let http = new XMLHttpRequest()
            let ID = this.simpleInfo.account
            let password = this.simpleInfo.password
            let path = App.path() + '/restaurant/logIn?id=' + ID + '&password=' + password
            http.open('GET', path, true)
            http.send(null)
            http.onreadystatechange = function () {
              if (http.readyState === 4 && http.status === 200) {
                let result = JSON.parse(http.responseText)
                if (result === 'SUCCESS') {
                  this.$router.push('/restaurant/main')
                }
                alert(result)
              }
            }

          } else {
            alert('please fill the form first')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
