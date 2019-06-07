<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="app">
    <v-app id="inspire" :dark="switchDark">
      <v-toolbar dense fixed app clipped-right>
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
        <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <v-switch v-model="switchDark" label="Dark" hide-details></v-switch>
        </div>
      </v-toolbar>

      <v-navigation-drawer fixed v-model="drawer" :mini-variant.sync="mini" app>
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="./assets/logo.png" />
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>DASHBLOCKS</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon @click.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-list dense two-line subheader>
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            avatar
            :to="item.href"
          >
            <v-tooltip bottom>
              <v-list-tile-avatar slot="activator">
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <span>{{ item.title }}</span>
            </v-tooltip>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="amber lighten-3">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-list dense>
          <v-list-group
            v-for="item in items2"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              :to="subItem.href"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-content>
        <v-container fluid fill-height>
          <v-layout>
            <v-flex>
              <div class="content"><router-view /></div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: true,
      drawerRight: false,
      items2: [
        {
          icon: "bar_chart",
          title: "Dygraphs",
          items: [
            {
              title: "Dynamic Updates",
              href: "/dygraphsdynamic"
            },
            {
              title: "TODO",
              href: "/dashsix"
            }
          ]
        }
      ],
      items: [
        {
          icon: "bar_chart",
          iconClass: "teal lighten-2 white--text",
          title: "Dashblocks",
          subtitle: "Dashboard Showcase",
          href: "/"
        },
        {
          icon: "bubble_chart",
          iconClass: "teal lighten-2 white--text",
          title: "Chart.JS",
          subtitle: "showcase",
          href: "/chartjs"
        }
      ]
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    switchDark: {
      get() {
        return this.$store.state.switchDark;
      },
      set(value) {
        this.$store.commit("setSwitchDark", value);
      }
    }
  },
  methods: {
    // TODO
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600");

body,
html {
  margin: 0;
  padding: 0;
}
body {
  font-family: "Source Sans Pro", sans-serif;
}
/*
.theme--dark.v-navigation-drawer {
  background: #0f2027;
  background: -webkit-linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
  background: linear-gradient(
      to bottom,
      #0f2027,
      #203a43,
      #2c5364
  );
}
*/
</style>
