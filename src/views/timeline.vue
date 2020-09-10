<template>
  <q-page class="ub-page">
    <div class="row items-center">
      <div class="col-md-12 q-ma-xs">
        <div class="text-h3">Timeline</div>
      </div>
    </div>
    <div class="row items-center">
      <div class="col-md-12 q-ma-xs">
        <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="dark"> </db-dashboard>
      </div>
    </div>
    <div class="row items-center">
      <div class="col-md-12 q-ma-sm">
        <h-table :hits="hitsTableData" :display-fields="hitsDisplayFields" :preview="true" v-on:rowClick="onRowClick" />
      </div>
    </div>
    <q-dialog v-model="hitDetails" position="right" seamless>
      <q-card style="width: 800px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Visits Analysis</div>
        </q-card-section>

        <db-dashboard :dbspec="dbspecAnalysis" :dbdata="dbdata" :dark="dark" style="width: 800px;"> </db-dashboard>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { vgtMethods } from '../mixins/vgtmethods';
import HTable from '../components/tables/htable.vue';
import { demodashboard } from '../mixins/demodashboard';
import PTableData from '../data/ptabledata.json';
import ItemsTableData from '../data/itemstabledata.json';
import HitsData from '../data/hitsdata.json';
import { DbData } from 'dashblocks';

export default {
  name: 'QuasarTable',
  components: { HTable },
  mixins: [demodashboard],
  data() {
    return {
      dbdata: new DbData(),
      dbspec: {
        layout: {
          type: 'grid'
        },
        colorScheme: 'default',
        widgets: [
          {
            id: 'w2',
            type: 'DbDygraphsBar',
            cspan: 16,
            height: 250,
            properties: {
              options: {
                stackedGraph: true,
                title: 'Traffic over time',
                ylabel: 'Visits, Mil.',
                labels: ['Date', 'Organic', 'Search', 'Social', 'Ads'],
                legend: 'always'
              }
            }
          }
        ]
      },
      dbspecAnalysis: {
        layout: {
          type: 'grid'
        },
        colorScheme: 'Diverging',
        widgets: [
          {
            id: 'wD',
            type: 'DbChartjsDoughnut',
            cspan: 8,
            height: 200
          },
          {
            id: 'wB',
            type: 'DbChartjsBar',
            cspan: 8,
            height: 200
          }
        ]
      },
      ready: false,
      timer: null,
      selectedItems: [],
      highlightedItems: null,
      pTableData: PTableData,
      selectedHit: null,
      hitDetails: false,
      hitsDisplayFields: {
        'api.query': ['api', 'query'],
        'http.response.code': ['http', 'response', 'code'],
        'http.response.phrase': ['http', 'response', 'phrase'],
        responsetime: ['responsetime'],
        'api.operationId': ['api', 'operationId']
      },
      rows: []
    };
  },
  computed: {
    iTableItems: function() {
      return ItemsTableData;
    },
    hitsTableData: function() {
      return HitsData;
    }
  },
  watch: {},
  mounted() {
    this.initialize();
  },
  methods: {
    onRowClick: function(row) {
      this.selectedHit = row;
      this.hitDetails = true;
    },
    initialize: function() {
      // Init dashboard color scheme from state
      this.dbspec.colorScheme = this.dashboardColorScheme;

      let totalReq = 0;
      let trendReq = [];
      let trendErr = [];
      let dthData2 = [];
      let sTS = Date.now() - 100 * 3600 * 1000;

      for (let i = 0; i < 100; i++) {
        let cTs = sTS + i * 3600 * 1000;
        let d = new Date(cTs);
        let r = Math.random();
        let e = Math.random();
        totalReq += Math.random() * 1000;
        trendReq.push(r + e);
        trendErr.push(e);

        // Make sure we can see all colors in 10-color palette
        /*
        let cStep = Math.floor(i/10);
        let dthEntry = [d,null,null,null,null,null,null,null,null,null,null];
        dthEntry[cStep+1] = r;
        dthEntry[cStep+2] = e;
        */
        let coeff = Math.abs(i - 50);
        coeff = coeff < 30 ? 30 : coeff;
        let ss = ((Math.sin(i / 3) + 3) * 8 - Math.random() * 3) * coeff;
        let se = ((Math.sin(i / 3) + 2) * 4 - Math.random() * 2) * coeff;
        let sa = ((Math.sin(i / 3) + 2.5) * 4 - Math.random() * 2.5) * coeff;
        let sb = ((Math.sin(i / 3) + 1.5) * 4 - Math.random() * 1.7) * coeff;

        dthData2.push([d, ss, se, sa, sb]);
      }

      this.dbdata.setWData('w2', {
        data: dthData2
      });

      this.dbdata.setWData('wD', {
        data: {
          labels: ['Central', 'East', 'South', 'West'],
          datasets: [{ data: [2000, 2000, 8000, 1000] }]
        }
      });

      this.dbdata.setWData('wB', {
        data: {
          labels: ['Furniture', 'Office Supplies', 'Technology'],
          datasets: [{ data: [2000, 1000, 8000] }]
        },
        options: {
          plugins: { labels: { render: () => {} } },
          legend: { display: false },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });

      this.ready = true;
    }
  }
};
</script>
