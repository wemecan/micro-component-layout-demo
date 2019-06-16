import Vue from "vue";
import VueRouter from "vue-router";
import components from "./components";
import _ from "lodash";
Vue.use(VueRouter);

const router = new VueRouter();
export const routes = _.map(components, (item, name) => ({
  path: `/${_.lowerCase(name)}`,
  name,
  component: item,
}));
router.addRoutes(routes);

export default router;
