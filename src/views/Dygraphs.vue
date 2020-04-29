<template>
  <q-page class="ub-page">
    <div class="row items-center">
      <div class="col-md-12 q-ma-sm">
        <div class="text-h3">Dygraphs Showcase</div>
      </div>
    </div>
    <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="dark"> </db-dashboard>
    <div class="row items-center">
      <div class="col-md-12 q-ma-sm"></div>
    </div>
  </q-page>
</template>

<script>
import { DbData, DbColors } from 'dashblocks';
import { demodashboard } from '../mixins/demodashboard';

export default {
  name: 'Dygraphs',
  mixins: [demodashboard],
  data() {
    return {
      cntr: 101,
      sTS: null,
      refreshIntervalId: null,
      dbdata: new DbData(),
      dbspec: {
        layout: {
          type: 'grid'
        },
        colorScheme: 'default',
        widgets: [
          {
            id: 'w1',
            type: 'DbDygraphsBar',
            cspan: 16,
            height: 250,
            properties: {
              options: {
                title: 'Bar Chart',
                ylabel: 'Count',
                labels: ['Date', 'Success', 'Error'],
                stackedGraph: true
              }
            }
          },
          {
            id: 'w2',
            type: 'DbDygraphsLine',
            cspan: 16,
            height: 250,
            properties: {
              options: {
                stackedGraph: false,
                title: 'Timeline with Real Time updates',
                ylabel: 'Request Rate',
                labels: ['Date', 'Success', 'Error'],
                legend: 'always'
              }
            }
          },
          {
            id: 'w3',
            type: 'DbDygraphsLine',
            cspan: 16,
            height: 250,
            properties: {
              options: {
                title: 'Random value Chart',
                ylabel: 'Probability',
                stackedGraph: false
              }
            }
          }
        ]
      },
      ready: false
    };
  },
  mounted() {
    this.initialize();
    this.ready = true;
  },
  beforeDestroy: function() {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
    }
  },
  methods: {
    initialize: function() {
      // Init dashboard color scheme from state
      this.dbspec.colorScheme = this.dashboardColorScheme;

      let dthData = [];
      let dthData2 = [];
      let dthData3 = [];
      this.sTS = Date.now() - 100 * 3600 * 1000;
      let sTS = this.sTS;

      for (let i = 0; i < 100; i++) {
        let cTs = sTS + i * 3600 * 1000;
        let d = new Date(cTs);
        let r = Math.random();
        dthData.push([d, r, r + 0.5]);
        dthData2.push([d, Math.random(), Math.random()]);
        dthData3.push(Math.random());
      }

      this.dbdata.setWData('w1', {
        data: dthData
      });

      this.dbdata.setWData('w2', {
        data: dthData2
      });

      this.dbdata.setWData('w3', {
        data: dthData3
      });

      // Dynamic updates
      this.refreshIntervalId = setInterval(() => {
        this.performRefresh();
      }, 1000);
    },

    performRefresh() {
      let newData3 = [];
      for (let i = 0; i < 100; i++) {
        newData3.push(Math.random());
      }
      this.dbdata.setWData('w3', {
        data: newData3
      });

      // Add new value to second chart
      let x = new Date(this.sTS + this.cntr * 3600 * 1000);
      this.cntr++;
      this.dbdata['w2'].data.shift();
      this.dbdata['w2'].data.push([x, Math.random(), Math.random()]);
      this.dbdata.touch('w2');
    }
  }
};
</script>
