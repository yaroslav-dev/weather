<template>
  <div class="wrapper">
    <header class="header">
      <h1>Weather</h1>
      <div>
        <span class="lang_item lang_active">EN</span>&nbsp;|&nbsp;<span class="lang_item">UA</span>
      </div>
    </header>
    <div class="main_block">
      <div class="tabs_block">
        <template v-for="(tab, index) in tabs">
          <button class="tab_btn" :class="{'tab_active': tab.active}" @click="changeTab(index)">{{ $t(tab.name) }}</button>
        </template>
      </div>
      <div class="page_block">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import router from './router';
import { useRoute } from 'vue-router';
const route = useRoute()

const tabs = ref([
  {
    title: 'Main',
    name: 'tabs.main',
    active: true,
    url: '/'
  },
  {
    title: 'Favorites',
    name: 'tabs.favorites',
    active: false,
    url: '/favorites'
  }
])

const changeTab = (index) => {
  tabs.value.forEach((tab, i) => {
    if (i == index) {
      tab.active = true
    } else {
      tab.active = false
    }
  })
  router.push(tabs.value[index].url)
}

onMounted(() => {
  tabs.value.forEach((tab) => {
    if (tab.url == route.fullPath) {
      tab.active = true
    } else {
      tab.active = false
    }
  })
})
</script>

<style scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
.header {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-weight: 600;
  font-size: 24px;
}

.main_block {
  padding: 12px 12px 24px;
}

.tabs_block {
  display: flex;
}

.tab_btn {
  width: 120px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  font-weight: 500;
  font-size: 16px;
  padding: 12px;
  border: none;
}
.tab_btn:first-child {
  border-radius: 12px 0 0 0;
}
.tab_btn:last-child {
  border-radius: 0 12px 0 0;
}
.tab_btn:active {
  background-color: var(--color-background-soft);
}
.tab_btn:not(.tab_active):hover {
  background-color: rgba(44, 62, 80, .5);
}

.tab_active {
  background-color: var(--color-background-soft);
  font-weight: 600;
}
</style>