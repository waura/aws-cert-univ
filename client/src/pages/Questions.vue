<template>
  <div>
    <b-row class="m-3">
      <b-col>
        <b-card>
          {{question.sentence}}
        </b-card>
      </b-col>
    </b-row>
    <b-row class="m-3">
      <b-col>
        <b-card>
          <ol type="A">
            <li v-for="option in question.options" :key="option.id">
              {{option.sentence}}
            </li>
          </ol>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="m-3">
      <b-col>
        <b-btn v-b-toggle.collapse1 variant="primary">Show Answer</b-btn>
        <b-collapse id="collapse1" class="mt-2">
          <b-card>
            <div>Answer: {{question.answer}}</div>
            <div>Commentary:</div>
            <div v-html="compiledMarkdown" />
          </b-card>
        </b-collapse>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import marked from 'marked'

export default {
  components: {
  },
  data () {
    return {
      question: {}
    }
  },
  created: function () {
    console.log(this.$route)
    this.updateQuestionData()
  },
  computed: {
    compiledMarkdown: function () {
      if (this.question.commentary != null) {
        return marked(this.question.commentary, { sanitize: true })
      }
      return 'loading...'
    }
  },
  methods: {
    updateQuestionData () {
      axios.get(process.env.API_ENDPOINT + '/api/questions/' + this.$route.params.id)
        .then(response => {
          this.question = response.data
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
