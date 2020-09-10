<template>
  <q-table
    dense
    flat
    :data="hits"
    :columns="columnsList"
    :pagination.sync="pagination"
    :rows-per-page-options="[5, 10, 25, 50, 100]"
    :filter="filter"
    :filter-method="compositeFilterFn"
    row-key="name"
    separator="cell"
    class="ub-hits-table"
  >
    <template v-slot:top="props">
      <q-input v-model="filter" debounce="500" filled dense placeholder="Search" clearable class="col-md-4">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-space></q-space>
      <q-toggle v-model="showPreview">Show Preview</q-toggle>
      <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen" class="q-ml-md" size="md" />
    </template>

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props" class="ub-th">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <tr v-if="hasHitColumn" class="ub-hits-tr" @click="onRowClick(props.row)" @dblclick="onRowDblClick(props.row)">
        <td class="ub-hits-td-time">
          {{ formatTsColumn(props.row) }}
        </td>
        <td class="ub-hits-td-hit">
          <code class="ub-code" v-html="formatJsonColumn(props.row)"></code>
        </td>
      </tr>
      <tr v-else class="ub-hits-tr" @click="onRowClick(props.row)" @dblclick="onRowDblClick(props.row)">
        <td v-for="col in props.cols" :key="col.name">
          {{ formatColumn(col, props.row) }}
        </td>
      </tr>
    </template>
  </q-table>
</template>
<script>
import pathOr from 'ramda/src/pathOr';

// Specialized table to show collection of JSON documents
export default {
  name: 'HTable',
  props: {
    hits: {
      type: Array,
      default: () => []
    },
    tsPath: {
      type: Array,
      default: () => ['@timestamp']
    },
    tsLabel: {
      type: String,
      default: '@timestamp'
    },
    displayFields: {
      type: Object,
      default: () => {}
    },
    displayFieldsRemovePrefix: {
      type: String,
      default: null
    },
    page: {
      type: Number,
      default: 1
    },
    rowsPerPage: {
      type: Number,
      default: 5
    },
    sortBy: {
      type: String,
      default: ''
    },
    descending: {
      type: Boolean,
      default: true
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: this.rowsPerPage,
        sortBy: this.tsLabel,
        descending: true
      },
      tsColumn: {
        name: this.tsLabel,
        required: true,
        label: this.tsLabel,
        align: 'left',
        field: this.tsLabel,
        format: this.formatTsColumn,
        sortable: true,
        style: 'vertical-align: top;'
      },
      hitColumn: {
        name: 'hit',
        required: true,
        label: 'Hit',
        align: 'left',
        sortable: false
      },
      columns: [],
      items: [],
      allColumnsList: [],
      thStops: [25, 50, 100],
      thStopsWidth: [100, 140, 160],
      showPreview: this.preview,
      filter: ''
    };
  },
  computed: {
    hasHitColumn: function() {
      return this.showPreview; //return Object.keys(this.displayFields).length <= 0;
    },
    columnsList: function() {
      let allColumnsList = [this.tsColumn];
      if (this.hasHitColumn) {
        allColumnsList.push(this.hitColumn);
      } else {
        for (let dc of Object.keys(this.displayFields)) {
          let fn = dc;
          if (this.displayFieldsRemovePrefix && fn.startsWith(this.displayFieldsRemovePrefix)) {
            fn = fn.replace(this.displayFieldsRemovePrefix, '');
          }
          allColumnsList.push({
            name: fn,
            required: true,
            label: fn,
            field: dc,
            align: 'left',
            sortable: true
          });
        }
      }
      return allColumnsList;
    }
  },
  mounted: function() {},
  watch: {
    page: function(val) {
      this.pagination.page = val;
    },
    rowsPerPage: function(val) {
      this.pagination.rowsPerPage = val;
    },
    sortBy: function(val) {
      this.pagination.sortBy = val;
    },
    descending: function(val) {
      this.pagination.descending = val;
    }
  },
  methods: {
    getThStyle(col) {
      let len = col.label.length;
      let idx = this.thStops.findIndex(x => x > len);
      return idx !== -1 ? `min-width:${this.thStopsWidth[idx]}px;` : 'min-width:250px;';
    },

    formatColumn(col, row) {
      if (col.label === this.tsLabel) {
        return this.formatTsColumn(row);
      }
      let path = pathOr(null, [col.field], this.displayFields);
      if (!path) {
        return '';
      }
      return pathOr('', path, row);
    },

    formatTsColumn(row) {
      return pathOr(null, this.tsPath, row);
    },

    formatJsonColumn(row) {
      let code = JSON.stringify(row, (key, value) => {
        if (typeof value === 'string') {
          return `<span class='ub-v-s'>${value}</span>`;
        } else if (typeof value === 'number') {
          return `<span class='ub-v-n'>${value}</span>`;
        }
        return value;
      });
      return code;
    },

    onRowClick(row) {
      this.$emit('rowClick', row);
    },

    compositeFilterFn(rows, terms, cols, cellValue) {
      console.log(`compositeFilterFn: terms = ${JSON.stringify(terms)}`);
      let filteredRows = rows;
      if (terms && terms !== '') {
        const lowerTerms = terms.toLowerCase();
        filteredRows = rows.filter(
          row =>
            JSON.stringify(row)
              .toLowerCase()
              .indexOf(lowerTerms) !== -1
        );
      }
      return filteredRows;
    },

    onRowDblClick(row) {
      this.$emit('rowDblClick', row);
    }
  }
};
</script>
<style lang="scss">
.ub-hits-table {
  width: 100%;

  .ub-hits-tr {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    cursor: pointer;
  }

  .ub-hits-td-time {
    vertical-align: top;
  }

  .ub-hits-td-hit {
    vertical-align: top;
    white-space: normal;
    word-break: break-all;
  }
}
</style>
