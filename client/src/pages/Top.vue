<template>
  <div>
    Top
    <b-row align-h="start">
      <b-button href="/questions/new" :size="size" :variant="primary">
        Create New Question
      </b-button>
    </b-row>
    <QuestionList />
  </div>
</template>

<script>
import QuestionList from '../components/QuestionList'

export default {
  components: {
    QuestionList
  }
}
</script>
