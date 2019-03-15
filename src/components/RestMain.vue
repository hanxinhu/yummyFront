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
              ID ：<span style="font-size: 16px;color: #767676">{{rest.id}}</span>
            </div>
            <div style="position: absolute; left: 35px; top: 120px">
              Description ：<span style="font-size: 16px;color: #767676">{{rest.description}}</span>
            </div>
            <div style="position: absolute; left: 35px; top: 170px;">
              Location: <span style="font-size: 16px;color: #767676">{{rest.province}}{{rest.city}}{{rest.district}}
                {{rest.street}}
              </span>
            </div>
            <div>
              <el-button type="primary" :disabled='rest.updating' @click="updateProfileDialog = true">Edit Profile
              </el-button>
              <el-button v-show=updating type="text">your update is waiting</el-button>
            </div>
          </div>


          <el-dialog title="Update Profile" :visible.snyc="updateProfileDialog">
            <el-form :model="newRest" ref="newRest">
              <el-form-item prop="name">
                <el-input placeholder="New name" v-model="newRest.name"></el-input>
              </el-form-item>
              <el-form-item prop="description">
                <el-input v-model="newRest.description" placeholder="description"></el-input>
              </el-form-item>
              <el-form-item prop="type">
                <el-input v-model="newRest.type" placeholder="type">
                </el-input>
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
              <el-form-item prop="street">
                <el-input v-model="newRest.street" placeholder="street"></el-input>
              </el-form-item>
              <el-button @click="updateProfileDialog = false" type="text">Cancel</el-button>
              <el-button @click="newInfoUpdate" type="text"> Submit</el-button>
            </el-form>
          </el-dialog>

          <div
            style="position: absolute; top: 200px;width: 1100px; left: 50%; margin-left: -550px; background-color: white; height: 500px">
            Dishes
            <el-button type="primary" @click="newDishDialog = true">Add Dish</el-button>
            <el-table :data="rest.dishes" border style="width: 100%">
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
              <el-table-column prop="sales" label="Sale">

              </el-table-column>
              <el-table-column prop="start" label="Start">
              </el-table-column>
              <el-table-column prop="end" label="End">
              </el-table-column>
              <el-table-column label="Operation" width="170">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteDish(scope.$index)"
                    type="text"
                    size="small">
                    DELETE
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="newComboDialog = true">Add Combo</el-button>
            <el-table :data="rest.combos">
              <el-table-column prop="name" label="Name">

              </el-table-column>
              <el-table-column prop="dish" label="Dishes">

              </el-table-column>
              <el-table-column prop="privilege" label="Privilege">
              </el-table-column>
              <el-table-column prop="start" label="Start Time"></el-table-column>
              <el-table-column prop="end" label="End Time"></el-table-column>
            </el-table>
          </div>

          <el-dialog title="New Dish" :visible.snyc="newDishDialog">
            <el-form :model="newDish">
              <el-form-item label="Name">
                <el-input v-model="newDish.name"></el-input>
              </el-form-item>
              <el-form-item label="Description">
                <el-input v-model="newDish.description">
                </el-input>
              </el-form-item>
              <el-form-item label="number">
                <el-input-number v-model="newDish.number" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="price">
                <el-input-number v-model="newDish.price" :precision="2" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="StartTime">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="start"
                  type="date"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="EndTime">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="end"
                  type="date"
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
            <el-button type="text" @click="newDishDialog = false">Cancel</el-button>
            <el-button type="text" @click="addNewDish">Submit</el-button>
          </el-dialog>
          <el-dialog title="New Combo" :visible.snyc="newComboDialog">

            <el-input v-model="newCombo.name" placeholder="Name"></el-input>
            <el-table :data="rest.dishes" @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="name" label="Name" width="100">
              </el-table-column>
              <el-table-column prop="description" label="Description" width="200">
              </el-table-column>
              <el-table-column prop="price" label="Price" width="100">
              </el-table-column>
            </el-table>
            <el-input-number :precision="2" label="privilege" v-model="newCombo.privilege"></el-input-number>

            <el-date-picker
              value-format="yyyy-MM-dd" placeholder="StartTime"
              v-model="newCombo.start"
              type="date"
            >
            </el-date-picker>
            <el-date-picker
              value-format="yyyy-MM-dd" placeholder="EndTime"
              v-model="newCombo.end"
              type="date"
            >
            </el-date-picker>
            <el-button type="text" @click="newComboDialog = false">Cancel</el-button>
            <el-button type="text" @click="addNewCombo">Submit</el-button>

          </el-dialog>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
  import app from '../App.vue'
  import {provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode}
    from 'element-china-area-data'

  export default {

    name: 'RestMain',

    computed: {
      province: function () {
        return CodeToText[this.selectedOptions[0]]
      },
      city: function () {
        return CodeToText[this.selectedOptions[1]]
      },
      district: function () {
        return CodeToText[this.selectedOptions[2]]
      },
      updating: function () {
        return this.rest.updating
      }
    },
    created () {
      this.getRest()
    },
    data () {
      return {
        rest: {
          id: '',
          name: '',
          email: '',
          type: '',
          description: '',
          province: '',
          city: '',
          district: '',
          street: '',
          dishes: [],
          combos: [],
          updating: false,
        },
        newRest: {
          name: '',
          type: '',
          description: '',
          province: '',
          city: '',
          district: '',
          street: '',
        },
        newDish: {
          name: '',
          description: '',
          price: '',
          start: '',
          end: '',
          number: '',
        },
        newCombo: {
          name: '',
          dishes: [],
          start: '',
          end: '',
          privilege: '',
        },
        newComboDialog: false
        ,
        updateProfileDialog: false,
        newDishDialog: false,
        type: '',
        options: regionData,
        selectedOptions: [],
        start: '',
        end: '',
        multipleSelection: [],
      }
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
        console.log(val)
      },
      getRest () {

        let id = localStorage.getItem('id')
        let http = new XMLHttpRequest()
        let path = app.path() + '/restaurant/findByID?ID=' + id
        http.open('GET', path, true)
        http.send(null)
        let _this = this
        http.onreadystatechange = function () {
          if (http.status === 200 && http.readyState === 4) {
            _this.rest = JSON.parse(http.responseText)
            for (var i = 0; i < _this.rest.combos.length; i++) {
              var dish = ''
              for (var j = 0; j < _this.rest.combos[i].dishes.length; j++) {
                if (j === _this.rest.combos[i].dishes.length - 1) {
                  dish += _this.rest.combos[i].dishes[j] + ' '
                } else {
                  dish += _this.rest.combos[i].dishes[j] + ','
                }

              }
              _this.rest.combos[i].dish = dish
            }
          }

        }
      },
      newInfoUpdate () {
        this.updateProfileDialog = false
        this.rest.updating = true
        let http = new XMLHttpRequest()
        let path = app.path() + '/infoUpdate/new'
        http.open('POST', path)
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        let id = localStorage.getItem('id')
        console.log(id)
        let infoUpdate = {
          rid: id,
          nameBefore: this.rest.name,
          nameAfter: this.newRest.name,
          typeBefore: this.rest.type,
          typeAfter: this.newRest.type,
          descriptionBefore: this.rest.description,
          descriptionAfter: this.newRest.description,
          provinceBefore: this.rest.province,
          provinceAfter: this.province,
          cityBefore: this.rest.city,
          cityAfter: this.city,
          districtBefore: this.rest.district,
          districtAfter: this.district,
          streetBefore: this.rest.street,
          streetAfter: this.newRest.street,
        }
        http.send(JSON.stringify(infoUpdate))
      },
      addNewDish () {
        this.newDish.start = this.start
        this.newDish.end = this.end
        this.rest.dishes.push(this.newDish)
        this.newDishDialog = false
        this.newDish = {}
        this.updateRestaurant()
      },
      addNewCombo () {
        this.newComboDialog = false
        let dishes = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          dishes.push(this.multipleSelection[i].id)
        }
        this.newCombo.dishes = dishes
        this.rest.combos.push(this.newCombo)
        this.updateRestaurant()
      },
      deleteDish (row) {
        this.rest.dishes.splice(row, 1)
        this.updateRestaurant()
      },
      updateRestaurant () {
        let _this = this
        let restaurant = this.rest
        let http = new XMLHttpRequest()
        let path = app.path() + '/restaurant/update'
        http.open('POST', path)
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        http.send(JSON.stringify(restaurant))
        http.onreadystatechange = function () {
          if (http.status === 200 && http.readyState === 4) {
            _this.getRest()
          }
        }
      },
    }
  }

</script>

<style scoped>

</style>
