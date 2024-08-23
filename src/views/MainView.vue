<template>
  <div>
    <WeatherBlock v-for="(block, index) in weatherBlocks" :blockIndex="block.id" :index="index" :key="block.id" :favCities="favCitiesCount"
      class="page_block"
      :class="{ 'plus': weatherBlocks.length == 1 || index === weatherBlocks.length - 1 && weatherBlocks.length != 5, 'not_first': index }"
      @remove-block="removeBlock" @getFavorites="handleFavoritesCount" @favDialog="openDialog" />
    <button v-if="weatherBlocks.length < 5" class="add_btn" @click="addBlock">&plus;</button>
    <dialog class="alert_dialog" id="dialog-fav">
      <h3 class="dialog_header">5 cities max!</h3>
      <div class="dialog_footer">
        <button class="btn_dclose cancel" autofocus @click="handleDialog">OK</button>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import WeatherBlock from '@/components/WeatherBlockComponent.vue';
import { computed, onMounted, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const weatherBlocks = ref([
  {
    id: uuidv4()
  }
])

const favCities = ref(0)

onMounted(() => {
  handleFavoritesCount()
})

const handleFavoritesCount = () => {
  if (localStorage.getItem('favoriteCities')) {
    favCities.value = JSON.parse(localStorage.getItem('favoriteCities')).length
  }
}

const favCitiesCount = computed(() => {
  return favCities.value
})

const addBlock = () => {
  weatherBlocks.value.push({ id: uuidv4() })
  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }, 500)
}

const removeBlock = (index) => {
  weatherBlocks.value.forEach((item, idx) => {
    if (item.id === index) weatherBlocks.value.splice(idx, 1)
  })
}

const openDialog = () => {
  document.querySelector('#dialog-fav').showModal()
}

const handleDialog = () => {
  document.querySelector('#dialog-fav').close()
}
</script>

<style scoped>
.page_block {
  background-color: var(--color-background-soft);
  border-radius: 0 12px 12px 12px;
}

.page_block:not(:last-of-type) {
  margin-bottom: 12px;
}

.page_block.plus {
  border-bottom-left-radius: 0;
}

.page_block.not_first {
  border-top-left-radius: 12px;
}

.add_btn {
  width: 60px;
  background-color: var(--color-background-soft);
  border-radius: 0 0 12px 12px;
  color: var(--color-text);
  font-weight: 500;
  font-size: 16px;
  padding: 12px;
  border: none;
}

.alert_dialog {
  width: 180px;
  margin: auto;
  background-color: var(--color-background-soft);
  border: none;
  color: var(--vt-c-text-dark-2);
  border-radius: 12px;
}

.dialog_header {
  text-align: center;
  margin-bottom: 12px;
}

.dialog_footer {
  display: flex;
  column-gap: 12px;
}

.btn_dclose {
  width: 50%;
  height: 28px;
  margin-left: auto;
  background-color: var(--color-border-hover);
  color: var(--color-text);
  font-size: 14px;
  border-radius: 4px;
  padding: 6px;
  border: none;
}
</style>