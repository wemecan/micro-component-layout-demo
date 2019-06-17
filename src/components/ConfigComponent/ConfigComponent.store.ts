import Vue from "vue";

import { GlobalService, Component } from "@/service";

export interface ConfigComponentStoreState {
  dataOrigin: Component[];
  curLayoutComponent: Component | undefined;
}

export class ConfigComponentStore {
  static state: ConfigComponentStoreState = Vue.observable({
    dataOrigin: [],
    curLayoutComponent: undefined,
  });

  static async reload() {
    this.state.dataOrigin = await GlobalService.getComponents();
  }

  static async getCurLayoutComponent() {
    this.state.curLayoutComponent = await GlobalService.getCurLayoutComponent();
  }
}
