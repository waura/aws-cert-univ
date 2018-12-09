<template>
  <div>
    <!-- alert for failed to post-->
    <b-alert variant="danger"
             dismissible
             :show="showFailedToPostAlert"
             @dismissed="showFailedToPostAlert=false">
      Failed to post the question.
    </b-alert>
    <!-- question form -->
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group class="m-3"
                    id="categoriesLabel"
                    label="Categories:"
                    label-for="categories">
        <tags-input element-id="categories"
            v-model="selectedCategories"
            :existing-tags="existingCategories"
            :typeahead="true"
            :only-existing-tags="true" />
      </b-form-group>
      <b-form-group class="m-3"
                    id="tagsLabel"
                    label="Tags:"
                    label-for="tags">
        <tags-input element-id="tags"
            v-model="selectedTags"
            :existing-tags="existingTags"
            :typeahead="true"
            :only-existing-tags="true" />
      </b-form-group>
      <b-form-group class="m-3"
                    id="sentenceLabel"
                    label="Examination Sentence:"
                    label-for="sentence">
        <b-form-textarea id="sentence"
                         v-model="form.sentence"
                         required
                         placeholder="Enter Examination Sentence"
                         :rows="3" />
      </b-form-group>
      <b-form-group class="m-3" label="Options">
        <template v-for="index in numberOfOptions">
          <b-form-textarea :key="index"
                           v-model="form.options[index - 1]"
                           required
                           placeholder="Enter"
                           :rows="2" />
        </template>
        <b-form-row align-h="end">
          <b-button @click="updateNumberOfOptions(numberOfOptions - 1)">-</b-button>
          <b-button @click="updateNumberOfOptions(numberOfOptions + 1)">+</b-button>
        </b-form-row>
      </b-form-group>
      <b-form-group class="m-3"
                    id="answerLable"
                    label="Examination Answer:">
        <b-form-checkbox-group v-model="form.answer" :options="answerOptions">
        </b-form-checkbox-group>
      </b-form-group>
      <b-form-group class="m-3"
                    id="commentaryLabel"
                    label="Examination Commentary:"
                    label-for="commentary">
        <b-form-textarea id="commentary"
                        v-model="form.commentary"
                        placeholder="Enter Commentary of Answer"
                        :rows="10" />
      </b-form-group>
      <b-button class="m-3" type="submit" variant="primary">Submit</b-button>
      <b-button class="m-3" type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      showFailedToPostAlert: false,
      numberOfOptions: 4,
      minNumberOfOptions: 1,
      maxNumberOfOptions: 10,
      form: {
        sentence: '',
        options: [],
        answer: [],
        commentary: ''
      },
      selectedCategories: [],
      existingCategories: {},
      originCategories: [],
      selectedTags: [],
      existingTags: {},
      originTags: [],
      answerOptions: []
    }
  },
  created: function () {
    this.updateNumberOfOptions(this.numberOfOptions)
    this.updateCertificationCategories()
    this.updateQuetionTags()
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()

      axios.post(process.env.API_ENDPOINT + '/api/questions', this.form)
        .then(response => {
          var questionId = response.data.id

          // add link to certification categories
          for (const value of this.selectedCategories) {
            var category = this.getOrginTags(this.originCategories, value)
            this.linkToCategory(questionId, category.id)
          }

          // add link to question tags
          for (const value of this.selectedTags) {
            var tag = this.getOrginTags(this.originTags, value)
            this.linkToTag(questionId, tag.id)
          }

          // go to individual question page
          this.$router.push(`/questions/${questionId}`)
        })
        .catch(e => {
          this.showFailedToPostAlert = true
          console.log(e)
        })
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.sentence = ''
    },
    updateCertificationCategories () {
      var filter = {
        'fields': {
          'id': true,
          'name': true
        }
      }
      axios.get(process.env.API_ENDPOINT + '/api/certification_categories?filter=' + JSON.stringify(filter))
        .then(response => {
          this.originCategories = response.data
          this.existingCategories = this.convertToTagsInputExistingTags(this.originCategories)
        })
        .catch(e => {
          console.log(e)
        })
    },
    updateQuetionTags () {
      var filter = {
        'fields': {
          'id': true,
          'name': true
        }
      }
      axios.get(process.env.API_ENDPOINT + '/api/question_tags?filter=' + JSON.stringify(filter))
        .then(response => {
          this.originTags = response.data
          this.existingTags = this.convertToTagsInputExistingTags(this.originTags)
        })
        .catch(e => {
          console.log(e)
        })
    },
    updateNumberOfOptions (numberOfOptions) {
      if ((numberOfOptions < this.minNumberOfOptions) || (this.maxNumberOfOptions < numberOfOptions)) {
        return
      }
      this.numberOfOptions = numberOfOptions

      this.answerOptions = []
      for (var i = 0; i < this.numberOfOptions; i++) {
        this.answerOptions.push({text: String.fromCharCode('A'.charCodeAt() + i), value: i})
      }
    },
    linkToCategory (questionId, categoryId) {
      axios.put(process.env.API_ENDPOINT + '/api/questions/' + questionId + '/certification_categories/rel/' + categoryId)
        .then(response => {
        })
        .catch(e => {
          console.log(e)
        })
    },
    linkToTag (questionId, tagId) {
      axios.put(process.env.API_ENDPOINT + '/api/questions/' + questionId + '/question_tags/rel/' + tagId)
        .then(response => {
        })
        .catch(e => {
          console.log(e)
        })
    },
    convertToTagsInputExistingTags (objectArray) {
      /*
        This function convert data for a param of <tags-input>.

        objectArray = [
          {name: "foo"},
          {name: "bar"}
        ]

        convert objectArray to as follows:

        existingTags = {
          1: "foo",
          2: "bar"
        }
      */
      var count = 1
      var existingTags = {}
      for (const value of objectArray) {
        existingTags[count++] = value.name
      }
      return existingTags
    },
    getOrginTags (originData, selectedKey) {
      return originData[Number(selectedKey) - 1]
    }
  }
}
</script>

<style>
/* The input */
.tags-input {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.tags-input input {
    flex: 1;
    background: transparent;
    border: none;
}

.tags-input input:focus {
    outline: none;
}

.tags-input input[type="text"] {
    color: #495057;
}

.tags-input-wrapper-default {
    padding: .5rem .25rem;

    background: #fff;

    border: 1px solid transparent;
    border-radius: .25rem;
    border-color: #dbdbdb;
}

/* The tag badges & the remove icon */
.tags-input span {
    margin-right: 0.3rem;
}

.tags-input-remove {
    cursor: pointer;
    position: relative;
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    overflow: hidden;
}

.tags-input-remove:before, .tags-input-remove:after {
    content: '';
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    background: #5dc282;
    height: 2px;
    margin-top: -1px;
}

.tags-input-remove:before {
    transform: rotate(45deg);
}
.tags-input-remove:after {
    transform: rotate(-45deg);
}

/* Tag badge styles */
.tags-input-badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
}

.tags-input-badge-pill {
    padding-right: 0.6em;
    padding-left: 0.6em;
    border-radius: 10rem;
}

.tags-input-badge-selected-default {
    color: #212529;
    background-color: #f0f1f2;
}

/* Typeahead - badges */
.typeahead-badges > span {
    cursor: pointer;
    margin-right: 0.3rem;
}

/* Typeahead - dropdown */
.typeahead-dropdown {
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
}

.typeahead-dropdown li {
    padding: .25rem 1rem;
    cursor: pointer;
}

/* Typeahead elements style/theme */
.tags-input-typeahead-item-default {
    color: #fff;
    background-color: #343a40;
}

.tags-input-typeahead-item-highlighted-default {
    color: #fff;
    background-color: #007bff;
}
</style>
