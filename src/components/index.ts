import Layout from "./Layout/Layout.vue";
import ConfigComponent from "./ConfigComponent/ConfigComponent.vue";
import ConfigRoute from "./ConfigRoute/ConfigRoute.vue";
import EditableCell from "./EditableCell.vue";

import Vue from "vue";
Vue.component("editable-cell", EditableCell);

export default {
  Layout,
  ConfigComponent,
  ConfigRoute
};
