<template>
  <div>
    <b-row align-h="end" class="m-3">
      <b-col>
        <b-btn v-b-toggle.new_data_collapse variant="primary">Create New Data</b-btn>
        <b-collapse id="new_data_collapse" class="mt-2">
          <b-card>
            <DataManagementForm :type="type" :create="true" />
          </b-card>
        </b-collapse>
      </b-col>
    </b-row>
    <b-row class="m-3">
      <b-table striped hover :items="data" :fields="dataFields" :fixed="true">
        <!-- add edit button -->
        <template slot="edit" slot-scope="row">
          <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
            Edit
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <DataManagementForm :type="type" :create="false" :id="row.item.id" :form="row.item" />
          </b-card>
        </template>
        <!-- add delete button -->
        <template slot="delete" slot-scope="row">
          <b-button size="sm" @click="deleteData(row.item.id)" class="mr-2">
            Delete
          </b-button>
        </template>
      </b-table>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import DataManagementForm from '../components/DataManagementForm'

export default {
  components: {
    DataManagementForm
  },
  props: {
    'type': {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dataFields: [ 'id', 'name', 'edit', 'delete' ],
      data: []
    }
  },
  created: function () {
    axios.get(process.env.API_ENDPOINT + '/api/' + this.type)
      .then(response => {
        this.data = response.data
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    deleteData (id) {
      axios.delete(process.env.API_ENDPOINT + '/api/' + this.type + '/' + id)
        .then(response => {
          if (response.data.count >= 1) {
            // remove deleted item
            this.data = this.data.filter(function (elem) {
              return id !== elem.id
            })
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
