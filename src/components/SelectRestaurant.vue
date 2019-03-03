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
          <el-button type="primary">select</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
  export default {
    name: 'SelectRestaurant',
    created () {

    },
    data () {
      return {
        restaurants: []

      }
    }
  }
</script>

<style scoped>

</style>
