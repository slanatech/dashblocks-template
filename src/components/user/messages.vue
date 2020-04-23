<template>
  <div class="q-pa-md" style="max-width: 700px">
    <q-bar class="bg-none">
      Messages
      <q-space />
      <q-btn dense flat round icon="close" @click="onClose" />
    </q-bar>

    <q-list style="width: 600px" separator>
      <message v-for="message in messagesList" v-bind:key="message.id" :message="message"></message>

      <!--
      <q-item>
        <q-item-section avatar top>
          <q-icon name="account_tree" color="black" size="34px" />
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">GitHub</q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">[quasarframework/quasar]</span>
            <span class="text-grey-8"> - GitHub repository</span>
          </q-item-label>
          <q-item-label caption lines="1">
            @rstoenescu in #3: > Generic type parameter for props
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">Open in GitHub</span>
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
          </div>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item>
        <q-item-section avatar top>
          <q-icon name="account_tree" color="black" size="34px" />
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">GitHub</q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">[quasarframework/quasar]</span>
            <span class="text-grey-8"> - GitHub repository</span>
          </q-item-label>
          <q-item-label caption lines="1">
            @rstoenescu in #1: > The build system
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">Open in GitHub</span>
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
          </div>
        </q-item-section>
      </q-item>
      -->
    </q-list>
  </div>
</template>
<script>
import Message from './message.vue';
export default {
  name: 'Messages',
  components: { Message },
  props: {},
  data() {
    return {
      messagesList: [
        {
          id: '1',
          from: 'Slack',
          subject: 'Current Job result: SUCCESS',
          text: 'service-pipeline-branches/master:65e1b0d6-21f0-498d-9510-5a2acc49b06b',
          icon: 'mdi-slack',
          date: '4/23/20'
        },
        {
          id: '2',
          from: 'GitHub',
          subject: 'github-actions pushed to slanatech/dashblocks-template ',
          text: '62e7e60 Deploying to gh-pages from @e393152',
          icon: 'mdi-github',
          date: '4/23/20'
        },
        {
          id: '3',
          from: 'Leela Dunlap',
          subject: 'Dashblocks Material Admin Template',
          text: 'Dashblocks enables easily creating sophisticated interactive dashboards simply by declaring dashboard structure as json or javascript object',
          avatar: 'images/avatars/female/1.png',
          date: '4/23/20'
        },
        {
          id: '4',
          from: 'Keeley Milner',
          subject: 'Dashblocks Charts',
          text: 'Dashblocks uses popular charting libraries: d3, Chart.js, Dygraphs, Plotly.js.',
          avatar: 'images/avatars/male/1.png',
          date: '4/23/20'
        },
        { id: '5', from: 'Leela Dunlap', subject: 'Re: Dashblocks Charts', text: 'Awesome!', avatar: 'images/avatars/female/1.png', date: '4/23/20' }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    onClose() {
      this.$emit('close');
    }
  }
};
</script>
