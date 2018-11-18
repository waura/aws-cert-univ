<template>
  <div>
    <b-table striped hover :items="questions" :fields="questionFields" />
    <b-row align-h="between">
      <b-dropdown :text="selectedNumOfQuestions.text">
        <b-dropdown-item v-for="item in itemsOfDropdown" :key="item.text" @click="onSelectedDropdownItem(item)">
          {{ item.text }}
        </b-dropdown-item>
      </b-dropdown>
      <b-pagination
        v-if="selectedNumOfQuestions.value != null"
        v-model="currentPage"
        :total-rows="totalNumOfQuestions"
        :per-page="selectedNumOfQuestions.value"
        @input="updateTable" />
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      currentPage: 1,
      totalNumOfQuestions: 0,
      selectedNumOfQuestions: null,
      itemsOfDropdown: [
        {value: 20, text: '20'},
        {value: 50, text: '50'},
        {value: 100, text: '100'},
        {value: null, text: 'all'}
      ],
      questionFields: [
        {
          key: 'sentence',
          sortable: false
        }
      ],
      questions: []
    }
  },
  created: function () {
    if (this.itemsOfDropdown.length > 0) {
      this.selectedNumOfQuestions = this.itemsOfDropdown[0]
    }
    this.updateTotalNumOfQuestions()
    this.updateTable()
  },
  methods: {
    onSelectedDropdownItem (item) {
      this.selectedNumOfQuestions = item
      this.currentPage = 1
      this.updateTable()
    },
    updateTable () {
      var filter = {
        'fields': {
          'id': true,
          'sentence': true
        }
      }
      if (this.selectedNumOfQuestions.value != null) {
        // create pagenation parameter
        // if there isn't this parameter, API return whole items.
        filter.limit = this.selectedNumOfQuestions.value
        filter['skip'] = this.selectedNumOfQuestions.value * (this.currentPage - 1)
      }
      axios.get(process.env.API_ENDPOINT + '/api/questions?filter=' + JSON.stringify(filter))
        .then(response => {
          console.log(response)
          this.questions = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    updateTotalNumOfQuestions () {
      axios.get(process.env.API_ENDPOINT + '/api/questions/count')
        .then(response => {
          this.totalNumOfQuestions = response.data.count
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style>
</style>
