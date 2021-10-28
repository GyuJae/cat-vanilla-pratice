export default class Loading {
  constructor() {
    this.loading = true;
    this.$loading = document.createElement("div");
    this.$loading.className = "Modal Loading";
    this.$loading.innerHTML = `<div class="content">
      <img src="./assets/nyan-cat.gif">
    </div>`;
    this.body = document.querySelector("body");
    this.render();
  }

  setState(newState) {
    this.loading = newState;
    this.render();
  }

  render() {
    if (this.loading) {
      this.body.appendChild(this.$loading);
    } else {
      this.body.removeChild(this.$loading);
    }
  }
}
