export default class Breadcrumb {
  constructor($app, initState) {
    this.$app = $app;
    this.state = initState;
    this.target = document.createElement("nav");
    this.target.className = "Breadcrumb";
    this.$app.appendChild(this.target);
    this.$root = document.createElement("div");
    this.target.appendChild(this.$root);
    this.render();
  }

  setState({ isRoot, rootName }) {
    this.state = { isRoot, rootName };
    console.log(this.state);
    this.render();
  }

  render() {
    this.$root.innerText = this.state.isRoot
      ? "root"
      : `root - ${this.state.rootName}`;
  }
}
