<template>
<div class="box">
    <div class="columns is-vcentered" v-for="item in tasks"
              :key="item.id"
              :item="item.description">
          
              <div class="column" >
                   <form  @submit.prevent="editStatus(item)">
                     <input class="input" type="text" v-model=item.description :disabled="disabled == 0" >
                   </form>
              </div> 
             
             <div ><button class="button is-danger  is-normal" @click="deleteTask(item)">Delete</button></div>
            
             <div class="">
                 <button  v-if="isEditing" class="button is-success is-normal" @click="editStatus(item)">Confirm</button>
                 <button  v-else class="button is-success is-normal" @click="editStatus(item)">Edit</button>
            </div>
     </div> 
</div>
    
</template>
<script>
export default {
    data(){
        return{
            tasks:[],
            disabled: 0,
            isEditing:false
        }
    },
    created(){
        fetch("http://localhost:3000")
      .then(response => response.json())
        .then(result => {
          this.tasks=result
          console.log(this.tasks)
          })
    },
    methods:{

    
    deleteTask: function (item){
      fetch("http://localhost:3000/deleteTask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item)
        })
          .then(response => response.json())
          .then(data => {
            console.log("Success:", data);
          });
         window.location.reload()
      },
      editStatus(item){
        this.disabled = (this.disabled + 1) % 2
        this.isEditing=!this.isEditing
        if(this.isEditing==false){
          this.updateTask(item)
        }
        
        },

        updateTask(changedTask){
         fetch("http://localhost:3000/updateTask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changedTask)
        })
          .then(response => response.json())
          .then(data => {
            console.log("Success:", data);
          });
          window.location.reload()
          
        }
    }   
      
}
</script>

