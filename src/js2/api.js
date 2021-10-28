import Loading from "./Loading.js";

const API_URL =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const getData = async (nodeId) => {
  const $loading = new Loading();
  $loading.setState(true);
  const data = await fetch(`${API_URL}/${nodeId ? nodeId : ""}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("http error");
      }
      return res.json();
    })
    .catch((e) => alert(e))
    .finally(() => {
      $loading.setState(false);
    });
  return data;
};
