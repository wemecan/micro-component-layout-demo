import Layout from "./Layout/Layout.vue";
import ConfigComponent from "./ConfigComponent/ConfigComponent.vue";
import ConfigRoute from "./ConfigRoute/ConfigRoute.vue";
import EditableCell from "./EditableCell.vue";
import SelectComponent from './SelectComponents.vue';

import Vue from "vue";
Vue.component("editable-cell", EditableCell);
Vue.component('select-component', SelectComponent)
export default {
  Layout,
  ConfigComponent,
  ConfigRoute
};
