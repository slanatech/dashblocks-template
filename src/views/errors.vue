<template>
  <q-page class="ub-page">
    <div class="row items-center" style="margin-bottom: 10px;">
      <div class="col-md-12 q-ma-sm">
        <div class="text-h3">Errors Trend</div>
        <div class="text-subtitle1">
          Check out <a href="https://github.com/slanatech/swagger-stats" target="_blank">swagger-stats</a> project to see this dashboard in action
        </div>
      </div>
    </div>
    <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="dark"> </db-dashboard>
  </q-page>
</template>

<script>
import { DbData } from 'dashblocks';
import pathOr from 'ramda/src/pathOr';
import { mapState } from 'vuex';
import utils from '../utils.js';

// File '../data/errors.json' contains example dashboard data
import dashboardData from '../data/errors.json';
import { demodashboard } from '../mixins/demodashboard';

export default {
  name: 'Errors',
  mixins: [demodashboard],
  data() {
    return {
      timer: null,
      isDark: false,
      apiOpMethod: null,
      apiOpPath: null,
      dbdata: new DbData(),
      dbspec: {
        layout: {
          type: 'grid',
          size: 12
        },
        colorScheme: 'default',
        // prettier-ignore
        widgets: [
          {
            id: 'w1',
            type: 'DbDygraphsBar',
            cspan: 12,
            height: 250,
            properties: {
              options: {
                stackedGraph: true,
                ylabel: 'Errors',
                labels: ['Date', 'Client Error','Server Error'],
                legend: 'always'
              }
            }
          },

          { id: 'wR', type: 'DbNumber', cspan: 2, properties: { title: 'Requests', subtitle: 'Total requests received', icon: 'fa fa-signal' } },
          { id: 'wE', type: 'DbNumber', cspan: 2, properties: { title: 'Errors', subtitle: 'Total Error Responses' } },

          {
            id: 'w21',
            type: 'DbChartjsHorizontalBar',
            cspan: 4,
            rspan: 3,
            height: 300,
            properties: {
              options: {
                title: {display: true, text: 'Top Not Found (404)', position: 'top'},
                legend: { display: false }
              }
            }
          },
          {
            id: 'w22',
            type: 'DbChartjsHorizontalBar',
            cspan: 4,
            rspan: 3,
            height: 300,
            properties: {
              options: {
                title: {display: true, text: 'Top Server Error (500)', position: 'top'},
                legend: { display: false }
              }
            }
          },
          { id: 'wE4', type: 'DbNumber', cspan: 2, properties: { title: '4XX', subtitle: 'Client Error Responses' } },
          { id: 'wE5', type: 'DbNumber', cspan: 2, properties: { title: '5XX', subtitle: 'Server Error Responses' } },
          {
            id: 'w20',
            type: 'DbChartjsDoughnut',
            cspan: 4,
            height: 300,
            properties: {
              options: {
                title: {display: true, text: 'Error Codes', position: 'top'},
                legend: { position: 'right' }
              }
            }
          },
          {
            id: 'w29',
            type: 'QTable',
            cspan: 6,
            properties: {
              title: "Top Not Found (404)",
              "hide-bottom": false,
              color: 'primary',
              dense: true,
              flat: true,
              columns: [
                { name: 'path', label: 'Path', classes: 'text-bold', required: true, align: 'left',field: row => row.k,format: val => `${val}`,sortable: true },
                { name: 'count', label: 'Count', classes: 'text-bold text-negative', required: false, align: 'left',field: row => row.v,format: val => `${val}`,sortable: true },
              ]
            }
          },

          {
            id: 'w30',
            type: 'QTable',
            cspan: 6,
            properties: {
              title: "Top Server Error (500)",
              "hide-bottom": false,
              dense: true,
              flat: true,
              columns: [
                { name: 'path', label: 'Path', classes: 'text-bold', required: true, align: 'left',field: row => row.k,format: val => `${val}`,sortable: true },
                { name: 'count', label: 'Count', classes: 'text-bold text-negative', required: false, align: 'left',field: row => row.v,format: val => `${val}`,sortable: true },
              ]
            }
          },

        ]
      },
      ready: false
    };
  },
  computed: {
    ...mapState({
      dark: state => state.layout.dark
    })
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

      this.dbdata.setWData('w1', { data: [] });

      this.dbdata.setWData('wR', { value: 0, trend: [] });
      this.dbdata.setWData('wE', { value: 0, trend: [] });
      this.dbdata.setWData('wE4', { value: 0, trend: [] });
      this.dbdata.setWData('wE5', { value: 0, trend: [] });

      this.dbdata.setWData('w20', { data: { labels: [], datasets: [{ data: [] }] } });
      this.dbdata.setWData('w21', { data: { labels: [], datasets: [{ data: [] }] } });
      this.dbdata.setWData('w22', { data: { labels: [], datasets: [{ data: [] }] } });

      this.dbdata.setWData('w29', { data: [] });
      this.dbdata.setWData('w30', { data: [] });

      this.updateStats();
    },

    updateStats: function() {
      let dthData = [];
      let trendsData = [[], [], [], []];
      let statsContainer = dashboardData;
      let timelineSorted = utils.getSortedTimeline(statsContainer);
      for (let entry of timelineSorted) {
        dthData.push([new Date(entry.ts), pathOr(0, ['stats', 'client_error'], entry), pathOr(0, ['stats', 'server_error'], entry)]);
        trendsData[0].push(pathOr(0, ['stats', 'requests'], entry));
        trendsData[1].push(pathOr(0, ['stats', 'errors'], entry));
        trendsData[2].push(pathOr(0, ['stats', 'client_error'], entry));
        trendsData[3].push(pathOr(0, ['stats', 'server_error'], entry));
      }
      this.dbdata.setWData('w1', { data: dthData });

      let requestsTotal = pathOr(0, ['all', 'requests'], statsContainer);
      let reqTrendMax = Math.max(...trendsData[0]);
      this.dbdata.setWData('wR', { value: requestsTotal, trend: trendsData[0] });
      this.dbdata.setWData('wE', { value: pathOr(0, ['all', 'errors'], statsContainer), trend: trendsData[1], trendMax: reqTrendMax, total: requestsTotal });
      this.dbdata.setWData('wE4', {
        value: pathOr(0, ['all', 'client_error'], statsContainer),
        trend: trendsData[2],
        trendMax: reqTrendMax,
        total: requestsTotal
      });
      this.dbdata.setWData('wE5', {
        value: pathOr(0, ['all', 'server_error'], statsContainer),
        trend: trendsData[3],
        trendMax: reqTrendMax,
        total: requestsTotal
      });

      let errorsData = pathOr(null, ['errors'], statsContainer);
      if (!errorsData) {
        return;
      }

      let codesData = utils.getKVObjSortedArray(pathOr({}, ['statuscode'], errorsData), false);
      this.dbdata['w20'].data.labels = codesData.map(x => x.k);
      this.dbdata['w20'].data.datasets[0].data = codesData.map(x => x.v);
      this.dbdata.touch('w20');

      let topNotFound = utils.getKVObjSortedArray(pathOr({}, ['topnotfound'], errorsData), false);
      this.dbdata['w21'].data.labels = topNotFound.map(x => x.k);
      this.dbdata['w21'].data.datasets[0].data = topNotFound.map(x => x.v);
      this.dbdata.touch('w21');

      let topServerError = utils.getKVObjSortedArray(pathOr({}, ['topservererror'], errorsData), false);
      this.dbdata['w22'].data.labels = topServerError.map(x => x.k);
      this.dbdata['w22'].data.datasets[0].data = topServerError.map(x => x.v);
      this.dbdata.touch('w22');

      this.dbdata['w29'].data = topNotFound;
      this.dbdata.touch('w29');

      this.dbdata['w30'].data = topServerError;
      this.dbdata.touch('w30');
    }
  }
};
</script>
