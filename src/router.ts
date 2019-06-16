import Vue from "vue";
import VueRouter from "vue-router";
import components from "./components";
import _map from "lodash/map";
import _lowerCase from 'lodash/lowerCase';
Vue.use(VueRouter);

const router = new VueRouter();
export const routes = _map(components, (item, name) => ({
  path: `/${_lowerCase(name)}`,
  name,
  component: item,
}));
router.addRoutes(routes);

export default router;
