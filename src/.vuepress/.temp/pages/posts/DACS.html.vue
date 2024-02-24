<template><div><h1 id="dacs-domain-adaptation-via-cross-domain-mixed-sampling" tabindex="-1"><a class="header-anchor" href="#dacs-domain-adaptation-via-cross-domain-mixed-sampling" aria-hidden="true">#</a> DACS: Domain Adaptation via Cross-domain Mixed Sampling</h1>
<h2 id="basic-information" tabindex="-1"><a class="header-anchor" href="#basic-information" aria-hidden="true">#</a> Basic Information</h2>
<ul>
<li>2020 Release</li>
<li>2021 WACV(Winter Conference on Applications of Computer Vision)</li>
<li>Chalmers University of Technology(查爾摩斯理工大學)與 Volvo Cars 共同發表</li>
</ul>
<h2 id="what-is-domain-adaption" tabindex="-1"><a class="header-anchor" href="#what-is-domain-adaption" aria-hidden="true">#</a> What is Domain Adaption</h2>
<center>
<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*m39LhMzvVjjNLd7EwYDimA.png" width=500>
</center>
<blockquote>
<p>Image from <a href="/DACS/medium01.png" target="_blank" rel="noopener noreferrer">Medium<ExternalLinkIcon/></a></p>
</blockquote>
<p>所謂的 Domain 就是用來描述一群資料他們的分布狀況。</p>
<p>Domain Adaption 的目標是把兩個不同分佈的 Domain (Source Domain 以及 Target Domain) 投射到同一個平面上，使得同類型的資料會相近，反之則相遠。</p>
<p>舉一個在 CV 上的例子。如果我們想要訓練一個模型去做自駕車的街景物件偵測，很多時候我們並不會直接去蒐集真實的資料，像是直接有一台車會去蒐集真實街景資料，這樣所需要的成本會過大。時常我們會訓練在合成資料上(synethic data)，然後再應用在真實的世界當中。</p>
<center>
<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*jS41A2LpF1dw0GDX2ip-7A.png" width=500>
</center>
<blockquote>
<p>Image from <a href="/DACS/medium02.png" target="_blank" rel="noopener noreferrer">Medium<ExternalLinkIcon/></a></p>
</blockquote>
<p>不過這種情況下一個直覺的問題是，在 虛擬世界(Source Domain) 上也許我們能夠對各種物件去做標記 label，但是對於真實世界(Target Domain)往往會有許多我們沒有的 label、環境與虛擬世界有差距，這種差距被描述為 Domain Shift。當兩個 Domain 相差過大，Domain Shift 過高，就會導致單純在 Source Domain 上訓練的模型難以直接 apply 到 Target Domain 上。</p>
<p>因此，Domain Adaption 想解決的就是盡可能地將 Domain Shift 降低，讓我們得以用較低的成本在虛擬環境中訓練模型，然後應用在真實的環境當中。</p>
<h2 id="問題描述" tabindex="-1"><a class="header-anchor" href="#問題描述" aria-hidden="true">#</a> 問題描述</h2>
<p>近年來透過 CNN 處理 semantic segmentation(影像分割) 的模型雖然有許多，也獲得不錯的成果，不過如果遇到新的 domain，往往就會 work 不太好，尤其是從 synethic data 轉變到 real data 上的時候。</p>
<p>問題在於不同的 domain，各自的 domain distribution 會不同。只訓練在 source domain 的模型對於 target domain 的狀況缺乏認知，導致預測失準。</p>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>這就像是同理心，因為缺乏對他人的理解，擅自用自己的思維解讀，就會導致互相的不理解。</p>
</div>
<center>
<img src="/DACS/rk1NqSKF6.png" width=500>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/1412.7062" target="_blank" rel="noopener noreferrer">Liang-ChiehChen et al. (2015)<ExternalLinkIcon/></a></p>
<p>可以發現單純用 CNN 就可以得到相當好的影像分割結果。</p>
</blockquote>
<center>
<img src="/DACS/HkPw2rFFT.png" width=500>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/1804.08286" target="_blank" rel="noopener noreferrer">Yiheng Zhang et al. (2018)<ExternalLinkIcon/></a></p>
<p>直接把訓練在虛擬環境的模型應用在真實環境，結果相當糟糕。</p>
</blockquote>
<h2 id="related-works" tabindex="-1"><a class="header-anchor" href="#related-works" aria-hidden="true">#</a> Related Works</h2>
<h3 id="domain-alignment" tabindex="-1"><a class="header-anchor" href="#domain-alignment" aria-hidden="true">#</a> <em><strong>Domain Alignment</strong></em></h3>
<p>透過 adversarial learning (對抗式學習) 去拉近 source domain 以及 target domain。</p>
<p>我們可以想成現在 Segmentation Network 就是 GAN 的 Generator，然後會有一個 Discriminator 去判別現在給我的究竟是 source domain 還是 target domain 的預測結果。</p>
<center>
<img src="/DACS/BJ6EjXVFT.png" width=500>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/1802.10349" target="_blank" rel="noopener noreferrer">Yi-Hsuan Tsai et al. (2018)<ExternalLinkIcon/></a></p>
<p>兩個 Domain 中各取圖片，經過相同的 Segmentation Network，將產出的 semantic maps 做對抗式學習</p>
</blockquote>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>依照 alignment 的不同，可以分成 <em>pixel level</em>, <em>feature map level</em>, <em>semantic level</em> 等不同的做法。</p>
</div>
<p>這樣的做法之所以可行，是源自於即便 domain 不同，在 semantic maps 上的 spatial layout 以及 local context 通常並不會差太多。</p>
<p>DACS 的做法之所以能夠成功，也有部分是源自於這樣的相似性帶來的好處。</p>
<div class="hint-container tip">
<p class="hint-container-title">Tips</p>
<p>同樣以自駕車的例子來說，即便 synethic data 和 real data 的 domain 有相當大的差異，不過像是馬路、汽車、行人都還是會跟地板黏在一起，其他像是路燈、號誌、天空之類的就通常會像是在半空中。這類的 spatial layout 就相當地雷同。</p>
<center>
<img src="/DACS/rJIw9mNKT.png" width=500>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/1802.10349" target="_blank" rel="noopener noreferrer">Yi-Hsuan Tsai et al. (2018)<ExternalLinkIcon/></a></p>
</blockquote>
</div>
<h3 id="pseudo-labelling-or-self-training" tabindex="-1"><a class="header-anchor" href="#pseudo-labelling-or-self-training" aria-hidden="true">#</a> <em><strong>pseudo labelling (or self-training)</strong></em></h3>
<blockquote>
<p><a href="https://arxiv.org/abs/1802.07934" target="_blank" rel="noopener noreferrer">Adversarial Learning for Semi-Supervised Semantic Segmentation<ExternalLinkIcon/></a></p>
</blockquote>
<p>最初是為了解決 半監督式學習(Semi-Supervise Learning, SSL) 而被提出的。</p>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>所謂的半監督式學習也就是說 target domain 的資料上只有一些 labeled data，其他絕大多都是 unlabeled data，這種狀況下訓練模型就被稱為半監督式學習。</p>
<p>而半監督式學習困難的點在於雖然對於 Target Domain 有部分的認知，但是並不全面。</p>
</div>
<p>一個簡單的方法是想辦法給這些 unlabeled data 一些 pseudo label。那我們就可以用 supervise learning 的方法解決了。</p>
<p>舉例來說，先在 labeled data 上訓練一個模型，透過這個模型我們就有辦法給 unlabeled data 做 prediction，而 prediction 的結果就當作是他的 pseudo label，就可以再拿去 fine-tune model 了。</p>
<center>
<img src="/DACS/HkcLl8tYa.png" height=400>
</center>
<blockquote>
<p>Image from <a href="https://www.researchgate.net/publication/351624062_Waste_detection_in_Pomerania_non-profit_project_for_detecting_waste_in_environment?_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6Il9kaXJlY3QiLCJwYWdlIjoiX2RpcmVjdCJ9fQ" target="_blank" rel="noopener noreferrer">Sylwia Majchrowska et al. (2021)<ExternalLinkIcon/></a></p>
</blockquote>
<p>但主要的問題來自於 Domain Shift，畢竟 Source Domain 和 Target Domain 還是存在差異的，並不是所有的 Target Data 都能夠透過 Source Data 去轉移出來。</p>
<p>尤其在 <strong>Unsupervised Domain Adaption(UDA)</strong> 來說是相當大的問題，在 UDA 當中通常 Domain Shift 都會特別大。</p>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>所謂的 UDA 也就是說我們對於 Target Domain 的資料不存在任何 label。換句話說，我們對於 Target Domain 缺乏 label 上的認知。</p>
</div>
<p>對於 UDA 來說由於缺乏對於 Target Domain 的認識，一個常見的問題是產出的結果通常會傾向去預測結果為常見的 class。</p>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>對陌生人的認識，往往先從貼標籤開始。</p>
</div>
<p>例如說在自駕車的道路辨識當中鄰近人行道這種時常出現的 class，如果出現道路或甚至機車，有可能就被誤判成人行道。或是汽車比卡車更常見，導致卡車時常被預測成汽車。</p>
<center>
<img src="/DACS/Bk-o8k4Ka.png" width=600>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/1810.07911" target="_blank" rel="noopener noreferrer">Yang Zou et al (2018)<ExternalLinkIcon/></a></p>
<p>看 column 4，只有 pseudo labeling 的例子</p>
</blockquote>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>雖然已經有 paper 提出如 CBST 的方法來降低這種問題，但在邊界上往往還是難以有好的結果。</p>
</div>
<h3 id="mixing" tabindex="-1"><a class="header-anchor" href="#mixing" aria-hidden="true">#</a> <em><strong>Mixing</strong></em></h3>
<p>Mixing 基本上就是從 training image 拿出兩張，透過一些方式混在一起，產生一個新的 training image。最初被用於把 unlabeled image 混合成新的圖片，是一種 data augumentation 的技巧。</p>
<blockquote>
<p>像是 Mixup 這種 data augumentation 方法也是屬於 Mixing 的一種。</p>
</blockquote>
<p>DACS 當中使用的是 ClassMix 這種 Mixing 方法。</p>
<p>具體來說，ClassMix 的步驟</p>
<ol>
<li>把兩個圖片 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">(A, B)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mclose">)</span></span></span></span> 先轉成 semantic map <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><msub><mi>S</mi><mi>A</mi></msub><mo separator="true">,</mo><msub><mi>S</mi><mi>B</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">(S_A, S_B)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">A</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05017em;">B</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></li>
<li>把 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>S</mi><mi>A</mi></msub></mrow><annotation encoding="application/x-tex">S_A</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">A</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 其中一半的 classes 對應的 semantic map 做出一個 binary mask <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>M</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">(M)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mclose">)</span></span></span></span></li>
<li>把 mask <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>M</mi></mrow><annotation encoding="application/x-tex">M</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span></span></span></span> apply 在 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>A</mi></mrow><annotation encoding="application/x-tex">A</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal">A</span></span></span></span> 上，跟 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>B</mi></mrow><annotation encoding="application/x-tex">B</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span></span></span></span> 合成出 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>X</mi><mi>A</mi></msub></mrow><annotation encoding="application/x-tex">X_A</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">A</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>。</li>
<li>把 mask <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>M</mi></mrow><annotation encoding="application/x-tex">M</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span></span></span></span> apply 在 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>S</mi><mi>A</mi></msub></mrow><annotation encoding="application/x-tex">S_A</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">A</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 上，跟 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>S</mi><mi>B</mi></msub></mrow><annotation encoding="application/x-tex">S_B</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05017em;">B</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 合成出 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>X</mi><mi>A</mi></msub></mrow><annotation encoding="application/x-tex">X_A</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">A</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 對應的 semantic map <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>Y</mi><mi>A</mi></msub></mrow><annotation encoding="application/x-tex">Y_A</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">A</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></li>
</ol>
<center>
<img src="/DACS/SyS0v-EKa.png" width=400>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/2007.07936" target="_blank" rel="noopener noreferrer">Viktor Olsson et al. (2020)<ExternalLinkIcon/></a></p>
</blockquote>
<p>這樣的做法有趣的是能夠將 semantic segmentation 在邊界上往往會出現誤差的問題解決。</p>
<p>邊界上的判斷會因為圖片跟相鄰環境的相似導致模糊不清。但透過剪貼則可以造成不同環境的突兀感，進而解決這個問題。因此這時候 pseudo labelling 就能夠比較好發揮作用。</p>
<center>
<img src="/DACS/rJPUFZVKT.png" width=400>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/2007.07936" target="_blank" rel="noopener noreferrer">Viktor Olsson et al. (2020)<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="methodology" tabindex="-1"><a class="header-anchor" href="#methodology" aria-hidden="true">#</a> Methodology</h2>
<h3 id="naive-mixing-to-uda" tabindex="-1"><a class="header-anchor" href="#naive-mixing-to-uda" aria-hidden="true">#</a> <em><strong>Naive Mixing to UDA</strong></em></h3>
<p>最 Naive 的做法就是照著 ClassMix 的方法，將 unlebelled dataset Mixing 成新的 dataset，把 labelled dataset 以及 mixed dataset 拿去訓練。</p>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>在 UDA 當中，unlabelled dataset 就是 target domain dataset。</p>
</div>
<center>
<img src="/DACS/SJQLRM4Yp.png" width=400>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/2007.08702" target="_blank" rel="noopener noreferrer">Wilhelm Tranheden at al.<ExternalLinkIcon/></a></p>
</blockquote>
<p>但是這種做法實際上效果很糟糕。像是 <code v-pre>sidewalk</code> 被預測成 <code v-pre>road</code>，<code v-pre>rider</code> 被預測成 <code v-pre>person</code> 之類的，許多的 class 都被其他 class 覆蓋。這樣的問題只在 target domain 上會發生，這跟前面提到只使用 pseudo labelling to UDA 會造成的問題是吻合的。</p>
<center>
<img src="/DACS/H1Ug77VFp.png" width=600>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/2007.08702" target="_blank" rel="noopener noreferrer">Wilhelm Tranheden at al.<ExternalLinkIcon/></a></p>
<p>單純的 Naive Mixing 往往在邊界上會有許多誤判的 class</p>
</blockquote>
<div class="hint-container tip">
<p class="hint-container-title">Tips</p>
<p>這種相似的 class 相鄰而導致的誤判被稱為 <em><strong>class conflation</strong></em></p>
</div>
<hr>
<h3 id="domain-adaption-via-corss-domain-mixed-sampling-dacs" tabindex="-1"><a class="header-anchor" href="#domain-adaption-via-corss-domain-mixed-sampling-dacs" aria-hidden="true">#</a> <em><strong>Domain Adaption via Corss-domain mixed Sampling (DACS)</strong></em></h3>
<p>DACS 的核心做法是不單只是跟 Target Domain 去 mixing，而是將 Source 跟 Target 一起 Mix。如此一來， Target Domain 以及 Source Domain 的關聯性就能被連結起來，降低 Domain Shift。</p>
<center>
<img src="/DACS/SkRQIQNKp.png" width=400>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/2007.08702" target="_blank" rel="noopener noreferrer">Wilhelm Tranheden at al.<ExternalLinkIcon/></a></p>
</blockquote>
<p>詳細的步驟具體來說</p>
<ol>
<li>從 Source Domain <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><msub><mi>D</mi><mi>S</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">(D_S)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05764em;">S</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span> 取出圖片與 lebel <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><msub><mi>X</mi><mi>S</mi></msub><mo separator="true">,</mo><msub><mi>Y</mi><mi>S</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">(X_S, Y_S)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05764em;">S</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05764em;">S</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></li>
<li>從 Target Domain <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><msub><mi>D</mi><mi>T</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">(D_T)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.13889em;">T</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span> 取出圖片 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>X</mi><mi>T</mi></msub></mrow><annotation encoding="application/x-tex">X_T</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.13889em;">T</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></li>
<li>透過 segmentation network <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>f</mi><mi>θ</mi></msub></mrow><annotation encoding="application/x-tex">f_{\theta}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.1076em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">θ</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 取得 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>X</mi><mi>T</mi></msub></mrow><annotation encoding="application/x-tex">X_T</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.13889em;">T</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 的 pseudo label <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><msub><mi>Y</mi><mi>T</mi></msub><mo>^</mo></mover></mrow><annotation encoding="application/x-tex">\hat{Y_T}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0968em;vertical-align:-0.15em;"></span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9468em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.13889em;">T</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">^</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></li>
<li>將 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><msub><mi>X</mi><mi>S</mi></msub><mo separator="true">,</mo><msub><mi>Y</mi><mi>S</mi></msub><mo stretchy="false">)</mo><mo separator="true">,</mo><mo stretchy="false">(</mo><msub><mi>X</mi><mi>T</mi></msub><mo separator="true">,</mo><mover accent="true"><msub><mi>Y</mi><mi>T</mi></msub><mo>^</mo></mover><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">(X_S, Y_S), (X_T, \hat{Y_T})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1968em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05764em;">S</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05764em;">S</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.13889em;">T</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9468em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.13889em;">T</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span><span style="top:-3.2523em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">^</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span><span class="mclose">)</span></span></span></span> 經過 ClassMix 得到 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><msub><mi>X</mi><mi>M</mi></msub><mo separator="true">,</mo><msub><mi>Y</mi><mi>M</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">(X_M,Y_M)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.10903em;">M</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.10903em;">M</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></li>
<li>把 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><msub><mi>X</mi><mi>S</mi></msub><mo separator="true">,</mo><msub><mi>Y</mi><mi>S</mi></msub><mo stretchy="false">)</mo><mo separator="true">,</mo><mo stretchy="false">(</mo><msub><mi>X</mi><mi>M</mi></msub><mo separator="true">,</mo><msub><mi>Y</mi><mi>M</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">(X_S, Y_S), (X_M, Y_M)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05764em;">S</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05764em;">S</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.10903em;">M</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.10903em;">M</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span> 拿去訓練。</li>
</ol>
<center>
<img src="/DACS/ryJwP7NFT.png" width=400>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/2007.08702" target="_blank" rel="noopener noreferrer">Wilhelm Tranheden at al.<ExternalLinkIcon/></a></p>
</blockquote>
<p>在 Loss 的設計上也相當直覺，就是希望 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>X</mi><mi>S</mi></msub></mrow><annotation encoding="application/x-tex">X_S</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05764em;">S</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 的預測結果要接近 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>Y</mi><mi>S</mi></msub></mrow><annotation encoding="application/x-tex">Y_S</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05764em;">S</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>，<span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>X</mi><mi>M</mi></msub></mrow><annotation encoding="application/x-tex">X_M</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.10903em;">M</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 的結果要接近 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>Y</mi><mi>M</mi></msub></mrow><annotation encoding="application/x-tex">Y_M</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.10903em;">M</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>。</p>
<ul>
<li><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>H</mi></mrow><annotation encoding="application/x-tex">H</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.08125em;">H</span></span></span></span>: Cross-Entropy</li>
<li><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>λ</mi></mrow><annotation encoding="application/x-tex">\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span>: 調整 Mixing 部分的影響程度</li>
</ul>
<p v-pre class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi mathvariant="script">L</mi><mo stretchy="false">(</mo><mi>θ</mi><mo stretchy="false">)</mo><mo>=</mo><mi mathvariant="double-struck">E</mi><mo stretchy="false">[</mo><mi>H</mi><mo stretchy="false">(</mo><msub><mi>f</mi><mi>θ</mi></msub><mo stretchy="false">(</mo><msub><mi>X</mi><mi>S</mi></msub><mo stretchy="false">)</mo><mo separator="true">,</mo><msub><mi>Y</mi><mi>S</mi></msub><mo stretchy="false">)</mo><mo>+</mo><mi>λ</mi><mi>H</mi><mo stretchy="false">(</mo><msub><mi>f</mi><mi>θ</mi></msub><mo stretchy="false">(</mo><msub><mi>X</mi><mi>M</mi></msub><mo stretchy="false">)</mo><mo separator="true">,</mo><msub><mi>Y</mi><mi>M</mi></msub><mo stretchy="false">)</mo><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">
\mathcal{L}(\theta) = \mathbb{E}[H(f_{\theta}(X_S), Y_S) + \lambda H(f_{\theta}(X_M), Y_M)]
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathcal">L</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathbb">E</span><span class="mopen">[</span><span class="mord mathnormal" style="margin-right:0.08125em;">H</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.1076em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">θ</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05764em;">S</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05764em;">S</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">λ</span><span class="mord mathnormal" style="margin-right:0.08125em;">H</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.1076em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">θ</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.10903em;">M</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.10903em;">M</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)]</span></span></span></span></span></p>
<h2 id="results" tabindex="-1"><a class="header-anchor" href="#results" aria-hidden="true">#</a> Results</h2>
<h3 id="實驗設定" tabindex="-1"><a class="header-anchor" href="#實驗設定" aria-hidden="true">#</a> <em><strong>實驗設定</strong></em></h3>
<p>在 segmentation network 的設定上參考了許多過去的研究，選擇採用 DeepLab v2 搭配 ResNet101 作為 backbone。</p>
<p>ResNet101 是 pretrained on ImageNet 跟 MSCOCO。而 Hyperparameter 的設定基本上跟 <a href="https://arxiv.org/abs/1802.10349" target="_blank" rel="noopener noreferrer">Yi-Hsuan Tsai et al. (2018)<ExternalLinkIcon/></a> 一樣。</p>
<p>在 Mixing 的方法上雖然任何 based on binary mask 的 Mixing 都可以使用，不過這裡最主要都是使用 ClassMix。</p>
<h3 id="dataset" tabindex="-1"><a class="header-anchor" href="#dataset" aria-hidden="true">#</a> <em><strong>Dataset</strong></em></h3>
<p>在 synthetic-to-real 有一些常見的 benchmarks。</p>
<ul>
<li>GTA5 -&gt; Cityscapes</li>
<li>SYNTHIA -&gt; Cityscapes</li>
</ul>
<p>GTA5 以及 SYNTHIA 都是虛擬世界當中的影像，而 Cityscapes 則是現實世界當中的影像。</p>
<h4 id="cityscapes" tabindex="-1"><a class="header-anchor" href="#cityscapes" aria-hidden="true">#</a> Cityscapes</h4>
<p>照片是在城市當中開車拍下的各種照片</p>
<center>
<img src="/DACS/rkIRSEEKa.png" width=500>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/1604.01685" target="_blank" rel="noopener noreferrer">Marius Cordts et al. (2016)<ExternalLinkIcon/></a></p>
</blockquote>
<ul>
<li>2975 training images</li>
<li>19 classes</li>
</ul>
<h4 id="gta5" tabindex="-1"><a class="header-anchor" href="#gta5" aria-hidden="true">#</a> GTA5</h4>
<p>照片是在 GTA5 下拍攝的</p>
<center>
<img src="/DACS/SkcnE4Etp.png" width=400>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/1608.02192" target="_blank" rel="noopener noreferrer">Stephan R. Richter et al.<ExternalLinkIcon/></a></p>
</blockquote>
<ul>
<li>24966 synthetic training images</li>
<li>19 classes
<ul>
<li>可對應到 Cityscapes 的 classes</li>
</ul>
</li>
</ul>
<h4 id="synthia" tabindex="-1"><a class="header-anchor" href="#synthia" aria-hidden="true">#</a> SYNTHIA</h4>
<p>照片是在 Unity 建構的 virtual city 下拍攝</p>
<center>
<img src="/DACS/ByESNENFT.png" width=600>
</center>
<blockquote>
<p>Image from <a href="https://ieeexplore.ieee.org/document/7780721" target="_blank" rel="noopener noreferrer">GermanRos et al. (2016)<ExternalLinkIcon/></a></p>
</blockquote>
<ul>
<li>9400 synthetic training images</li>
<li>16(or 13) classes
<ul>
<li>都會對到 Cityscapes 的 classes</li>
<li>13 個 classes 的版本是少了 <code v-pre>Wall</code>, <code v-pre>Fence</code>, <code v-pre>Pole</code></li>
</ul>
</li>
</ul>
<h3 id="gta5-cityscapes" tabindex="-1"><a class="header-anchor" href="#gta5-cityscapes" aria-hidden="true">#</a> GTA5 -&gt; Cityscapes</h3>
<center>
<img src="/DACS/HkQQI44tp.png">
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/2007.08702" target="_blank" rel="noopener noreferrer">Wilhelm Tranheden at al.<ExternalLinkIcon/></a></p>
<p>其他的 Model 都是 DeepLab-v2，他們選擇其中 Performance 最好的，但 Backbone 並不一定要是 ResNet 101</p>
</blockquote>
<center>
<img src="/DACS/ry3mwEEFT.png" width=600>
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/2007.08702" target="_blank" rel="noopener noreferrer">Wilhelm Tranheden at al.<ExternalLinkIcon/></a></p>
<p><code v-pre>Source</code> 是只有使用 source domain 去 train 的模型</p>
</blockquote>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>可以發現</p>
<ul>
<li>單純用 source domain 去訓練顯然很糟糕，只對簡單的 class 像是 <code v-pre>Road</code>, <code v-pre>Build</code>, <code v-pre>Veg</code>, <code v-pre>Sky</code>, <code v-pre>Person</code>, <code v-pre>Car</code> 這些普遍做得不錯的 class 有還不錯的 Performance</li>
<li>DACS 在絕大多數並非是最佳的結果上都不會離最佳太遠，除了 <code v-pre>SW</code> 有點偏以及 <code v-pre>Train</code> 真的很糟</li>
</ul>
</div>
<h3 id="synthia-cityscapes" tabindex="-1"><a class="header-anchor" href="#synthia-cityscapes" aria-hidden="true">#</a> SYNTHIA -&gt; Cityscapes</h3>
<p>考慮到 SYNTHIA 有些 paper 使用 16 個 classes，有些是 13 個 class 的版本，所以在數據上 mIoU 有兩列分別表示 13 個平均跟 16 個的平均。</p>
<center>
<img src="/DACS/B1TyqVNFT.png">
</center>
<blockquote>
<p>Image from <a href="https://arxiv.org/abs/2007.08702" target="_blank" rel="noopener noreferrer">Wilhelm Tranheden at al.<ExternalLinkIcon/></a></p>
</blockquote>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>可以發現</p>
<ul>
<li>單純用 source domain 去訓練顯然很糟糕，甚至對 <code v-pre>Road</code> 的 Performance 都不太好</li>
<li>DACS 在絕大多數並非是最佳的結果上都不會離最佳太遠，除了 <code v-pre>SW</code> 頗偏</li>
</ul>
</div>
<h3 id="some-issues-about-evaluation" tabindex="-1"><a class="header-anchor" href="#some-issues-about-evaluation" aria-hidden="true">#</a> Some issues about evaluation</h3>
<p>他們認為在其他的 paper 有不少人最後給的結果之所以那麼好看是因為</p>
<ol>
<li>Cityscapes 並沒有 testset</li>
<li>他們選擇用 validation set 判斷要不要 early stop，這個 validation set 也跟最後評估的 set 是一樣的</li>
<li>針對 validation set 挑選 hyperparameters (?)</li>
</ol>
<p>所以他們認為這樣不太公平，畢竟在 Validation set 做得很棒不能直接表達在整體會表達很棒。
他們也試著用相同的手段訓練模型，然後拿到了</p>
<ul>
<li>GTA5
<ul>
<li>Baseline: 35.68% (+2.83%)</li>
<li>DACS: 53.84% (+1.7%) (BEST)</li>
</ul>
</li>
<li>SYNTHIA
<ul>
<li>DACS (13 classes): 55.98% (+1.17%) (1.02% to BEST)</li>
<li>DACS (16 classes): 49.10% (+0.76%) (0.7% to BEST)</li>
</ul>
</li>
</ul>
<h2 id="contribution" tabindex="-1"><a class="header-anchor" href="#contribution" aria-hidden="true">#</a> Contribution</h2>
<ul>
<li>Apply SSL method on ClassMix to UDA</li>
<li>Introduce a simple framework with high-performance</li>
<li>Beat SOTA in GTA5 to Cityscape</li>
</ul>
<h2 id="值得一看的文章們" tabindex="-1"><a class="header-anchor" href="#值得一看的文章們" aria-hidden="true">#</a> 值得一看的文章們</h2>
<ul>
<li><a href="https://ithelp.ithome.com.tw/articles/10278756" target="_blank" rel="noopener noreferrer">【Day 24】半監督式學習（Semi-supervised Learning）（上）<ExternalLinkIcon/></a></li>
<li><a href="https://ithelp.ithome.com.tw/articles/10279435" target="_blank" rel="noopener noreferrer">【Day 25】半監督式學習（Semi-supervised Learning）（下）<ExternalLinkIcon/></a></li>
<li><a href="https://hackmd.io/@akshayk07/ByhfvJ7XP" target="_blank" rel="noopener noreferrer">Notes on “DACS: Domain Adaptation via Cross-domain Mixed Sampling”<ExternalLinkIcon/></a></li>
<li><a href="https://d246810g2000.medium.com/%E7%89%A9%E4%BB%B6%E5%81%B5%E6%B8%AC%E7%9A%84%E9%A0%98%E5%9F%9F%E8%87%AA%E9%81%A9%E6%87%89-domain-adaptation-65df2c9ffe76" target="_blank" rel="noopener noreferrer">物件偵測的領域自適應 (Domain Adaptation)<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/1802.07934" target="_blank" rel="noopener noreferrer">Adversarial Learning for Semi-Supervised Semantic Segmentation<ExternalLinkIcon/></a></li>
<li><a href="https://www.v7labs.com/blog/domain-adaptation-guide" target="_blank" rel="noopener noreferrer">Domain Adaptation in Computer Vision: Everything You Need to Know<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/1906.01916" target="_blank" rel="noopener noreferrer">Semi-supervised semantic segmentation needs strong, varied perturbations<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/2007.07936" target="_blank" rel="noopener noreferrer">ClassMix: Segmentation-Based Data Augmentation for Semi-Supervised Learning<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/1810.07911" target="_blank" rel="noopener noreferrer">Domain Adaptation for Semantic Segmentation via Class-Balanced Self-Training<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/1802.10349" target="_blank" rel="noopener noreferrer">Learning to Adapt Structured Output Space for Semantic Segmentation<ExternalLinkIcon/></a></li>
</ul>
</div></template>


