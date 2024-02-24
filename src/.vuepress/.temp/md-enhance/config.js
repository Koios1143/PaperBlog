import { defineClientConfig } from "@vuepress/client";
import CodeTabs from "/root/paper_blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.11_katex@0.16.9_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs.js";
import { hasGlobalComponent } from "/root/paper_blog/node_modules/.pnpm/vuepress-shared@2.0.0-rc.11_vuepress@2.0.0-rc.0/node_modules/vuepress-shared/lib/client/index.js";
import { CodeGroup, CodeGroupItem } from "/root/paper_blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.11_katex@0.16.9_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-plugin-md-enhance/lib/client/compact/index.js";
import CodeDemo from "/root/paper_blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.11_katex@0.16.9_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/root/paper_blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.11_katex@0.16.9_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import "/root/paper_blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.11_katex@0.16.9_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-plugin-md-enhance/lib/client/styles/figure.scss";
import { useHint } from "/root/paper_blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.11_katex@0.16.9_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-plugin-md-enhance/lib/client/composables/hint.js";
import "/root/paper_blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.11_katex@0.16.9_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-plugin-md-enhance/lib/client/styles/hint/index.scss";
import "/root/paper_blog/node_modules/.pnpm/katex@0.16.9/node_modules/katex/dist/katex.min.css";
import "/root/paper_blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.11_katex@0.16.9_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-plugin-md-enhance/lib/client/styles/katex.scss";
import Tabs from "/root/paper_blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.11_katex@0.16.9_markdown-it@13.0.2_vuepress@2.0.0-rc.0/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    if(!hasGlobalComponent("CodeGroup", app)) app.component("CodeGroup", CodeGroup);
    if(!hasGlobalComponent("CodeGroupItem", app)) app.component("CodeGroupItem", CodeGroupItem);
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("Tabs", Tabs);
  },
  setup: () => {
useHint();
  }
});
