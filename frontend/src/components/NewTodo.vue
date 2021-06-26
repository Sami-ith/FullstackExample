<template>
<div class="column ">
    <form  @submit.prevent="addTodo()">
          <input class="input"
          v-model="newTodo"
          type="text"
          placeholder="Create a new to-do..."
        />
    </form>
</div>
</template>
<script>


export default{
    data(){
        return{
            newTodo:""
        }
    },
    methods:{
        addTodo(){
            if (this.newTodo.length > 0) {
        let task={
          newTask:this.newTodo.toString()
        }
        
        fetch("http://localhost:3000/newTask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task)
        })
          .then(response => response.json())
          .then(data => {
            console.log("Success:", data);
          });
      }
      this.newTodo = "";
      window.location.reload()

      
        }
    }
}

</script>
