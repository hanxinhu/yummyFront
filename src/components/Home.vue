<template>
  <div>
    <el-button @click="toUser">I am a user</el-button>
    <el-button @click="toRestaurant">I am a restaurant owner</el-button>
  </div>

</template>
<script>
export default {
  name: 'Home',
  methods:{
    toUser(){
      this.$router.push({path: '/user'})
    },
    toRestaurant(){
      this.$router.push({path: '/restaurant'})
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
