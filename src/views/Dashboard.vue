<template>
	<div class="container">
     <table class="table table-hover">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>

                <tr v-for="tabledata in tableData" v-bind:tabledata="tabledata.id">
                    <td>{{ count = count+1 }}</td>
                    <td>{{ tabledata.name }}</td>
                    <td>{{ tabledata.email }}</td>
                    <td><router-link :to="{name: 'edit', params: { id: tabledata.id }}" class="btn btn-primary">Edit</router-link><button class="btn btn-danger" @click.prevent="deletePost(tabledata.id)">Delete</button></td>

                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  data() {
    return {
      columns: ['id','name', 'album','action'],
      tableData: [],
      tabledata:'',
      count:0,
            options: {
                headings: {
                    id: 'ID',
                    name: 'Name',
                    email: 'Email',
                    action: 'Action'
                },
                sortable: ['id','name', 'email'],
                filterable: ['name', 'email']
    }
   } 
  },
  methods: {
    getData(){
      axios.get('/dashboard')
          .then(response => {
          	this.tableData = response.data;
           console.log(this.tableData);   
          })
          .catch(error => {
                   
          })        
    },
    deletePost(item){
        axios.delete('/dashboard/'+item).then((response) => {
        	 var index = this.tableData.findIndex(item => item.id === item);
        	 this.tableData.splice(index, 1);
        });

      }
  },
  mounted() {
  	this.getData();     
  }

}
</script>
