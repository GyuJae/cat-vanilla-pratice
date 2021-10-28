import { getData } from "./api.js";
import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";

export default class App {
  constructor($app) {
    this.$app = $app;
    this.state = {
      isRoot: false,
      nodes: [],
      depth: [],
    };
    this.$breadcrumb = new Breadcrumb({
      $app: this.$app,
      initialState: [],
    });
    this.$nodes = new Nodes({
      $app: this.$app,
      initialState: {
        ...this.state,
      },
      $breadcrumb: this.$breadcrumb,
    });
    this.init();
  }
  setState(nextNodes) {
    this.$nodes.setState(nextNodes);
    this.state = {
      isRoot: true,
      nodes: nextNodes,
      depth: [...this.state.depth, nextNodes.nodes],
    };
  }

  async init() {
    try {
      const nodes = await getData();
      this.setState(nodes);
    } catch (error) {
      alert(error);
    }
  }
}
