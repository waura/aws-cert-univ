<template>
  <div>
    <!-- <b-form @submit="onSubmit" @reset="onReset"> -->
      <br/>
      you can sign in with
      <br/>
      <br/>
      <b-button class="btn_auth_google" :href="auth_google_url">
        <svg viewBox="0 0 24 24" width="1em" height="1em" class="login_icon">
          <path fill="white" fill-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm.044-5.213c2.445 0 4.267-1.551 4.556-3.781v-1.891h-4.519v1.89h2.602a2.893 2.893 0 0 1-2.724 1.93c-1.194 0-2.677-1.1-2.677-2.843 0-1.621 1.161-2.876 2.677-2.876.739 0 1.413.279 1.922.736l1.399-1.376a4.744 4.744 0 1 0-3.236 8.212z"></path>
        </svg>
        Google
      </b-button>
      <b-button class="btn_auth_github" :href="auth_github_url">
        <svg viewBox="0 0 24 24" width="1em" height="1em" class="login_icon">
          <path fill="white" fill-rule="evenodd" d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"></path>
        </svg>
        GitHub
      </b-button>
      <b-button class="btn_auth_twitter" :href="auth_twitter_url">
        <svg viewBox="0 0 24 24" width="1em" height="1em" class="login_icon">
          <path fill="white" fill-rule="evenodd" d="M400,200c0,110.5-89.5,200-200,200S0,310.5,0,200S89.5,0,200,0S400,89.5,400,200z M163.4,305.5 c88.7,0,137.2-73.5,137.2-137.2c0-2.1,0-4.2-0.1-6.2c9.4-6.8,17.6-15.3,24.1-25c-8.6,3.8-17.9,6.4-27.7,7.6 c10-6,17.6-15.4,21.2-26.7c-9.3,5.5-19.6,9.5-30.6,11.7c-8.8-9.4-21.3-15.2-35.2-15.2c-26.6,0-48.2,21.6-48.2,48.2 c0,3.8,0.4,7.5,1.3,11c-40.1-2-75.6-21.2-99.4-50.4c-4.1,7.1-6.5,15.4-6.5,24.2c0,16.7,8.5,31.5,21.5,40.1c-7.9-0.2-15.3-2.4-21.8-6 c0,0.2,0,0.4,0,0.6c0,23.4,16.6,42.8,38.7,47.3c-4,1.1-8.3,1.7-12.7,1.7c-3.1,0-6.1-0.3-9.1-0.9c6.1,19.2,23.9,33.1,45,33.5 c-16.5,12.9-37.3,20.6-59.9,20.6c-3.9,0-7.7-0.2-11.5-0.7C110.8,297.5,136.2,305.5,163.4,305.5"></path>
        </svg>
        Twitter
      </b-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      auth_google_url: process.env.API_ENDPOINT + '/api/auth/google',
      auth_github_url: process.env.API_ENDPOINT + '/api/auth/github',
      auth_twitter_url: process.env.API_ENDPOINT + '/api/auth/twitter'
    }
  },
  methods: {
    onPressAuthGoogleButton () {
      axios.get(process.env.API_ENDPOINT + '/api/auth/google', {withCredentials: true})
        .then(response => {
          // JSON responses are automatically parsed.
          console.log('response')
          console.log(response)
        })
        .catch(e => {
          console.log('error')
          console.log(e)
        })
    }
  }
}
</script>

<style>
.login_icon {
  color: #fff;
  width: 30px;
  height: 30px;
}
.btn_auth_google{
    color: #fff;
    background-color: #517EF3;
    border-color: #517EF3;
}
.btn_auth_github{
    color: #fff;
    background-color: #25292E;
    border-color: #25292E;
}
.btn_auth_twitter{
    color: #fff;
    background-color: #3B9DF1;
    border-color: #3B9DF1;
}
</style>
