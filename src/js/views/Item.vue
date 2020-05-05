<template>
  <div class="single">
    <div class="container">
      <div class="row justify-content-center">
        <div v-if="item" class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
          <h1 class="single-info__title">{{item.name}}</h1>
          <h3 class="single-info__type" v-if="item.options && item.options.agricultor_familiar">Agricultor Familiar</h3>
          <h3 class="single-info__type" v-if="item.options && item.options.agricultor_familiar_de_grupo">Agricultor Familiar Grupo/Comunidade</h3>
          <h3 class="single-info__type" v-if="item.options && item.options.agricultor_urbano">Agricultor Urbano</h3>
          <h3 class="single-info__type" v-if="item.options && item.options.comerciante_de_produtos">Comerciante de Produtos</h3>

          <div class="single-info__location" v-if="item.location && item.location.address">
            {{item.location.address.address}}
          </div>

          <span v-if="item.email"><a class="btn btn-info" :href="`mailto:${item.email}`"> Email </a></span>
          <span v-if="item.phone"><a class="btn btn-info" :href="`tel:${item.phone}`" v-text="$ml.get('home.map.popup.phone')"></a></span>
          <span v-if="item.whatsapp"><a class="btn btn-info" target="_blank" :href="`https://api.whatsapp.com/send?phone=${item.phone}`"> WhatsApp </a></span>
          <hr>

          <AvailableDays v-if="item.options" :options="item.options.available" />
          <AvailableFoods v-if="item.options" :options="item.options.products" />


          <div class="single-bg-farmer text-center">
            <img src="/images/farmer/single-bg-farmers.png" width="300" alt="">
          </div>
        </div>
        <div v-else class="row justify-content-center text-center">
          <div class="col-md-6 col-sm-12">
            <bounce-loader></bounce-loader>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EventBus from '@src/event-bus';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

import AvailableDays from '@components/Item/Partials/AvailableDays'
import AvailableFoods from '@components/Item/Partials/AvailableFoods'

export default {
  props: ['slug'],
  components: {
    AvailableDays,
    AvailableFoods,
    BounceLoader
  },
  data() {
    return {
      item: false
    }
  },
  mounted() {
    this.getItem()
  },
  created() {
    EventBus.$emit('OPEN_SIDEBAR_HOME', false);
  },
  watch: {
    slug() {
      this.getItem()
    }
  },
  methods: {
    ...mapGetters([
      'getMarkers',
    ]),
    getItem() {
      const item = this.$store.getters.getMarkers.filter((item)=>{
        return item.slug == this.slug
      })

      if(item.length) this.item = item[0]
      if(item.length === 0) this.getBySlug()
    },
    async getBySlug() {
      const payload = await this.$http.get(window.config.api_url+'/api/'+this.slug)
      this.item = payload.data.data
    }
  }
}
</script>

  <style lang="sass" scoped>
    .single-bg-farmer
      padding-top: 40px
  </style>
