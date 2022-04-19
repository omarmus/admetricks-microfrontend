<template>
  <div class="container text-center">
    <div class="chart">
      <div class="chart-header">
        Alcance y frecuencia por top Marcas
      </div>
      <div class="chart-body">
        <div id="svg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { groupSort } from 'd3'
import store from '../../store/store'
import BarChart from './vendor/d3/barchart'

watch(store.data, (value) => {
  render(value)
})

function render (data) {
  const svg = BarChart(data, {
    x: d => d.name,
    y: d => d.reach,
    f: d => d.frequency,
    xDomain: groupSort(data, ([d]) => -d.reach, d => d.name),
    yFormat: '%',
    fFormat: '',
    yLabel: '↑ Frequency',
    xPadding: 0.3,
    width: 600,
    height: 240
  })
  document.getElementById('svg').innerHTML = ''
  document.getElementById('svg').appendChild(svg)
}

onMounted(() => {
  render(store.data)
})
</script>

<style lang="scss" scope>
.text-center {
  text-align: center;
}
.chart {
  margin-top: 20px;
  display: inline-block;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}
.chart-header {
  color: #848485;
  background-color: #f8f9fa;
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #edf0f1;
  font-size: 0.9rem;
  border-radius: 3px 3px 0 0;
}
.chart-body {
  padding: 0 20px 0 0;
  border: 1px solid #edf0f1;
  border-top: none;
  border-radius: 0 0 3px 3px;
}
</style>