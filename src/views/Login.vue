<template>
  <div class="login">
  		<h1>Sign in</h1>
	<b-form @submit="login" v-if="show">
  		 <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"        
      >
        <b-form-input
          id="input-1"
          type="email"
          v-model="$v.form.email.$model"
          :state="$v.form.email.$dirty ? !$v.form.email.$error : null"
          aria-describedby="input-1-live-feedback"
          placeholder="Enter email"
          :class="{ 'is-invalid': errors['error'] }"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!errors['error']" id="input-1-live-feedback">
          This is a required field and email type.
        </b-form-invalid-feedback>
          <span style="font-size:12px" v-if="errors"  class="text-danger" id="input-invalid">{{ errors['error']}}</span>
      </b-form-group>

  		 <b-form-group
        id="input-group-3"
        label="Your Password:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="$v.form.password.$model"
          :state="$v.form.password.$dirty ? !$v.form.password.$error : null"
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

  	  <b-button type="submit" variant="primary">Submit</b-button>
	</b-form>
   	
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import {email,required, minLength, between ,sameAs} from 'vuelidate/lib/validators'

const axios = require('axios');
	export default {
  data(){
    return{
      form:{
        email: "",
        password: ""
      },
      show: true,
      errors:[]
    }
  },
  validations: {
      form: {
        email:{required,email},
        password:{required,minLength:minLength(8)}
      }     
    },
  methods:{
    login(evt){
      evt.preventDefault();      
      axios.post('/login', this.form)   
       .then(response => {
         console.log(response);
         let token = response.data.token;      
         this.$auth.setToken(token,Date.now());
         this.$router.push('dashboard');
          
      })
       .catch(error => {
          this.errors = error.response.data;
          console.log(this.errors);
        
      });
    }
  }
}

</script>