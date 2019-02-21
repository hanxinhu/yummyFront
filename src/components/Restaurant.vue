<template>
  <el-container>
    <el-main>
      <p>Already Have An Account?</p>
      <el-form :model="simpleInfo" ref="simpleInfo" :inline="true">
        <el-form-item label="Account">
          <el-input v-model="simpleInfo.account"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="simpleInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Log In</el-button>
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
          <el-select v-model="type" placeholder="Select type">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button >Sign Up</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  import {provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode}
    from 'element-china-area-data'
  export default {
    name: 'restaurant',
    data(){
      return{
        simpleInfo:{
          account: '',
          password: ''
        },
        info:{
          name:'',
          password:'',
          email:'',
          province:'',
          city:'',
          description:'',
          district:'',
          street:'',
          type:'',
        },
        typeOptions:[{value:"LOW",label:'Low'},
          {value:'MIDDLE',label:'Middle'},
          {value:'HIGH',label:'High'}
        ],
        type:'',
        options: regionData,
        selectedOptions: [],
      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
