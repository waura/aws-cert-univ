<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="sentenceLabel"
                    label="Examination Sentence:"
                    label-for="sentence">
        <b-form-input id="sentence"
                      type="text"
                      v-model="form.sentence"
                      required
                      placeholder="Enter Examination Sentence" />
      </b-form-group>
      <template v-for="(option, index) in form.options">
        <b-form-group v-bind:label="index" :key="index">
          <b-form-input type="text"
                        v-model="form.options[index].sentence"
                        placeholder="Enter" />
        </b-form-group>
      </template>
      <b-form-group id="answerLable"
                    label="Examination Answer:"
                    label-for="examinationSentence">
        <b-form-input id="answer"
                      v-model="form.answer"
                      type="text"
                      placeholder="Enter Answer" />
      </b-form-group>
      <b-form-group id="commentaryLabel"
                    label="Examination Commentary:"
                    label-for="commentary">
        <b-form-textarea id="commentary"
                        v-model="form.commentary"
                        placeholder="Enter Commentary of Answer"
                        :rows="10" />
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        sentence: '',
        options: [
          {
            id: '1',
            sentence: ''
          },
          {
            id: '2',
            sentence: ''
          },
          {
            id: '3',
            sentence: ''
          },
          {
            id: '4',
            sentence: ''
          }
        ],
        answer: '',
        commentary: ''
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn'
      ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(process.env.API_ENDPOINT + '/api/questions', this.form)
        .then(response => {
          alert(JSON.stringify(response.data))
        })
        .catch(e => {
          console.log(e)
        })
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.examinationSentence = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  }
}
</script>
