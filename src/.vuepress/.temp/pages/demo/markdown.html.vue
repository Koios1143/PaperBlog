<template><div><p>VuePress basically generate pages from Markdown files. So you can use it to generate documentation or blog sites easily.</p>
<p>You should create and write Markdown files, so that VuePress can convert them to different pages according to file structure.</p>
<!-- more -->
<h2 id="markdown-introduction" tabindex="-1"><a class="header-anchor" href="#markdown-introduction" aria-hidden="true">#</a> Markdown Introduction</h2>
<p>If you are a new learner and don't know how to write Markdown, please read <a href="https://theme-hope.vuejs.press/cookbook/markdown/" target="_blank" rel="noopener noreferrer">Markdown Intro<ExternalLinkIcon/></a> and <a href="https://theme-hope.vuejs.press/cookbook/markdown/demo.html" target="_blank" rel="noopener noreferrer">Markdown Demo<ExternalLinkIcon/></a>.</p>
<h2 id="markdown-config" tabindex="-1"><a class="header-anchor" href="#markdown-config" aria-hidden="true">#</a> Markdown Config</h2>
<p>VuePress introduce configuration for each markdown page using Frontmatter.</p>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>Frontmatter is a important concept in VuePress. If you don't know it, you need to read <a href="https://theme-hope.vuejs.press/cookbook/vuepress/page.html#front-matter" target="_blank" rel="noopener noreferrer">Frontmatter Introduction<ExternalLinkIcon/></a>.</p>
</div>
<h2 id="markdown-extension" tabindex="-1"><a class="header-anchor" href="#markdown-extension" aria-hidden="true">#</a> Markdown Extension</h2>
<p>The Markdown content in VuePress will be parsed by <a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="noopener noreferrer">markdown-it<ExternalLinkIcon/></a>, which supports <a href="https://github.com/markdown-it/markdown-it#syntax-extensions" target="_blank" rel="noopener noreferrer">syntax extensions<ExternalLinkIcon/></a> via markdown-it plugins.</p>
<h3 id="vuepress-enhancement" tabindex="-1"><a class="header-anchor" href="#vuepress-enhancement" aria-hidden="true">#</a> VuePress Enhancement</h3>
<p>To enrich document writing, VuePress has extended Markdown syntax.</p>
<p>For these extensions, please read <a href="https://theme-hope.vuejs.press/basic/vuepress/markdown.html" target="_blank" rel="noopener noreferrer">Markdown extensions in VuePress<ExternalLinkIcon/></a>.</p>
<h3 id="theme-enhancement" tabindex="-1"><a class="header-anchor" href="#theme-enhancement" aria-hidden="true">#</a> Theme Enhancement</h3>
<p>By using <a href="https://md-enhance.vuejs.press/" target="_blank" rel="noopener noreferrer"><code v-pre>vuepress-plugin-md-enhance</code><ExternalLinkIcon/></a>, the theme extends more Markdown syntax and provides richer writing functions.</p>
<h4 id="hint-box" tabindex="-1"><a class="header-anchor" href="#hint-box" aria-hidden="true">#</a> Hint box</h4>
<div v-pre>
<p>Safely use {{ variable }} in Markdown.</p>
</div>
<div class="hint-container info">
<p class="hint-container-title">Custom Title</p>
<p>A custom information container with <code v-pre>code</code>, <a href="#hint-box">link</a>.</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<div class="hint-container tip">
<p class="hint-container-title">Custom Title</p>
<p>A custom tip container</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">Custom Title</p>
<p>A custom warning container</p>
</div>
<div class="hint-container caution">
<p class="hint-container-title">Custom Title</p>
<p>A custom caution container</p>
</div>
<details class="hint-container details"><summary>Custom Title</summary>
<p>A custom details container</p>
</details>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/hint.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="tabs" tabindex="-1"><a class="header-anchor" href="#tabs" aria-hidden="true">#</a> Tabs</h4>
<Tabs id="89" :data='[{"id":"apple"},{"id":"banana"},{"id":"orange"}]' tab-id="fruit">
<template #title0="{ value, isActive }">apple</template>
<template #title1="{ value, isActive }">banana</template>
<template #title2="{ value, isActive }">orange</template>
<template #tab0="{ value, isActive }">
<p>Apple</p>
</template>
<template #tab1="{ value, isActive }">
<p>Banana</p>
</template>
<template #tab2="{ value, isActive }">
<p>Orange</p>
</template>
</Tabs>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/tabs.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="code-tabs" tabindex="-1"><a class="header-anchor" href="#code-tabs" aria-hidden="true">#</a> Code Tabs</h4>
<CodeTabs id="116" :data='[{"id":"pnpm"},{"id":"yarn"},{"id":"npm"}]' :active="2" tab-id="shell">
<template #title0="{ value, isActive }">pnpm</template>
<template #title1="{ value, isActive }">yarn</template>
<template #title2="{ value, isActive }">npm</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress-theme-hope
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress-theme-hope
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i <span class="token parameter variable">-D</span> vuepress-theme-hope
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
</CodeTabs>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/code-tabs.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="superscript-and-subscript" tabindex="-1"><a class="header-anchor" href="#superscript-and-subscript" aria-hidden="true">#</a> Superscript and Subscript</h4>
<p>19<sup>th</sup> H<sub>2</sub>O</p>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/sup-sub.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="align" tabindex="-1"><a class="header-anchor" href="#align" aria-hidden="true">#</a> Align</h4>
<div style="text-align:center">
<p>I am center</p>
</div>
<div style="text-align:right">
<p>I am right align</p>
</div>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/align.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="attrs" tabindex="-1"><a class="header-anchor" href="#attrs" aria-hidden="true">#</a> Attrs</h4>
<p>A <strong id="word">word</strong> having id.</p>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/attrs.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="footnote" tabindex="-1"><a class="header-anchor" href="#footnote" aria-hidden="true">#</a> Footnote</h4>
<p>This text has footnote[^first].</p>
<p>[^first]: This is footnote content</p>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/footnote.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="mark" tabindex="-1"><a class="header-anchor" href="#mark" aria-hidden="true">#</a> Mark</h4>
<p>You can mark <mark>important words</mark> .</p>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/mark.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="tasklist" tabindex="-1"><a class="header-anchor" href="#tasklist" aria-hidden="true">#</a> Tasklist</h4>
<ul>
<li>
<p>[x] Plan A</p>
</li>
<li>
<p>[ ] Plan B</p>
</li>
<li>
<p><a href="https://theme-hope.vuejs.press/guide/markdown/tasklist.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></p>
</li>
</ul>
<h4 id="image-enhancement" tabindex="-1"><a class="header-anchor" href="#image-enhancement" aria-hidden="true">#</a> Image Enhancement</h4>
<p>Support setting color scheme and size</p>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/image.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="component" tabindex="-1"><a class="header-anchor" href="#component" aria-hidden="true">#</a> Component</h4>
<VPCard v-bind='{"title":"Mr.Hope","desc":"Where there is light, there is hope","logo":"https://mister-hope.com/logo.svg","link":"https://mister-hope.com","background":"rgba(253, 230, 138, 0.15)"}' /><ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/component.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="include-files" tabindex="-1"><a class="header-anchor" href="#include-files" aria-hidden="true">#</a> Include files</h4>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/include.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="stylize" tabindex="-1"><a class="header-anchor" href="#stylize" aria-hidden="true">#</a> Stylize</h4>
<p>Donate Mr.Hope a cup of coffee. <Badge type="tip">Recommended</Badge></p>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/stylize.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="tex" tabindex="-1"><a class="header-anchor" href="#tex" aria-hidden="true">#</a> Tex</h4>
<p v-pre class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mfrac><msup><mi mathvariant="normal">∂</mi><mi>r</mi></msup><mrow><mi mathvariant="normal">∂</mi><msup><mi>ω</mi><mi>r</mi></msup></mrow></mfrac><mrow><mo fence="true">(</mo><mfrac><msup><mi>y</mi><mi>ω</mi></msup><mi>ω</mi></mfrac><mo fence="true">)</mo></mrow><mo>=</mo><mrow><mo fence="true">(</mo><mfrac><msup><mi>y</mi><mi>ω</mi></msup><mi>ω</mi></mfrac><mo fence="true">)</mo></mrow><mrow><mo fence="true">{</mo><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>y</mi><msup><mo stretchy="false">)</mo><mi>r</mi></msup><mo>+</mo><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>r</mi></munderover><mfrac><mrow><mo stretchy="false">(</mo><mo>−</mo><mn>1</mn><msup><mo stretchy="false">)</mo><mi>i</mi></msup><mi>r</mi><mo>⋯</mo><mo stretchy="false">(</mo><mi>r</mi><mo>−</mo><mi>i</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>y</mi><msup><mo stretchy="false">)</mo><mrow><mi>r</mi><mo>−</mo><mi>i</mi></mrow></msup></mrow><msup><mi>ω</mi><mi>i</mi></msup></mfrac><mo fence="true">}</mo></mrow></mrow><annotation encoding="application/x-tex">
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord" style="margin-right:0.05556em;">∂</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">ω</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.5904em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord" style="margin-right:0.05556em;">∂</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3414em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">ω</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;">ω</span></span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:3.0277em;vertical-align:-1.2777em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3414em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">ω</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;">ω</span></span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size4">{</span></span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.01389em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.5017em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">ω</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7507em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mopen">(</span><span class="mord">−</span><span class="mord">1</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8247em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span></span></span></span></span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">⋯</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.01389em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8247em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span><span class="mbin mtight">−</span><span class="mord mathnormal mtight">i</span></span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size4">}</span></span></span></span></span></span></span></p>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/tex.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="chart-js" tabindex="-1"><a class="header-anchor" href="#chart-js" aria-hidden="true">#</a> Chart.js</h4>
<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/chartjs.html" width="100%" height="450"/>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/chartjs.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="echarts" tabindex="-1"><a class="header-anchor" href="#echarts" aria-hidden="true">#</a> Echarts</h4>
<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/echarts.html" width="100%" height="800"/>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/echarts.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="flowchart" tabindex="-1"><a class="header-anchor" href="#flowchart" aria-hidden="true">#</a> Flowchart</h4>
<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/flowchart.html" width="100%" height="450"/>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/flowchart.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="markmap" tabindex="-1"><a class="header-anchor" href="#markmap" aria-hidden="true">#</a> MarkMap</h4>
<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/markmap.html" width="100%" height="380"/>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/markmap.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="mermaid" tabindex="-1"><a class="header-anchor" href="#mermaid" aria-hidden="true">#</a> Mermaid</h4>
<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/mermaid.html" width="100%" height="620"/>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/mermaid.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="code-demo" tabindex="-1"><a class="header-anchor" href="#code-demo" aria-hidden="true">#</a> Code Demo</h4>
<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/code-demo.html" width="100%" height="450"/>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/demo.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="playground" tabindex="-1"><a class="header-anchor" href="#playground" aria-hidden="true">#</a> Playground</h4>
<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/playground.html" width="100%" height="480"/>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/playground.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="kotlin-playground" tabindex="-1"><a class="header-anchor" href="#kotlin-playground" aria-hidden="true">#</a> Kotlin Playground</h4>
<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/kotlin-playground.html" width="100%" height="220"/>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/kotlin-playground.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="vue-playground" tabindex="-1"><a class="header-anchor" href="#vue-playground" aria-hidden="true">#</a> Vue Playground</h4>
<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/vue-playground.html" width="100%" height="380"/>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/vue-playground.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="sandpack-playground" tabindex="-1"><a class="header-anchor" href="#sandpack-playground" aria-hidden="true">#</a> Sandpack Playground</h4>
<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/sandpack.html" width="100%" height="380"/>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/sandpack.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
<h4 id="reveal-js" tabindex="-1"><a class="header-anchor" href="#reveal-js" aria-hidden="true">#</a> Reveal.js</h4>
<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/revealjs.html" width="100%" height="400"/>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/markdown/revealjs.html" target="_blank" rel="noopener noreferrer">View Detail<ExternalLinkIcon/></a></li>
</ul>
</div></template>


