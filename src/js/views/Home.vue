<template>
    <div class="content">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-12">
            <img src="/images/farmer/logo.png" width="64" alt="">
          </div>
        </div>
        <div class="row justify-content-center text-center">
          <div class="col-sm-12 col-md-10 col-lg-10 col-xl-6">
            Olá, que bom que você está aqui, primeiro como você se identifica ?
          </div>
        </div>
        <div class="row justify-content-center mt-4">
          <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
            <div class="col-12">
              <router-link class="btn btn-block btn-active" :to="{ name: 'store', params: {} }">
                Sou um produtor
              </router-link>
            </div>
            <div class="col-12">
              <router-link class="btn btn-block btn-white" :to="{ name: 'home_map', params: {} }">
                Sou um consumidor
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="shape-footer-mobile" v-if="isMobile"></div>
      <div class="shape-footer-desktop" v-if="!isMobile"></div>
    </div>
</template>
<script>
import EventBus from '@src/event-bus';
import { isMobile } from 'mobile-device-detect';

import { mapGetters, mapActions } from 'vuex'

import Sidebar from '@components/Sidebar';
import BottomBar from '@components/BottomBar';


export default {
  name: 'home',
  components: {
    Sidebar,
    BottomBar
  },
  data() {
    return {
      isMobile: isMobile,
      location: null,
    };
  },
  created() {
    EventBus.$emit('OPEN_SIDEBAR_HOME', false);

  },
  mounted() {

  },
  computed: {
    markers() {
      this.items = this.$store.getters.getMarkers;
      if(this.items) this.loadedItems = true

      return this.items
    }
  },
  methods: {
    ...mapActions([
      'actionGetAllUsers',
      'actionSetNewPosition'
    ]),

    async getLocation() {

      return new Promise((resolve, reject) => {

        if(!("geolocation" in navigator)) {
          reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition(pos => {
          setTimeout(()=>this.isLocated = true,1000)
          this.$cookies.set('_tageocord', {"lng":pos.coords.longitude,"lat":pos.coords.latitude});
          resolve(pos);
        }, err => {
          reject(err);
        });

      });
    },
    async locateMe() {
      try {

        this.location = await this.getLocation();
        this.actionSetNewPosition({
          'lng': this.location.coords.longitude,
          'lat': this.location.coords.latitude
        });
        this.map.flyTo({
          center: [this.location.coords.longitude, this.location.coords.latitude],
          zoom: 14,
          easing(t) {
            return t;
          }
        })
        this.actionGetAllUsers({
          'location': {lat:this.location.coords.latitude, lng: this.location.coords.longitude},
          'distance' : this.isMobile ? 100 : 120
        })


      } catch(e) {
        console.error(e);
      }
    },

    onDragEnd(v) {
      var lngLat = v.marker.getLngLat();
      this.coordinates = [lngLat.lng,lngLat.lat]

      this.actionSetNewPosition({
        'lng': lngLat.lng,
        'lat': lngLat.lat
      });
    },
  }
}
</script>

<style lang="sass" scoped>
  .btn
    margin-bottom: 10px
</style>
