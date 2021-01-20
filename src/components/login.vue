<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        LogIn
      </v-btn>

      <div v-if="errorMsg">{{ errorMsg }}</div>
    </v-form>
  </div>
</template>

<script>
import apiServices from '../../services/apiService'

export default {
  data: () => ({
    valid: true,
    email: "",
    userEmail: [],
    errorMsg: null,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ]
  }),
  mounted () {
       
  },    
  methods: {
    validate() {
            apiServices.getUserDetails().then((res)=> {
                console.log(res.data)
                let invalidUser = true
            for(let i =0; i<res.data.length; i++) {
                if(res.data[i].email === this.email) {
                    this.$store.dispatch('isUserLogin', true)
                    this.$store.dispatch('setUserDetails', res.data[i])
                    invalidUser = false
                    this.errorMsg = null
                    this.$router.push('/')
                }
            }
            if(invalidUser) {
                this.errorMsg = " user not valid"
            }
        })
    }
  }
};
</script>