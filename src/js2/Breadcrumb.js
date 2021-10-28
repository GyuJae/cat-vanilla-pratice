export default class Breadcrumb {
  constructor({ $app, initialState }) {
    this.$app = $app;
    this.state = initialState;
    this.$target = document.createElement("nav");
    this.$target.className = "Breadcrumb";
    this.$app.appendChild(this.$target);

    this.render();
  }

  setState(rootName) {
    this.state = [...this.state, rootName];
    this.render();
  }

  setPrevState() {
    this.state = this.state.slice(0, this.state.length - 1);
    this.render();
  }

  render() {
    this.$target.innerHTML = `<div class="nav-item">root</div>${this.state
      .map(
        (rootName, idx) =>
          `<div class="nav-item" data-index=${idx}>${rootName}</div>`
      )
      .join("")}`;
  }
}
