<template>
  <div class="register">
    <h1>Edit</h1>
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
          value="name mukesh"
          v-model="$v.form.name.$model"
          :state="$v.form.name.$dirty ? !$v.form.name.$error : null"
          aria-describedby="input-1-live-feedback"         
        ></b-form-input>      
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
          email: ''          
        },
        errors:[],
        app:[],
        datas: [],
        show: true
      }
    },
    validations: {
      form: {
        name:{required,minLength:minLength(4)},
        email:{required,email}        
      }     
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()       
        let appli = this;
        let id = appli.$route.params.id;
        this.$v.form.$touch()
        if (this.$v.form.$anyError) {
         return
       }
       else{
          axios.patch('dashboard/'+id, this.form)
          .then(response => {
           console.log(response);         
           this.errors = [];
           this.$router.replace({ name: 'dashboard'})
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
    },
    mounted() {
    	// this.app = [];
    	let appli = this;
        let id = appli.$route.params.id;
        appli.companyId = id;

        axios.get('dashboard/'+id+'/edit')
           .then(resp => {
              this.form.name = resp.data.name;
              this.form.email = resp.data.email;
               //console.log(resp.data);
              console.log(this.form.name);
           })
             .catch(function () {
                alert("Could not load your company")
            });               
  	}
  }


  </script>
