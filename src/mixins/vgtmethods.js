// Standard methods for views that use vue-good-table
export const vgtMethods = {
  methods: {
    formatToFixed2: function(value) {
      return value.toFixed(2);
    },
    formatToFixed0: function(value) {
      return value.toFixed(0);
    },
    tdClassErrors(row) {
      return row.errors > 0 ? 'sws-td-badge sws-td-badge-neg' : '';
    },
    tdClassErrRate(row) {
      return row.err_rate > 0 ? 'sws-td-badge sws-td-badge-neg' : '';
    },
    tdClassCErr(row) {
      return row.client_error > 0 ? 'sws-td-badge sws-td-badge-neg' : '';
    },
    tdClassSErr(row) {
      return row.server_error > 0 ? 'sws-td-badge sws-td-badge-neg' : '';
    },
    tdClassApdex(row) {
      return 'text-weight-bold ' + (row.apdex_score < 0.6 ? 'sws-td-badge sws-td-badge-warn' : '');
    }
  }
};
