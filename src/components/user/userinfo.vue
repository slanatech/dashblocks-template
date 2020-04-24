<template>
  <div class="q-pa-md" style="max-width: 280px">
    <q-list style="width: 260px">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="images/avatars/male/1.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            <div class="text-h5">John Smith</div>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item clickable v-ripple v-close-popup>
        <q-item-section avatar>
          <q-icon name="mdi-account"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            My Account
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple v-close-popup>
        <q-item-section avatar>
          <q-icon name="mdi-bell"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            Notifications
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-badge color="red" label="5" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple v-close-popup>
        <q-item-section avatar>
          <q-icon name="mdi-calendar"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            Calendar
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-badge color="red" label="1" />
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item clickable v-ripple v-close-popup>
        <q-item-section avatar>
          <q-icon name="mdi-help-box"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            Help
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple v-close-popup>
        <q-item-section avatar>
          <q-icon name="mdi-logout"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            Log Out
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!--<q-list bordered padding>
      <q-item-label header>User Controls</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Content filtering</q-item-label>
          <q-item-label caption>
            Set the content filtering level to restrict apps that can be downloaded
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Password</q-item-label>
          <q-item-label caption>
            Require password for purchase or use password to restrict purchase
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>General</q-item-label>

      <q-item tag="label" v-ripple>
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

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Battery too low</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="notif1" val="battery" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Friend request</q-item-label>
          <q-item-label caption>Allow notification</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="green" v-model="notif2" val="friend" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Picture uploaded</q-item-label>
          <q-item-label caption>Allow notification when uploading images</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="red" v-model="notif3" val="picture" />
        </q-item-section>
      </q-item>

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
    </q-list>-->
  </div>
</template>
<script>
export default {
  name: 'UserInfo',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>
