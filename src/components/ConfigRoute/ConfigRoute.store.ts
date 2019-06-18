import Vue from "vue";
import { Route, GlobalService } from "@/service";

export interface ConfigRouteStoreState {
  dataOrigin: {
    [path: string]: Route;
  };
}

export class ConfigRouteStore {
  static state = Vue.observable<ConfigRouteStoreState>({
    dataOrigin: {}
  });

  static async reload() {
    this.state.dataOrigin = await GlobalService.getRoutes();
  }
}
