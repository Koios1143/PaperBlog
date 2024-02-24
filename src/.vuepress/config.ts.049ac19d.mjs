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
  //   name: "Koios",
  //   url: "https://koios1143.github.io/",
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
    description: "An AI/ML Developer",
    intro: "/intro.html",
    roundAvatar: true,
    medias: {
      GitHub: "https://github.com/Koios1143",
      Discord: "https://discordapp.com/users/561559537539088385",
      Email: "mailto:koioslin0825@gmail.com",
      Facebook: "https://www.facebook.com/Koios1143/",
      Linkedin: "https://www.linkedin.com/in/ho-kun-lin-296864200/"
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
    Valine("dNxxlKadN1px8JkoC9vGhfgF-MdYXbMMI", "VeQKFkbj9KqhJ8GaZBhLCD6o")
  ]
  // Enable it with pwa
  // shouldPrefetch: false,
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52dWVwcmVzcy9jb25maWcudHMiLCAic3JjLy52dWVwcmVzcy90aGVtZS50cyIsICJzcmMvLnZ1ZXByZXNzL25hdmJhci50cyIsICJzcmMvLnZ1ZXByZXNzL3NpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC9ibG9nX3YzL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9yb290L2Jsb2dfdjMvc3JjLy52dWVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvYmxvZ192My9zcmMvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZVVzZXJDb25maWcgfSBmcm9tIFwidnVlcHJlc3NcIjtcbmltcG9ydCB7IGhvcGVUaGVtZSB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5pbXBvcnQgdGhlbWUgZnJvbSBcIi4vdGhlbWUuanNcIjtcbmltcG9ydCB7IFZhbGluZSB9IGZyb20gXCJ2YWxpbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XG4gIGJhc2U6IFwiL0tvaW9zQmxvZy9cIixcblxuICBsYW5nOiBcImVuLVVTXCIsXG4gIHRpdGxlOiBcIktvaW9zIEJsb2dcIixcbiAgZGVzY3JpcHRpb246IFwiQSBzaW1wbGUgYmxvZyBidWlsZCB3aXRoIHZ1ZXByZXNzLXRoZW1lLWhvcGVcIixcblxuICB0aGVtZSxcblxuICBwbHVnaW5zOiBbXG4gICAgVmFsaW5lKFwiZE54eGxLYWROMXB4OEprb0M5dkdoZmdGLU1kWVhiTU1JXCIsXCJWZVFLRmtiajlLcWhKOEdhWkJoTENENm9cIiksXG4gIF1cblxuICAvLyBFbmFibGUgaXQgd2l0aCBwd2FcbiAgLy8gc2hvdWxkUHJlZmV0Y2g6IGZhbHNlLFxufSk7IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC9ibG9nX3YzL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9yb290L2Jsb2dfdjMvc3JjLy52dWVwcmVzcy90aGVtZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcm9vdC9ibG9nX3YzL3NyYy8udnVlcHJlc3MvdGhlbWUudHNcIjtpbXBvcnQgeyBob3BlVGhlbWUgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuaW1wb3J0IG5hdmJhciBmcm9tIFwiLi9uYXZiYXIuanNcIjtcbmltcG9ydCBzaWRlYmFyIGZyb20gXCIuL3NpZGViYXIuanNcIjtcbmltcG9ydCB7IE1SX0hPUEVfQVZBVEFSIH0gZnJvbSBcIi4vbG9nby5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBob3BlVGhlbWUoe1xuICBob3N0bmFtZTogXCJodHRwczovL21pc3Rlci1ob3BlLmdpdGh1Yi5pb1wiLFxuXG4gIC8vIGF1dGhvcjoge1xuICAvLyAgIG5hbWU6IFwiS29pb3NcIixcbiAgLy8gICB1cmw6IFwiaHR0cHM6Ly9rb2lvczExNDMuZ2l0aHViLmlvL1wiLFxuICAvLyB9LFxuICBcbiAgaWNvbkFzc2V0czogXCJmb250YXdlc29tZS13aXRoLWJyYW5kc1wiLFxuXG4gIGxvZ286IFwiL2F2YXRhci5qcGdcIiwvL1wiaHR0cHM6Ly90aGVtZS1ob3BlLWFzc2V0cy52dWVqcy5wcmVzcy9sb2dvLnN2Z1wiLFxuXG4gIHJlcG86IFwidnVlcHJlc3MtdGhlbWUtaG9wZS92dWVwcmVzcy10aGVtZS1ob3BlXCIsXG5cbiAgZG9jc0RpcjogXCJzcmNcIixcblxuICAvLyBuYXZiYXJcbiAgbmF2YmFyLFxuXG4gIC8vIHNpZGViYXJcbiAgc2lkZWJhcixcblxuICBmb290ZXI6IFwiRGVmYXVsdCBmb290ZXJcIixcblxuICBkaXNwbGF5Rm9vdGVyOiB0cnVlLFxuXG4gIGVuY3J5cHQ6IHtcbiAgICBjb25maWc6IHtcbiAgICAgIC8vIFwiL2RlbW8vZW5jcnlwdC5odG1sXCI6IFtcIjEyMzRcIl0sXG4gICAgfSxcbiAgfSxcblxuICBibG9nOiB7XG4gICAgZGVzY3JpcHRpb246IFwiQW4gQUkvTUwgRGV2ZWxvcGVyXCIsXG4gICAgaW50cm86IFwiL2ludHJvLmh0bWxcIixcbiAgICByb3VuZEF2YXRhcjogdHJ1ZSxcbiAgICBtZWRpYXM6IHtcbiAgICAgIEdpdEh1YjogXCJodHRwczovL2dpdGh1Yi5jb20vS29pb3MxMTQzXCIsXG4gICAgICBEaXNjb3JkOiBcImh0dHBzOi8vZGlzY29yZGFwcC5jb20vdXNlcnMvNTYxNTU5NTM3NTM5MDg4Mzg1XCIsXG4gICAgICBFbWFpbDogXCJtYWlsdG86a29pb3NsaW4wODI1QGdtYWlsLmNvbVwiLFxuICAgICAgRmFjZWJvb2s6IFwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL0tvaW9zMTE0My9cIixcbiAgICAgIExpbmtlZGluOiBcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9oby1rdW4tbGluLTI5Njg2NDIwMC9cIixcbiAgICAgIC8vIFJzczogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXG4gICAgICAvLyBUd2l0dGVyOiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcbiAgICB9LFxuICB9LFxuXG4gIHBhZ2VJbmZvOiBbXCJPcmlnaW5hbFwiLCBcIkRhdGVcIiwgXCJQYWdlVmlld1wiLCBcIlJlYWRpbmdUaW1lXCIsIFwiQ2F0ZWdvcnlcIiwgXCJUYWdcIl0sXG4gIFxuICBtZXRhTG9jYWxlczoge1xuICAgIGVkaXRMaW5rOiBcIkVkaXQgdGhpcyBwYWdlIG9uIEdpdEh1YlwiLFxuICB9LFxuXG4gIC8vIGVuYWJsZSBpdCB0byBwcmV2aWV3IGFsbCBjaGFuZ2VzIGluIHRpbWVcbiAgLy8gaG90UmVsb2FkOiB0cnVlLFxuXG4gIHBsdWdpbnM6IHtcbiAgICBibG9nOiB0cnVlLFxuXG4gICAgLy8gaW5zdGFsbCBAd2FsaW5lL2NsaWVudCBiZWZvcmUgZW5hYmxpbmcgaXRcbiAgICAvLyBXQVJOSU5HOiBUaGlzIGlzIGEgdGVzdCBzZXJ2ZXIgZm9yIGRlbW8gb25seS5cbiAgICAvLyBZb3Ugc2hvdWxkIGNyZWF0ZSBhbmQgdXNlIHlvdXIgb3duIGNvbW1lbnQgc2VydmljZSBpbiBwcm9kdWN0aW9uLlxuICAgIC8vIGNvbW1lbnQ6IHtcbiAgICAvLyAgIHByb3ZpZGVyOiBcIldhbGluZVwiLFxuICAgIC8vICAgc2VydmVyVVJMOiBcImh0dHBzOi8vd2FsaW5lLWNvbW1lbnQudnVlanMucHJlc3NcIixcbiAgICAvLyB9LFxuICAgIFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgIGNvbXBvbmVudHM6IFtcIkJhZGdlXCIsIFwiVlBDYXJkXCJdLFxuICAgIH0sXG4gICAgY29weUNvZGU6IHtcbiAgICAgIGR1cmF0aW9uOiAwLFxuICAgIH0sXG4gICAgc2VhcmNoUHJvOiB0cnVlLFxuICAgIGZlZWQ6e1xuICAgICAgcnNzOiB0cnVlLFxuICAgICAgYXRvbTogdHJ1ZSxcbiAgICAgIGpzb246IHRydWVcbiAgICB9LFxuICAgIC8vIGFsbCBmZWF0dXJlcyBhcmUgZW5hYmxlZCBmb3IgZGVtbywgb25seSBwcmVzZXJ2ZSBmZWF0dXJlcyB5b3UgbmVlZCBoZXJlXG4gICAgbWRFbmhhbmNlOiB7XG4gICAgICBhbGlnbjogdHJ1ZSxcbiAgICAgIGF0dHJzOiB0cnVlLFxuICAgICAgY29kZXRhYnM6IHRydWUsXG4gICAgICBjb21wb25lbnQ6IHRydWUsXG4gICAgICBkZW1vOiB0cnVlLFxuICAgICAgZmlndXJlOiB0cnVlLFxuICAgICAgaW1nTGF6eWxvYWQ6IHRydWUsXG4gICAgICBpbWdTaXplOiB0cnVlLFxuICAgICAgaW5jbHVkZTogdHJ1ZSxcbiAgICAgIG1hcms6IHRydWUsXG4gICAgICBzdHlsaXplOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBtYXRjaGVyOiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgICAgcmVwbGFjZXI6ICh7IHRhZyB9KSA9PiB7XG4gICAgICAgICAgICBpZiAodGFnID09PSBcImVtXCIpXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGFnOiBcIkJhZGdlXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJ0aXBcIiB9LFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiUmVjb21tZW5kZWRcIixcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHN1YjogdHJ1ZSxcbiAgICAgIHN1cDogdHJ1ZSxcbiAgICAgIHRhYnM6IHRydWUsXG4gICAgICB2UHJlOiB0cnVlLFxuICAgICAgaGludDogdHJ1ZSxcblxuICAgICAgLy8gaW5zdGFsbCBjaGFydC5qcyBiZWZvcmUgZW5hYmxpbmcgaXRcbiAgICAgIC8vIGNoYXJ0OiB0cnVlLFxuXG4gICAgICAvLyBpbnNlcnQgY29tcG9uZW50IGVhc2lseVxuXG4gICAgICAvLyBpbnN0YWxsIGVjaGFydHMgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgICAvLyBlY2hhcnRzOiB0cnVlLFxuXG4gICAgICAvLyBpbnN0YWxsIGZsb3djaGFydC50cyBiZWZvcmUgZW5hYmxpbmcgaXRcbiAgICAgIC8vIGZsb3djaGFydDogdHJ1ZSxcblxuICAgICAgLy8gZ2ZtIHJlcXVpcmVzIG1hdGhqYXgtZnVsbCB0byBwcm92aWRlIHRleCBzdXBwb3J0XG4gICAgICAvLyBnZm06IHRydWUsXG5cbiAgICAgIC8vIGluc3RhbGwga2F0ZXggYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgICBrYXRleDogdHJ1ZSxcblxuICAgICAgLy8gaW5zdGFsbCBtYXRoamF4LWZ1bGwgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgICAvLyBtYXRoamF4OiB0cnVlLFxuXG4gICAgICAvLyBpbnN0YWxsIG1lcm1haWQgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgICAvLyBtZXJtYWlkOiB0cnVlLFxuXG4gICAgICAvLyBwbGF5Z3JvdW5kOiB7XG4gICAgICAvLyAgIHByZXNldHM6IFtcInRzXCIsIFwidnVlXCJdLFxuICAgICAgLy8gfSxcblxuICAgICAgLy8gaW5zdGFsbCByZXZlYWwuanMgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgICAvLyByZXZlYWxKczoge1xuICAgICAgLy8gICBwbHVnaW5zOiBbXCJoaWdobGlnaHRcIiwgXCJtYXRoXCIsIFwic2VhcmNoXCIsIFwibm90ZXNcIiwgXCJ6b29tXCJdLFxuICAgICAgLy8gfSxcblxuICAgICAgLy8gaW5zdGFsbCBAdnVlL3JlcGwgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgICAvLyB2dWVQbGF5Z3JvdW5kOiB0cnVlLFxuXG4gICAgICAvLyBpbnN0YWxsIHNhbmRwYWNrLXZ1ZTMgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgICAvLyBzYW5kcGFjazogdHJ1ZSxcbiAgICB9LFxuXG4gICAgLy8gaW5zdGFsbCB2dWVwcmVzcy1wbHVnaW4tcHdhMiBhbmQgdW5jb21tZW50IHRoZXNlIGlmIHlvdSB3YW50IGEgUFdBXG4gICAgLy8gcHdhOiB7XG4gICAgLy8gICBmYXZpY29uOiBcIi9mYXZpY29uLmljb1wiLFxuICAgIC8vICAgY2FjaGVIVE1MOiB0cnVlLFxuICAgIC8vICAgY2FjaGVQaWM6IHRydWUsXG4gICAgLy8gICBhcHBlbmRCYXNlOiB0cnVlLFxuICAgIC8vICAgYXBwbGU6IHtcbiAgICAvLyAgICAgaWNvbjogXCIvYXNzZXRzL2ljb24vYXBwbGUtaWNvbi0xNTIucG5nXCIsXG4gICAgLy8gICAgIHN0YXR1c0JhckNvbG9yOiBcImJsYWNrXCIsXG4gICAgLy8gICB9LFxuICAgIC8vICAgbXNUaWxlOiB7XG4gICAgLy8gICAgIGltYWdlOiBcIi9hc3NldHMvaWNvbi9tcy1pY29uLTE0NC5wbmdcIixcbiAgICAvLyAgICAgY29sb3I6IFwiI2ZmZmZmZlwiLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIG1hbmlmZXN0OiB7XG4gICAgLy8gICAgIGljb25zOiBbXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtbWFzay01MTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgLy8gICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtbWFzay0xOTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtNTEyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLTE5Mi5wbmdcIixcbiAgICAvLyAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgXSxcbiAgICAvLyAgICAgc2hvcnRjdXRzOiBbXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgbmFtZTogXCJEZW1vXCIsXG4gICAgLy8gICAgICAgICBzaG9ydF9uYW1lOiBcIkRlbW9cIixcbiAgICAvLyAgICAgICAgIHVybDogXCIvZGVtby9cIixcbiAgICAvLyAgICAgICAgIGljb25zOiBbXG4gICAgLy8gICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2d1aWRlLW1hc2thYmxlLnBuZ1wiLFxuICAgIC8vICAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAvLyAgICAgICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgLy8gICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgIF0sXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgXSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC9ibG9nX3YzL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9yb290L2Jsb2dfdjMvc3JjLy52dWVwcmVzcy9uYXZiYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvYmxvZ192My9zcmMvLnZ1ZXByZXNzL25hdmJhci50c1wiO2ltcG9ydCB7IG5hdmJhciB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IG5hdmJhcihbXG4gIFwiL1wiLFxuICAvLyB7XG4gIC8vICAgdGV4dDogXCJQb3N0c1wiLFxuICAvLyAgIGljb246IFwicGVuLXRvLXNxdWFyZVwiLFxuICAvLyAgIHByZWZpeDogXCIvcG9zdHMvXCIsXG4gIC8vICAgY2hpbGRyZW46IFtcbiAgLy8gICAgIC8vIHtcbiAgLy8gICAgIC8vICAgdGV4dDogXCJBcHBsZVwiLFxuICAvLyAgICAgLy8gICBpY29uOiBcInBlbi10by1zcXVhcmVcIixcbiAgLy8gICAgIC8vICAgcHJlZml4OiBcImFwcGxlL1wiLFxuICAvLyAgICAgLy8gICBjaGlsZHJlbjogW1xuICAvLyAgICAgLy8gICAgIHsgdGV4dDogXCJBcHBsZTFcIiwgaWNvbjogXCJwZW4tdG8tc3F1YXJlXCIsIGxpbms6IFwiMVwiIH0sXG4gIC8vICAgICAvLyAgICAgeyB0ZXh0OiBcIkFwcGxlMlwiLCBpY29uOiBcInBlbi10by1zcXVhcmVcIiwgbGluazogXCIyXCIgfSxcbiAgLy8gICAgIC8vICAgICBcIjNcIixcbiAgLy8gICAgIC8vICAgICBcIjRcIixcbiAgLy8gICAgIC8vICAgXSxcbiAgLy8gICAgIC8vIH0sXG4gIC8vICAgICAvLyBcInN0cmF3YmVycnlcIixcbiAgLy8gICBdLFxuICAvLyB9LFxuICAvLyB7XG4gIC8vICAgdGV4dDogXCJWMiBEb2NzXCIsXG4gIC8vICAgaWNvbjogXCJib29rXCIsXG4gIC8vICAgbGluazogXCJodHRwczovL3RoZW1lLWhvcGUudnVlanMucHJlc3MvXCIsXG4gIC8vIH0sXG5dKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvYmxvZ192My9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC9ibG9nX3YzL3NyYy8udnVlcHJlc3Mvc2lkZWJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcm9vdC9ibG9nX3YzL3NyYy8udnVlcHJlc3Mvc2lkZWJhci50c1wiO2ltcG9ydCB7IHNpZGViYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBzaWRlYmFyKHtcbiAgXCIvXCI6IFtcbiAgICBcIlwiLFxuICAgIHtcbiAgICAgIHRleHQ6IFwiQXJ0aWNsZXNcIixcbiAgICAgIGljb246IFwiYm9va1wiLFxuICAgICAgcHJlZml4OiBcInBvc3RzL1wiLFxuICAgICAgY2hpbGRyZW46IFwic3RydWN0dXJlXCIsXG4gICAgfSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5UCxTQUFTLHdCQUF3Qjs7O0FDQW5DLFNBQVMsaUJBQWlCOzs7QUNBeEIsU0FBUyxjQUFjO0FBRWhSLElBQU8saUJBQVEsT0FBTztBQUFBLEVBQ3BCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJGLENBQUM7OztBQzVCMFAsU0FBUyxlQUFlO0FBRW5SLElBQU8sa0JBQVEsUUFBUTtBQUFBLEVBQ3JCLEtBQUs7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQ0YsQ0FBQzs7O0FGUEQsSUFBTyxnQkFBUSxVQUFVO0FBQUEsRUFDdkIsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPVixZQUFZO0FBQUEsRUFFWixNQUFNO0FBQUE7QUFBQSxFQUVOLE1BQU07QUFBQSxFQUVOLFNBQVM7QUFBQTtBQUFBLEVBR1Q7QUFBQTtBQUFBLEVBR0E7QUFBQSxFQUVBLFFBQVE7QUFBQSxFQUVSLGVBQWU7QUFBQSxFQUVmLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQTtBQUFBLElBRVI7QUFBQSxFQUNGO0FBQUEsRUFFQSxNQUFNO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYixPQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixRQUFRO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEs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
