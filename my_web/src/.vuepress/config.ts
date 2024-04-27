import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "miku",
  description: "能跑就行，忽略亿点小细节。",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
