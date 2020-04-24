<template>
  <q-page class="ub-page">
    <div class="row items-center">
      <div class="col-md-10 offset-md-1 q-ma-lg">
        <div class="text-h3">Material Design Icons</div>
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
      <div class="col-md-10 offset-md-1 ub-icons-set" v-on:click="onIconClick">
        <!--<q-icon v-for="icon in icons" v-bind:key="icon" :name="`mdi-${icon}`" :title="`mdi-${icon}`" size="xl" class="q-pa-md q-ma-lg"></q-icon>-->
        <i v-for="icon in icons" v-bind:key="icon" :class="`mdi mdi-${icon}`" :title="`mdi-${icon}`"></i>
      </div>
    </div>
    <q-drawer v-model="showDetails" side="right" bordered class="ub-drawer-transparent">
      <div style="text-align: center;" class="q-ma-lg">
        <q-icon v-if="currentIcon" :name="currentIcon" style="font-size: 240px;"></q-icon>
      </div>
      <div style="text-align: center;" class="text-subtitle1 q-ma-md">
        {{ currentIcon }}
      </div>
      <div style="text-align: center;" class="q-ma-md">
        <q-btn dense color="accent" title="Copy" icon="mdi-clipboard-text-multiple-outline" @click="onCopy">Copy</q-btn>
      </div>
    </q-drawer>
  </q-page>
</template>

<script>
import iconsmdiv5 from '../data/iconsmdiv5.json';

export default {
  name: 'MDIIcons',
  data() {
    return {
      icons: [],
      searchQuery: '',
      currentIcon: null,
      showDetails: false
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
  methods: {
    onIconClick(e) {
      if (e.target && e.target.title) {
        this.currentIcon = e.target.title;
        this.showDetails = true;
      }
    },
    onCopy(index) {
      let tempInput = document.createElement('textarea');
      tempInput.style = 'position: absolute; left: -1000px; top: -1000px';
      tempInput.value = this.currentIcon;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    }
  }
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
    cursor: pointer;
  }
}

.body--dark .ub-icons-set {
  color: rgba(144, 164, 174, 0.5);
}

.ub-drawer-transparent {
  .q-drawer {
    background: #fff;
  }
}
.body--dark .ub-drawer-transparent {
  .q-drawer {
    background: #121212;
  }
}
</style>
