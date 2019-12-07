<template>
  <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark"> </db-dashboard>
</template>

<script>
import { DbData } from 'dashblocks';

export default {
  name: 'SampleDashboard',
  data() {
    return {
      isDark: false,
      dbdata: new DbData(),
      // Declare Dashboard Layout. Add widgets to your dashboard, specifying how many columns and rows
      // each widget takes. Dashblocks provides 16-columns CSS Grid layout.
      // Pass additional options to widgets to adjust appearance as needed.
      dbspec: {
        layout: {
          type: 'grid'
        },
        widgets: [
          {
            id: 'w1',
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
          {
            id: 'w2',
            type: 'DbChartjsPie',
            cspan: 4,
            height: 250
          },
          {
            id: 'w3',
            type: 'DbChartjsPie',
            cspan: 4,
            properties: {
              options: {
                legend: {
                  position: 'right'
                }
              }
            }
          },
          {
            id: 'w4',
            type: 'DbChartjsBar',
            cspan: 4
          },
          {
            id: 'w5',
            type: 'DbChartjsBar',
            cspan: 4
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
  methods: {
    initialize: function() {
      // Initialize dashboard data - set data for each dashboard widget
      // This is obviously a sample that generates random data
      // In real dashboards you would get data from database, backend APIs, vuex, etc
      let dthData = [];
      let sTS = Date.now() - 100 * 3600 * 1000;
      for (let i = 0; i < 100; i++) {
        dthData.push([new Date(sTS + i * 3600 * 1000), Math.random(), Math.random()]);
      }

      this.dbdata.setWData('w1', {
        data: dthData
      });

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

      this.dbdata.setWData('w2', {
        data: JSON.parse(JSON.stringify(dataOneSeries))
      });

      this.dbdata.setWData('w3', {
        data: JSON.parse(JSON.stringify(dataOneSeries))
      });

      this.dbdata.setWData('w4', {
        data: JSON.parse(JSON.stringify(dataOneSeries))
      });
      this.dbdata.setWData('w5', {
        data: JSON.parse(JSON.stringify(dataTwoSeries))
      });
    }
  }
};
</script>
