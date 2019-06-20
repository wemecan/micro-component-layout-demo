import Vue from "vue";

import { GlobalService, Component } from "@/service";
import _groupBy from "lodash/groupBy";

export interface ConfigComponentStoreState {
  dataOrigin: Component[];
  tmpData: Component[];
  curLayoutComponentId: number | undefined;
}

export class ConfigComponentStore {
  static state: ConfigComponentStoreState = Vue.observable({
    dataOrigin: [],
    tmpData: [],
    curLayoutComponentId: undefined
  });

  static get dataGroupByPath() {
    return _groupBy(this.state.dataOrigin, item => item.path.split(".")[0]);
  }

  static async reload() {
    this.state.dataOrigin = await GlobalService.getComponents();
    this.state.tmpData = [...this.state.dataOrigin]
  }

  static async getCurLayoutComponent() {
    this.state.curLayoutComponentId = (await GlobalService.getCurLayoutComponent()).id;
  }
}
