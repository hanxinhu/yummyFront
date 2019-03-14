<template>
  <el-main>
    <el-table :data="restaurants">
      <el-table-column prop="name" label="Name">
      </el-table-column>
      <el-table-column prop="description" label="Description">
      </el-table-column>
      <el-table-column prop="type" label="Type">
      </el-table-column>
      <el-table-column prop="address" label="Address">
      </el-table-column>
      <el-table-column label="Operation">
        <template slot-scope="scope">
          <el-button type="primary" @click.native.prevent="select(scope.$index)">select</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
  import app from '../App'
  export default {
    name: 'SelectRestaurant',

    created () {
      this.getRestaurants()
      console.log(this.restaurants)
    },
    data () {
      return {
        restaurants: []
      }
    },
    methods:{
      getRestaurants(){
        let _this = this
        let http = new XMLHttpRequest();
        let path = app.path() + "/restaurant/getAll"
        http.open('GET',path,true)
        http.send(null)
        http.onreadystatechange = function () {
          if(http.readyState === 4 && http.status === 200){
             _this.restaurants = JSON.parse(http.responseText)
            for(var i = 0 ; i  < _this.restaurants.length;i++){
              _this.restaurants[i].address = _this.restaurants[i].province + _this.restaurants[i].city + _this.restaurants[i].district + _this.restaurants[i].street
            }
          }
        }
      },
      select(row){
        let id = this.restaurants[row].id
        localStorage.setItem("restaurant",id);
        this.$router.push("/user/selectDish")
      }

    }
  }
</script>

<style scoped>

</style>
