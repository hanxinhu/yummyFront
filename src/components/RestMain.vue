<template>
  <el-main>
    <div>
      <div style="position: absolute;left: 0; top: 10px; width: 100%">
        <div
          style="position: absolute; top: 20px;width: 1100px; left: 50%; margin-left: -550px; background-color: white; height: 700px">
          <div style="position:absolute; width: 100%; left: 0; top: 0;">
            Restaurant Profile
            <div style="position: absolute; left: 35px; top: 70px">
              Name ：<span style="font-size: 16px;color: #767676">{{rest.name}}</span>
            </div>
            <div style="position: absolute; left: 335px; top: 70px">
              Email ：<span style="font-size: 16px;color: #767676">{{rest.email}}</span>
            </div>
            <div style="position: absolute; left: 635px; top: 70px">
              Type ：<span style="font-size: 16px;color: #767676">{{rest.type}}</span>
            </div>
            <div style="position: absolute; left: 935px; top: 70px">
              ID ：<span style="font-size: 16px;color: #767676">{{rest.rid}}</span>
            </div>
            <div style="position: absolute; left: 35px; top: 120px">
              Description ：<span style="font-size: 16px;color: #767676">{{rest.description}}</span>
            </div>
            <div style="position: absolute; left: 35px; top: 170px;">
              Location: <span style="font-size: 16px;color: #767676">{{rest.province}}{{rest.city}}{{rest.district}}
                {{rest.street}}
              </span>
            </div>
            <div><el-button type="primary">Edit Profile</el-button></div>
          </div>
          <el-dialog title="Update Profile" visible.snyc="">
            <el-form :model="newRest" ref="newRest">
              <el-form-item prop="name">
                <el-input placeholder="New name"></el-input>
              </el-form-item>
              <el-form-item prop="type">
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
                <div id="app">
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="selectedOptions"
                 >
                </el-cascader>
                </div>
              </el-form-item>
            </el-form>
          </el-dialog>
          <div style="position: absolute; top: 200px;width: 1100px; left: 50%; margin-left: -550px; background-color: white; height: 500px">
            Dishes<br>
            <el-button type="primary">Add Dish</el-button>
            <el-table :data="rest.dishes" border="true" style="width: 100%">
              <el-table-column prop="id" label="ID" width="100">
              </el-table-column>
              <el-table-column prop="name" label="Name" width="100">
              </el-table-column>
              <el-table-column prop="description" label="Description" width="400">
              </el-table-column>
              <el-table-column prop="price" label="Price" width="100">
              </el-table-column>
              <el-table-column prop="number" label="Number" width="100">
              </el-table-column>
              <el-table-column prop="type" label="Type"></el-table-column>
              <el-table-column prop="start" label="Start">
              </el-table-column>
              <el-table-column prop="end" label="End">
              </el-table-column>
              <el-table-column label="Operation" width="170">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent=""
                    type="text"
                    size="small">
                    DELETE
                  </el-button>
                  <el-button
                    @click.native.prevent=""
                    type="text"
                    size="small">
                    EDIT
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="position: absolute; top: 700px ;left:50%;margin-left: -550px;">
            <p>Combos</p>
            <el-table :data="rest.combos" border="true" style="width: 100%" >
              <el-table-column prop="id" label="ID" width="100">
              </el-table-column>
              <el-table-column prop="name" label="Name" width="100">
              </el-table-column>
              <el-table-column prop="description" label="Description" width="400">
              </el-table-column>
              <el-table-column prop="price" label="Price"></el-table-column>
              <el-table-column prop="number" label="Number">
              </el-table-column>
              <el-table-column prop="type" label="Type"></el-table-column>
              <el-table-column prop="start" label="Start">
              </el-table-column>
              <el-table-column prop="end" label="End">
              </el-table-column>
              <el-table-column label="Operation" width="170">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent=""
                    type="text"
                    size="small">
                    DELETE
                  </el-button>
                  <el-button
                    @click.native.prevent=""
                    type="text"
                    size="small">
                    EDIT
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>
        </div>


      </div>
    </div>
  </el-main>
</template>

<script>
  import App from '../App.vue'
  import {provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode}
    from 'element-china-area-data'
  export default {

    name: 'RestMain',

    data () {
      return {
        rest: {
          rid:'',
          name: '',
          email: '',
          type: '',
          description: '',
          province: '',
          city: '',
          district: '',
          street: '',
          combos:[],
          dishes:[],
        },
        newRest:{
          name:'',
          description:'',
          province:'',
          city:'',
          district:'',
          street:'',
        },
        updateProfileDialog : false,
        type:'',
        options: regionData,
        selectedOptions: [],
      }
    }
  }

</script>

<style scoped>

</style>
