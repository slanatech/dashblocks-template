<template>
  <q-table
    dense
    flat
    virtual-scroll
    :data="items"
    :columns="columns"
    :pagination.sync="pagination"
    class="ub-items-table"
    :row-key="valueProp"
    :selection="selection"
    :filter="filter"
    :selected.sync="selected"
    :visible-columns="visibleColumns"
    :hide-bottom="items.length > 0"
  >
    <template v-if="showSearch" v-slot:top>
      <q-input v-model="filter" debounce="500" filled dense placeholder="Search" clearable class="full-width">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-if="hasSelectionToggle">
          <q-toggle size="xs" v-model="props.selected" />
        </q-th>
        <q-th key="icon" :props="props"> </q-th>
        <q-th key="value" :props="props">
          {{ valueTitle + ' ' + valueSubTitle }}
        </q-th>
        <q-th v-if="showData" key="data" :props="props">
          {{ dataTitle }}
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <q-tr
        :props="props"
        class="ub-items-row"
        @click="props.selected = !props.selected"
        @mouseover.native="onRowMouseOver(props.row)"
        @mouseleave.native="onRowMouseLeave(props.row)"
      >
        <q-td auto-width v-if="hasSelectionToggle">
          <q-toggle size="xs" v-model="props.selected" :style="`color:${props.row.color};`" />
        </q-td>
        <q-td key="icon" :props="props" auto-width>
          <q-icon :name="icon" size="sm" :style="`color:${props.row.color};`" />
        </q-td>
        <q-td key="value" :props="props" class="ub-items-val">
          {{ valueProp ? props.row[valueProp] : '' }}
        </q-td>
        <q-td key="data" v-if="showData" :props="props" auto-width class="ub-items-data">
          {{ dataProp ? props.row[dataProp] : '' }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
import { debounce } from 'quasar';

// Table that shows the list of items
// Note: when list of items is large, selection (toggle) may slow down (i.e. resizing)
// Consider implementing more efficient selection mechanism - i.e. click on row to select/ unselect
// For now this is fine
export default {
  name: 'ITable',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    /* Property in item object that contains value to be shown */
    /* TODO Consider keyProp */
    valueProp: {
      type: String,
      default: null
    },
    valueTitle: {
      type: String,
      default: 'Value'
    },
    valueSubTitle: {
      type: String,
      default: ''
    },
    /* Property in item object that contains active flag */
    activeProp: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    selection: {
      type: String,
      default: 'none'
    },
    selectionToggle: {
      type: Boolean,
      default: true
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    highlightedItem: {
      type: Object,
      default: null
    },
    dataProp: {
      type: String,
      default: null
    },
    dataTitle: {
      type: String,
      default: 'Data'
    },
    showData: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      pagination: {
        sortBy: 'icons',
        descending: false,
        page: 1,
        rowsPerPage: 0
      },
      filter: '',
      columns: [
        {
          name: 'icon',
          required: false,
          label: '',
          align: 'left',
          field: 'title',
          sortable: false
        },
        { name: 'value', sortable: true, label: this.valueTitle, align: 'left', field: this.valueProp, style: 'white-space:normal; word-break:break-all;' },
        { name: 'data', sortable: true, label: this.dataTitle, align: 'left', field: 'data' }
      ],
      selected: [],
      highlighted: null
    };
  },
  computed: {
    visibleColumns: function() {
      return this.icon ? ['icon', 'value', 'data', 'ctrls'] : ['value', 'data', 'ctrls'];
    },
    hasSelectionToggle: function() {
      return (this.selection === 'single' || this.selection === 'multiple') && this.selectionToggle;
    }
  },
  created() {
    this.highlightedUpdateEvent = debounce(this.highlightedUpdateEvent, 500);
  },
  mounted: function() {},
  watch: {
    selected: function(val) {
      this.$emit('update:selectedItems', val);
    }
  },
  methods: {
    highlightedUpdateEvent() {
      this.$emit('update:highlightedItem', this.highlighted);
    },
    onRowMouseOver(row) {
      // TODO Consider using keyProp
      if (this.highlighted && this.highlighted[this.valueProp] === row[this.valueProp]) {
        return; // already there
      }
      this.highlighted = row;
      this.highlightedUpdateEvent();
    },
    onRowMouseLeave(row) {
      this.highlighted = null;
      this.highlightedUpdateEvent();
    }
  }
};
</script>
<style lang="scss">
.ub-items-table {
  & table {
    table-layout: auto;
  }

  /* [sv2] This disables highlighting background of selected rows in q-table. */
  .q-table > tbody > tr.selected > td:after {
    content: none;
  }

  & tbody > tr.selected > td.ub-items-val {
    font-weight: 500;
  }

  /* TODO Consider monospace
  font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", "Lucida Console", monospace;
  */
  .ub-items-val {
    &.active {
      color: #1a1aa6;
    }
  }

  .ub-items-data {
    font-weight: 500;
  }

  .ub-items-row:hover > .ub-items-row-ctrl > .ub-items-ctrls {
    display: block;
  }

  /* This enables passing arbitrary color to q-toggle */
  .q-toggle__inner--truthy {
    color: currentColor;
  }
  .q-toggle--dark .q-toggle__inner {
    color: currentColor;
  }
  /* This makes track color more prominent */
  .q-toggle__track {
    opacity: 0.8;
  }
  /* This makes thumb less prominent in dark mode */
  .q-toggle--dark .q-toggle__thumb:after {
    opacity: 0.7;
  }
}
</style>
