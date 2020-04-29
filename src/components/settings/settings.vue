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
      <q-select v-model="dashboardColorScheme" :options="colorSchemaOptions" label="Color Schema" />
      <q-item-label header>TODO Chart Colors</q-item-label>

      <q-separator spaced />
      <q-item-label header>TODO Banner Colors, Backgounds</q-item-label>

      <q-separator spaced />
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
      </q-item>
    </q-list>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'Settings',
  components: {},
  props: {},
  data() {
    return {
      colorSchemaOptions: ['Standard', 'Grafana', 'Diverging1'],

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
  watch: {},
  methods: {
    ...mapActions({
      setDark: 'layout/setDark',
      setMenuAutoExpand: 'layout/setMenuAutoExpand',
      setMenuMini: 'layout/setMenuMini',
      setDashboardColorScheme: 'layout/setDashboardColorScheme'
    }),
    onClose() {
      this.$emit('close');
    }
  }
};
</script>
