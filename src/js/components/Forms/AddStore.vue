<template>
    <div class="">
      <div class="row justify-content-center">

        <swiper class="swiper" ref="mySwiper" :options="swiperOptions">

          <swiper-slide class="align-items-center">
            <div class="row justify-content-center text-center">
              <div class="col-12">
                <div class="container">
                  <h3>Primeiro precisamos de alguns dados pessoais</h3>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-4">
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="col-12 text-left">

                        <div class="form-group">
                          <label for="">Seu nome *</label>
                           <input autocomplete="off" type="text" class="form-control" v-model="info.support.owner" name="owner" placeholder="Seu nome"  required>
                        </div>
                        <div class="form-group">
                          <label for="">Seu telefone *</label>
                          <VuePhoneNumberInput @update="updatePhone" :translations="translations"  v-model="info.phone_" required />
                          <label for="atende_whatsapp"><small>Atende via WhatsApp? <input id="atende_whatsapp" type="checkbox" name="" v-model="info.whatsapp" value=""> </small></label>
                        </div>
                        <div class="form-group">
                          <label for="">Seu melhor e-mail</label>
                           <input autocomplete="off" type="email" class="form-control" v-model="info.email" name="creditcard" :placeholder="$ml.get('sidebar.form.email')">
                        </div>

                      </div>
                      <div class="col-12 mt-xl-2 mt-4">
                        <div class="btn btn-block btn-info btn-next"
                          @click="nextStep"
                          :class="{'disabled':!info.support.owner || !info.phone}">
                          Próximo
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="align-items-center">
            <div class="row justify-content-center text-center">
              <div class="col-12">
                <div class="container">
                  <h3 class="title">Agora os dados do seu negócio</h3>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-4">
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="col-12 text-left">

                        <div class="row">

                          <div class="col">
                            <div class="form-group">
                              <label for="">CEP *</label>
                               <input autocomplete="off" type="number" minlength="8" maxlength="8" @keyup="getAddressByCep" class="form-control" v-model="info.address.cep">
                               <small>Apenas números</small>
                            </div>
                          </div>
                          <div class="col">
                            <div class="form-group">
                              <label for="">Estado *</label>
                               <select class="form-control" v-model="info.address.state" @change="getCities" name="">
                                 <option value="">Selecione</option>
                                 <option :data-uf="item.abbr" :value="item.id" value="" v-for="(item,index) in states">{{item.name}}</option>
                               </select>
                            </div>

                          </div>
                        </div>

                        <div class="row">
                          <div class="col-12">
                            <div class="form-group" >
                              <label for="">Endereço *</label>
                              <Geocoder @onDragEnd="onDragEnd" @onResult="onResultAddress" ></Geocoder>
                            </div>
                          </div>
                        </div>
                        <div class="row">

                          <div class="col-4">
                            <div class="form-group">
                              <label for="">Número *</label>
                               <input autocomplete="off" type="number" class="form-control" v-model="info.address.number" name="" value="">
                            </div>
                          </div>
                          <div class="col">
                            <div class="form-group">
                              <label for="">Cidade *</label>
                              <select class="form-control" v-model="info.address.city" name="">
                                <option :data-city="item.name" :value="item.id" v-for="(item,index) in cities">{{item.name}}</option>
                              </select>
                            </div>

                          </div>
                        </div>
                      </div>

                    </div>

                    <div class="row mt-xl-2 mt-4">
                      <div class="col-6">
                        <div class="btn btn-block btn-white btn-prev">
                          Anterior
                        </div>
                      </div>
                      <div class="col-6 ">
                        <div class="btn btn-block btn-info btn-next"
                          @click="nextStep"
                          :class="{'disabled':!info.address.number || !info.address.cep || !info.address.address || !info.address.city || !info.address.state}">
                          Próximo
                        </div>

                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </swiper-slide>

          <swiper-slide class="align-items-center">
            <div class="row justify-content-center text-center">
              <div class="col-12">
                <div class="container">
                  <h3 class="title">Como você se identifica ?</h3>
                </div>
              </div>
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-4">
                  <div class="container">

                    <div class="row justify-content-center">
                      <div class="col-12">
                        <div class="form-group">
                           <input autocomplete="off" type="text" class="form-control" v-model="info.name" placeholder="Nome do seu negócio" name="name"  required>
                        </div>
                        <vs-divider />

                      </div>

                      <div class="col-sm-12 col-md-10 col-lg-10 col-xl-6 text-left">

                        <div class="type_productor_wrapper">
                          <div class="row helps type_productor text-center justify-content-center">
                            <div class="col-6">
                              <div class="help" :class="{active: info.support.agricultor_familiar}">
                                <label for="agricultor_familiar" >
                                  <small>Agricultor Familiar</small>
                                  <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.agricultor_familiar" id="agricultor_familiar" value="agricultor_familiar">
                                </label>
                              </div>
                            </div>


                            <div class="col-6">
                              <div class="help" :class="{active: info.support.agricultor_familiar_de_grupo}">
                                <label for="agricultor_familiar_de_grupo" >
                                  <small>Agricultor Familiar Grupo/Comunidade</small>
                                  <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.agricultor_familiar_de_grupo" id="agricultor_familiar_de_grupo" value="agricultor_familiar_de_grupo">
                                </label>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="help" :class="{active: info.support.agricultor_urbano}">
                                <label for="agricultor_urbano" >
                                  <small>Agricultor Urbano</small>
                                  <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.agricultor_urbano" id="agricultor_urbano" value="agricultor_urbano">
                                </label>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="help" :class="{active: info.support.comerciante_de_produtos}">
                                <label for="comerciante_de_produtos" >
                                  <small>Comerciante de produtos</small>
                                  <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.comerciante_de_produtos" id="comerciante_de_produtos" value="comerciante_de_produtos">
                                </label>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="help add_others" :class="{active: info.support.add_others}">
                                <label for="others">
                                  <small v-text="$ml.get('store.form.help.others')"></small>
                                  <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.add_others" id="others" value="others">
                                </label>
                              </div>
                            </div>
                            <div class="col-6" v-if="info.support.add_others">
                              <div class="form-group">
                                <input autocomplete="off" class="form-control" type="text" v-model="info.support.others" name="" placeholder="Insira aqui como você se identifica" value="">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-10 col-lg-10 col-xl-8 mt-4">
                        <div class="row">
                          <div class="col-6">

                            <div class="btn btn-block btn-white btn-prev">
                              Anterior
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="btn btn-block btn-info btn-next"
                              @click="nextStep"
                              :class="{'disabled':!info.name || !info.support.agricultor_familiar && !info.support.agricultor_familiar_de_grupo && !info.support.agricultor_urbano && !info.support.comerciante_de_produtos && !info.support.others}">
                              Próximo
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </swiper-slide>

          <swiper-slide class="align-items-center">
            <div class="row justify-content-center text-center available_time">
              <div class="col-12">
                <div class="container">
                  <h3 class="title">Quais dias e horários você atende ?</h3>
                </div>
              </div>
              <div class="col-sm-12 col-md-10 col-lg-10 col-xl-8 mt-4">
                  <div class="available_time--wrapper">
                    <div class="row justify-content-center">
                      <div class="col-12 text-center">

                        <div class="row helps ">
                          <div class="col-12">
                            <div class="row">
                              <div class="col-3">
                                <div class="help" @click="addDay('Segunda')" :class="{active: info.support.available.days.includes('Segunda')}">
                                  <label for="available_days_monday" ><small>Seg</small>  </label>
                                </div>
                              </div>
                              <div class="col-3">
                                <div class="help" @click="addDay('Terça')" :class="{active: info.support.available.days.includes('Terça')}">
                                  <label for="available_days_tuesday" ><small>Ter</small></label>
                                </div>
                              </div>
                              <div class="col-3">
                                <div class="help" @click="addDay('Quarta')" :class="{active: info.support.available.days.includes('Quarta')}">
                                  <label for="available_days_wednesday" ><small>Qua</small>  </label>
                                </div>
                              </div>
                              <div class="col-3">
                                <div class="help" @click="addDay('Quinta')" :class="{active: info.support.available.days.includes('Quinta')}">
                                  <label for="available_days_thursday" >  <small>Qui</small>  </label>
                                </div>
                              </div>
                              <div class="col-3">
                                <div class="help" @click="addDay('Sexta')" :class="{active: info.support.available.days.includes('Sexta')}">
                                  <label for="available_days_friday" ><small>Sex</small></label>
                                </div>
                              </div>
                              <div class="col-3">
                                <div class="help" @click="addDay('Sábado')" :class="{active: info.support.available.days.includes('Sábado')}">
                                  <label for="available_days_saturday" ><small>Sáb</small></label>
                                </div>
                              </div>
                              <div class="col-3">
                                <div class="help" @click="addDay('Domingo')" :class="{active: info.support.available.days.includes('Domingo')}">
                                  <label for="available_days_sunday" ><small>Dom</small> </label>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>

                        <div class="row helps">
                          <div class="col-6">
                            <div class="help" :class="{active: info.support.available.anytime_hours}">
                              <label for="available_anytime_hours" >
                                <small v-text="$ml.get('store.form.available.anytime_hours')">24 horas</small>
                                <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.available.anytime_hours" id="available_anytime_hours" value="available_anytime_hours">
                              </label>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="help" :class="{active: info.support.available.expedient}">
                              <label for="available_expedient" >
                                <small v-text="$ml.get('store.form.available.expedient')">9h ás 18h</small>
                                <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.available.expedient" id="available_expedient" value="available_expedient">
                              </label>
                            </div>
                          </div>

                        </div>
                        <div class="row helps ">
                          <div class="col-6">
                            <div class="help featured" :class="{active: info.support.available.add_others}">
                              <label for="available_others" >
                                <small v-text="$ml.get('store.form.available.others')">Outro horário?</small>
                                <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.available.add_others" id="available_others" value="available_others">
                              </label>
                            </div>
                          </div>

                          <div class="col-6">
                            <div class="help" :class="{active: info.support.available.delivery}">
                              <label for="available_delivery" >
                                <small v-text="$ml.get('store.form.available.delivery')">Delivery</small>
                                <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.available.delivery" id="available_delivery" value="available_delivery">
                              </label>
                            </div>
                          </div>
                          <div class="col-12" v-if="info.support.available.add_others">
                            <div class="form-group">
                              <input autocomplete="off" class="form-control" type="text" v-model="info.support.available.others" name="" placeholder="Ex: 10h ás 15h" value="">
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                    <div class="row mt-4">
                      <div class="col-6">
                        <div class="btn btn-block btn-white btn-prev">
                          Anterior
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="btn btn-block btn-info btn-next"
                          @click="nextStep"
                          :class="{
                            'disabled':
                            info.support.available.days.length === 0
                            || (!info.support.available.anytime_hours && !info.support.available.expedient && !info.support.available.others)}">
                          Próximo
                        </div>

                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </swiper-slide>

          <swiper-slide class="align-items-center">
            <div class="row justify-content-center text-center products">
              <div class="col-12">
                <div class="container">
                  <h3 class="title">Quais os seus produtos?</h3>
                  <small class="subtitle">Pode selecionar mais de um</small>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-4">
                  <div class="products--wrapper">
                    <div class="row helps no-gutters justify-content-center">
                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.castanhas}">
                          <label for="castanhas">
                            <small>Castanhas e sementes</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.castanhas" id="castanhas" value="">
                          </label>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.cereais}">
                          <label for="cereais">
                            <small>Cereais</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.cereais" id="cereais" value="">
                          </label>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.ervas}">
                          <label for="ervas">
                            <small>Ervas e temperos</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.ervas" id="ervas" value="">
                          </label>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.frutas}">
                          <label for="frutas">
                            <small>Frutas</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.frutas" id="frutas" value="">
                          </label>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.hortalicas}">
                          <label for="hortalicas">
                            <small>Hortaliças (folhosas, verduras, legumes, etc..)</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.hortalicas" id="hortalicas" value="">
                          </label>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.laticinios}">
                          <label for="laticinios">
                            <small>Laticínios</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.laticinios" id="laticinios" value="">
                          </label>
                        </div>
                      </div>

                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.mel}">
                          <label for="mel">
                            <small>Mel</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.mel" id="mel" value="">
                          </label>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.ovos}">
                          <label for="ovos">
                            <small>Ovos</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.ovos" id="ovos" value="">
                          </label>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.carnes}">
                          <label for="carnes">
                            <small>Carnes (suína, bovina, aves)</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.carnes" id="carnes" value="">
                          </label>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.pescados}">
                          <label for="pescados">
                            <small>Pescados</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.pescados" id="pescados" value="">
                          </label>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.panificados}">
                          <label for="panificados">
                            <small>Panificados (pães, bolos, tortas, etc)</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.panificados" id="panificados" value="">
                          </label>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.plantas}">
                          <label for="plantas">
                            <small>Plantas Alimentícias Não Convencionais (PANC)</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.plantas" id="plantas" value="">
                          </label>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="help" :class="{active: info.support.products.add_others}">
                          <label for="add_others">
                            <small>Outros</small>
                            <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.add_others" id="add_others" value="">
                          </label>
                        </div>
                      </div>

                      <div class="col-6" v-if="info.support.products.add_others">
                        <div class="form-group">
                          <input autocomplete="off" type="text" class="form-control"  v-model="info.support.products.others" value="">
                        </div>
                      </div>
                    </div>

                    <div class="row mt-4">
                      <div class="col-6">
                        <div class="btn btn-block btn-white btn-prev">
                          Anterior
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="btn btn-block btn-info btn-next"
                          @click="nextStep"
                          :class="{
                            'disabled':
                            !info.support.products.castanhas
                            && !info.support.products.cereais
                            && !info.support.products.ervas
                            && !info.support.products.frutas
                            && !info.support.products.hortalicas
                            && !info.support.products.laticinios
                            && !info.support.products.mel
                            && !info.support.products.ovos
                            && !info.support.products.carnes
                            && !info.support.products.pescados
                            && !info.support.products.panificados
                            && !info.support.products.plantas
                            && !info.support.products.others}">
                          Próximo
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </swiper-slide>

          <swiper-slide class="align-items-center organic">
            <div class="row justify-content-center text-center">
              <div class="col-12">
                <div class="container">
                  <h3 class="title">Você produz orgânicos?</h3>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-4">
                <div class="organic--wrapper">
                  <div class="row helps mt-xl-4 text-center">
                    <div class="col-4">
                      <div class="help" :class="{active: info.support.products.organic}">
                        <label for="organic">
                          <small>Sim</small>
                          <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.organic" id="organic" value="">
                        </label>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="help" :class="{active: info.support.products.in_transition}">
                        <label for="in_transition">
                          <small>Em transição</small>
                          <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.in_transition" id="in_transition" value="">
                        </label>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="help" :class="{active: info.support.products.no_organic}">
                        <label for="no_organic">
                          <small>Não</small>
                          <input autocomplete="off" type="checkbox" name="support[]" v-model="info.support.products.no_organic" id="no_organic" value="">
                        </label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-10 col-lg-10 col-xl-8 mt-xl-5 mt-4">
                <div class="organic--wrapper">
                  <div class="row justify-content-center veracidade form-group"  :class="{active: info.support.veracidade}">
                    <label class="check_truth checklabel col-sm-12 col-md-6" for="veracidade">
                      <input autocomplete="off" type="checkbox" id="veracidade" name="support[]" v-model="info.support.veracidade" value="">
                      <small v-text="$ml.get('sidebar.form.truth')"></small>
                    </label>
                  </div>
                  <div class="form-group text-right mt-4">
                    <button @click="onSubmit" class="btn btn-block btn-info"
                    :disabled="!info.support.veracidade"
                    :class="{
                      'disabled':!info.support.veracidade
                      && !info.support.products.organic
                      && !info.support.products.in_transition
                      && !info.support.products.no_organic
                      }" name="button">Salvar</button>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

      </div>
    </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex';
import { isMobile } from 'mobile-device-detect';

import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import Helper from '@src/helper'
import States from '@store/jsons/states.js'

import Geocoder from '@components/Geocoder'

export default {
    name: 'AddStore',
    components: {
      VuePhoneNumberInput,
      Geocoder,
      Swiper,
      SwiperSlide
    },
    data(){
      return {
        isLocated: false,
        isMobile: isMobile,
        isMapShow: false,
        states: States,
        cities: false,
        timeoutSearchCep: false,

        info: {
          address: {},
          member: 'volunteer',
          location: {},
          support: {
            products: {},
            available: {
              days: []
            }
          }
        },
        translations: {
          countrySelectorLabel: this.$ml.get('sidebar.form.input.countrySelectorLabel'),
          countrySelectorError: this.$ml.get('sidebar.form.input.countrySelectorError'),
          phoneNumberLabel: this.$ml.get('sidebar.form.input.phoneNumberLabel'),
          example: this.$ml.get('sidebar.form.input.example')
        },
        swiperOptions: {
          allowSlideNext: true,
          allowSlidePrev: true,
          allowTouchMove: true,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
          },
          navigation: {
            nextEl: '.btn-next',
            prevEl: '.btn-prev',
          },
        },
      }
    },

    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    updated() {
      document.querySelector('.swiper-slide').style.height = document.documentElement.clientHeight
    },
    methods: {
      ...mapGetters([
        'getMarkerPosition',
      ]),
      ...mapActions([
        'actionSetNewUser',
        'actionSetNewPosition'
      ]),

      async onSubmit() {

        if(!this.info.support.veracidade) {
          this.$notify({
            group: 'foo',
            title: 'Ops!',
            text: this.$ml.get('sidebar.form.msg.error_truth'),
            type: 'warning'
          });
          return;
        }

        const payload = await this.$http.post(window.config.api_url+'/api/save', this.info)

        if(payload.data.status) {

          this.$notify({
            group: 'foo',
            title: 'Yeah!',
            text: this.$ml.get('sidebar.form.msg.success'),
            type: 'success'
          });

          this.actionSetNewUser(payload.data.data)
          this.$router.push('/');

          this.$gtag.event('add_store', {
              'event_category': 'success',
              'event_label': 'ok_ao_inserir',
              'event_value': this.info
            })

            this.info = {location:{}, support:{}}
        } else {
          this.$gtag.event('add_store', {
              'event_category': 'error',
              'event_label': 'erro_ao_inserir',
              'event_value': this.info
            })

          this.$notify({
            group: 'foo',
            title: 'Ops!',
            text: payload.data.message,
            type: 'warning',
            duration: 5000
          });
        }

        return false;
      },
      nextStep() {
        this.swiper.allowSlideNext = true
      },
      updatePhone(v) {
        this.info.phone = v.formattedNumber
      },
      onDragEnd(v) {
        if(this.getMarkerPosition().lat && this.getMarkerPosition().lng)
          this.isLocated = true
      },
      onResultAddress(v){
        this.info.address.address = v.place_name;
        this.info.location.lat = v.geometry.coordinates[1]
        this.info.location.lng = v.geometry.coordinates[0]
      },
      async getCities(v, select) {
        const payload = await this.$http.get(window.config.api_url+'/api/cities',
        {
          params: { uf_id: this.info.address.state }
        })
        this.cities = payload.data.data

        setTimeout(()=>{
          if(select) {
            document.querySelector('[data-city='+select+']').setAttribute('selected','selected')
            this.info.address.city = document.querySelector('[data-city='+select+']').value
          }
        },1000)
      },
      getAddressByCep(v) {
        const _this = this
        if(_this.info.address.cep.length < 8 || _this.info.address.cep.length > 8) return;

        clearTimeout(this.timeoutSearchCep);
        this.timeoutSearchCep = setTimeout(_this.getDataViaCep, 1000);
      },
      async getDataViaCep() {
        const payload = await this.$http.get('https://viacep.com.br/ws/'+this.info.address.cep+'/json')

        if(payload.data.erro) {
          this.$notify({
            group: 'foo',
            title: 'Ops!',
            text: 'CEP inválido',
            type: 'error'
          });
          return;
        }

        const cepData = payload.data
        document.querySelector('[data-uf='+cepData.uf+']').setAttribute('selected','selected')
        this.info.address.state = document.querySelector('[data-uf='+cepData.uf+']').value
        this.getCities(false, cepData.localidade)
      },
      addDay(day) {
        if(this.info.support.available.days.includes(day)) {
          this.info.support.available.days = this.info.support.available.days.filter((item)=>{
            return item != day
          })
          return;
        }

        this.info.support.available.days.push(day)
      }
    }
}
</script>
<style lang="scss">

</style>
