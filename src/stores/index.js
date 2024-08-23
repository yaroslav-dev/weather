import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const data = ref()

  return { data }
})
