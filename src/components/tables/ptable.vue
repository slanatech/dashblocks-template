<template>
  <q-table dense flat hide-bottom :data="items" :columns="columns" row-key="prop" :pagination.sync="pagination" class="ub-prop-table" style="width: 100%;">
    <template v-slot:body="props">
      <q-tr :props="props" class="ub-prop-row">
        <q-td key="prop" :props="props" auto-width class="ub-prop-key">
          {{ props.row.title }}
        </q-td>
        <q-td key="val" :props="props" :class="valClass(props.row)">
          {{ props.row.val }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
// Show object properties in a table
export default {
  name: 'PTable',
  props: {
    obj: Object,
    removePrefix: {
      type: String,
      default: ''
    },
    // List of "active" properties, array of keys
    activeProps: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {
      keyCntr: 0,
      pagination: {
        sortBy: 'prop',
        descending: false,
        page: 1,
        rowsPerPage: 0
      },
      columns: [
        {
          name: 'prop',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'title',
          sortable: true,
          style: 'vertical-align: top;white-space:normal;'
        },
        { name: 'val', label: 'Value', align: 'left', field: 'val', style: 'white-space:normal; word-break:break-all;font-weight:500;' }
      ],
      items: []
    };
  },
  computed: {},
  mounted: function() {
    this.preProcessObj(this.obj);
  },
  watch: {
    obj: function(val) {
      this.preProcessObj(val);
    },
    activeProps: function(val) {
      this.items.map(x => {
        x.active = val.includes(x.prop);
      });
    }
  },
  methods: {
    valClass: function(row) {
      return 'ub-prop-val ' + (row.active ? 'active' : '');
    },
    // Pre-process object, generate flat table data structure and values according to field types
    preProcessObj(obj) {
      this.items = [];
      let allitems = [];
      let path = [];
      this.preProcessProps('', path, obj, allitems);
      this.items = allitems;
    },
    addProp(prop, allItems) {
      prop.title = prop.prop;
      prop.active = this.activeProps.includes(prop.prop);
      if (this.removePrefix !== '' && prop.title.startsWith(this.removePrefix)) {
        prop.title = prop.title.replace(this.removePrefix, '');
      }
      allItems.push(prop);
    },
    preProcessProps(prefix, path, obj, allItems) {
      if (typeof obj === 'undefined' || !obj) {
        this.addProp(
          {
            typeclass: '',
            typetext: 't',
            type: 'string',
            prop: prefix,
            val: 'NULL',
            path: path
          },
          allItems
        );
        return;
      }
      for (let prop of Object.keys(obj)) {
        let propfullname = prefix !== '' ? `${prefix}.${prop}` : prop;
        let currentPath = path.slice();
        currentPath.push(prop);
        switch (typeof obj[prop]) {
          case 'object': {
            this.preProcessProps(propfullname, currentPath, obj[prop], allItems);
            break;
          }
          case 'string': {
            this.addProp(
              {
                key: this.keyCntr++,
                typeclass: '',
                typetext: 't',
                type: 'string',
                prop: propfullname,
                val: obj[prop],
                path: currentPath
              },
              allItems
            );
            break;
          }
          case 'boolean': {
            this.addProp(
              {
                key: this.keyCntr++,
                typeclass: 'fa fa-adjust',
                typetext: '',
                type: 'boolean',
                prop: propfullname,
                val: obj[prop] ? 'true' : 'false',
                path: currentPath
              },
              allItems
            );
            break;
          }
          case 'number': {
            this.addProp(
              {
                key: this.keyCntr++,
                typeclass: '',
                typetext: '#',
                type: 'number',
                prop: propfullname,
                val: `${obj[prop]}`,
                path: currentPath
              },
              allItems
            );
            break;
          }
        }
      }
    }
  }
};
</script>
<style lang="scss">
.ub-prop-table {
  & table {
    table-layout: auto;
  }
  /*
  font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", "Lucida Console", monospace;
  */
  .ub-prop-val {
    &.active {
      color: #1a1aa6;
    }
  }

  .ub-prop-row:hover > .ub-prop-val > .ub-prop-ctrls {
    display: block;
  }
}
</style>
