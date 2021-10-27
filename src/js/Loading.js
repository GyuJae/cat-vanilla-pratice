export default class Loading {
  constructor(loading) {
    this.loading = loading;
    this.body = document.querySelector("body");
    this.$container = document.createElement("div");
    this.$container.className = "Modal Loading";
    this.$container.innerHTML = `<div class="content">
      <img src="./assets/nyan-cat.gif">
    </div>`;
    this.render();
  }

  setState(status) {
    this.loading = status;
    this.render();
  }

  render() {
    if (this.loading) {
      this.body.appendChild(this.$container);
    } else {
      this.body.removeChild(this.$container);
    }
  }
}
