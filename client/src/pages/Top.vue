<template>
  <div>
    <b-row align-h="end" class="m-3" v-if="loggedin">
      <b-button to="/questions/new">
        Create New Question
      </b-button>
    </b-row>
    <b-row class="m-3">
      <QuestionList />
    </b-row>
  </div>
</template>

<script>
import auth from '../components/Authentication'
import QuestionList from '../components/QuestionList'

export default {
  mixins: [auth],
  components: {
    QuestionList
  },
  data () {
    return {
      loggedin: false
    }
  }
}
</script>
