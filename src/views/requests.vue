<template>
  <q-page class="ub-page">
    <div class="row items-center" style="margin-bottom: 10px;">
      <div class="col-md-12 q-ma-sm">
        <div class="text-h3">Requests</div>
        <div class="text-subtitle1">
          Check out <a href="https://github.com/slanatech/swagger-stats" target="_blank">swagger-stats</a> project to see this dashboard in action
        </div>
      </div>
    </div>
    <div style="padding: 4px;margin-bottom: 20px;">
      <vue-good-table :columns="columns" :rows="rows" :theme="vgtTheme" styleClass="vgt-table condensed bordered striped sws-table"> </vue-good-table>
    </div>
    <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="dark"> </db-dashboard>
  </q-page>
</template>

<script>
import { DbData } from 'dashblocks';
import pathOr from 'ramda/src/pathOr';
import { vgtMethods } from '../mixins/vgtmethods';
import { mapState } from 'vuex';
import utils from '../utils.js';

// File '../data/requests.json' contains example dashboard data
import dashboardData from '../data/requests.json';
import { demodashboard } from '../mixins/demodashboard';

export default {
  name: 'ApiView',
  components: {},
  mixins: [vgtMethods, demodashboard],
  data() {
    return {
      timer: null,
      columns: [
        { label: 'Method', field: 'method', tdClass: 'text-weight-bold' },
        { label: 'Requests', field: 'requests', type: 'number', tdClass: 'text-weight-bold' },
        { label: 'Responses', field: 'responses', type: 'number' },
        { label: 'Apdex Score', field: 'apdex_score', type: 'number', formatFn: this.formatToFixed2, tdClass: this.tdClassApdex },
        { label: 'Errors', field: 'errors', type: 'number', tdClass: this.tdClassErrors },
        { label: 'Req rate', field: 'req_rate', type: 'number', formatFn: this.formatToFixed2 },
        { label: 'Err rate', field: 'err_rate', type: 'number', formatFn: this.formatToFixed2, tdClass: this.tdClassErrRate },
        { label: 'Success', field: 'success', type: 'number' },
        { label: 'Redirect', field: 'redirect', type: 'number' },
        { label: 'Client Error', field: 'client_error', type: 'number', tdClass: this.tdClassCErr },
        { label: 'Server Error', field: 'server_error', type: 'number', tdClass: this.tdClassSErr },
        { label: 'Max Time (ms)', field: 'max_time', type: 'number' },
        { label: 'Avg Time (ms)', field: 'avg_time', type: 'number', formatFn: this.formatToFixed2 },
        { label: 'Avg Req Size', field: 'avg_req_clength', type: 'number', formatFn: this.formatToFixed0 },
        { label: 'Avg Res Size', field: 'avg_res_clength', type: 'number', formatFn: this.formatToFixed0 }
      ],
      rows: [],
      dbdata: new DbData(),
      dbspec: {
        layout: {
          type: 'grid',
          size: 12
        },
        colorScheme: 'default',
        // prettier-ignore
        widgets: [
          { id: 'w1', type: 'DbNumber', cspan: 3, properties: { title: 'GET', subtitle: 'GET Requests' } },
          { id: 'w2', type: 'DbNumber', cspan: 3, properties: { title: 'POST', subtitle: 'POST Requests' } },
          { id: 'w3', type: 'DbNumber', cspan: 3, properties: { title: 'PUT', subtitle: 'PUT Requests' } },
          { id: 'w4', type: 'DbNumber', cspan: 3, properties: { title: 'DELETE', subtitle: 'DELETE Requests' } },
          {
            id: 'w23',
            type: 'DbChartjsDoughnut',
            cspan: 4,
            height: 250,
            properties: {
              options: {
                title: {display: true, text: 'Requests by method', position: 'top'},
                legend: { position: 'right' }
              }
            }
          },
          {
            id: 'w24',
            type: 'DbChartjsDoughnut',
            cspan: 4,
            height: 250,
            properties: {
              options: {
                title: {display: true, text: 'Errors by method', position: 'top'},
                legend: { position: 'right' }
              }
            }
          },
          {
            id: 'w25',
            type: 'DbChartjsBar',
            cspan: 4,
            height: 250,
            properties: {
              options: {
                title: { display: true, text: 'Apdex Score', position: 'top'},
                legend: { display: false },
                plugins: { labels: {render: ()=>{}}}
              }
            }
          },
          {
            id: 'w26',
            type: 'DbChartjsBar',
            cspan: 4,
            height: 250,
            properties: {
              options: {
                title: { display: true, text: 'Request Rate', position: 'top'},
                legend: { display: false },
                plugins: { labels: {render: ()=>{}}}
              }
            }
          },
          {
            id: 'w27',
            type: 'DbChartjsBar',
            cspan: 4,
            properties: {
              options: {
                title: { display: true, text: 'Error Rate', position: 'top'},
                legend: { display: false },
                plugins: { labels: {render: ()=>{}}}
              }
            }
          },
          {
            id: 'w28',
            type: 'DbChartjsBar',
            cspan: 4,
            properties: {
              options: {
                title: { display: true, text: 'Avg Handle Time', position: 'top'},
                legend: { display: false },
                plugins: { labels: {render: ()=>{}}}
              }
            }
          }
        ]
      },
      ready: false
    };
  },
  computed: {
    vgtTheme: function() {
      return this.dark ? 'nocturnal' : 'default';
    }
  },
  watch: {},
  mounted() {
    this.initialize();
    this.ready = true;
  },
  methods: {
    initialize: function() {
      // Init dashboard color scheme from state
      this.dbspec.colorScheme = this.dashboardColorScheme;

      // Init dashboard data
      this.dbdata.setWData('w1', { value: 0, total: 0 });
      this.dbdata.setWData('w2', { value: 0, total: 0 });
      this.dbdata.setWData('w3', { value: 0, total: 0 });
      this.dbdata.setWData('w4', { value: 0, total: 0 });

      this.dbdata.setWData('w23', { data: { labels: [], datasets: [{ data: [] }] } });
      this.dbdata.setWData('w24', { data: { labels: [], datasets: [{ data: [] }] } });
      this.dbdata.setWData('w25', { data: { labels: [], datasets: [{ data: [] }] } });
      this.dbdata.setWData('w26', { data: { labels: [], datasets: [{ data: [] }] } });
      this.dbdata.setWData('w27', { data: { labels: [], datasets: [{ data: [] }] } });
      this.dbdata.setWData('w28', { data: { labels: [], datasets: [{ data: [] }] } });

      this.updateStats();
    },

    updateStats: function() {
      // Update table
      let statsContainer = dashboardData;
      this.rows = utils.getMethodStatsArray(statsContainer);
      let totalRequests = pathOr(0, ['all', 'requests'], statsContainer);
      let sampleTrend = [
        7,
        2,
        8,
        4,
        12,
        3,
        5,
        1,
        8,
        4,
        5,
        3,
        5,
        6,
        4,
        4,
        5,
        6,
        4,
        5,
        7,
        10,
        6,
        3,
        9,
        4,
        3,
        6,
        5,
        2,
        7,
        7,
        5,
        5,
        6,
        4,
        3,
        6,
        5,
        3,
        8,
        5,
        5,
        3,
        4,
        5,
        5,
        6,
        6,
        9,
        6,
        6,
        4,
        4,
        8,
        4,
        6,
        9,
        2,
        2,
        2
      ];
      this.dbdata.setWData('w1', { value: pathOr(0, ['method', 'GET', 'requests'], statsContainer), trend: sampleTrend, total: totalRequests });
      this.dbdata.setWData('w2', { value: pathOr(0, ['method', 'POST', 'requests'], statsContainer), trend: sampleTrend, total: totalRequests });
      this.dbdata.setWData('w3', { value: pathOr(0, ['method', 'PUT', 'requests'], statsContainer), total: totalRequests });
      this.dbdata.setWData('w4', { value: pathOr(0, ['method', 'DELETE', 'requests'], statsContainer), trend: sampleTrend, total: totalRequests });

      let allMethods = Object.keys(pathOr({}, ['method'], statsContainer));
      this.dbdata['w23'].data.labels = allMethods;
      this.dbdata['w23'].data.datasets[0].data = allMethods.map(x => statsContainer.method[x].requests);
      this.dbdata.touch('w23');

      this.dbdata['w24'].data.labels = allMethods;
      this.dbdata['w24'].data.datasets[0].data = allMethods.map(x => statsContainer.method[x].errors);
      this.dbdata.touch('w24');

      this.dbdata['w25'].data.labels = allMethods;
      this.dbdata['w25'].data.datasets[0].data = allMethods.map(x => statsContainer.method[x].apdex_score);
      this.dbdata.touch('w25');

      this.dbdata['w26'].data.labels = allMethods;
      this.dbdata['w26'].data.datasets[0].data = allMethods.map(x => statsContainer.method[x].req_rate);
      this.dbdata.touch('w26');

      this.dbdata['w27'].data.labels = allMethods;
      this.dbdata['w27'].data.datasets[0].data = allMethods.map(x => statsContainer.method[x].err_rate);
      this.dbdata.touch('w27');

      this.dbdata['w28'].data.labels = allMethods;
      this.dbdata['w28'].data.datasets[0].data = allMethods.map(x => statsContainer.method[x].avg_time);
      this.dbdata.touch('w28');
    }
  }
};
</script>
