<template>
  <q-page class="ub-page">
    <div class="row items-center" style="margin-bottom: 10px;">
      <div class="col-md-12 q-ma-sm">
        <div class="text-h3">{{ apiOpMethod }} {{ apiOpPath }}</div>
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
import { demodashboard } from '../mixins/demodashboard';
import pathOr from 'ramda/src/pathOr';
import { mapState } from 'vuex';
import utils from '../utils.js';

// File '../data/apioperation.json' contains example dashboard data
import dashboardData from '../data/apioperation.json';

export default {
  name: 'ApiOperation',
  mixins: [demodashboard],
  data() {
    return {
      timer: null,
      apiOpMethod: null,
      apiOpPath: null,
      allOptions: null,
      options: ['None'],
      selection: null,
      dbdata: new DbData(),
      dbspec: {
        layout: {
          type: 'grid',
          size: 12
        },
        colorScheme: 'default',
        // prettier-ignore
        widgets: [
          { id: 'w1', height: 100, type: 'DbNumber', cspan: 2, properties: { title: 'Requests', subtitle: 'Total requests received', icon: 'fa fa-signal' } },
          { id: 'w2', type: 'DbNumber', cspan: 2, properties: {
            title: 'Apdex Score', subtitle: 'Overall Apdex Score', total: 1, trendMax: 1, format: '%.2f',
            percentRanges: [
              { value: 50, color: 'red'},
              { value: 60, color: 'orange'},
              { value: 100, color: 'green'},
            ]}
          },
          { id: 'w3', type: 'DbNumber', cspan: 2, properties: { title: 'Req Rate', subtitle: 'Requests per second', format: '%.2f', icon: 'fa fa-exchange-alt' } },
          { id: 'w4', type: 'DbNumber', cspan: 2, properties: { title: 'Err Rate', subtitle: 'Errors per second', format: '%.2f', icon: 'fa fa-exclamation' } },
          { id: 'w5', type: 'DbNumber', cspan: 2, properties: { title: 'Avg HT', subtitle: 'Average Handle Time', format: '%.0f %s', icon:'fa fa-hourglass', qualifier: 'ms' } },
          { id: 'w6', type: 'DbNumber', cspan: 2, properties: { title: 'Avg Req Payload', subtitle: 'Avg Req Content Len', format: '%.2f %s', icon: 'fa fa-sd-card' } },

          { id: 'w7', height: 100, type: 'DbNumber', cspan: 2, properties: { title: 'Errors', subtitle: 'Total Error Responses' } },
          { id: 'w8', type: 'DbNumber', cspan: 2, properties: {
            title: '2XX', subtitle: 'Success Responses',
            percentRanges: [
              { value: 50, color: 'red'},
              { value: 70, color: 'orange'},
              { value: 100, color: 'green'}
            ]}
          },
          { id: 'w9', type: 'DbNumber', cspan: 2, properties: { title: '3XX', subtitle: 'Redirect Responses' } },
          { id: 'w10', type: 'DbNumber', cspan: 2, properties: { title: '4XX', subtitle: 'Client Error Responses' } },
          { id: 'w11', type: 'DbNumber', cspan: 2, properties: { title: '5XX', subtitle: 'Server Error Responses' } },
          { id: 'w12', type: 'DbNumber', cspan: 2, properties: { title: 'Avg Res Payload', subtitle: 'Avg Res Content Len', format: '%.2f %s', icon: 'fa fa-sd-card' } },
          // TODO
          {
            id: 'w25',
            type: 'DbChartjsBar',
            cspan: 4,
            height: 300,
            properties: {
              options: {
                title: { display: true, text: 'Handle Time Histogram', position: 'top'},
                legend: { display: false },
                plugins: { labels: {render: ()=>{}}},
                scales: { xAxes: [{ ticks: {autoSkip: false,maxRotation: 50,minRotation: 50}}]}
              }
            }
          },
          {
            id: 'w26',
            type: 'DbChartjsBar',
            cspan: 4,
            height: 300,
            properties: {
              options: {
                title: { display: true, text: 'Request Size Histogram', position: 'top'},
                legend: { display: false },
                plugins: { labels: {render: ()=>{}}},
                scales: { xAxes: [{ ticks: {autoSkip: false,maxRotation: 50,minRotation: 50}}]}
              }
            }
          },
          {
            id: 'w27',
            type: 'DbChartjsBar',
            cspan: 4,
            height: 300,
            properties: {
              options: {
                title: { display: true, text: 'Response Size Histogram', position: 'top'},
                legend: { display: false },
                plugins: { labels: {render: ()=>{}}},
                scales: { xAxes: [{ ticks: {autoSkip: false,maxRotation: 50,minRotation: 50}}]}
              }
            }
          },

          {
            id: 'w28',
            type: 'DbChartjsDoughnut',
            cspan: 4,
            height: 250,
            properties: {
              options: {
                title: {display: true, text: 'Response Codes', position: 'top'},
                legend: { position: 'right' }
              }
            }
          },

          {
            id: 'w29',
            type: 'QTable',
            cspan: 8,
            height: 250,
            properties: {
              title: "Parameters",
              "hide-bottom": true,
              dense: true,
              flat: true,
              columns: [
                { name: 'name', label: 'Name', classes: 'text-bold', required: true, align: 'left',field: row => row.name,format: val => `${val}`,sortable: true },
                { name: 'in', label: 'In', required: false, align: 'left',field: row => row.in,format: val => `${val}`,sortable: true },
                { name: 'description', label: 'Description', required: false, align: 'left',field: row => row.description,format: val => `${val}`,sortable: true },
                { name: 'hits', label: 'Hits', required: false, align: 'left',field: row => row.hits, format: val => `${val}`,sortable: true },
                { name: 'misses', label: 'Misses', required: false, align: 'left',field: row => row.misses, format: val => `${val}`,sortable: true },
                { name: 'required', label: 'Required', required: false, align: 'left',field: row => row.required, format: val => `${val}`,sortable: true }
              ]
            }
          },

        ]
      },
      ready: false
    };
  },
  mounted() {
    this.apiOpMethod = 'POST';
    this.apiOpPath = '/v2/pet/{petId}/uploadImage';
    this.initialize();
    this.ready = true;
  },
  methods: {
    initialize: function() {
      // Init dashboard color scheme from state
      this.dbspec.colorScheme = this.dashboardColorScheme;

      // Init dashboard data
      this.dbdata.setWData('w1', { value: 0 });
      this.dbdata.setWData('w2', { value: 0 });
      this.dbdata.setWData('w3', { value: 0 });
      this.dbdata.setWData('w4', { value: 0 });
      this.dbdata.setWData('w5', { value: 0 });
      this.dbdata.setWData('w6', { value: 0, qualifier: '' });
      this.dbdata.setWData('w7', { value: 0 });
      this.dbdata.setWData('w8', { value: 0 });
      this.dbdata.setWData('w9', { value: 0 });
      this.dbdata.setWData('w10', { value: 0 });
      this.dbdata.setWData('w11', { value: 0 });
      this.dbdata.setWData('w12', { value: 0 });

      this.dbdata.setWData('w25', { data: { labels: [], datasets: [{ data: [] }] } });
      this.dbdata.setWData('w26', { data: { labels: [], datasets: [{ data: [] }] } });
      this.dbdata.setWData('w27', { data: { labels: [], datasets: [{ data: [] }] } });
      this.dbdata.setWData('w28', { data: { labels: [], datasets: [{ data: [] }] } });

      this.dbdata.setWData('w29', { data: [] });

      this.updateStats();
    },

    updateStats: function() {
      let statsContainer = dashboardData;

      // Update dashboard
      let apiOpData = pathOr(null, ['apiop', this.apiOpPath, this.apiOpMethod], statsContainer);
      if (!apiOpData) {
        return;
      }
      let apiOpDefs = apiOpData.defs || null;
      let apiOpStats = apiOpData.stats || null;
      let apiOpDetails = apiOpData.details || null;

      // prettier-ignore
      let sampleTrend = [7,2,8,4,12,3,5,1,8,4,5,3,5,6,4,4,5,6,4,5,7,10,6,3,9,4,3,6,5,2,7,7,5,5,6,4,3,6,5,3,8,5,5,3,4,5,5,6,6,9,6,6,4,4,8,4,6,9,2,2,2];

      // prettier-ignore
      let apdexTrend = [0.9300832760038666,1.0991677037956888,1.5080733457452664,1.3017662086082953,0.8890979720871215,0.4299388782038658,1.2551497150509354,0.23328255526432873,1.3387578474936919,1.171484610292452,0.985009282390267,1.0972377567501495,1.1822818049445254,0.8216714354136625,0.7139942536635027,0.8524687819377466,0.8957148380635005,1.1791814826194928,0.8734830240640146,0.9373469394290042,0.9557698278513647,1.4338030279355496,1.6945503099423056,1.0435720923655443,1.421588191380935,1.200819983771061,0.25215721191799845,1.3870136577370393,1.1908659885154032,1.5075289911853935,1.398961736351431,1.5701949598995892,1.5406273027924196,0.5802998545050828,0.6718385922714454,1.1469110028022182,0.15772654442718248,1.0710489171273412,0.6907529656071347,1.1008530764033106,1.4366887183599992,0.4768850141039438,1.173959589956373,1.0656065739930713,0.7673044093061918,1.0307239951905622,0.3389022896740752,0.7170379737319517,1.3280924166724772,1.4362652694169207,0.99480786481041,1.4749906786443086,1.672799161196809,1.3533326728513753,0.7592205064106363,1.3511484645046492,0.9690981721689824,0.6148193945887903,0.9807964538273457,1.4229670856883982,1.04916522637735,1.643663308035937,0.47127772164461934,1.1659482229412916,1.255207088739469,0.6503494842079585,1.225824270860796,1.2686921478701063,1.3723389298800022,1.5636843626586703,1.3438985095335851,0.4431949663089141,1.279286387788352,0.7221967036515011,1.3572232285149108,1.089192293820332,1.2283151775422434,0.49938987010220326,0.9763521342726027,0.8244399534970988,0.3590773154814164,0.6112738998035447,0.5111310045686335,0.8857134245247529,1.5018364701672247,1.2629188884006528,0.4314090545795555,0.5521635244069991,1.3682280844985946,0.9557652913910848,0.8733058045080244,1.3399954244411356,1.5940507530992278,1.31354526181789,1.1690908850349404,0.533466159469911,0.5448203973516248,0.9254749056863463,1.0610640413995536,1.73656132513935];

      let requestsTotal = pathOr(0, ['requests'], apiOpStats);
      this.dbdata.setWData('w1', { value: requestsTotal, trend: sampleTrend });
      this.dbdata.setWData('w2', { value: pathOr(0, ['apdex_score'], apiOpStats), trend: apdexTrend });
      this.dbdata.setWData('w3', { value: pathOr(0, ['req_rate'], apiOpStats), trend: sampleTrend });
      this.dbdata.setWData('w4', { value: pathOr(0, ['err_rate'], apiOpStats), trend: sampleTrend });
      this.dbdata.setWData('w5', { value: pathOr(0, ['avg_time'], apiOpStats), trend: sampleTrend, trendMax: 100 });
      let { value, qualifier } = utils.formatBytes(pathOr(0, ['avg_req_clength'], apiOpStats), 2);
      this.dbdata.setWData('w6', { value: value, qualifier: qualifier, trend: sampleTrend, trendMax: 80 });

      this.dbdata.setWData('w7', { value: pathOr(0, ['errors'], apiOpStats), total: requestsTotal, trend: sampleTrend });
      this.dbdata.setWData('w8', { value: pathOr(0, ['success'], apiOpStats), total: requestsTotal, trend: sampleTrend });
      this.dbdata.setWData('w9', { value: pathOr(0, ['redirect'], apiOpStats), total: requestsTotal });
      this.dbdata.setWData('w10', { value: pathOr(0, ['client_error'], apiOpStats), total: requestsTotal, trend: sampleTrend });
      this.dbdata.setWData('w11', { value: pathOr(0, ['server_error'], apiOpStats), total: requestsTotal, trend: sampleTrend });
      ({ value, qualifier } = utils.formatBytes(pathOr(0, ['avg_res_clength'], apiOpStats), 2));
      this.dbdata.setWData('w12', { value: value, qualifier: qualifier, trend: sampleTrend, trendMax: 30 });

      this.dbdata['w25'].data.labels = utils.bucketsToLabels(pathOr([], ['duration', 'buckets'], apiOpDetails));
      this.dbdata['w25'].data.datasets[0].data = pathOr([], ['duration', 'values'], apiOpDetails);
      this.dbdata.touch('w25');

      this.dbdata['w26'].data.labels = utils.bucketsToLabels(pathOr([], ['req_size', 'buckets'], apiOpDetails));
      this.dbdata['w26'].data.datasets[0].data = pathOr([], ['req_size', 'values'], apiOpDetails);
      this.dbdata.touch('w26');

      this.dbdata['w27'].data.labels = utils.bucketsToLabels(pathOr([], ['res_size', 'buckets'], apiOpDetails));
      this.dbdata['w27'].data.datasets[0].data = pathOr([], ['res_size', 'values'], apiOpDetails);
      this.dbdata.touch('w27');

      let codes = Object.keys(pathOr({}, ['code'], apiOpDetails));
      this.dbdata['w28'].data.labels = codes;
      this.dbdata['w28'].data.datasets[0].data = codes.map(x => pathOr(0, ['code', x, 'count'], apiOpDetails));
      this.dbdata.touch('w28');

      let paramNames = Object.keys(pathOr({}, ['parameters'], apiOpDetails));
      this.dbdata['w29'].data = paramNames.map(x => pathOr(0, ['parameters', x], apiOpDetails));
      this.dbdata.touch('w29');
    }
  }
};
</script>
