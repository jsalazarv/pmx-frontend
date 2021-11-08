<template></template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";



@Component({
  components: {
    //TodoForm,
    //TodoItem
  },
})
export default class EmployeesTable extends Vue {
  public todos: Array<string> = [];

  
}
</script>

<style>
</style>