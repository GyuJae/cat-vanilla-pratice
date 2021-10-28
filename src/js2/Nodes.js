import { getData } from "./api.js";

export default class Nodes {
  constructor({ $app, initialState, $breadcrumb }) {
    this.$app = $app;
    this.state = initialState;
    this.$nodes = document.createElement("div");
    this.$nodes.className = "Nodes";
    this.$app.appendChild(this.$nodes);
    this.$breadcrumb = $breadcrumb;
  }

  setState(nextNodes) {
    this.state = {
      nodes: nextNodes,
      isRoot: false,
      depth: [...this.state.depth, nextNodes],
    };
    this.render();
  }

  setPrevState() {
    const depth_lenth = this.state.depth.length;
    this.state = {
      nodes: this.state.depth[depth_lenth - 2],
      isRoot: depth_lenth === 1,
      depth: this.state.depth.slice(0, depth_lenth - 1),
    };
    this.render();
  }

  render() {
    this.$nodes.innerHTML =
      `${
        this.state.depth.length >= 2
          ? '<div class="Node prev" id><img src="./assets/prev.png" /></div>'
          : ""
      }` +
      this.state.nodes
        .map(
          (node) =>
            `<div class="Node" id=${node.id}>${
              node.type === "DIRECTORY"
                ? `<img src="./assets/directory.png" id=${node.id} />`
                : ""
            } ${
              node.type === "FILE"
                ? `<img src="./assets/file.png" id=${node.id} />`
                : ""
            }<div id=${node.id}>${node.name}</div></div>`
        )
        .join("");
    this.$nodes.querySelectorAll(".Node").forEach(($node) => {
      if (!$node.classList.contains("prev")) {
        $node.addEventListener("click", async (e) => {
          const { id } = e.target;
          const selectNode = this.state.nodes.filter(
            (node) => node.id === id
          )[0];
          if (selectNode.type && selectNode.type === "DIRECTORY") {
            const data = await getData(id);
            this.$breadcrumb.setState(selectNode.name);
            this.setState(data);
          } else if (selectNode.type && selectNode.type === "FILE") {
            const body = document.querySelector("body");
            const IMG_URL =
              "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";
            const $imageViewer = document.createElement("div");
            $imageViewer.className = "Modal ImageViewer";
            $imageViewer.innerHTML = `<div class="content">
            <img src=${IMG_URL + selectNode.filePath} />
          </div>`;
            body.appendChild($imageViewer);
            $imageViewer.addEventListener("click", () => {
              body.removeChild($imageViewer);
            });
          }
        });
      } else {
        $node.addEventListener("click", () => {
          this.setPrevState();
          this.$breadcrumb.setPrevState();
        });
      }
    });
  }
}
