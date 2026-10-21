import { createApp } from "vue";
import App from "./App.vue";
import { vCount, vReveal, vSpotlight, vTilt } from "./editorial/motion";
import "./styles.css";
import "./tokens.css";
import "./ui.css";
import "./docs.css";
import "./editorial.css";

createApp(App)
  .directive("reveal", vReveal)
  .directive("tilt", vTilt)
  .directive("spotlight", vSpotlight)
  .directive("count", vCount)
  .mount("#app");
