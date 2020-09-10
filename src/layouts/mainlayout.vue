<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="text-grey-4 db-toolbar" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftShown = !leftShown" />

        <q-btn dense flat icon="img:dblogo.png" type="a" href="https://dashblocks.io" target="_blank" />

        <q-toolbar-title v-if="!smallScreen" style="padding-left: 4px;">
          dashblocks.io
        </q-toolbar-title>

        <q-space></q-space>

        <q-btn
          v-if="smallScreen"
          :text-color="showSearchToolbar ? 'primary' : ''"
          dense
          unelevated
          icon="search"
          class="q-ma-xs"
          @click="showSearchToolbar = !showSearchToolbar"
        ></q-btn>

        <q-input v-if="!smallScreen" :dark="true" v-model="searchQuery" debounce="500" dense filled placeholder="Search" clearable class="col-md-3">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn dense unelevated icon="mdi-bell" class="q-ma-xs">
          <q-badge color="red" floating>5</q-badge>
          <q-menu v-model="messagesOpen">
            <messages @close="messagesOpen = false"></messages>
          </q-menu>
        </q-btn>

        <q-btn-dropdown dense unelevated v-model="settingsOpen" dropdown-icon="settings" class="ub-btn-dropdown-bare q-ma-xs">
          <settings @close="settingsOpen = false"></settings>
        </q-btn-dropdown>

        <q-btn-dropdown unelevated v-model="userInfoOpen" no-caps>
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <q-avatar size="sm">
                <img src="images/avatars/male/1.png" />
              </q-avatar>
              <div class="text-center q-pa-sm">
                John Smith
              </div>
            </div>
          </template>
          <user-info></user-info>
        </q-btn-dropdown>
      </q-toolbar>
      <q-toolbar v-if="smallScreen && showSearchToolbar">
        <q-input :dark="true" v-model="searchQuery" debounce="500" dense filled placeholder="Search" clearable class="full-width">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <menu-drawer v-model="leftShown" :mini.sync="menuMini" :auto-expand="menuAutoExpand">
      <template v-slot:menu>
        <menu-list :menu-items="menuItems" v-on:expansionItemClick="menuMini = false"></menu-list>
      </template>
    </menu-drawer>

    <q-page-container>
      <transition :name="transitionName">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { dbColors } from 'dashblocks';
import MenuDrawer from '../components/menu/menudrawer.vue';
import MenuList from '../components/menu/menulist.vue';
import Settings from '../components/settings/settings.vue';
import UserInfo from '../components/user/userinfo.vue';
import Messages from '../components/user/messages.vue';

export default {
  name: 'MainLayout',
  components: {
    MenuDrawer,
    MenuList,
    Settings,
    UserInfo,
    Messages
  },
  data() {
    return {
      leftShown: true,
      rightShown: false,
      settingsOpen: false,
      messagesOpen: false,
      userInfoOpen: false,
      showSearchToolbar: false,
      searchQuery: '',
      transitionName: '',
      testColors: null,
      menuItems: [
        { id: '1', title: 'Dashboard', link: '/', icon: 'dashboard' },
        {
          id: 'observability',
          title: 'Observability Dashboards',
          icon: 'mdi-eye-check',
          caption: 'Monitor your Microservices',
          items: [
            { id: 'summary', title: 'Summary', link: '/summary', caption: 'Microservice Status', icon: 'mdi-chart-line-variant' },
            { id: 'requests', title: 'Requests', link: '/requests', icon: 'sync_alt', badge: '2070', badgeColor: 'accent' },
            { id: 'errors', title: 'Errors', link: '/errors', icon: 'error', caption: 'Errors Trend', badge: '10.62%', badgeColor: 'negative' },
            { id: 'apiop', title: 'API Operation', link: '/apiop', icon: 'settings_ethernet', caption: 'API Operation Scorecard' },
            { id: 'timeline', title: 'Timeline', link: '/timeline', icon: 'mdi-chart-bar', caption: 'Visits over time' }
          ]
        },
        //{ id: '3', title: 'Forms', link: '/forms', icon: 'mdi-playlist-edit' },
        {
          id: '4',
          title: 'Tables',
          icon: 'mdi-table',
          items: [
            { id: 'quasartable', title: 'Quasar Tables', link: '/quasartable', icon: 'sync_alt' },
            { id: 'vgt', title: 'Vue-Good-Table', link: '/vgt', icon: 'sync_alt' }
          ]
        },
        {
          id: '5',
          title: 'Charts',
          icon: 'pie_chart',
          items: [
            { id: 'chartjs', title: 'Chart.js', link: '/chartjs', icon: 'mdi-chart-bar' },
            { id: 'dygraphs', title: 'Dygraphs', link: '/dygraphs', icon: 'mdi-chart-line' }
          ]
        },
        {
          id: '6',
          title: 'Style',
          icon: 'mdi-draw',
          items: [
            { id: '7', title: 'Typography', link: '/typography', icon: 'mdi-format-text' },
            { id: '8', title: 'Icons', link: '/icons', icon: 'mdi-dots-horizontal-circle-outline' },
            {
              id: '9',
              title: 'MDI Icons',
              caption: 'Material Design Icons',
              link: '/mdi',
              icon: 'mdi-dots-horizontal-circle-outline',
              badge: '5045',
              badgeColor: 'accent',
              sideCaption: 'icons'
            }
          ]
        },
        {
          id: 'pages',
          title: 'Pages',
          icon: 'mdi-link-box-outline',
          items: [{ id: '7', title: 'Login', link: '/login', icon: 'mdi-login' }]
        }

        /*
        { title: 'Requests', link: '/requests', icon: 'sync_alt' },
        { title: 'Errors', link: '/errors', icon: 'error' },
        { title: 'API', link: '/api', icon: 'code' },
        { title: 'API Operation', link: '/apiop', icon: 'settings_ethernet' },
        { title: 'API Responses', link: '/apiresponses', icon: 'pie_chart' },
        { title: 'Rates & Durations', link: '/rates', icon: 'schedule' },
        { title: 'Payload', link: '/payload', icon: 'swap_vert' },
        { title: 'Last Errors', link: '/lasterrors', icon: 'error_outline' },
        { title: 'Longest Requests', link: '/longestrequests', icon: 'hourglass_empty' }
        */
      ]
    };
  },
  computed: {
    ...mapState({
      menuAutoExpand: state => state.layout.menuAutoExpand
    }),
    dark: {
      get() {
        return this.$store.state.layout.dark;
      },
      set(value) {
        this.setDark({ dark: value });
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
    smallScreen() {
      return ['xs', 'sm'].includes(this.$q.screen.name);
    }
  },
  watch: {
    dark: {
      handler: function(val) {
        this.$q.dark.set(val);
      }
    }
  },
  mounted() {
    this.initialize();
    this.$q.dark.set(this.dark);
  },
  methods: {
    ...mapActions({
      setDark: 'layout/setDark',
      setMenuMini: 'layout/setMenuMini'
    }),
    initialize() {
      let dbc = dbColors;

      //this.testColors = dbColors.getColors(true); // TEMP TODO REMOVE
      let cSteps = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

      dbColors.setColorScheme('default', {
        light: dbColors.d3ScaleChromatic.schemeTableau10,
        dark: dbColors.grafanaColors
      });

      dbColors.setColorScheme('Grafana', {
        light: dbColors.grafanaColors,
        dark: dbColors.grafanaColors
      });

      dbColors.setColorScheme('Tableau', {
        light: dbColors.d3ScaleChromatic.schemeTableau10,
        dark: dbColors.d3ScaleChromatic.schemeTableau10
      });

      dbColors.setColorScheme('Diverging', {
        light: dbColors.d3ScaleChromatic.schemeRdYlBu[10],
        dark: dbColors.d3ScaleChromatic.schemeRdYlBu[10]
      });

      dbColors.setColorScheme('Categorical', {
        light: dbColors.d3ScaleChromatic.schemeDark2,
        dark: dbColors.d3ScaleChromatic.schemeSet3 // schemeBuGn[9],
      });

      dbColors.setColorScheme('Warm', {
        light: cSteps.map(x => dbColors.d3ScaleChromatic.interpolateWarm(x)),
        dark: cSteps.map(x => dbColors.d3ScaleChromatic.interpolateWarm(x))
      });

      dbColors.setColorScheme('Cool', {
        light: cSteps.map(x => dbColors.d3ScaleChromatic.interpolateCool(x)),
        dark: cSteps.map(x => dbColors.d3ScaleChromatic.interpolateCool(x))
      });

      dbColors.setColorScheme('Calm', {
        light: ['#912e4d', '#00bd56', '#f02192', '#acd36d', '#8079ff', '#919200', '#f1adff', '#547600', '#ff8241', '#f8ba7a'],
        dark: ['#ce4c3a', '#60b14d', '#8162cb', '#bab141', '#c964b5', '#4bb092', '#c25874', '#717e37', '#688ccd', '#c78344']
      });
      //['#cc4ba2', '#64ac48', '#8361cd', '#9a963f', '#5f8cce', '#cd5136', '#4aac8d', '#c7596d', '#c78543', '#b578b6']
      //['#ce4c3a', '#60b14d', '#8162cb', '#bab141', '#c964b5', '#4bb092', '#c25874', '#717e37', '#688ccd', '#c78344']

      dbColors.setColorScheme('Fancy', {
        light: ['#38646f', '#4e2300', '#274f8e', '#6b5e1f', '#794f81', '#2a2e00', '#00485e', '#7c553f', '#2e0a06', '#2b2219'],
        dark: ['#b1d8a0', '#74aff3', '#dbcd9d', '#7bcaed', '#ebaba7', '#74d6e0', '#deb1e0', '#a1e9d1', '#adbce9', '#8dc4af']
      });

      dbColors.setColorScheme('Colorblind Friendly', {
        light: ['#37efab', '#58006c', '#b3e370', '#9a73ec', '#b1a200', '#0051ab', '#ff9e6a', '#601016', '#685d00', '#de3357'],
        dark: ['#78a563', '#666fe8', '#c1b01b', '#014ca6', '#ffca5e', '#e2b1ff', '#008418', '#ff77bf', '#811e00', '#ff8c56']
      });
    }
  }
};
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
