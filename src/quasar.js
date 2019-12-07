import Vue from 'vue';

import './styles/quasar.scss';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
//import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
//import '@quasar/extras/material-icons-round/material-icons-round.css';
//import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
//import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';
//import '@quasar/extras/ionicons-v4/ionicons-v4.css';

import {
  Quasar,
  Ripple,
  LoadingBar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QPageSticky,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QSplitter,
  QScrollArea,
  QExpansionItem,
  QAvatar,
  QBtnToggle,
  QSeparator,
  QTooltip,
  QTable,
  QCard,
  QCardSection,
  QSelect,
  QToggle,
  QBadge,
  QSpace
} from 'quasar';

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QPageSticky,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QSplitter,
    QScrollArea,
    QExpansionItem,
    QAvatar,
    QBtnToggle,
    QSeparator,
    QTooltip,
    QTable,
    QCard,
    QCardSection,
    QSelect,
    QToggle,
    QBadge,
    QSpace
  },
  directives: {
    Ripple
  },
  plugins: {
    LoadingBar
  }
});
