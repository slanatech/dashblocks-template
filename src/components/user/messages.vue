<template>
  <div class="q-pa-md" style="max-width: 700px">
    <q-bar class="bg-none">
      Notifications
      <q-space />
      <q-btn dense flat round icon="close" @click="onClose" />
    </q-bar>

    <q-list style="width: 600px" separator>
      <message v-for="message in messagesList" v-bind:key="message.id" :message="message"></message>
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
