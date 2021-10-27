export default class ImageViewer {
  constructor(state) {
    this.IMG_URL =
      "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";
    this.$target = document.createElement("div");
    this.$target.className = "Modal ImageViewer";
    this.$target.innerHTML = `<div class="content">
      <img src="${this.IMG_URL}${state}" /></div>`;
  }

  setState() {}

  render() {
    const body = document.querySelector("body");
    body.appendChild(this.$target);
    this.$target.addEventListener("click", () => {
      body.removeChild(this.$target);
    });
  }
}
