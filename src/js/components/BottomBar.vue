<template>
  <div class="">
    <div class="bottombar--actions ">

      <div class="row">

        <div class="col-12 text-center">


          <router-link  class="btn btn-block btn-white" to="/novo-produtor">
            <span>Sou um produtor</span>
          </router-link>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
 import { mapGetters, mapActions } from 'vuex'
 import { MLBuilder } from 'vue-multilanguage'

export default {
  props: ['address'],
  name: 'BottomBar',
  data() {
    return {
      isActive: false,
      isMap: this.$router.currentRoute.name == 'home',
      isList: this.$router.currentRoute.name == 'List',
    }
  },
  computed: {
    ...mapGetters([
      'getMarkers',
      'getTotalMarkers',
    ]),
  },
  updated() {
    console.log(this.isMap);
    console.log(this.isList);
  },
  methods: {
    getTotal(type) {
      return this.getMarkers.filter((item)=>{
        return item.type == type
      }).length
    },
  }
}
</script>

<style lang="scss" scoped>
.bottombar {
  padding-top: 10px;
  padding-bottom: 10px;
  &.container {
    padding-left: 10px;
    padding-right: 10px;
  }

  .bottombar-volunteers-count {
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
