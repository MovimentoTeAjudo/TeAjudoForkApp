<template>
  <div class="content">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-sm-12">
          <div class="form-group">
            <label for="">Email</label>
            <input type="email" name="email" class="form-control" v-model="info.email" value="">
          </div>
          <div class="form-group">
            <label for="">Senha</label>
            <input type="password" class="form-control" name="password" v-model="info.password" value="">
          </div>
          <div class="form-group">
            <button @click="onSubmit" type="button" class="btn btn-block btn-info" name="button">Entrar</button>
          </div>
          <vs-divider>ou</vs-divider>
          <GoogleLogin @onSigned="onSigned" label="Entrar como" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect';
import EventBus from '@src/event-bus';
import GoogleLogin from '@components/GoogleLogin'

export default {
  name: 'login',
  components: { GoogleLogin },
  data() {
    return {
      isMobile: isMobile,
      info: {},
    }
  },
  created() {
    EventBus.$emit('OPEN_SIDEBAR_HOME', false);
  },
  methods: {
    onSigned(v) {
      this.info.name = v.name
      this.info.email = v.email
      this.info.photo = v.photo
      this.info.gooogle_id = v.id

      this.onSubmit()
    },
    async onSubmit() {

      const payload = await this.$http.post(window.config.api_url + '/api/auth', this.info);

      if(!payload.data.status) {
        this.$notify({group: 'foo',title: 'Ops!',text: payload.data.message,type: 'error'});
        return;
      }
      if(payload.data.user) {
        this.$cookies.set('_mvta_auth', payload.data.user, 60 * 60 * 12)
        //this.$router.push('/mapa');
        window.location.href = "/mapa"
      }
    },
  }
}
</script>

<style lang="css">
</style>
