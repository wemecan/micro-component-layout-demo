import Vue from "vue";

import { GlobalService, Component, getComponentsResult } from "@/service";

export interface ConfigComponentStoreState {
  dataOrigin: getComponentsResult;
  curNameSpace: string;
  curLayoutComponentId: number | undefined;
}

export class ConfigComponentStore {
  static state: ConfigComponentStoreState = Vue.observable({
    dataOrigin: {},
    curLayoutComponentId: undefined,
    curNameSpace: ""
  });
  static get curNamespaceData() {
    const { dataOrigin, curNameSpace } = this.state;
    return curNameSpace ? dataOrigin[curNameSpace] : [];
  }

  static async reload() {
    this.state.dataOrigin = await GlobalService.getComponents();
    this.state.curNameSpace = Object.keys(this.state.dataOrigin)[0];
  }

  static async getCurLayoutComponent() {
    this.state.curLayoutComponentId = (await GlobalService.getCurLayoutComponent()).id;
  }
}
