<template>
  <q-page class="ub-page">
    <div class="row items-center">
      <div class="col-md-12 q-ma-sm">
        <div class="text-h3">vue-good-table</div>
        <div class="text-subtitle1">
          <a href="https://xaksis.github.io/vue-good-table/" target="_blank">https://xaksis.github.io/vue-good-table/</a>
        </div>
      </div>
    </div>
    <div class="row items-center">
      <div class="col-md-12 q-ma-sm">
        <div class="text-h5">Simple table</div>
      </div>
    </div>
    <div style="padding: 4px;margin-bottom: 20px;margin-top: 10px;">
      <vue-good-table :columns="columnsRequests" :rows="rowsRequests" :theme="vgtTheme" styleClass="vgt-table condensed bordered striped sws-table">
      </vue-good-table>
    </div>
    <div class="row items-center">
      <div class="col-md-12 q-ma-sm">
        <div class="text-h5">Advanced table</div>
        <div class="text-subtitle1">
          Search, pagination
        </div>
      </div>
    </div>
    <div style="padding: 4px;">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :theme="vgtTheme"
        styleClass="vgt-table condensed bordered striped sws-table"
        :search-options="{
          enabled: true,
          skipDiacritics: true
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 30,
          perPageDropdown: [10, 20, 30, 50, 80, 100],
          dropdownAllowAll: true
        }"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'expand'">
            <!--<q-btn flat round color="secondary" icon="play_arrow" size="xs" @click="handleShow(props.row.originalIndex)" />-->
          </span>
          <span v-else-if="props.column.field == 'method'">
            <router-link :to="{ path: 'apiop' }">{{ props.row.method }}</router-link>
          </span>
          <span v-else-if="props.column.field == 'path'">
            <router-link :to="{ path: 'apiop' }">{{ props.row.path }}</router-link>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>
  </q-page>
</template>

<script>
import pathOr from 'ramda/src/pathOr';
import { vgtMethods } from '../mixins/vgtmethods';
import { mapState } from 'vuex';
import utils from '../utils.js';

// File '../data/api.json' contains example data for the table
import dashboardData from '../data/api.json';
import requestsData from '../data/requests.json';

export default {
  name: 'VGT',
  components: {},
  mixins: [vgtMethods],
  data() {
    return {
      timer: null,
      isDark: false,
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
      rows: []
    };
  },
  computed: {
    ...mapState({
      dark: state => state.layout.dark
    }),
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
      this.updateStats();
    },
    updateStats: function() {
      // Update tables
      this.rowsRequests = utils.getMethodStatsArray(requestsData);
      this.rows = utils.getApiStatsArray(dashboardData);
    }
  }
};
</script>
