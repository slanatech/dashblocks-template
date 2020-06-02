<template>
  <q-page class="ub-page">
    <div class="row items-center">
      <div class="col-md-10 offset-md-1 q-ma-lg">
        <div class="text-h3">Forms</div>
      </div>
    </div>
    <div class="row items-center">
      <div class="col-md-10 offset-md-1 q-ma-md">
        <q-banner dense class="bg-purple-8 text-white">
          <template v-slot:avatar>
            <q-icon name="mdi-information-outline" />
          </template>
          Work in progress ...
        </q-banner>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <q-list padding>
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
        </q-list>
      </div>
      <div class="col-md-6">
        <q-form class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Your name *"
            hint="Name and surname"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <q-input
            filled
            type="number"
            v-model="age"
            label="Your age *"
            lazy-rules
            :rules="[val => (val !== null && val !== '') || 'Please type your age', val => (val > 0 && val < 100) || 'Please type a real age']"
          />

          <q-toggle v-model="accept" label="I accept the license and terms" />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Forms',
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
