import App from "./App.marko"

const target = document.getElementById("app")
if (target) {
  App.mount({}, target)
}
