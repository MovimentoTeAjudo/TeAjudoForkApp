<template>
  <div class="wrapper">

    <!-- <div class="start" v-if="!startStep">
    </div> -->

    <div class="">
      <!-- <Topbar v-if="isMobile" /> -->
      <button
       class="btn btn-info btn-menu"  @click="emitMethod"><span class="icon-lista"></span>
     </button>
      <SidebarMobile/>

      <router-view></router-view>

      <BottomBar v-if="isMobile" />
      <!-- <Sidebar v-if="!isMobile" /> -->
      <notifications group="foo" />
    </div>
  </div>
</template>
<script>
import { isMobile } from 'mobile-device-detect';
import Topbar from '@components/Topbar';
import BottomBar from '@components/BottomBar';
import SidebarMobile from '@components/SidebarMobile'
import EventBus from '@src/event-bus';

export default {
  name: 'app',
  components: {
    BottomBar,
    Topbar,
    SidebarMobile
  },
  data() {
    return {
      isMobile: isMobile,
      startStep: true,
    };
  },
  mounted() {
    this.sendTagHash();

    setTimeout(()=>{
      this.startStep = this.$cookies.isKey('_tastartstep') || !isMobile ? true : false
    },1000)
  },
  created() {

  },
  methods: {
    onSidebarOpen(v) {
      this.sidebarOpen = v
    },
    setStartStep(v) {
      this.startStep = true
      this.$cookies.set('_tastartstep', true, 60 * 60 * 24 * 30);
    },
    sendTagHash() {
      var OneSignal = self.OneSignal || [];
      var uHashCurrent = 'teajudo';

      if (OneSignal && uHashCurrent !== '') {
        OneSignal.push(function() {
          OneSignal.sendTag("u_user_campaign", uHashCurrent);
        })
      }
    },
    emitMethod (v) {
       EventBus.$emit('OPEN_SIDEBAR_HOME', true);
    }
  }
}
</script>
<style lang="sass">
  .btn-menu
    position: absolute
    top: 10px
    left: 10px
    z-index: 2
    width: 35px
    height: 35px
    border-radius: 50%
    .icon-lista
      position: absolute
      left: 50%
      top: 50%
      transform: translate(-50%,-50%)
      font-size: 15px
</style>
