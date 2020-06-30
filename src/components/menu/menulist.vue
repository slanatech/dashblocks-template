<template>
  <q-list class="db-menu-list">
    <div v-if="mode === 'expand'">
      <menu-list-item
        v-for="item in menuItems"
        v-bind:key="item.id"
        :item="item"
        :collapsed="collapsed"
        :active-class="activeClass"
        @expansionItemClick="onExpansionItemClick(item)"
        @itemExpanded="onItemExpanded(item)"
        @itemCollapsed="onItemCollapsed(item)"
      />
    </div>
    <div v-else>
      <menu-list-item-ex
        v-for="item in menuItems"
        v-bind:key="item.id"
        :item="item"
        :collapsed="collapsed"
        :active-class="activeClass"
        @expansionItemClick="onExpansionItemClick(item)"
        @itemExpanded="onItemExpanded(item)"
        @itemCollapsed="onItemCollapsed(item)"
      />
    </div>
  </q-list>
</template>
<script>
import MenuListItem from './menulistitem.vue';
import MenuListItemEx from './menulistitemex.vue';
export default {
  name: 'MenuList',
  components: { MenuListItem, MenuListItemEx },
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
    },
    mode: {
      type: String,
      default: 'expand'
    }
  },
  data: function() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    onExpansionItemClick(item) {
      this.$emit('expansionItemClick', item);
    },
    onItemExpanded(item) {
      this.$emit('itemExpanded', item);
    },
    onItemCollapsed(item) {
      this.$emit('itemCollapsed', item);
    }
  }
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
