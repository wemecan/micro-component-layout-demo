import Axios from "axios";

export interface Component {
  path: string;
  js: string;
  css?: string;
}

export const GlobalService = {
  async getComponents() {
    const res = await Axios.get("/component");
    return res.data as Component[];
  },
  async getCurLayoutComponent() {
    const res = await Axios.get("/config");
    return res.data.layoutComponent as Component;
  },
};
