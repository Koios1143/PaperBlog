const e=JSON.parse('{"key":"v-25c9f246","path":"/posts/HRDA.html","title":"HRDA: Context-Aware High-Resolution Domain-Adaptive Semantic Segmentation","lang":"en-US","frontmatter":{"date":"2024-03-16T00:00:00.000Z","category":["Note"],"tag":["Paper Read","Domain Adaption","Computer Vision","ECCV"],"author":"Koios","description":"HRDA: Context-Aware High-Resolution Domain-Adaptive Semantic Segmentation Basic Information Lukas Hoyer, Dengxin Dai, Luc Van Gool @ ETH Zurich &amp; MPI for Informatics 2022 ECCV 問題描述 這篇 paper 如同 DAFormer 關注在 UDA for semantic segmentation 。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/PaperBlog/posts/HRDA.html"}],["meta",{"property":"og:site_name","content":"Paper Blog"}],["meta",{"property":"og:title","content":"HRDA: Context-Aware High-Resolution Domain-Adaptive Semantic Segmentation"}],["meta",{"property":"og:description","content":"HRDA: Context-Aware High-Resolution Domain-Adaptive Semantic Segmentation Basic Information Lukas Hoyer, Dengxin Dai, Luc Van Gool @ ETH Zurich &amp; MPI for Informatics 2022 ECCV 問題描述 這篇 paper 如同 DAFormer 關注在 UDA for semantic segmentation 。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-03-16T12:23:58.000Z"}],["meta",{"property":"article:author","content":"Koios"}],["meta",{"property":"article:tag","content":"Paper Read"}],["meta",{"property":"article:tag","content":"Domain Adaption"}],["meta",{"property":"article:tag","content":"Computer Vision"}],["meta",{"property":"article:tag","content":"ECCV"}],["meta",{"property":"article:published_time","content":"2024-03-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-16T12:23:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"HRDA: Context-Aware High-Resolution Domain-Adaptive Semantic Segmentation\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-16T12:23:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Koios\\"}]}"]]},"headers":[{"level":2,"title":"Basic Information","slug":"basic-information","link":"#basic-information","children":[]},{"level":2,"title":"問題描述","slug":"問題描述","link":"#問題描述","children":[]},{"level":2,"title":"Related Works","slug":"related-works","link":"#related-works","children":[]},{"level":2,"title":"Methodology","slug":"methodology","link":"#methodology","children":[{"level":3,"title":"Preliminary","slug":"preliminary","link":"#preliminary","children":[]},{"level":3,"title":"Overview","slug":"overview","link":"#overview","children":[]},{"level":3,"title":"Context and Detail Crop","slug":"context-and-detail-crop","link":"#context-and-detail-crop","children":[]},{"level":3,"title":"Multi-Resolution Fusion","slug":"multi-resolution-fusion","link":"#multi-resolution-fusion","children":[]},{"level":3,"title":"Pseudo-Label Generation with Overlapping Sliding Window","slug":"pseudo-label-generation-with-overlapping-sliding-window","link":"#pseudo-label-generation-with-overlapping-sliding-window","children":[]}]},{"level":2,"title":"Results","slug":"results","link":"#results","children":[{"level":3,"title":"實驗設定","slug":"實驗設定","link":"#實驗設定","children":[]},{"level":3,"title":"Overview","slug":"overview-1","link":"#overview-1","children":[]},{"level":3,"title":"Influence of Resolution and Crop Size on UDA","slug":"influence-of-resolution-and-crop-size-on-uda","link":"#influence-of-resolution-and-crop-size-on-uda","children":[]},{"level":3,"title":"Crop Size Selection","slug":"crop-size-selection","link":"#crop-size-selection","children":[]},{"level":3,"title":"Memory Usage Comparison","slug":"memory-usage-comparison","link":"#memory-usage-comparison","children":[]},{"level":3,"title":"Ablation Study","slug":"ablation-study","link":"#ablation-study","children":[]}]},{"level":2,"title":"Contribution","slug":"contribution","link":"#contribution","children":[]},{"level":2,"title":"值得一看的文章們","slug":"值得一看的文章們","link":"#值得一看的文章們","children":[]}],"git":{"createdTime":1710591838000,"updatedTime":1710591838000,"contributors":[{"name":"Koios","email":"ken1357924681010@gmail.com","commits":1}]},"readingTime":{"minutes":14.29,"words":4288},"filePathRelative":"posts/HRDA.md","localizedDate":"March 16, 2024","excerpt":"<h1> HRDA: Context-Aware High-Resolution Domain-Adaptive Semantic Segmentation</h1>\\n<h2> Basic Information</h2>\\n<ul>\\n<li>Lukas Hoyer, Dengxin Dai, Luc Van Gool @ ETH Zurich &amp; MPI for Informatics</li>\\n<li>2022 ECCV</li>\\n</ul>\\n<h2> 問題描述</h2>\\n<p>這篇 paper 如同 DAFormer 關注在 UDA for semantic segmentation 。</p>","autoDesc":true}');export{e as data};
