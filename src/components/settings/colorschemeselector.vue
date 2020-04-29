<template>
  <q-card style="width: 100%;">
    <q-card-section>
      <q-input v-model="query" debounce="400" filled dense placeholder="Search Color Scheme" clearable>
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card-section>

    <q-card-section style="height: 300px;">
      <q-scroll-area class="fit">
        <q-list>
          <q-item
            v-for="scheme in filteredSchemes"
            v-bind:key="scheme.name"
            clickable
            v-ripple
            v-close-popup
            active-class="bg-teal-1 text-grey-8"
            @click="onSelect(scheme.name)"
          >
            <q-item-section avatar top>
              <q-icon name="mdi-invert-colors" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scheme.name }}</q-item-label>
              <div>
                <q-chip square size="sm">Light:</q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.light[0]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.light[1]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.light[2]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.light[3]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.light[4]}`"></q-chip>
              </div>
              <div>
                <q-chip square size="sm">Dark :</q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.dark[0]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.dark[1]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.dark[2]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.dark[3]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.dark[4]}`"></q-chip>
              </div>
              <!--<q-item-label caption lines="1">{{ getScopeDescription(scope) }}</q-item-label>-->
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn dense flat label="Cancel" color="primary" v-close-popup />
      <!--<q-btn dense label="OK" color="primary" @click="testClick" />-->
    </q-card-actions>
  </q-card>
</template>
<script>
import { mapActions } from 'vuex';
import { dbColors } from 'dashblocks';

export default {
  name: 'ColorSchemeSelector',
  components: {},
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      query: '',
      schemes: []
    };
  },
  computed: {
    filteredSchemes: function() {
      return this.schemes.filter(s => this.isVisible(s.name));
    },
    dashboardColorScheme: {
      get() {
        return this.$store.state.layout.dashboardColorScheme;
      },
      set(value) {
        this.setDashboardColorScheme({ dashboardColorScheme: value });
      }
    }
  },
  watch: {
    query: function(value) {
      //this.updateCellQuery({ id: this.cell.id, query: value });
    }
  },
  mounted() {
    this.initialize();
  },
  methods: {
    ...mapActions({
      setDashboardColorScheme: 'layout/setDashboardColorScheme'
    }),
    initialize() {
      let dbc = dbColors;
      for (let schemeName of Object.keys(dbc.colorSchemes)) {
        let colorScheme = dbc.colorSchemes[schemeName];
        this.schemes.push({
          name: schemeName,
          light: colorScheme.light.slice(0, 5),
          dark: colorScheme.dark.slice(0, 5)
        });
        // TODO grab all
      }
    },
    isVisible(schemeName) {
      let qlc = this.query.toLowerCase();
      return schemeName.toLowerCase().indexOf(qlc) > -1;
    },
    onSelect(colorScheme) {
      this.$emit('input', colorScheme);
    }
  }
};
</script>
