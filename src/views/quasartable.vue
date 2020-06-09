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
        <div class="text-h5">Advanced Table: Pagination, Sorting, Preview, Full Screen</div>
        <hits-table :hits="hitsTableData" :display-fields="hitsDisplayFields" v-on:rowClick="onRowClick" />
      </div>
    </div>
  </q-page>
</template>

<script>
import pathOr from 'ramda/src/pathOr';
import { vgtMethods } from '../mixins/vgtmethods';
import { mapState } from 'vuex';
import utils from '../utils.js';
import PTable from '../components/tables/ptable.vue';
import ITable from '../components/tables/itable.vue';
import HitsTable from '../components/tables/hitstable.vue';

// File '../data/api.json' contains example data for the table
import dashboardData from '../data/api.json';
import requestsData from '../data/requests.json';
import PTableData from '../data/ptabledata.json';
import ItemsTableData from '../data/itemstabledata.json';
import HitsData from '../data/hitsdata.json';

export default {
  name: 'QuasarTable',
  components: { PTable, ITable, HitsTable },
  mixins: [vgtMethods],
  data() {
    return {
      timer: null,
      isDark: false,
      selectedItems: [],
      highlightedItems: null,
      pTableData: HitsData[0],
      columnsRequests: [
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
      rowsRequests: [],
      columns: [
        //{ label: '', field: 'expand', width: '1%', tdClass: 'text-center pointer' },
        { label: 'Method', field: 'method', tdClass: 'text-weight-bold' },
        { label: 'Path', field: 'path', tdClass: 'text-weight-bold' },
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
        { label: 'Avg Res Size', field: 'avg_res_clength', type: 'number', formatFn: this.formatToFixed0 },
        { label: 'Tags', field: 'tags', type: 'string' }
      ],
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
    ...mapState({
      dark: state => state.layout.dark
    }),
    vgtTheme: function() {
      return this.dark ? 'nocturnal' : 'default';
    },
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
    this.ready = true;
  },
  methods: {
    initialize: function() {
      this.updateStats();
    },
    updateStats: function() {
      // Update tables
      this.rowsRequests = utils.getMethodStatsArray(requestsData);
      this.rows = utils.getApiStatsArray(dashboardData);
    },
    onRowClick: function(row) {
      this.pTableData = row;
    }
  }
};
</script>
