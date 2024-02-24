// src/.vuepress/config.ts
import { defineUserConfig } from "vuepress";

// src/.vuepress/theme.ts
import { hopeTheme } from "vuepress-theme-hope";

// src/.vuepress/navbar.ts
import { navbar } from "vuepress-theme-hope";
var navbar_default = navbar([
  "/"
  // {
  //   text: "Posts",
  //   icon: "pen-to-square",
  //   prefix: "/posts/",
  //   children: [
  //     // {
  //     //   text: "Apple",
  //     //   icon: "pen-to-square",
  //     //   prefix: "apple/",
  //     //   children: [
  //     //     { text: "Apple1", icon: "pen-to-square", link: "1" },
  //     //     { text: "Apple2", icon: "pen-to-square", link: "2" },
  //     //     "3",
  //     //     "4",
  //     //   ],
  //     // },
  //     // "strawberry",
  //   ],
  // },
  // {
  //   text: "V2 Docs",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/",
  // },
]);

// src/.vuepress/sidebar.ts
import { sidebar } from "vuepress-theme-hope";
var sidebar_default = sidebar({
  "/": [
    "",
    {
      text: "Articles",
      icon: "book",
      prefix: "posts/",
      children: "structure"
    }
  ]
});

// src/.vuepress/theme.ts
var theme_default = hopeTheme({
  hostname: "https://mister-hope.github.io",
  // author: {
  //   name: "username",
  //   url: "url",
  // },
  iconAssets: "fontawesome-with-brands",
  logo: "/avatar.jpg",
  //"https://theme-hope-assets.vuejs.press/logo.svg",
  repo: "vuepress-theme-hope/vuepress-theme-hope",
  docsDir: "src",
  // navbar
  navbar: navbar_default,
  // sidebar
  sidebar: sidebar_default,
  footer: "Default footer",
  displayFooter: true,
  encrypt: {
    config: {
      // "/demo/encrypt.html": ["1234"],
    }
  },
  blog: {
    description: "AI/ML Learners",
    intro: "/intro.html",
    roundAvatar: true,
    medias: {
      // GitHub: "",
      // Discord: "",
      // Email: "",
      // Facebook: "",
      // Linkedin: ""
      // Rss: "https://example.com",
      // Twitter: "https://example.com",
    }
  },
  pageInfo: ["Original", "Date", "PageView", "ReadingTime", "Category", "Tag"],
  metaLocales: {
    editLink: "Edit this page on GitHub"
  },
  // enable it to preview all changes in time
  // hotReload: true,
  plugins: {
    blog: true,
    // install @waline/client before enabling it
    // WARNING: This is a test server for demo only.
    // You should create and use your own comment service in production.
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },
    components: {
      components: ["Badge", "VPCard"]
    },
    copyCode: {
      duration: 0
    },
    searchPro: true,
    feed: {
      rss: true,
      atom: true,
      json: true
    },
    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended"
              };
          }
        }
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      hint: true,
      // install chart.js before enabling it
      // chart: true,
      // insert component easily
      // install echarts before enabling it
      // echarts: true,
      // install flowchart.ts before enabling it
      // flowchart: true,
      // gfm requires mathjax-full to provide tex support
      // gfm: true,
      // install katex before enabling it
      katex: true
      // install mathjax-full before enabling it
      // mathjax: true,
      // install mermaid before enabling it
      // mermaid: true,
      // playground: {
      //   presets: ["ts", "vue"],
      // },
      // install reveal.js before enabling it
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },
      // install @vue/repl before enabling it
      // vuePlayground: true,
      // install sandpack-vue3 before enabling it
      // sandpack: true,
    }
    // install vuepress-plugin-pwa2 and uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  }
});

// src/.vuepress/config.ts
import { Valine } from "valine";
var config_default = defineUserConfig({
  base: "/KoiosBlog/",
  lang: "en-US",
  title: "Koios Blog",
  description: "A simple blog build with vuepress-theme-hope",
  theme: theme_default,
  plugins: [
    Valine
  ]
  // Enable it with pwa
  // shouldPrefetch: false,
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52dWVwcmVzcy9jb25maWcudHMiLCAic3JjLy52dWVwcmVzcy90aGVtZS50cyIsICJzcmMvLnZ1ZXByZXNzL25hdmJhci50cyIsICJzcmMvLnZ1ZXByZXNzL3NpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC9ibG9nX3YzL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9yb290L2Jsb2dfdjMvc3JjLy52dWVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvYmxvZ192My9zcmMvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZVVzZXJDb25maWcgfSBmcm9tIFwidnVlcHJlc3NcIjtcbmltcG9ydCB7IGhvcGVUaGVtZSB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5pbXBvcnQgdGhlbWUgZnJvbSBcIi4vdGhlbWUuanNcIjtcbmltcG9ydCB7IFZhbGluZSB9IGZyb20gXCJ2YWxpbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XG4gIGJhc2U6IFwiL0tvaW9zQmxvZy9cIixcblxuICBsYW5nOiBcImVuLVVTXCIsXG4gIHRpdGxlOiBcIktvaW9zIEJsb2dcIixcbiAgZGVzY3JpcHRpb246IFwiQSBzaW1wbGUgYmxvZyBidWlsZCB3aXRoIHZ1ZXByZXNzLXRoZW1lLWhvcGVcIixcblxuICB0aGVtZSxcblxuICBwbHVnaW5zOiBbXG4gICAgVmFsaW5lLFxuICBdXG5cbiAgLy8gRW5hYmxlIGl0IHdpdGggcHdhXG4gIC8vIHNob3VsZFByZWZldGNoOiBmYWxzZSxcbn0pOyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvYmxvZ192My9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC9ibG9nX3YzL3NyYy8udnVlcHJlc3MvdGhlbWUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvYmxvZ192My9zcmMvLnZ1ZXByZXNzL3RoZW1lLnRzXCI7aW1wb3J0IHsgaG9wZVRoZW1lIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcbmltcG9ydCBuYXZiYXIgZnJvbSBcIi4vbmF2YmFyLmpzXCI7XG5pbXBvcnQgc2lkZWJhciBmcm9tIFwiLi9zaWRlYmFyLmpzXCI7XG5pbXBvcnQgeyBNUl9IT1BFX0FWQVRBUiB9IGZyb20gXCIuL2xvZ28uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgaG9wZVRoZW1lKHtcbiAgaG9zdG5hbWU6IFwiaHR0cHM6Ly9taXN0ZXItaG9wZS5naXRodWIuaW9cIixcblxuICAvLyBhdXRob3I6IHtcbiAgLy8gICBuYW1lOiBcIktvaW9zXCIsXG4gIC8vICAgdXJsOiBcImh0dHBzOi8va29pb3MxMTQzLmdpdGh1Yi5pby9cIixcbiAgLy8gfSxcbiAgXG4gIGljb25Bc3NldHM6IFwiZm9udGF3ZXNvbWUtd2l0aC1icmFuZHNcIixcblxuICBsb2dvOiBcIi9hdmF0YXIuanBnXCIsLy9cImh0dHBzOi8vdGhlbWUtaG9wZS1hc3NldHMudnVlanMucHJlc3MvbG9nby5zdmdcIixcblxuICByZXBvOiBcInZ1ZXByZXNzLXRoZW1lLWhvcGUvdnVlcHJlc3MtdGhlbWUtaG9wZVwiLFxuXG4gIGRvY3NEaXI6IFwic3JjXCIsXG5cbiAgLy8gbmF2YmFyXG4gIG5hdmJhcixcblxuICAvLyBzaWRlYmFyXG4gIHNpZGViYXIsXG5cbiAgZm9vdGVyOiBcIkRlZmF1bHQgZm9vdGVyXCIsXG5cbiAgZGlzcGxheUZvb3RlcjogdHJ1ZSxcblxuICBlbmNyeXB0OiB7XG4gICAgY29uZmlnOiB7XG4gICAgICAvLyBcIi9kZW1vL2VuY3J5cHQuaHRtbFwiOiBbXCIxMjM0XCJdLFxuICAgIH0sXG4gIH0sXG5cbiAgYmxvZzoge1xuICAgIGRlc2NyaXB0aW9uOiBcIkFuIEFJL01MIERldmVsb3BlclwiLFxuICAgIGludHJvOiBcIi9pbnRyby5odG1sXCIsXG4gICAgcm91bmRBdmF0YXI6IHRydWUsXG4gICAgbWVkaWFzOiB7XG4gICAgICBHaXRIdWI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0tvaW9zMTE0M1wiLFxuICAgICAgRGlzY29yZDogXCJodHRwczovL2Rpc2NvcmRhcHAuY29tL3VzZXJzLzU2MTU1OTUzNzUzOTA4ODM4NVwiLFxuICAgICAgRW1haWw6IFwibWFpbHRvOmtvaW9zbGluMDgyNUBnbWFpbC5jb21cIixcbiAgICAgIEZhY2Vib29rOiBcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9Lb2lvczExNDMvXCIsXG4gICAgICBMaW5rZWRpbjogXCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vaG8ta3VuLWxpbi0yOTY4NjQyMDAvXCIsXG4gICAgICAvLyBSc3M6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxuICAgICAgLy8gVHdpdHRlcjogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgfSxcbiAgfSxcblxuICBwYWdlSW5mbzogW1wiT3JpZ2luYWxcIiwgXCJEYXRlXCIsIFwiUGFnZVZpZXdcIiwgXCJSZWFkaW5nVGltZVwiLCBcIkNhdGVnb3J5XCIsIFwiVGFnXCJdLFxuICBcbiAgbWV0YUxvY2FsZXM6IHtcbiAgICBlZGl0TGluazogXCJFZGl0IHRoaXMgcGFnZSBvbiBHaXRIdWJcIixcbiAgfSxcblxuICAvLyBlbmFibGUgaXQgdG8gcHJldmlldyBhbGwgY2hhbmdlcyBpbiB0aW1lXG4gIC8vIGhvdFJlbG9hZDogdHJ1ZSxcblxuICBwbHVnaW5zOiB7XG4gICAgYmxvZzogdHJ1ZSxcblxuICAgIC8vIGluc3RhbGwgQHdhbGluZS9jbGllbnQgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgLy8gV0FSTklORzogVGhpcyBpcyBhIHRlc3Qgc2VydmVyIGZvciBkZW1vIG9ubHkuXG4gICAgLy8gWW91IHNob3VsZCBjcmVhdGUgYW5kIHVzZSB5b3VyIG93biBjb21tZW50IHNlcnZpY2UgaW4gcHJvZHVjdGlvbi5cbiAgICAvLyBjb21tZW50OiB7XG4gICAgLy8gICBwcm92aWRlcjogXCJXYWxpbmVcIixcbiAgICAvLyAgIHNlcnZlclVSTDogXCJodHRwczovL3dhbGluZS1jb21tZW50LnZ1ZWpzLnByZXNzXCIsXG4gICAgLy8gfSxcbiAgICBcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICBjb21wb25lbnRzOiBbXCJCYWRnZVwiLCBcIlZQQ2FyZFwiXSxcbiAgICB9LFxuICAgIGNvcHlDb2RlOiB7XG4gICAgICBkdXJhdGlvbjogMCxcbiAgICB9LFxuICAgIHNlYXJjaFBybzogdHJ1ZSxcbiAgICBmZWVkOntcbiAgICAgIHJzczogdHJ1ZSxcbiAgICAgIGF0b206IHRydWUsXG4gICAgICBqc29uOiB0cnVlXG4gICAgfSxcbiAgICAvLyBhbGwgZmVhdHVyZXMgYXJlIGVuYWJsZWQgZm9yIGRlbW8sIG9ubHkgcHJlc2VydmUgZmVhdHVyZXMgeW91IG5lZWQgaGVyZVxuICAgIG1kRW5oYW5jZToge1xuICAgICAgYWxpZ246IHRydWUsXG4gICAgICBhdHRyczogdHJ1ZSxcbiAgICAgIGNvZGV0YWJzOiB0cnVlLFxuICAgICAgY29tcG9uZW50OiB0cnVlLFxuICAgICAgZGVtbzogdHJ1ZSxcbiAgICAgIGZpZ3VyZTogdHJ1ZSxcbiAgICAgIGltZ0xhenlsb2FkOiB0cnVlLFxuICAgICAgaW1nU2l6ZTogdHJ1ZSxcbiAgICAgIGluY2x1ZGU6IHRydWUsXG4gICAgICBtYXJrOiB0cnVlLFxuICAgICAgc3R5bGl6ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgbWF0Y2hlcjogXCJSZWNvbW1lbmRlZFwiLFxuICAgICAgICAgIHJlcGxhY2VyOiAoeyB0YWcgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCJlbVwiKVxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRhZzogXCJCYWRnZVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGlwXCIgfSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBzdWI6IHRydWUsXG4gICAgICBzdXA6IHRydWUsXG4gICAgICB0YWJzOiB0cnVlLFxuICAgICAgdlByZTogdHJ1ZSxcbiAgICAgIGhpbnQ6IHRydWUsXG5cbiAgICAgIC8vIGluc3RhbGwgY2hhcnQuanMgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgICAvLyBjaGFydDogdHJ1ZSxcblxuICAgICAgLy8gaW5zZXJ0IGNvbXBvbmVudCBlYXNpbHlcblxuICAgICAgLy8gaW5zdGFsbCBlY2hhcnRzIGJlZm9yZSBlbmFibGluZyBpdFxuICAgICAgLy8gZWNoYXJ0czogdHJ1ZSxcblxuICAgICAgLy8gaW5zdGFsbCBmbG93Y2hhcnQudHMgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgICAvLyBmbG93Y2hhcnQ6IHRydWUsXG5cbiAgICAgIC8vIGdmbSByZXF1aXJlcyBtYXRoamF4LWZ1bGwgdG8gcHJvdmlkZSB0ZXggc3VwcG9ydFxuICAgICAgLy8gZ2ZtOiB0cnVlLFxuXG4gICAgICAvLyBpbnN0YWxsIGthdGV4IGJlZm9yZSBlbmFibGluZyBpdFxuICAgICAga2F0ZXg6IHRydWUsXG5cbiAgICAgIC8vIGluc3RhbGwgbWF0aGpheC1mdWxsIGJlZm9yZSBlbmFibGluZyBpdFxuICAgICAgLy8gbWF0aGpheDogdHJ1ZSxcblxuICAgICAgLy8gaW5zdGFsbCBtZXJtYWlkIGJlZm9yZSBlbmFibGluZyBpdFxuICAgICAgLy8gbWVybWFpZDogdHJ1ZSxcblxuICAgICAgLy8gcGxheWdyb3VuZDoge1xuICAgICAgLy8gICBwcmVzZXRzOiBbXCJ0c1wiLCBcInZ1ZVwiXSxcbiAgICAgIC8vIH0sXG5cbiAgICAgIC8vIGluc3RhbGwgcmV2ZWFsLmpzIGJlZm9yZSBlbmFibGluZyBpdFxuICAgICAgLy8gcmV2ZWFsSnM6IHtcbiAgICAgIC8vICAgcGx1Z2luczogW1wiaGlnaGxpZ2h0XCIsIFwibWF0aFwiLCBcInNlYXJjaFwiLCBcIm5vdGVzXCIsIFwiem9vbVwiXSxcbiAgICAgIC8vIH0sXG5cbiAgICAgIC8vIGluc3RhbGwgQHZ1ZS9yZXBsIGJlZm9yZSBlbmFibGluZyBpdFxuICAgICAgLy8gdnVlUGxheWdyb3VuZDogdHJ1ZSxcblxuICAgICAgLy8gaW5zdGFsbCBzYW5kcGFjay12dWUzIGJlZm9yZSBlbmFibGluZyBpdFxuICAgICAgLy8gc2FuZHBhY2s6IHRydWUsXG4gICAgfSxcblxuICAgIC8vIGluc3RhbGwgdnVlcHJlc3MtcGx1Z2luLXB3YTIgYW5kIHVuY29tbWVudCB0aGVzZSBpZiB5b3Ugd2FudCBhIFBXQVxuICAgIC8vIHB3YToge1xuICAgIC8vICAgZmF2aWNvbjogXCIvZmF2aWNvbi5pY29cIixcbiAgICAvLyAgIGNhY2hlSFRNTDogdHJ1ZSxcbiAgICAvLyAgIGNhY2hlUGljOiB0cnVlLFxuICAgIC8vICAgYXBwZW5kQmFzZTogdHJ1ZSxcbiAgICAvLyAgIGFwcGxlOiB7XG4gICAgLy8gICAgIGljb246IFwiL2Fzc2V0cy9pY29uL2FwcGxlLWljb24tMTUyLnBuZ1wiLFxuICAgIC8vICAgICBzdGF0dXNCYXJDb2xvcjogXCJibGFja1wiLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIG1zVGlsZToge1xuICAgIC8vICAgICBpbWFnZTogXCIvYXNzZXRzL2ljb24vbXMtaWNvbi0xNDQucG5nXCIsXG4gICAgLy8gICAgIGNvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAvLyAgIH0sXG4gICAgLy8gICBtYW5pZmVzdDoge1xuICAgIC8vICAgICBpY29uczogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLW1hc2stNTEyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgIC8vICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLW1hc2stMTkyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgIC8vICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLTUxMi5wbmdcIixcbiAgICAvLyAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2Nocm9tZS0xOTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICAgIHNob3J0Y3V0czogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIG5hbWU6IFwiRGVtb1wiLFxuICAgIC8vICAgICAgICAgc2hvcnRfbmFtZTogXCJEZW1vXCIsXG4gICAgLy8gICAgICAgICB1cmw6IFwiL2RlbW8vXCIsXG4gICAgLy8gICAgICAgICBpY29uczogW1xuICAgIC8vICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9ndWlkZS1tYXNrYWJsZS5wbmdcIixcbiAgICAvLyAgICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICBdLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICB9LFxuICAgIC8vIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvYmxvZ192My9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC9ibG9nX3YzL3NyYy8udnVlcHJlc3MvbmF2YmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9yb290L2Jsb2dfdjMvc3JjLy52dWVwcmVzcy9uYXZiYXIudHNcIjtpbXBvcnQgeyBuYXZiYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBuYXZiYXIoW1xuICBcIi9cIixcbiAgLy8ge1xuICAvLyAgIHRleHQ6IFwiUG9zdHNcIixcbiAgLy8gICBpY29uOiBcInBlbi10by1zcXVhcmVcIixcbiAgLy8gICBwcmVmaXg6IFwiL3Bvc3RzL1wiLFxuICAvLyAgIGNoaWxkcmVuOiBbXG4gIC8vICAgICAvLyB7XG4gIC8vICAgICAvLyAgIHRleHQ6IFwiQXBwbGVcIixcbiAgLy8gICAgIC8vICAgaWNvbjogXCJwZW4tdG8tc3F1YXJlXCIsXG4gIC8vICAgICAvLyAgIHByZWZpeDogXCJhcHBsZS9cIixcbiAgLy8gICAgIC8vICAgY2hpbGRyZW46IFtcbiAgLy8gICAgIC8vICAgICB7IHRleHQ6IFwiQXBwbGUxXCIsIGljb246IFwicGVuLXRvLXNxdWFyZVwiLCBsaW5rOiBcIjFcIiB9LFxuICAvLyAgICAgLy8gICAgIHsgdGV4dDogXCJBcHBsZTJcIiwgaWNvbjogXCJwZW4tdG8tc3F1YXJlXCIsIGxpbms6IFwiMlwiIH0sXG4gIC8vICAgICAvLyAgICAgXCIzXCIsXG4gIC8vICAgICAvLyAgICAgXCI0XCIsXG4gIC8vICAgICAvLyAgIF0sXG4gIC8vICAgICAvLyB9LFxuICAvLyAgICAgLy8gXCJzdHJhd2JlcnJ5XCIsXG4gIC8vICAgXSxcbiAgLy8gfSxcbiAgLy8ge1xuICAvLyAgIHRleHQ6IFwiVjIgRG9jc1wiLFxuICAvLyAgIGljb246IFwiYm9va1wiLFxuICAvLyAgIGxpbms6IFwiaHR0cHM6Ly90aGVtZS1ob3BlLnZ1ZWpzLnByZXNzL1wiLFxuICAvLyB9LFxuXSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9yb290L2Jsb2dfdjMvc3JjLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Jvb3QvYmxvZ192My9zcmMvLnZ1ZXByZXNzL3NpZGViYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvYmxvZ192My9zcmMvLnZ1ZXByZXNzL3NpZGViYXIudHNcIjtpbXBvcnQgeyBzaWRlYmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgc2lkZWJhcih7XG4gIFwiL1wiOiBbXG4gICAgXCJcIixcbiAgICB7XG4gICAgICB0ZXh0OiBcIkFydGljbGVzXCIsXG4gICAgICBpY29uOiBcImJvb2tcIixcbiAgICAgIHByZWZpeDogXCJwb3N0cy9cIixcbiAgICAg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
