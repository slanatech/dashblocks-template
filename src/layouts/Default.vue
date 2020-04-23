<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="text-grey-4 db-toolbar" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftShown = !leftShown" />

        <q-toolbar-title>
          dashblocks
        </q-toolbar-title>

        <q-space></q-space>

        <q-input dark="true" v-model="searchQuery" debounce="500" dense filled placeholder="Search" clearable class="col-md-3">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn-dropdown dense unelevated v-model="messagesOpen">
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <q-avatar size="sm" icon="mdi-bell">
                <q-badge color="red" floating>4</q-badge>
              </q-avatar>
            </div>
          </template>
          <messages @close="messagesOpen = false"></messages>
        </q-btn-dropdown>

        <q-btn-dropdown unelevated dense v-model="userInfoOpen" no-caps>
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

        <q-btn-dropdown dense unelevated v-model="settingsOpen" dropdown-icon="settings" class="ub-btn-dropdown-bare">
          <settings @close="settingsOpen = false"></settings>
        </q-btn-dropdown>

        <!--
        <q-btn dense flat size="md" round icon="refresh" @click="performRefresh" />
        <q-btn-toggle
          v-model="refreshTimeout"
          text-color="blue-grey-8"
          toggle-text-color="grey-4"
          size="md"
          dense
          flat
          :options="refreshOptions"
        />
        -->
      </q-toolbar>
    </q-header>

    <menu-drawer v-model="leftShown" :mini.sync="leftMini" :auto-expand="menuAutoExpand">
      <template v-slot:menu>
        <menu-list :menu-items="menuItems"></menu-list>
      </template>
    </menu-drawer>

    <q-drawer v-model="rightShown" side="right" bordered>
      OPA
    </q-drawer>

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
  name: 'DashblocksTemplateUxLayout',
  components: {
    MenuDrawer,
    MenuList,
    Settings,
    UserInfo,
    Messages
  },
  data() {
    return {
      leftMini: true,
      leftShown: true,
      rightShown: false,
      settingsOpen: false,
      messagesOpen: false,
      userInfoOpen: false,
      searchQuery: '',
      transitionName: '',
      testColors: null,
      menuItems: [
        { id: '1', title: 'Dashboard', link: '/', icon: 'trending_up' },
        { id: '2', title: 'Typography', link: '/typography', icon: 'mdi-format-text' },
        { id: '3', title: 'Forms', link: '/forms', icon: 'mdi-playlist-edit' },
        { id: '4', title: 'Tables', link: '/tables', icon: 'mdi-table' },
        { id: '5', title: 'Charts', link: '/charts', icon: 'pie_chart' },
        { id: '6', title: 'Icons', link: '/icons', icon: 'pie_chart' }

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
      ],
      refreshOptions: [
        { icon: 'pause', value: 0 },
        { label: '1s', value: 1000 },
        { label: '5s', value: 5000 },
        { label: '15s', value: 15000 },
        { label: '30s', value: 30000 },
        { label: '1m', value: 60000 }
      ],
      rotateEnabled: false,
      rotateCurrent: -1,
      rotateOptions: ['/', '/requests', '/errors', '/api', '/apiresponses', '/rates', '/payload']
    };
  },
  computed: {
    ...mapState({
      menuAutoExpand: state => state.layout.menuAutoExpand
    }),
    refreshTimeout: {
      get() {
        return this.$store.state.refreshTimeout;
      },
      set(value) {
        this.setRefreshTimeout({ timeout: value });
      }
    },
    dark: {
      get() {
        return this.$store.state.layout.dark;
      },
      set(value) {
        this.setDark({ dark: value });
      }
    }
  },
  watch: {
    dark: {
      handler: function(val) {
        this.$q.dark.set(val);
      }
    },
    rotateEnabled: {
      handler: function(val) {
        if (val) {
          this.rotateCurrent = -1;
        }
      }
    },
    rotateTrigger: {
      handler: function() {
        if (!this.rotateEnabled) {
          return;
        }
        console.log(`Rotating screen: ${Date.now()}`);
        this.rotateCurrent++;
        if (this.rotateCurrent >= this.rotateOptions.length) {
          this.rotateCurrent = 0;
        }
        this.transitionName = 'fade';
        this.$router.push(this.rotateOptions[this.rotateCurrent]);
        this.$nextTick(() => {
          setTimeout(() => {
            this.transitionName = '';
          }, 550);
        });
      }
    }
  },
  mounted() {
    this.testColors = dbColors.getColors(true); // TEMP TODO REMOVE
    this.$q.dark.set(this.dark);
  },
  methods: {
    ...mapActions({
      setDark: 'layout/setDark'
    })
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
