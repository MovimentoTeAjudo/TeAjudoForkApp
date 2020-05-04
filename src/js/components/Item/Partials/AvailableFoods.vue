<template>
  <div class="">
    <h4>Trabalho com</h4>
    <ul>
      <li v-if="options.castanhas">Castanhas e Sementes</li>
      <li v-if="options.cereais">Cereais</li>
      <li v-if="options.ervas">Ervas e Temperos</li>
      <li v-if="options.frutas">Frutas</li>
      <li v-if="options.hortalicas">Hortaliças (folhosas, verduras, legumes)</li>
      <li v-if="options.laticinios">Laticínios</li>
      <li v-if="options.mel">Mel</li>
      <li v-if="options.ovos">Ovos</li>
      <li v-if="options.carnes">Carnes</li>
      <li v-if="options.pescados">Pescados</li>
      <li v-if="options.panificados">Panificados</li>
      <li v-if="options.plantas">Plantas Alimenticías</li>
    </ul>

  </div>
</template>

<script>
export default {
  props: ['options'],
}
</script>

<style lang="sass" scoped>
  ul
    li
      padding: 10px 15px
      background: #4eb351
      border-radius: 4px
      color: white
      display: inline-flex
      font-size: 12px
      font-weight: 700
      margin-bottom: 10px
</style>
