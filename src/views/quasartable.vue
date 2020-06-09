<template>
  <q-page class="ub-page">
    <div class="row items-center">
      <div class="col-md-12 q-ma-sm">
        <div class="text-h3">Quasar Tables</div>
        <div class="text-subtitle1">
          <a href="https://quasar.dev/vue-components/table" target="_blank">https://quasar.dev/vue-components/table</a>
        </div>
      </div>
    </div>
    <div class="row items-center">
      <div class="col-md-6 col-sm-6 col-xs-12 q-pa-sm">
        <div class="text-h5">Simple table</div>
        <p-table :obj="pTableData" style="height: 400px;"></p-table>
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12 q-pa-sm">
        <div class="text-h5">Filtering, Row Selection, Sorting</div>
        <i-table
          :items="iTableItems"
          :selected-items.sync="selectedItems"
          :highlighted-item.sync="highlightedItems"
          value-prop="name"
          active-prop="active"
          value-title="Name"
          selection="multiple"
          :selection-toggle="true"
          :show-data="true"
          data-prop="data"
          data-title="Value"
          style="height: 400px;"
        />
      </div>
    </div>
    <div class="row items-center" style="margin-top: 20px;">
      <div class="col-md-12 q-ma-sm">
        <div class="text-h5">Advanced Table: Filtering, Pagination, Sorting, Preview, Full Screen, Click on Row</div>
        <h-table :hits="hitsTableData" :display-fields="hitsDisplayFields" v-on:rowClick="onRowClick" />
      </div>
    </div>
    <q-dialog v-model="hitDetails">
      <q-card>
        <q-card-section>
          <div class="text-h6">Properties</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p-table :obj="selectedHit"></p-table>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import pathOr from 'ramda/src/pathOr';
import { vgtMethods } from '../mixins/vgtmethods';
import { mapState } from 'vuex';
import utils from '../utils.js';
import PTable from '../components/tables/ptable.vue';
import ITable from '../components/tables/itable.vue';
import HTable from '../components/tables/htable.vue';

// File '../data/api.json' contains example data for the table
import dashboardData from '../data/api.json';
import requestsData from '../data/requests.json';
import PTableData from '../data/ptabledata.json';
import ItemsTableData from '../data/itemstabledata.json';
import HitsData from '../data/hitsdata.json';

export default {
  name: 'QuasarTable',
  components: { PTable, ITable, HTable },
  mixins: [vgtMethods],
  data() {
    return {
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
  methods: {
    onRowClick: function(row) {
      this.selectedHit = row;
      this.hitDetails = true;
    }
  }
};
</script>
