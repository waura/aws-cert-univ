<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="examinationSentenceLable"
                    label="Examination Sentence:"
                    label-for="examinationSentence">
        <b-form-input id="examinationSentence"
                      type="text"
                      v-model="form.examinationSentence"
                      required
                      placeholder="Enter Examination Sentence" />
      </b-form-group>
      <template v-for="(option, index) in form.options">
        <b-form-group v-bind:label="index" :key="index">
          <b-form-input type="text"
                        v-model="options"
                        placeholder="Enter" />
        </b-form-group>
      </template>
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
        examinationSentence: '',
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
        ]
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
      alert(JSON.stringify(this.form))
      axios.post(process.env.API_ENDPOINT + '/api/questions', {withCredentials: true})
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
