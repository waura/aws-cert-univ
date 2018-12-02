<template>
  <b-form @submit="onSubmit">
    <b-form-group id="name_group"
                  label="name:"
                  label-for="name"
                  description="Please enter a name.">
      <b-form-input id="name"
                    type="text"
                    v-model="form.name"
                    required
                    placeholder="Enter Name">
      </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    'type': {
      type: String,
      default: ''
    },
    'create': {
      type: Boolean,
      default: true
    },
    'id': {
      type: String,
      default: ''
    },
    'form': {
      type: Object,
      default: {
        name: ''
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()

      // check wether valid data
      if (this.form.name === '') {
        return
      }

      if (this.create) {
        axios.post(process.env.API_ENDPOINT + '/api/' + this.type, this.form)
          .then(response => {
            this.reset()
          })
          .catch(e => {
            console.log(e)
          })
      } else {
        axios.put(process.env.API_ENDPOINT + '/api/' + this.type + '/' + this.id, this.form)
          .then(response => {
            this.reset()
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    reset () {
      this.form.name = ''
    }
  }
}
</script>
