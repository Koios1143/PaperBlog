import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/PaperBlog/",
  // base: "/",
  lang: "en-US",
  title: "Paper Blog",
  description: "A simple blog build with vuepress-theme-hope",

  theme

  // Enable it with pwa
  // shouldPrefetch: false,
});
