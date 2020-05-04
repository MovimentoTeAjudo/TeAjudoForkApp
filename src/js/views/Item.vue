<template>
  <div class="single">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
          <h1 class="single-info__title">{{item.name}}</h1>
          <h3 class="single-info__type" v-if="item.options.agricultor_familiar">Agricultor Familiar</h3>
          <h3 class="single-info__type" v-if="item.options.agricultor_familiar_de_grupo">Agricultor Familiar Grupo/Comunidade</h3>
          <h3 class="single-info__type" v-if="item.options.agricultor_urbano">Agricultor Urbano</h3>
          <h3 class="single-info__type" v-if="item.options.comerciante_de_produtos">Comerciante de Produtos</h3>

          <span v-if="item.email"><a class="btn btn-info" :href="`mailto:${item.email}`"> Email </a></span>
          <span v-if="item.phone"><a class="btn btn-info" :href="`tel:${item.phone}`" v-text="$ml.get('home.map.popup.phone')"></a></span>
          <span v-if="item.whatsapp"><a class="btn btn-info" target="_blank" :href="`https://api.whatsapp.com/send?phone=${item.phone}`"> WhatsApp </a></span>
            <hr>

          <AvailableDays :options="item.options.available" />
          <AvailableFoods :options="item.options.products" />



          <hr>



          <div class="single-bg-farmer">
            <img src="/images/farmer/single-bg-farmers.png" width="300" alt="">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AvailableDays from '@components/Item/Partials/AvailableDays'
import AvailableFoods from '@components/Item/Partials/AvailableFoods'

export default {
  props: ['slug'],
  components: {
    AvailableDays,
    AvailableFoods
  },
  data() {
    return {
      item: {}
    }
  },
  mounted() {
    this.getItem()
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

  </style>
