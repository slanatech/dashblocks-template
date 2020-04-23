<template>
  <q-page class="ub-page">
    <div class="row items-center">
      <div class="col-md-10 offset-md-1 q-ma-lg">
        <div class="text-h3">Material Design Icons</div>
      </div>
    </div>
    <div class="row items-center">
      <div class="col-md-10 offset-md-1 q-ma-md">
        <div class="text-subtitle1">
          MDI icons by <a href="https://materialdesignicons.com/">https://materialdesignicons.com/</a>. See detailed documentation on using icons in Quasar at
          <a href="https://quasar.dev/style/icon">https://quasar.dev/style/icon</a>
        </div>
      </div>
    </div>
    <div class="row items-center">
      <q-input v-model="searchQuery" debounce="300" label="Search Icons" clearable class="col-md-4 offset-md-4">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="row items-center">
      <div class="col-md-10 offset-md-1 q-ma-lg ub-icons-set">
        <!--<q-icon v-for="icon in icons" v-bind:key="icon" :name="`mdi-${icon}`" :title="`mdi-${icon}`" size="xl" class="q-pa-md q-ma-lg"></q-icon>-->
        <i v-for="icon in icons" v-bind:key="icon" :class="`mdi mdi-${icon}`" :title="`mdi-${icon}`"></i>
      </div>
    </div>
  </q-page>
</template>

<script>
import iconsmdiv5 from '../data/iconsmdiv5.json';

export default {
  name: 'MDIIcons',
  data() {
    return {
      icons: [],
      searchQuery: ''
    };
  },
  watch: {
    searchQuery: function(val) {
      if (!val || val === '') {
        this.icons = Object.freeze(iconsmdiv5);
        return;
      }
      const needle = val.toLowerCase();
      this.icons = Object.freeze(iconsmdiv5.filter(v => v.toLowerCase().indexOf(needle) > -1));
    }
  },
  mounted() {
    this.icons = Object.freeze(iconsmdiv5);
  },
  methods: {}
};
</script>
<style lang="scss">
.ub-icons-set {
  font-size: 48px;
  font-style: normal;
  color: rgba(69, 90, 100, 0.8);

  i {
    padding: 20px;
    margin: 10px;
  }
}

.body--dark .ub-icons-set {
  color: rgba(144, 164, 174, 0.5);
}
</style>
