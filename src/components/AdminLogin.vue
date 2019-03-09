<template>
  <el-container>
    <el-main>
      <el-form :model="admin" status-icon ref="admin" :inline="true"  class="demo-login">
        <el-form-item label="Email:" prop="email" >
          <el-input v-model="admin.username"></el-input>
        </el-form-item>
        <el-form-item label="Password:" prop="password" >
          <el-input  v-model="admin.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Log In </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>

  export default {
    name: 'AdminLogin',
    data(){
    return {
      admin:{
        username:'',
        password:''
      }
    }


    },
    methods:{
      login(){
        if(this.admin.password=='88888888'){
          this.$router.push("/adminMain")
        }else {
          alert("wrong password. pleas input again")
        }
      }
    }
  }

</script>

<style scoped>

</style>
