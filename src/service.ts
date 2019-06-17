import Axios from "axios";

export interface Component {
  id?: number;
  path: string;
  js: string;
  css?: string;
}

export const GlobalService = {
  async getComponents() {
    const res = await Axios.get("/api/component");
    return res.data as Component[];
  },
  async getCurLayoutComponent() {
    const res = await Axios.get("/api/config");
    return res.data.layoutComponent as Component;
  },
  async createComonent(payload: Component) {
    const res = await Axios.post("/api/component", payload);
    return res.data;
  }
};
