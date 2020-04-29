<template>
  <q-page class="ub-page">
    <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="dark"> </db-dashboard>
  </q-page>
</template>

<script>
import { DbData, DbColors } from 'dashblocks';
import { demodashboard } from '../mixins/demodashboard';
import { mapState } from 'vuex';

export default {
  name: 'DashblocksShowcase',
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
                ylabel: 'Requests, Mil.',
                labels: ['Date', 'Success', 'Error'],
                legend: 'always'
              }
            }
          },

          { id: 'w51', type: 'DbNumber', cspan: 4, properties: { title: 'Requests', subtitle: 'Total requests received', icon: 'fa fa-signal' } },
          {
            id: 'w52',
            type: 'DbNumber',
            cspan: 4,
            properties: {
              title: 'Apdex Score',
              subtitle: 'Overall Apdex Score',
              total: 1,
              trendMax: 1,
              format: '%.2f',
              percentRanges: [
                { value: 50, color: 'red' },
                { value: 60, color: 'orange' },
                { value: 100, color: 'green' }
              ]
            }
          },
          {
            id: 'w53',
            type: 'DbNumber',
            cspan: 4,
            properties: { title: 'Current Req Rate', subtitle: 'Requests per second', format: '%.2f', icon: 'fa fa-exchange-alt' }
          },
          {
            id: 'w54',
            type: 'DbNumber',
            cspan: 4,
            properties: { title: 'Current Err Rate', subtitle: 'Errors per second', format: '%.2f', icon: 'fa fa-exclamation' }
          },

          {
            id: 'w8',
            type: 'DbEasyPie',
            cspan: 2,
            height: 120,
            properties: { barColor: '#2ca02c', lineWidth: 8 }
          },
          {
            id: 'w9',
            type: 'DbEasyPie',
            cspan: 2,
            height: 120,
            properties: { barColor: '#2ca02c', lineWidth: 8 }
          },
          {
            id: 'w10',
            type: 'DbEasyPie',
            cspan: 2,
            height: 120,
            properties: { barColor: '#ff7f0e', lineWidth: 8 }
          },
          {
            id: 'w11',
            type: 'DbEasyPie',
            cspan: 2,
            height: 120,
            properties: { barColor: '#ff7f0e', lineWidth: 8 }
          },
          {
            id: 'w12',
            type: 'DbEasyPie',
            cspan: 2,
            height: 120,
            properties: { barColor: '#2ca02c', lineWidth: 8 }
          },
          {
            id: 'w13',
            type: 'DbEasyPie',
            cspan: 2,
            height: 120,
            properties: { barColor: '#2ca02c', lineWidth: 8 }
          },
          {
            id: 'w14',
            type: 'DbEasyPie',
            cspan: 2,
            height: 120,
            properties: { barColor: '#d62728', lineWidth: 8 }
          },
          {
            id: 'w15',
            type: 'DbEasyPie',
            cspan: 2,
            height: 120,
            properties: { barColor: '#d62728', lineWidth: 8 }
          },
          {
            id: 'w3',
            type: 'DbChartjsPie',
            cspan: 4,
            height: 250
          },
          {
            id: 'w5',
            type: 'DbChartjsBubble',
            cspan: 8,
            rspan: 2
          },
          {
            id: 'w4',
            type: 'DbChartjsPie',
            cspan: 4,
            height: 250
          },
          {
            id: 'w6',
            type: 'DbChartjsHorizontalBar',
            cspan: 4,
            height: 250
          },
          {
            id: 'w7',
            type: 'DbChartjsBar',
            cspan: 4,
            height: 250
          }
        ]
      },
      ready: false
    };
  },
  mounted() {
    // Initialize dashboard data
    this.initialize();
    this.ready = true;
  },
  methods: {
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
        let ss = (Math.sin(i / 3) + 3) * 8 - Math.random() * 3;
        let se = (Math.sin(i / 3) + 2) * 4 - Math.random() * 2;

        dthData2.push([d, ss, se]);
      }

      this.dbdata.setWData('w2', {
        data: dthData2
      });

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

      this.dbdata.setWData('w3', {
        data: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              label: 'Data One',
              data: [10, 20, 30, 100]
            }
          ]
        }
      });

      this.dbdata.setWData('w4', {
        data: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              label: 'Data One',
              data: [50, 10, 67, 45]
            }
          ]
        }
      });

      let bubbleData = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: []
      };

      for (let j = 0; j < 10; j++) {
        bubbleData.datasets.push({
          label: `${j}`,
          data: []
        });
      }

      for (let i = 0; i < 10; i++) {
        for (let k = 0; k < 10; k++) {
          bubbleData.datasets[k].data.push({
            x: this.getRand(200),
            y: this.getRand(50),
            r: this.getRand(20)
          });
        }
      }

      this.dbdata.setWData('w5', {
        data: bubbleData
      });

      this.dbdata.setWData('w6', {
        data: JSON.parse(JSON.stringify(dataTwoSeries))
      });
      this.dbdata.setWData('w7', {
        data: JSON.parse(JSON.stringify(dataTwoSeries))
      });

      this.dbdata.setWData('w51', { value: totalReq, trend: trendReq });
      this.dbdata.setWData('w52', { value: 0.8, trend: trendReq });
      this.dbdata.setWData('w53', { value: 10, trend: trendReq });
      this.dbdata.setWData('w54', { value: 4, trend: trendErr });

      this.dbdata.setWData('w8', { value: 15 });
      this.dbdata.setWData('w9', { value: 35 });
      this.dbdata.setWData('w10', { value: 52 });
      this.dbdata.setWData('w11', { value: 64 });
      this.dbdata.setWData('w12', { value: 10 });
      this.dbdata.setWData('w13', { value: 25 });
      this.dbdata.setWData('w14', { value: 72 });
      this.dbdata.setWData('w15', { value: 84 });
    },
    getRand: function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }
};
</script>
