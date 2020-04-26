<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="ub-login-card">
          <q-card-section class="ub-login-hdr text-white text-center">
            <q-btn round color="deep-purple-7" icon="mdi-google" class="absolute" style="z-index:10; top: 40px; right: 12px; transform: translateY(-50%);">
              <q-tooltip>Login With Google</q-tooltip>
            </q-btn>
            <q-btn round color="deep-purple-7" icon="mdi-facebook" class="absolute" style="z-index:10; top: 100px; right: 12px; transform: translateY(-50%);">
              <q-tooltip>Login With Facebook</q-tooltip>
            </q-btn>
            <q-btn round color="deep-purple-7" icon="mdi-github" class="absolute" style="z-index:10; top: 160px; right: 12px; transform: translateY(-50%);">
              <q-tooltip>Login With GitHub</q-tooltip>
            </q-btn>
            <q-img src="dblogo.png" style="height: 128px; width: 128px;"></q-img>
            <div class="text-h5 absolute-bottom" style="margin-bottom: 20px;">dashblocks.io</div>
          </q-card-section>

          <q-card-section>
            <q-card-section>
              <q-input v-model="username" clearable label="Username or Email">
                <template v-slot:prepend>
                  <q-icon name="mdi-account" />
                </template>
              </q-input>
              <q-input v-model="password" type="password" clearable label="password">
                <template v-slot:prepend>
                  <q-icon name="mdi-lock" />
                </template>
              </q-input>
            </q-card-section>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat>Register</q-btn>
            <q-btn color="primary" unelevated>Login</q-btn>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  computed: {
    dark: {
      get() {
        return this.$store.state.layout.dark;
      }
    }
  },
  mounted() {
    this.$q.dark.set(this.dark);
  }
};
</script>

<style lang="scss">
.ub-login-card {
  width: 100%;
  max-width: 400px;
  .ub-login-hdr {
    height: 200px;
    background: #0f2027; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2c5364, #203a43, #0f2027); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2c5364, #203a43, #0f2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
}
</style>
