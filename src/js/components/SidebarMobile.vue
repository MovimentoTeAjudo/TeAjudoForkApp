<template>
   <div class="">
     <div ref="parentSidebar">
       <vs-sidebar :parent="$refs.parentSidebar" v-model="active" default-index="1"  position-left  :hidden-background="hiddenBackground" :click-not-close="clickNotClose" color="success" :reduce="reduce"  class="sidebarx" spacer >

        <div class="header-sidebar" slot="header">
          <vs-avatar v-if="!user" size="20px" src="/images/farmer/logo.png"/>
          <vs-avatar v-if="user" size="70px" src="/images/perfil.png"/>
          <h4 v-if="user">
            {{user.name}}
          </h4>
        </div>

        <vs-sidebar-item v-if="!user" index="0" icon="exit_to_app" to="/login">
          Login
        </vs-sidebar-item>
        <vs-sidebar-item index="1" icon="home" to="/">
          Home
        </vs-sidebar-item>
        <vs-sidebar-item index="2" icon="map" to="/mapa">
          Mapa
        </vs-sidebar-item>
        <vs-sidebar-item index="3" icon="list" to="/lista/store">
          Lista
        </vs-sidebar-item>

        <vs-sidebar-item index="4" icon="store" to="/novo-produtor">
          Sou um produtor
        </vs-sidebar-item>



        <vs-divider position="left"></vs-divider>

        <vs-sidebar-item index="5" icon="format_align_center" to="/sobre">
          Sobre
        </vs-sidebar-item>


        <vs-sidebar-item index="6" icon="get_app" v-if="showInstall && !installedAppPWA">
          <button  @click="installApp" type="button" class="btn btn-sm btn-primary" name="button">Adicionar à tela de ínicio</button>
        </vs-sidebar-item>
        <vs-sidebar-item index="7" icon="system_update" @click="updateApp">
          Atualizar App
        </vs-sidebar-item>

        <vs-sidebar-item v-if="user" index="8" icon="exit_to_app" @click="logout">
          Sair
        </vs-sidebar-item>



        <div class="footer-sidebar" slot="footer">
          <vs-sidebar-item index="9" icon="keyboard_arrow_right">
            &nbsp;
          </vs-sidebar-item>

        </div>

      </vs-sidebar>
     </div>
   </div>

</template>

<script>
import EventBus from '@src/event-bus';
import { isMobile, isAndroid,isMobileSafari } from 'mobile-device-detect';

export default {
  data() {
    return {
      active: true,
      reduce: !isMobile ? true : false,
      notExpand: false,
      hiddenBackground: !isMobile ? true : false,
      clickNotClose: isMobile ? false : true,

      isMobile: isMobile,
      isAndroid: isAndroid,
      isMobileSafari: isMobileSafari,
      installedAppPWA: false,
      showInstall: false,

      user: false,
    }
  },
  mounted() {
    this.checkIsLogged()
  },
  updated() {
    if(self.INSTALLAPPEVENT) this.showInstall = true
  },
  created() {
    if(self.INSTALLAPPEVENT) this.showInstall = true

    if(this.isMobile) EventBus.$on('OPEN_SIDEBAR_HOME', this.changeState);

  },
  methods: {
    checkIsLogged() {
      if(this.$cookies.get('_mvta_auth')) {
        this.user = this.$cookies.get('_mvta_auth')
      }
    },
    changeState(v){
      setTimeout(()=>{
        this.active = v
      },500)
    },
    installApp() {

      if(isMobileSafari) {
        if (navigator.share) {
          navigator.share({
            title: 'TeAjudo.me',
            url: 'https://www.movimentoteajudo.com.br?utm_source=shareapp'
          }).then(() => {
            console.log('Thanks for sharing!');
          })
          .catch(console.error);
        } else {
          alert('Não é possível completar, para adicionar a tela clique em compartilhar no navegador, e depois em "Adicionar à tela de início"')
        }
      } else {
        self.INSTALLAPPEVENT.prompt();
        self.INSTALLAPPEVENT.userChoice.then((choice) => {
          if (choice.outcome === 'accepted') {
            this.installedAppPWA = true
          }
          self.INSTALLAPPEVENT = null;
        });
      }
    },
    updateApp() {
      self.location.reload()
    },
    logout() {
      this.user = false
      this.$cookies.remove('_mvta_auth')
      this.updateApp()
    }
  }
}
</script>

<style lang="sass">
#parentx
  overflow: hidden
  height: 100vh
  position: relative

.header-sidebar
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  width: 100%
  h4
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    > button
      margin-left: 10px
.footer-sidebar
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  > button
      border: 0px solid rgba(0,0,0,0) !important
      border-left: 1px solid rgba(0,0,0,.07) !important
      border-radius: 0px !important
</style>
