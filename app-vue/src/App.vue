<template>
  <router-view />
  <!-- <button @click="add">
    Add
  </button> -->
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { setData } from './store/store'

const data = ref([
  {
    name: 'falabella',
    reach: 0.54,
    frequency: 8.13
  },
  {
    name: 'paris',
    reach: 0.25,
    frequency: 3.06
  }
])

// function add () {
//   data.value[0].reach = +(data.value[0].reach + 1).toFixed(2)
//   data.value[0].frequency = +(data.value[0].frequency + 1).toFixed(2)
//   data.value[1].reach = +(data.value[1].reach + 1).toFixed(2)
//   data.value[1].frequency = +(data.value[1].frequency + 1).toFixed(2)
//   setData(data.value)
// }

onMounted(() => {
  setData(data.value)
})
</script>

<style lang="scss" src="./assets/styles/main.scss" />
