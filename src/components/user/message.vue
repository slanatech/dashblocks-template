<template>
  <q-item>
    <q-item-section avatar top>
      <q-icon v-if="message.icon" :name="message.icon || 'mdi-message-text-outline'" size="34px" />
      <q-avatar v-else-if="message.avatar" size="34px">
        <img :src="message.avatar" />
      </q-avatar>
      <q-icon v-else name="mdi-message-text-outline" size="34px" />
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <div class="text-grey-7 cursor-pointer">{{ message.from }}</div>
        <div class="cursor-pointer text-weight-medium">{{ message.subject }}</div>
      </q-item-label>
      <q-item-label class="text-body2" lines="1">
        {{ message.text }}
      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <div class="text-grey-7 q-gutter-xs">
        <q-btn size="sm" flat dense round icon="delete" />
        <q-btn size="sm" flat dense round icon="done" />
        <!--<q-btn size="12px" flat dense round icon="more_vert" />-->
      </div>
      <div class="text-grey-7 q-gutter-xs">
        {{ message.date }}
      </div>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  name: 'Message',
  components: {},
  props: {
    message: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>
<style lang="scss"></style>
