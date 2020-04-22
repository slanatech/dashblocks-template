<template>
  <q-list class="db-menu-list">
    <menu-list-item v-for="item in menuItems" v-bind:key="item.id" :item="item" :collapsed="collapsed" :active-class="activeClass" />
  </q-list>
</template>
<script>
import MenuListItem from './menulistitem.vue';
export default {
  name: 'MenuList',
  components: { MenuListItem },
  props: {
    menuItems: {
      type: Array,
      default: null
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    activeClass: {
      type: String,
      default: ''
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
<style lang="scss">
.db-menu-list {
  a,
  a:hover {
    text-decoration: none;
  }
}
</style>
