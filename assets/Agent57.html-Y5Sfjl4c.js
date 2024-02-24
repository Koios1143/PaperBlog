const e=JSON.parse('{"key":"v-3caeec67","path":"/posts/Agent57.html","title":"Agent57: Outperforming the Atari Human Benchmark","lang":"en-US","frontmatter":{"date":"2024-02-24T00:00:00.000Z","category":["Note"],"tag":["Paper Read","Reinforcement Learning","ICML"],"description":"Agent57: Outperforming the Atari Human Benchmark Basic Information Adrià Puigdomènech Badia, Bilal Piot, Steven Kapturowski, et al. @ Google DeepMind 2020 ICML 問題描述 在 RL 當中，Atari games 是一個相當重要的 benchmark。過去的 RL 模型已經能夠在大多的 atari games 當中獲得相當不錯的 performance，例如 MuZero、R2D2，分別在 57 個遊戲當中有 51 和 52 個遊戲是 outperform 人類的。不過可惜的是，在剩下的遊戲當中這些 SoTA 就通常完全沒辦法學習。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Agent57.html"}],["meta",{"property":"og:site_name","content":"Paper Blog"}],["meta",{"property":"og:title","content":"Agent57: Outperforming the Atari Human Benchmark"}],["meta",{"property":"og:description","content":"Agent57: Outperforming the Atari Human Benchmark Basic Information Adrià Puigdomènech Badia, Bilal Piot, Steven Kapturowski, et al. @ Google DeepMind 2020 ICML 問題描述 在 RL 當中，Atari games 是一個相當重要的 benchmark。過去的 RL 模型已經能夠在大多的 atari games 當中獲得相當不錯的 performance，例如 MuZero、R2D2，分別在 57 個遊戲當中有 51 和 52 個遊戲是 outperform 人類的。不過可惜的是，在剩下的遊戲當中這些 SoTA 就通常完全沒辦法學習。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-02-24T03:59:21.000Z"}],["meta",{"property":"article:tag","content":"Paper Read"}],["meta",{"property":"article:tag","content":"Reinforcement Learning"}],["meta",{"property":"article:tag","content":"ICML"}],["meta",{"property":"article:published_time","content":"2024-02-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-24T03:59:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Agent57: Outperforming the Atari Human Benchmark\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-02-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-24T03:59:21.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Basic Information","slug":"basic-information","link":"#basic-information","children":[]},{"level":2,"title":"問題描述","slug":"問題描述","link":"#問題描述","children":[]},{"level":2,"title":"Related Works","slug":"related-works","link":"#related-works","children":[{"level":3,"title":"Never Give Up","slug":"never-give-up","link":"#never-give-up","children":[]}]},{"level":2,"title":"Methodology","slug":"methodology","link":"#methodology","children":[{"level":3,"title":"State-Action Value Function Parameterization","slug":"state-action-value-function-parameterization","link":"#state-action-value-function-parameterization","children":[]},{"level":3,"title":"Adaptive Exploration over a Family of Policies (Bandit)","slug":"adaptive-exploration-over-a-family-of-policies-bandit","link":"#adaptive-exploration-over-a-family-of-policies-bandit","children":[]},{"level":3,"title":"Backprop Through Time Window Size","slug":"backprop-through-time-window-size","link":"#backprop-through-time-window-size","children":[]},{"level":3,"title":"High-level architecture","slug":"high-level-architecture","link":"#high-level-architecture","children":[]}]},{"level":2,"title":"Results","slug":"results","link":"#results","children":[{"level":3,"title":"Settings","slug":"settings","link":"#settings","children":[]},{"level":3,"title":"State-Action Value Function Parameterization","slug":"state-action-value-function-parameterization-1","link":"#state-action-value-function-parameterization-1","children":[]},{"level":3,"title":"Backprop Through Time Window Size","slug":"backprop-through-time-window-size-1","link":"#backprop-through-time-window-size-1","children":[]},{"level":3,"title":"Adaptive Exploration","slug":"adaptive-exploration","link":"#adaptive-exploration","children":[]},{"level":3,"title":"Summary","slug":"summary","link":"#summary","children":[]}]},{"level":2,"title":"Discussion","slug":"discussion","link":"#discussion","children":[{"level":3,"title":"Contribution","slug":"contribution","link":"#contribution","children":[]}]},{"level":2,"title":"值得一看的文章們","slug":"值得一看的文章們","link":"#值得一看的文章們","children":[]}],"git":{"createdTime":1708747161000,"updatedTime":1708747161000,"contributors":[{"name":"Koios","email":"ken1357924681010@gmail.com","commits":1}]},"readingTime":{"minutes":19.88,"words":5965},"filePathRelative":"posts/Agent57.md","localizedDate":"February 24, 2024","excerpt":"<h1> Agent57: Outperforming the Atari Human Benchmark</h1>\\n<h2> Basic Information</h2>\\n<ul>\\n<li>Adrià Puigdomènech Badia, Bilal Piot, Steven Kapturowski, et al. @ Google DeepMind</li>\\n<li>2020 ICML</li>\\n</ul>\\n<h2> 問題描述</h2>\\n<p>在 RL 當中，Atari games 是一個相當重要的 benchmark。過去的 RL 模型已經能夠在大多的 atari games 當中獲得相當不錯的 performance，例如 MuZero、R2D2，分別在 57 個遊戲當中有 51 和 52 個遊戲是 outperform 人類的。不過可惜的是，在剩下的遊戲當中這些 SoTA 就通常完全沒辦法學習。</p>","autoDesc":true}');export{e as data};
