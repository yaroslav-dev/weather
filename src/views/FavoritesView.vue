<template>
  <div>
    <template v-if="weatherBlocks">
      <WeatherBlock v-for="(block, index) in weatherBlocks" :blockIndex="block.id" :favorites="weatherBlocks"
        :index="index" :key="block.id" class="page_block" @removeFavorite="removeBlock" />
    </template>
  </div>
</template>

<script setup>
import WeatherBlock from '@/components/WeatherBlockComponent.vue';
import { onMounted, ref } from 'vue';

const weatherBlocks = ref([])

onMounted(() => {
  if (localStorage.getItem('favoriteCities')) {
    weatherBlocks.value = JSON.parse(localStorage.getItem('favoriteCities'))
  }
})

const removeBlock = (index) => {
  let cities = []
  cities = JSON.parse(localStorage.getItem('favoriteCities'))
  cities.splice(index, 1)
  localStorage.setItem('favoriteCities', JSON.stringify(cities))
  weatherBlocks.value = JSON.parse(localStorage.getItem('favoriteCities'))
}
</script>

<style scoped>
.page_block {
  background-color: var(--color-background-soft);
  border-radius: 12px;
}
.page_block:first-of-type {
  border-top-left-radius: 0;
}
.page_block:not(:last-of-type) {
  margin-bottom: 12px;
}
</style>