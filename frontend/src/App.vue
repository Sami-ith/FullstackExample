<template>
  <div id="app" class="container">
    <h1 class="title">My todo</h1>
    <div><new-todo></new-todo></div>
    <div ><todo-list>
    </todo-list></div>
    

  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'
import NewTodo from './components/NewTodo.vue'

export default {
  name: 'App',
  components: {
    NewTodo,
    TodoList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
