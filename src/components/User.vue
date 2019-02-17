<template>
    <el-main>
      <el-form :model="UserLogin" status-icon ref="UserLogin" :inline="true" :rules="rules1" class="demo-login">
          <el-form-item label="Email:" prop="email" >
            <el-input v-model="UserLogin.email"></el-input>
          </el-form-item>
        <el-form-item label="Password:" prop="password" >
          <el-input  v-model="UserLogin.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Log In </el-button>
        </el-form-item>
      </el-form>
  <div></div>
      <h1>Sign Up</h1>
      <h2>It's free and always be</h2>
  <el-form :model="UserInfo" status-icon  :rules="rules2" ref="UserInfo" label-width="100px" class="demo-UserInfo">
    <el-form-item  prop="email">
      <el-input v-model="UserInfo.email" placeholder="Email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  prop="password">
      <el-input type="password" v-model="UserInfo.password" autocomplete="off" placeholder="New password"></el-input>
    </el-form-item>
    <el-form-item prop="name" >
      <el-input v-model="UserInfo.name" autocomplete="off" placeholder="Your Name"></el-input>
    </el-form-item>
    <el-form-item prop="phone" >
      <el-input v-model="UserInfo.phone" autocomplete="off" placeholder="Your Phone"></el-input>
    </el-form-item>
    <el-form-item>
      <h5>By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.</h5>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register">Sign Up</el-button>
    </el-form-item>
  </el-form>
    </el-main>
</template>

<script>
  import App from '../App.vue'
  export default {
    name: 'user',
    data () {

      return {
        UserLogin:{
          email: '',
          password: ''
        },

        UserInfo:{
          email:'',
          password:'',
          name:'',
          phone:''
        },
        rules1 :
          {
            email: [
              {required:true,message:'Please input your email!' ,trigger:'blur'},
              {type:'email',message:'The format of email is NOT correct' , trigger:'blur'}
            ],
            password: [{required:true,message:'Please input your password',trigger:'blur'},
              {min:7,max:15,message:'The length of password should between 7 and 15',trigger:'blur'}
            ]
          },
        rules2:{
          email: [
            {required:true,message:'Please input your email!' ,trigger:'blur'},
            {type:'email',message:'The format of email is NOT correct' , trigger:'blur'}
          ],
          password: [{required:true,message:'Please input your password',trigger:'blur'},
            {min:7,max:15,message:'The length of password should between 7 and 15',trigger:'blur'}
          ],
          name :[{required:true,message:'Please input your name',trigger:'blur'},
            {min:1,max:15,message:'The length of name should between 1 and 15',trigger:'blur'}
            ],
          phone :[{required:true,message:'Please input your phone number',trigger:'blur'},
            {min:11,max:11,message:'The format of number is NOT correct',trigger:'blur'}
          ]

        }

      };

    },
    methods:{
      login(){
        this.$refs.UserLogin.validate((valid)=>{

          if(valid){
            alert("commit")
          }else {
            alert("failed")
          }

        })
        console.log(this.UserLogin.email)
        console.log(this.UserLogin.password)

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://localhost:8088/user/logIn', true)
        xmlhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText.toString())
          }
        }
        var user = {
          name: 'U',
          password: '12121',
          email: 'hanxinhu521@foxmail.com',
          phone: '12123131',
        }

        xmlhttp.send(JSON.stringify(user))

      },
      register(){
        this.$refs.UserInfo.validate((valid)=>{
          if(valid){
            let http = new XMLHttpRequest();
            let path = App.path()+"/user/signUp"
            http.onreadystatechange = function(){
              console.log(http.responseText)
              if (http.readyState === 4 && http.status===200){
                if(http.responseText==="true"){
                  alert("Sign Up Success")
                }else if(http.responseText==="false"){
                  alert("Sign Up False")
                }
              }
            }
            http.open('POST',path,true)
            http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
            var email = this.UserInfo.email
            var phone = this.UserInfo.phone
            var password  =              this.UserInfo.password
            var name = this.UserInfo.name;
              let user = {
              email: email,
              phone: phone,
             password:password,
              name: name
            }
            http.send(JSON.stringify(user))
          }else {
            alert("Please fill the form First")
          }
        })
      },

    }

  }
</script>


<style scoped>
  .el-form{

  }
</style>
