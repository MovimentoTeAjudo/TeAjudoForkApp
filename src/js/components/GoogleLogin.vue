<template>
  <div class="">
    <GoogleLogin class="btn btn-google btn-block btn-white" :params="google.params"  :onSuccess="onSuccess" :onFailure="onFailure">
      <span class="icon-google"></span>
      {{isLogged ? 'Entrou como '+name : 'Entrar com Google' }}
    </GoogleLogin>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import EventBus from '@src/event-bus';

export default {
  components: {   GoogleLogin },
  data() {
    return {
      isLogged: false,
      name: '',
      google: {
        params: {
          client_id: window.config.google_client_id
        },
      }
    }
  },
  mounted() {
    EventBus.$on('GOOGLE_SIGNED_DATA', (r)=>{
      console.log(r);
      if(r.logged) {
        this.onSigned(r.data)
      }
    })
  },

  methods: {
    onSigned(guser) {
      const profile = guser.getBasicProfile();

      this.isLogged = true
      this.name = profile.getName()

      this.$emit('onSigned', {
        'id' : profile.getId(),
        'name' : profile.getName(),
        'email' : profile.getEmail(),
        'photo' : profile.getImageUrl(),
      })
    },
    onSuccess(googleUser) {
      this.onSigned(googleUser)
    },
    onFailure() {

    }
  }
}
</script>

<style lang="sass">
  .btn-google
    padding-left: 25px
    padding-right: 25px
    .icon-google
      margin-right: 10px
</style>
