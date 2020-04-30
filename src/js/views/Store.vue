<template>
  <div class="">

    <div class="">

        <div class="row">
          <div class="col-12">
            <AddStore></AddStore>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import AddStore from "@components/Forms/AddStore"
import EventBus from '@src/event-bus';
export default {
  name: 'store',
  components: {
    AddStore
  },
  created() {
    EventBus.$emit('OPEN_SIDEBAR_HOME', false);
  }
}
</script>

<style lang="css">
</style>
