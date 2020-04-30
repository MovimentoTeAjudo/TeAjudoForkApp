<template >
  <div class="form-group">
    <div id="geocoder"></div>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Geocoder',
  components: {
  },
  mounted() {
    var geocoder = new MapboxGeocoder({
      accessToken: this.accessToken,
      types: 'address',
      placeholder: 'Rua, Avenida, Rodovia'
    });
    geocoder.addTo('#geocoder');
    geocoder.on("result", this.handleResult);
  },
  data() {
    return {
      mapbox: undefined,
      mapboxgeocoder: undefined,
      result: {},
      accessToken: 'pk.eyJ1IjoiYnJ1bm9kZXZzcCIsImEiOiJjazd6NzBocmwwMnQ5M2xvcWg0YmxqNmZpIn0.rfIgqe3-QTrf16tIVgjgjg',
    }
  },
  methods: {
    handleResult(r) {
      this.result = r.result;
      this.$emit('onResult', this.result)
    },
    handleSearch(v) {

    },
  }
}
</script>

<style lang="sass">
  .mapboxgl-ctrl-geocoder
    width: 100%!important
    max-width: 100%!important
  .mapboxgl-ctrl
    box-shadow: none
    border: 1px solid #dedede
    font-family: inherit
    font-size: 16px
    height: calc(1.6em + 0.75rem + 2px)
    line-height: 1.6
  .mapboxgl-ctrl-geocoder--input
    height: auto
    padding-left: 5px
    font-weight: 400
  .mapboxgl-ctrl-geocoder--icon-search
    display: none

</style>
