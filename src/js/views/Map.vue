<template>
    <div class="">


      <div class="map">

        <div class="location" @click="locateMe" v-if="moveMap">
          <div class="text-center">
              <span class="icon-target"></span>
          </div>
        </div>

        <div class="search-area" v-if="isSearchByArea">
          <div class="text-center">
            <a class="btn" @click="searchByArea">
              <span class="icon-busca"></span>
              <span v-text="$ml.get('home.map.search_area')">Pesquisar nesta área</span>
            </a>
          </div>
        </div>

        <div class="loading-markers" v-if="!loadedItems">
          carregando dados...
        </div>
        <div class="loading-markers" v-if="!loadedMap">
          carregando mapa...
        </div>

        <MglMap
          v-if="markers"
          :accessToken="accessToken"
          :mapStyle.sync="mapStyle"
          :center="coordinates"
          :zoom="zoom"
          @load="onMapLoad"
        >
        <MglNavigationControl v-if="!isMobile" :position="positionControl" />


        <MglMarker :draggable="true" @dragend="onDragEnd" :coordinates="coordinates" color="#0eca4c">


        </MglMarker>

          <MglMarker v-for="(item, index) in markers" :key="index" :coordinates="[item.lng,item.lat]" color="blue">
            <div class="" slot="marker">
              <img v-if="item && item.type == 'store'" src="/images/feira.png" width="32" height="32" alt="">
            </div>
            <MarkerStore v-if="item.type == 'store'" :item="item"></MarkerStore>
          </MglMarker>
        </MglMap>
      </div>
    </div>
</template>
<script>
import EventBus from '@src/event-bus';
import { isMobile } from 'mobile-device-detect';
import Mapbox from "mapbox-gl";
import {
  MglMap, MglPopup, MglMarker, MglAttributionControl,
  MglNavigationControl,
  MglFullscreenControl,
  MglScaleControl  } from "vue-mapbox";

import MglGeocoderControl from 'vue-mapbox-geocoder'
import { mapGetters, mapActions } from 'vuex'

import Sidebar from '@components/Sidebar';
import BottomBar from '@components/BottomBar';

import MarkerUser from '@components/Markers/User';
import MarkerStore from '@components/Markers/Store';

export default {
  name: 'home_map',
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglAttributionControl,
    MglNavigationControl,

    Sidebar,
    BottomBar,

    MarkerStore,
    MarkerUser
  },
  data() {
    return {
      mapx: undefined,
      mapbox : undefined,
      loadedMap: false,
      items: [],
      loadedItems: false,
      isSearchByArea: false,
      moveMap: false,

      isMobile: isMobile,
      sidebarOpen: false,
      location: null,
      isLocated: this.$cookies.get('_tageocord') ? true : false,

      accessToken: 'pk.eyJ1IjoiYnJ1bm9kZXZzcCIsImEiOiJjazd6NzBocmwwMnQ5M2xvcWg0YmxqNmZpIn0.rfIgqe3-QTrf16tIVgjgjg',
      mapStyle: 'mapbox://styles/brunodevsp/ck8ngw7go0r6l1ipriw3gi2lk',
      coordinates: this.$cookies.isKey('_tageocord') ? [this.$cookies.get('_tageocord').lng,this.$cookies.get('_tageocord').lat] : [-60.943904,-10.5705057],
      zoom: this.$cookies.isKey('_tageocord') ? 10 : 2,
      positionControl: isMobile ? 'top-right' : 'bottom-right'
    };
  },
  created() {
    EventBus.$emit('OPEN_SIDEBAR_HOME', false);
    this.mapbox = Mapbox;
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

        this.map.on('zoomend', this.onZoomOut)

        const _this = this;
        this.map.on('movestart', function() {
          _this.moveMap = true
        });

        this.loadedMap = true
        this.moveMap = false
      } catch(e) {
        console.error(e);
      }
    },
    onSidebarOpen(v) {
      this.sidebarOpen = v
    },
    onDragEnd(v) {
      var lngLat = v.marker.getLngLat();
      this.coordinates = [lngLat.lng,lngLat.lat]

      this.actionSetNewPosition({
        'lng': lngLat.lng,
        'lat': lngLat.lat
      });
    },
    onZoomOut(e) {
      this.isSearchByArea = true
    },
    onMapLoad(event) {
      this.map = event.map
      this.locateMe()
    },
    searchByArea() {
      const distance = this.distance(this.map.getCenter().lat,this.map.getCenter().lng,this.location.coords.latitude, this.location.coords.longitude)
      this.actionGetAllUsers({
        'location': {lat: this.map.getCenter().lat,lng: this.map.getCenter().lng},
        'distance' : this.isMobile ? (distance*60) : (distance*50)
      })
      this.isSearchByArea = false
    },
    distance(lat1,lon1,lat2,lon2) {
    	var R = 6371; // km (change this constant to get miles)
    	var dLat = (lat2-lat1) * Math.PI / 180;
    	var dLon = (lon2-lon1) * Math.PI / 180;
    	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
    		Math.sin(dLon/2) * Math.sin(dLon/2);
    	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    	var d = R * c;
    	if (d>1) return Math.round(d);
    	return d;
    },
  }
}
</script>

<style lang="sass" scoped>
  .select-campaign
    &-item
      &:hover
        background: aliceblue
    .modal-body

      .pb
        padding-bottom: 20px
      .pt
        padding-top: 20px
</style>
