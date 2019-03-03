<template>
  <el-container>

    <el-main>
      <p>Hello World</p>
      <el-table :data="order" >
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="description" label="Description"></el-table-column>
        <el-table-column prop="num" label="Num">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.num" :min=0 :max="scope.row.maxNumber"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary">Submit</el-button>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'SelectDish',
    data(){
      return{
       order:[],
        orderItem:[],

      }
    }
  }
</script>

<style scoped>

</style>
