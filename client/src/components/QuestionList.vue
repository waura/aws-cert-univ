<template>
  <div>
    <b-table striped hover :items="questions" :fields="questionFields" :fixed="true">
      <template slot="sentence" slot-scope="data">
        <router-link :to="`/questions/${data.item.id}`">
          {{data.item.sentence}}
        </router-link>
      </template>
      <template slot="certification_categories" slot-scope="data">
        <template v-if="data.item.certification_categories">
          <div v-for="category in data.item.certification_categories" :key="category.id">
            {{category.name}}
          </div>
        </template>
      </template>
      <template slot="question_tags" slot-scope="data">
        <template v-if="data.item.question_tags">
          <div v-for="tag in data.item.question_tags" :key="tag.id">
            {{tag.name}}
          </div>
        </template>
      </template>
    </b-table>
    <b-row align-h="between" align-v="center">
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
        },
        {
          key: 'certification_categories',
          sortable: false
        },
        {
          key: 'question_tags',
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
        },
        'include': ['certification_categories', 'question_tags']
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
