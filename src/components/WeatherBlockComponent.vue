<template>
  <div class="main_block_container">
    <div class="city_input_block" v-if="!props.favorites">
      <input class="city_input" :id="`place-${props.blockIndex}`" type="text" placeholder="Enter a city" />
      <button class="clear_btn" @click="clearInput">&times;</button>
      <button class="btn_rm" title="Remove card" v-if="props.index != 0"
        @click="weatherData ? removeBlock() : handleDialog('remove', props.blockIndex)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
          viewBox="0 0 16 16">
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </button>
      <dialog class="alert_dialog" :id="`dialog-${props.blockIndex}`">
        <h3 class="dialog_header">Are you sure?</h3>
        <div class="dialog_footer">
          <button class="btn_dclose cancel" autofocus @click="handleDialog('cancel')">Cancel</button>
          <button class="btn_dclose remove" autofocus @click="handleDialog('remove', props.blockIndex)">Remove</button>
        </div>
      </dialog>
      <button class="btn_rm" title="Add to favorites" @click="addToFavorites" v-if="!isInFavorites && selectedCity">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star"
          viewBox="0 0 16 16">
          <path
            d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
        </svg>
      </button>
    </div>
    <template v-if="weatherData">
      <div class="city_input_block">
        <!-- <button class="block_btn block_btn_left active">Today</button>
        <button class="block_btn block_btn_right">5 days</button> -->
        <button class="btn_rm btn_fav_rm" title="Remove card" @click="removeFromFavorite" v-if="props.favorites">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
            viewBox="0 0 16 16">
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </button>
      </div>
      <div class="weather_card_block">
        <div class="left_col">
          <div class="weather_date">
            {{ new Date((weatherData.dt + weatherData.timezone) * 1000).toLocaleDateString('en', {
              month: 'short', day:
                'numeric'
            }) }} |
            {{ new Date((weatherData.dt) * 1000).toLocaleTimeString('en') }}
          </div>
          <div class="weather_city">
            {{ cityName }}
            <button class="btn_star" v-if="isInFavorites" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" class="bi bi-star-fill"
                viewBox="0 0 16 16">
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </button>
          </div>
          <div class="forecast">Now</div>
          <div class="main_temp">{{ weatherData.main.temp.toFixed() }}&deg;</div>
        </div>
        <div class="right_col">
          <div class="main_weather_info">
            <img :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" alt="">
            <div class="main_weather_description">
              <div>{{ weatherData.weather[0].description.charAt(0).toUpperCase() +
                weatherData.weather[0].description.slice(1) }}</div>
            </div>
            <div class="feels_like">Feels like {{ weatherData.main.feels_like.toFixed() }}&deg;</div>
          </div>
        </div>
      </div>
    </template>
    <div class="cart_block">
      <div :id="`chart-${props.blockIndex}`"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { getGeoData, getHourlyWeatherData, getUserData, getWeatherData } from '@/API';
import { Loader } from "@googlemaps/js-api-loader"
import ApexCharts from 'apexcharts'
import { v4 as uuidv4 } from 'uuid';

const props = defineProps(['blockIndex', 'index', 'favCities', 'favorites'])
const emit = defineEmits(['remove-block', 'getFavorites', 'removeFavorite', 'favDialog'])

const userData = ref()
const weatherData = ref()
const hourlyWeather = ref()
const cityName = ref()
const limit = ref(8)
const isInFavorites = ref(false)

const favCitiesComp = computed(() => {
  return props.favCities
})

watch(favCitiesComp, () => {
  if (localStorage.getItem('favoriteCities')) {
    JSON.parse(localStorage.getItem('favoriteCities')).forEach(city => {
      if (city.cityName == cityName.value) isInFavorites.value = true
    })
  }
})

const handleUserData = () => {
  if (props.favorites) {
    console.log(props.favorites, props.index)
    getHourlyWeatherData(props.favorites[props.index].location.lat, props.favorites[props.index].location.lng, limit.value).then(res => {
      hourlyWeather.value = res
      chartOptions.value.xaxis.categories = []
      chartOptions.value.series[0].data = []
      hourlyWeather.value.list.forEach(i => {
        chartOptions.value.xaxis.categories.push(i.dt)
        chartOptions.value.series[0].data.push(i.main.temp.toFixed())
      })
    }).then(() => {
      renderChart()
    })
    getGeoData(props.favorites[props.index].location.lat, props.favorites[props.index].location.lng).then(res => {
      cityName.value = res[0].name
    }).then(() => {
      getWeatherData(props.favorites[props.index].location.lat, props.favorites[props.index].location.lng).then(res => {
        weatherData.value = res
      })
    })
  } else {
    getUserData().then(res => {
      userData.value = res
    }).then(() => {
      getHourlyWeatherData(userData.value.latitude, userData.value.longitude, limit.value).then(res => {
        hourlyWeather.value = res
        chartOptions.value.xaxis.categories = []
        chartOptions.value.series[0].data = []
        hourlyWeather.value.list.forEach(i => {
          chartOptions.value.xaxis.categories.push(i.dt)
          chartOptions.value.series[0].data.push(i.main.temp.toFixed())
        })
      }).then(() => {
        renderChart()
      })
      getGeoData(userData.value.latitude, userData.value.longitude).then(res => {
        cityName.value = res[0].name
      }).then(() => {
        getWeatherData(userData.value.latitude, userData.value.longitude).then(res => {
          weatherData.value = res
        })
      })
    })
  }
}

onMounted(() => {
  if (props.favorites) {
    handleUserData()
  } else {
    if (props.index == 0) {
      handleUserData()
    } else {
      document.getElementById(`place-${props.blockIndex}`).focus()
    }
    if (localStorage.getItem('favoriteCities')) {
      JSON.parse(localStorage.getItem('favoriteCities')).forEach(city => {
        if (city.cityName == cityName.value) isInFavorites.value = true
      })
    }
  }
})

const chartOptions = ref({
  chart: {
    type: 'line',
    toolbar: {
      show: false
    },
    height: 200
  },
  series: [{
    name: 'sales',
    data: [],
  }],
  yaxis: {
    stepSize: 2,
    labels: {
      style: {
        fontSize: '10px',
        colors: '#fff'
      },
    }
  },
  xaxis: {
    labels: {
      formatter: function (timestamp) {
        return new Date(timestamp * 1000).toLocaleTimeString('en', { hour: '2-digit' })
      },
      style: {
        fontSize: '10px',
        colors: '#fff'
      },
    },
    categories: [],
    axisBorder: {
      color: '#ebebeba3'
    },
    axisTicks: {
      color: '#ebebeba3'
    }
  },
  grid: {
    borderColor: '#ebebeba3'
  },
  colors: ['#6e8192'],
  tooltip: {
    enabled: false
  }
})

const chart = () => {
  return new ApexCharts(document.querySelector(`#chart-${props.blockIndex}`), chartOptions.value)
}
const renderChart = () => {
  chart().render();
}

const selectedCity = ref()

onMounted(async () => {
  if (!props.favorites) {
    const loader = new Loader({
      apiKey: 'AIzaSyAOJ9Jx6oyNvRUJXEJ9zB_IpJi-s8klB8k',
      version: "weekly",
    })
    const Places = await loader.importLibrary('places')
  
    const input = document.getElementById(`place-${props.blockIndex}`)
  
    const options = {
      types: ['(cities)'],
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
    }
  
    const autocomplete = new Places.Autocomplete(input, options)
  
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      selectedCity.value = place
      getGeoData(selectedCity.value.geometry.location.lat(), selectedCity.value.geometry.location.lng()).then(res => {
        cityName.value = res[0].name
      }).then(() => {
        getWeatherData(selectedCity.value.geometry.location.lat(), selectedCity.value.geometry.location.lng()).then(res => {
          weatherData.value = res
        })
        getHourlyWeatherData(selectedCity.value.geometry.location.lat(), selectedCity.value.geometry.location.lng(), limit.value).then(res => {
          hourlyWeather.value = res
          chartOptions.value.xaxis.categories = []
          chartOptions.value.series[0].data = []
          hourlyWeather.value.list.forEach(i => {
            chartOptions.value.xaxis.categories.push(i.dt)
            chartOptions.value.series[0].data.push(i.main.temp.toFixed())
          })
        }).then(() => {
          renderChart()
          if (localStorage.getItem('favoriteCities')) {
            isInFavorites.value = false
            JSON.parse(localStorage.getItem('favoriteCities')).forEach(city => {
              if (city.cityName == cityName.value) isInFavorites.value = true
            })
          }
        })
      })
    })
  }
})

const clearInput = () => {
  if (document.getElementById(`place-${props.blockIndex}`).value) {
    document.getElementById(`place-${props.blockIndex}`).value = ''
    document.getElementById(`place-${props.blockIndex}`).focus()
  }
}

const removeBlock = () => {
  const dialog = document.querySelector(`#dialog-${props.blockIndex}`)
  dialog.showModal()
  const closeButton = document.querySelector("dialog .btn_dclose")

  closeButton.addEventListener("click", () => {
    dialog.close()
  });
}

const handleDialog = (action, index) => {
  const dialog = document.querySelector(`#dialog-${props.blockIndex}`)
  if (action == 'remove') {
    emit('remove-block', index)
    dialog.close()
  } else {
    dialog.close()
  }
}

const addToFavorites = () => {
  if (props.favCities > 4) {
    emit('favDialog')
  } else {
    let cities = []
    if (localStorage.getItem('favoriteCities')) {
      cities = JSON.parse(localStorage.getItem('favoriteCities'))
      cities.push({ location: selectedCity.value.geometry.location, cityName: cityName.value, id: uuidv4() })
      localStorage.setItem('favoriteCities', JSON.stringify(cities))
      emit('getFavorites', 'add')
    } else {
      cities.push({ location: selectedCity.value.geometry.location, cityName: cityName.value, id: uuidv4() })
      localStorage.setItem('favoriteCities', JSON.stringify(cities))
      emit('getFavorites', 'add')
    }
  }
}

const removeFromFavorite = () => {
  emit('removeFavorite', props.index)
}
</script>

<style scoped>
.main_block_container {
  padding: 18px 12px 12px;
}

.city_input_block {
  display: flex;
}

.city_input {
  color: var(--vt-c-text-dark-2);
  font-size: 14px;
  padding: 6px;
  margin-bottom: 12px;
  border-radius: 4px 0 0 4px;
  background-color: var(--color-background-mute);
  border: none;
  width: 100%;
  display: block;
  transition: all 0.3s;
  outline: none;
}

.city_input:focus {
  background-color: var(--color-border-hover);
}

.clear_btn {
  background-color: var(--color-background-mute);
  color: var(--color-text);
  font-weight: 500;
  font-size: 14px;
  height: 28px;
  border: 1px solid var(--color-background-mute);
  border-radius: 0 4px 4px 0;
}

.block_btn {
  width: 80px;
  height: 28px;
  margin-bottom: 12px;
  background-color: var(--color-border-hover);
  color: var(--color-text);
  font-size: 14px;
  /* padding: 6px; */
  border: none;
}

.block_btn_left {
  border-radius: 4px 0 0 4px;
}

.block_btn_right {
  border-radius: 0 4px 4px 0;
}

.block_btn.active {
  background-color: var(--color-background-mute);
  font-weight: 600;
}

.btn_rm {
  width: 28px;
  height: 28px;
  margin-bottom: 12px;
  margin-left: 12px;
  background-color: var(--color-border-hover);
  color: var(--color-text);
  font-size: 14px;
  border-radius: 4px;
  padding: 6px;
  border: none;
}

.btn_fav_rm {
  margin-left: auto;
}

.weather_card_block {
  padding: 0 24px;
  display: flex;
  align-items: stretch;
}

.left_col {
  margin-right: 24px;
}

.weather_city {
  display: flex;
  align-items: center;
  color: var(--vt-c-text-dark-1);
  font-size: 24px;
  font-weight: 600;
}

.btn_star {
  width: 28px;
  height: 28px;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  font-size: 14px;
  border-radius: 4px;
  padding: 6px;
  border: none;
  cursor: unset;
}

.forecast {
  font-size: 16px;
}

.main_weather_info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main_temp {
  font-size: 46px;
  font-weight: 600;
  color: var(--vt-c-text-dark-1);
}

.feels_like {
  font-size: 14px;
}

.main_weather_description {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--vt-c-text-dark-1);
  font-size: 16px;
  line-height: 1;
  margin-bottom: 12px;
}

.high_low {
  display: flex;
  font-size: 12px;
}

.alert_dialog {
  width: 200px;
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

.btn_dclose.remove {
  background-color: #dc3545;
  color: #fff;
}

@media screen and (max-width: 768px) {
  .weather_card_block {
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }
  .left_col {
    margin-right: 0;
  }
}
</style>

<style>
::backdrop {
  background: #000;
  opacity: 0.75;
}
</style>