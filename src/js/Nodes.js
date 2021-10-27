import { getData } from "./api.js";
import ImageViewer from "./ImageViewer.js";

export default class Nodes {
  constructor($app, initialState, $breadcrumb) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "Nodes";
    this.$breadcrumb = $breadcrumb;
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `${
      this.state.isRoot
        ? ""
        : `<div class="Node Prev">
    <img src="./assets/prev.png" />
  </div>`
    }${this.state.nodes
      .map(
        (node) => `<div class="Node ${node.type}" id=${node.id}>
        ${
          node.type === "DIRECTORY"
            ? `<img src="./assets/directory.png"  id=${node.id} />`
            : `<img src="./assets/file.png"  id=${node.id} />`
        }
      <div>${node.name}</div></div>`
      )
      .join("")}`;
    this.$target.querySelectorAll(".Node").forEach(($node) => {
      if (
        !$node.classList.contains("Prev") &&
        $node.classList.contains("DIRECTORY")
      ) {
        $node.addEventListener("click", async (e) => {
          const { id } = e.target;
          const data = await getData(id);
          await this.$breadcrumb.setState({
            isRoot: false,
            rootName: $node.innerText,
          });
          this.setState({
            nodes: data,
            isRoot: false,
            rootName: $node.innerText,
          });
        });
      } else if (
        !$node.classList.contains("Prev") &&
        $node.classList.contains("FILE")
      ) {
        $node.addEventListener("click", async (e) => {
          const $imageViewer = new ImageViewer(
            this.state.nodes.filter(
              (node) => node.id === e.target.id
            )[0].filePath
          );
          $imageViewer.render();
        });
      }
    });
    const $prev = this.$target.querySelector(".Prev");
    if ($prev) {
      $prev.addEventListener("click", async () => {
        const data = await getData();
        await this.$breadcrumb.setState({
          isRoot: true,
          rootName: "",
        });
        this.setState({
          nodes: data,
          isRoot: true,
          rootName: "",
        });
      });
    }
  }
}
