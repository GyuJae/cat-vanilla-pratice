import { getData } from "./api.js";
import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";

export default class App {
  constructor($app) {
    this.$app = $app;
  }

  async init() {
    try {
      const data = await getData();
      const $breadcrumb = new Breadcrumb(this.$app, {
        isRoot: true,
        rootName: "",
      });
      const $nodes = new Nodes(
        this.$app,
        { nodes: data, isRoot: true, rootName: "" },
        $breadcrumb
      );
    } catch (error) {
      alert(error.message);
    }
  }
}
