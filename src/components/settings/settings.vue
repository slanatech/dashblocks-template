<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-bar class="bg-none">
      Settings
      <q-space />
      <q-btn dense flat round icon="close" @click="onClose" />
    </q-bar>

    <q-list padding>
      <!--<q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check1" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Notifications</q-item-label>
          <q-item-label caption>
            Notify me about updates to apps or games that I downloaded
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check2" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Sound</q-item-label>
          <q-item-label caption>
            Auto-update apps at anytime. Data charges may apply
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check3" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Auto-add widgets</q-item-label>
          <q-item-label caption>
            Automatically add home screen widgets
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Notifications</q-item-label>
      -->

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Dark Mode</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="dark" icon="brightness_medium" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Minimize Menu</q-item-label>
          <q-item-label caption>Minimize menu sidebar</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle v-model="menuMini" icon="menu" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Auto-Expand Menu</q-item-label>
          <q-item-label caption>Auto-expand menu when hovering</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle v-model="menuAutoExpand" icon="menu" />
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <!--<q-item tag="label">
        <q-item-section>
          <q-select v-model="dashboardColorScheme" :options="colorSchemaOptions" label="Dashboard Color Schema" />
        </q-item-section>
      </q-item>-->

      <q-item-label header style="padding-bottom: 0px;">Dashboard Color Scheme</q-item-label>

      <q-item>
        <q-item-section> </q-item-section>
        <q-item-section side top>
          <q-btn-dropdown
            size="md"
            align="right"
            v-model="schemeSelectorShown"
            outlined
            flat
            :label="dashboardColorScheme"
            icon="mdi-invert-colors"
            menu-self="center left"
          >
            <div style="width: 400px;">
              <color-scheme-selector v-model="dashboardColorScheme"></color-scheme-selector>
            </div>
          </q-btn-dropdown>
          <div>
            <q-chip square size="sm">Light:</q-chip>
            <q-chip square size="xs" :style="`background-color: ${lightColors[0]}`"></q-chip>
            <q-chip square size="xs" :style="`background-color: ${lightColors[1]}`"></q-chip>
            <q-chip square size="xs" :style="`background-color: ${lightColors[2]}`"></q-chip>
            <q-chip square size="xs" :style="`background-color: ${lightColors[3]}`"></q-chip>
            <q-chip square size="xs" :style="`background-color: ${lightColors[4]}`"></q-chip>
          </div>
          <div>
            <q-chip square size="sm">Dark:</q-chip>
            <q-chip square size="xs" :style="`background-color: ${darkColors[0]}`"></q-chip>
            <q-chip square size="xs" :style="`background-color: ${darkColors[1]}`"></q-chip>
            <q-chip square size="xs" :style="`background-color: ${darkColors[2]}`"></q-chip>
            <q-chip square size="xs" :style="`background-color: ${darkColors[3]}`"></q-chip>
            <q-chip square size="xs" :style="`background-color: ${darkColors[4]}`"></q-chip>
          </div>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>TODO Banner Colors, Backgounds</q-item-label>

      <!--<q-separator spaced />
      <q-item-label header>Other settings</q-item-label>

      <q-item>
        <q-item-section side>
          <q-icon color="teal" name="volume_down" />
        </q-item-section>
        <q-item-section>
          <q-slider v-model="volume" :min="0" :max="10" label color="teal" />
        </q-item-section>
        <q-item-section side>
          <q-icon color="teal" name="volume_up" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-icon color="deep-orange" name="brightness_medium" />
        </q-item-section>
        <q-item-section>
          <q-slider v-model="brightness" :min="0" :max="10" label color="deep-orange" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-icon color="primary" name="mic" />
        </q-item-section>
        <q-item-section>
          <q-slider v-model="mic" :min="0" :max="50" label />
        </q-item-section>
      </q-item>-->
    </q-list>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import ColorSchemeSelector from './colorschemeselector.vue';
import { dbColors } from 'dashblocks';
export default {
  name: 'Settings',
  components: {
    ColorSchemeSelector
  },
  props: {},
  data() {
    return {
      schemeSelectorShown: false,
      colorSchemaOptions: ['default', 'Grafana', 'Tableau', 'Diverging', 'Categorical', 'Warm', 'Cool', 'Calm', 'Fancy', 'Colorblind Friendly'],

      lightColors: [],
      darkColors: [],

      check1: true,
      check2: false,
      check3: false,

      notif1: true,
      notif2: true,
      notif3: false,

      volume: 6,
      brightness: 3,
      mic: 8
    };
  },
  computed: {
    dark: {
      get() {
        return this.$store.state.layout.dark;
      },
      set(value) {
        this.setDark({ dark: value });
      }
    },
    menuAutoExpand: {
      get() {
        return this.$store.state.layout.menuAutoExpand;
      },
      set(value) {
        this.setMenuAutoExpand({ menuAutoExpand: value });
      }
    },
    menuMini: {
      get() {
        return this.$store.state.layout.menuMini;
      },
      set(value) {
        this.setMenuMini({ menuMini: value });
      }
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
    dashboardColorScheme: function(val) {
      this.initColors();
    }
  },
  mounted() {
    this.initColors();
  },
  methods: {
    ...mapActions({
      setDark: 'layout/setDark',
      setMenuAutoExpand: 'layout/setMenuAutoExpand',
      setMenuMini: 'layout/setMenuMini',
      setDashboardColorScheme: 'layout/setDashboardColorScheme'
    }),
    initColors() {
      let colorScheme = dbColors.getColorScheme(this.dashboardColorScheme);
      this.lightColors = colorScheme.light.slice(0, 5);
      this.darkColors = colorScheme.dark.slice(0, 5);
    },
    onClose() {
      this.$emit('close');
    }
  }
};
</script>
