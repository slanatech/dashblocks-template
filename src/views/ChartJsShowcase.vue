<template>
  <q-page class="ub-page">
    <div class="row items-center">
      <div class="col-md-12 q-ma-sm">
        <div class="text-h3">Chart.js Showcase</div>
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
  name: 'ChartJsShowcase',
  components: {},
  mixins: [demodashboard],
  data() {
    return {
      ready: false,
      refreshIntervalId: null,
      dbdata: new DbData(),
      dbspec: {
        layout: {
          type: 'grid'
        },
        colorScheme: 'default',
        widgets: [
          {
            id: 'wTrend',
            type: 'DbChartjsLine',
            cspan: 16,
            height: 250,
            properties: {
              options: {
                elements: { point: { radius: 0 } },
                animation: { duration: 0 },
                responsive: true,
                scales: {
                  xAxes: [{ type: 'time', display: true, time: { unit: 'second' } }],
                  yAxes: [{ display: true, ticks: { beginAtZero: true, min: 0, max: 1000 } }]
                }
              }
            }
          },
          {
            id: 'w1',
            type: 'DbChartjsLine',
            cspan: 4,
            height: 250,
            properties: {
              options: {
                maintainAspectRatio: false
              }
            }
          },
          {
            id: 'w2',
            type: 'DbChartjsBar',
            cspan: 4,
            height: 250
          },
          {
            id: 'w3',
            type: 'DbChartjsHorizontalBar',
            cspan: 4
          },
          {
            id: 'w4',
            type: 'DbChartjsPie',
            cspan: 4
          },
          {
            id: 'w5',
            type: 'DbChartjsDoughnut',
            cspan: 4,
            height: 250
          },
          {
            id: 'w6',
            type: 'DbChartjsPolarArea',
            cspan: 4,
            height: 250
          },
          {
            id: 'w7',
            type: 'DbChartjsRadar',
            cspan: 4,
            height: 250
          },
          {
            id: 'w8',
            type: 'DbChartjsBar',
            cspan: 4,
            height: 250
          },
          {
            id: 'w9',
            type: 'DbChartjsBubble',
            cspan: 8,
            height: 300
          },
          {
            id: 'w10',
            type: 'DbChartjsScatter',
            cspan: 8,
            height: 300,
            properties: {
              options: {
                scales: {
                  xAxes: [
                    {
                      type: 'linear',
                      position: 'bottom'
                    }
                  ]
                }
              }
            }
          }
        ]
      }
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

      let dataTrend = {
        datasets: [
          {
            label: 'Number of Requests',
            data: []
          }
        ]
      };

      let dts = Date.now() - 100 * 1000;
      for (let i = 0; i < 100; i++) {
        dataTrend.datasets[0].data.push({
          t: new Date(dts),
          y: this.getRandomInt(100, 1000)
        });
        dts += 1000;
      }

      let dataOneSeries = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            data: [10, 20, 30, 100]
          }
        ]
      };

      let dataTwoSeries = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            data: [10, 20, 30, 100]
          },
          {
            label: 'Data Two',
            data: [50, 10, 70, 11]
          }
        ]
      };

      let dataBubbleTwoSeries = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            data: [
              { x: 10, y: 20, r: 10 },
              { x: 20, y: 20, r: 20 },
              { x: 30, y: 30, r: 30 },
              { x: 100, y: 200, r: 100 }
            ]
          },
          {
            label: 'Data Two',
            data: [
              { x: 30, y: 50, r: 50 },
              { x: 60, y: 60, r: 60 },
              { x: 80, y: 70, r: 70 },
              { x: 100, y: 200, r: 10 }
            ]
          }
        ]
      };

      let dataScatterTwoSeries = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            data: [
              { x: 10, y: 20 },
              { x: 20, y: 20 },
              { x: 30, y: 30 },
              { x: 100, y: 200 }
            ]
          },
          {
            label: 'Data Two',
            data: [
              { x: 30, y: 50 },
              { x: 60, y: 60 },
              { x: 80, y: 70 },
              { x: 100, y: 200 }
            ]
          }
        ]
      };

      let d1 = JSON.parse(JSON.stringify(dataTwoSeries));
      let d2 = JSON.parse(JSON.stringify(dataOneSeries));
      let d3 = JSON.parse(JSON.stringify(dataTwoSeries));
      let d4 = JSON.parse(JSON.stringify(dataOneSeries));
      let d5 = JSON.parse(JSON.stringify(dataTwoSeries));
      let d6 = JSON.parse(JSON.stringify(dataOneSeries));
      let d7 = JSON.parse(JSON.stringify(dataTwoSeries));
      let d8 = JSON.parse(JSON.stringify(dataTwoSeries));
      let d9 = JSON.parse(JSON.stringify(dataBubbleTwoSeries));
      let d10 = JSON.parse(JSON.stringify(dataScatterTwoSeries));

      this.dbdata.setWData('w1', { data: d1 });
      this.dbdata.setWData('w2', { data: d2 });
      this.dbdata.setWData('w3', { data: d3 });
      this.dbdata.setWData('w4', { data: d4 });
      this.dbdata.setWData('w5', { data: d5 });
      this.dbdata.setWData('w6', { data: d6 });
      this.dbdata.setWData('w7', { data: d7 });
      this.dbdata.setWData('w8', { data: d8 });
      this.dbdata.setWData('w9', { data: d9 });
      this.dbdata.setWData('w10', { data: d10 });

      this.dbdata.setWData('wTrend', { data: dataTrend });

      // Dynamic updates
      this.refreshIntervalId = setInterval(() => {
        this.performRefresh();
      }, 1000);
    },

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },

    performRefresh() {
      console.log('Refreshing charts ... ');
      let v = this.dbdata['w2'].data.datasets[0].data[0];
      this.dbdata['w2'].data.datasets[0].data[0] = v + 10;
      // We can add dynamically any prop to dataset entry ...
      //comp.dbdata['w2'].data.datasets[0].borderWidth = bw++;
      this.dbdata.touch('w2');

      // Update (shift) trend timeline
      this.dbdata['wTrend'].data.datasets[0].data.shift();
      this.dbdata['wTrend'].data.datasets[0].data.push({
        t: new Date(),
        y: this.getRandomInt(100, 1000)
      });
      this.dbdata.touch('wTrend');
    }
  }
};
</script>
