<template>

  <div class="page">
    <main class="main">
      <div class="container">
        <div class="laptop">
          <div class="sections">
            <section :class="['section', 'section-left', {'section-error': isError}]">
              <div class="info">
                <div class="city-inner">
                  <input v-model="city" @keydown.enter="getWeather" type="text" class="search">
                </div>
                <template v-if="weatherInfo">
                  <WeatherSummary v-if="!isError" :weatherInfo="weatherInfo"></WeatherSummary>
                  <div v-else class="error">
                    <div class="error-title">
                      Ooooops! Что-то пошло не так
                    </div>
                    <div v-if="weatherInfo?.message" class="error-message">
                      {{ capitalazeFirstLetter(weatherInfo?.message) }}
                    </div>
                  </div>
                </template>
              </div>
            </section>
            <section v-if="!isError" class="section section-right">
             <HightLights :weatherInfo="weatherInfo"></HightLights>
            </section>
          </div>
          <div v-if="!isError" class="sections">
            <Coords :coord="weatherInfo.coord"></Coords>
            <Humidity :humidity="weatherInfo.main.humidity"></Humidity>
          </div>
        </div>
      </div>
    </main>
  </div>

</template>

<script>
import {API_KEY} from "@/constants/index.js";
import {BASE_URL} from "@/constants/index.js";
import WeatherSummary from "@/components/WeatherSummary.vue";
import HightLights from "@/components/HightLights.vue";
import Humidity from "@/components/Humidity.vue";
import Coords from "@/components/Coords.vue";
import {useCounterStore} from "../pinia/pinia.js";
import {capitalazeFirstLetter} from "@/utils/index.js";
export default {
  components:{
    WeatherSummary,
    HightLights,
    Humidity,
    Coords,
  },
  data() {
    return {
      // piniaStore: useCounterStore,
      weatherInfo: {},
      city: 'Paris',
    }
  },

  computed:{
    isError(){
     return this.weatherInfo.cod !== 200
    }
},
  mounted() {
    this.getWeather()

  },

  methods: {
    getWeather(){
      axios.get(`${BASE_URL}?q=${this.city}&units=metric&appid=${API_KEY}`)
          .then(res =>{
            this.weatherInfo = res.data
            console.log(res)
          })
    },
    capitalazeFirstLetter

    // getWeather(){
    //   fetch(`${BASE_URL}?q=${this.city}&appid=${API_KEY}`)
    //       .then(response =>{response.json()
    //         console.log(response.json())
    //       })
    //       .then(data =>{this.weatherInfo = data})
    // }
  }
}

</script>

<style lang="sass" scoped>
@import "src/assets/main"
.page
  position: relative
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh
  background-color: #59585d

.laptop
  width: 100%
  padding: 20px
  background-color: #0e100f
  border-radius: 25px

.sections
  display: flex
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

.section-left
  width: 30%
  padding-right: 10px

  @media (max-width: 767px)
    width: 100%
    padding-right: 0

    &.section-error
      min-width: 235px
      width: auto
      padding-right: 0


.section-right
  width: 70%
  padding-left: 10px

  @media (max-width: 767px)
    width: 100%
    margin-top: 16px
    padding-left: 0

.city-inner
  position: relative
  display: inline-block
  width: 100%

  &::after
    content: ''
    position: absolute
    top: 0
    right: 10px
    width: 25px
    height: 25px
    background: url('./assets/img/search.svg') no-repeat 50% 50%
    background-size: contain
    transform: translateY(50%)
    cursor: pointer

.info
  height: 100%
  padding: 16px
  background: url('./assets/img/gradient-1.jpg') no-repeat 50% 50%
  background-size: cover
  border-radius: 25px

.search
  width: 100%
  padding: 16px
  font-family: 'Inter', Arial, sans-serif
  color: #ffffff
  background-color: rgba(0, 0, 0, 0.75)
  border-radius: 16px
  border: none
  outline: none
  cursor: pointer

.section-bottom
  width: 50%
  margin-top: 16px

  @media (max-width: 767px)
    width: 100%

    .error
      padding-top: 20px

      &-title
        font-size: 18px
        font-weight: 700

         

</style>
