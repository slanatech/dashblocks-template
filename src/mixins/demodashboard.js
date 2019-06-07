export const demodashboard = {
  computed: {
    isDark() {
      return this.$store.state.switchDark;
    },
    dbSpecText() {
      return this.$store.state.dashboardSpec;
    }
  },
  watch: {
    dbSpecText: function(val) {
      this.dbspec = JSON.parse(val);
    }
  }
};
