<template>
  <div class="register">
    <h1>Register Form</h1>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"            
      >
        <b-form-input
          id="input-1"
          v-model="$v.form.email.$model"
          :state="$v.form.email.$dirty ? !$v.form.email.$error : null"
          aria-describedby="input-1-live-feedback"   
          placeholder="Enter email"
          :class="{ 'is-invalid': errors.email }"
        ></b-form-input>
        <b-form-invalid-feedback v-if="! errors.email" id="input-1-live-feedback">
          This is a required field and email type.
        </b-form-invalid-feedback>
        <span style="font-size:12px" v-if="errors.email"  class="text-danger" id="input-invalid">{{ errors.email[0] }}</span>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:"  label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="$v.form.name.$model"
          :state="$v.form.name.$dirty ? !$v.form.name.$error : null"
          aria-describedby="input-1-live-feedback"
          placeholder="Enter name"
        ></b-form-input>

        <b-form-invalid-feedback id="input-1-live-feedback">
          This is a required field and must be at least 3 characters.
        </b-form-invalid-feedback>
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
          aria-describedby="input-1-live-feedback"
          placeholder="Enter password"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback">
          This is a required field and must be at least 8 characters.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-4"
        label="Confirm Password:"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          v-model="$v.form.c_password.$model"
          :state="$v.form.c_password.$dirty ? !$v.form.c_password.$error : null"
          aria-describedby="input-1-live-feedback"
          placeholder="Enter Confirm Password"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback">
          This is a required field and same as password.
        </b-form-invalid-feedback>
      </b-form-group>
     
      <b-form-group label="Individual radios">
        <b-form-radio v-model="$v.form.gendar.$model" :state="$v.form.gendar.$dirty ? !$v.form.gendar.$error : null"
          aria-describedby="input-1-live-feedback" name="some-radios" value="male">Male</b-form-radio>
        <b-form-radio v-model="$v.form.gendar.$model" :state="$v.form.gendar.$dirty ? !$v.form.gendar.$error : null"
          aria-describedby="input-1-live-feedback" name="some-radios" value="female">Female</b-form-radio>
          <b-form-invalid-feedback id="input-1-live-feedback">
          This is a required field .
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    	
    </b-form>


  </div>
  </template>
 <script>
 import { validationMixin } from 'vuelidate'
 import {email,required, minLength, between ,sameAs} from 'vuelidate/lib/validators'

 const axios = require('axios');
  export default {
    mixins: [validationMixin],
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: "",
          c_password: "",
          gendar:''
        },
        errors:[],
        totalNotif:'',
        show: true
      }
    },
    validations: {
      form: {
        name:{required,minLength:minLength(4)},
        email:{required,email},
        password:{required,minLength:minLength(8)},
        c_password:{required,minLength:minLength(8),sameAsPassword: sameAs('password')},
        gendar:{required}
      }     
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()       

        this.$v.form.$touch()
        if (this.$v.form.$anyError) {
         return
       }
       else{
          axios.post('/register', this.form)
          .then(response => {
           console.log(response);         
           this.errors = [];
          })
          .catch(error => {
             this.errors = error.response.data.errors;           
          })
       }
      
       
      },
      onReset(evt) {
        evt.preventDefault()
        this.form.email = ''
        this.form.name = ''
        this.form.password = ''
        this.form.c_password = ''        
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }


  </script>
