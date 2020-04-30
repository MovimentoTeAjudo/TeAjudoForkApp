<template>
  <div class="">
    <div class="topbar container">
      <div class=" row align-items-center "  :class="{active:isActive}">

        <div class="col-12 topbar-volunteers-count">
          <div class="row no-gutters">

            <router-link class="col-4" :to="{ name: 'List', params: {type:'store'} }">
              <div class="row align-items-center no-gutters">
                <div class="col-6">
                  <img src="/images/feira.png" width="16" alt="">
                </div>
                 <div class="col-6">
                   <div class="stats">
                     <span>{{getTotal('store')}}</span> <small>Produtores</small>
                   </div>
                 </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import { mapGetters, mapActions } from 'vuex'
 import { MLBuilder } from 'vue-multilanguage'
  import EventBus from '@src/event-bus';

export default {
  props: ['address'],
  name: 'topbar',
  data() {
    return {
      isActive: false,
      isMap: this.$router.currentRoute.name == 'map',
      isList: this.$router.currentRoute.name == 'List',
    }
  },
  computed: {
    ...mapGetters([
      'getMarkers',
      'getTotalMarkers',
    ]),
  },
  methods: {
    getTotal(type) {
      return this.getMarkers.filter((item)=>{
        return item.type == type
      }).length
    },
    emitMethod (v) {
       EventBus.$emit('OPEN_SIDEBAR_HOME', true);
    }
  }
}
</script>

<style lang="scss" scoped>
.topbar {
  padding-top: 10px;
  padding-bottom: 10px;
  &.container {
    padding-left: 10px;
    padding-right: 10px;
  }

  .topbar-volunteers-count {
    .col-4 {
      padding-left: 5px;
      padding-right: 5px;
    }
    img {
      max-width: 100%;
      width: 32px;
    }
    small {
      font-size: 11px;
    }
  }
}
footer {
  padding-top: 0;
}

.btn {
  &.btn-active {
    background: #264463;
  }
}
</style>
