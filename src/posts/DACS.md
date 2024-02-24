---
date: 2024-01-20
category:
  - Note
tag:
  - Paper Read
  - Domain Adaption
  - Computer Vision
  - WACV
---

# DACS: Domain Adaptation via Cross-domain Mixed Sampling

## Basic Information
- 2020 Release
- 2021 WACV(Winter Conference on Applications of Computer Vision)
- Chalmers University of Technology(查爾摩斯理工大學)與 Volvo Cars 共同發表

## What is Domain Adaption

<center>
<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*m39LhMzvVjjNLd7EwYDimA.png" width=500>
</center>

> Image from [Medium](/DACS/medium01.png)

所謂的 Domain 就是用來描述一群資料他們的分布狀況。

Domain Adaption 的目標是把兩個不同分佈的 Domain (Source Domain 以及 Target Domain) 投射到同一個平面上，使得同類型的資料會相近，反之則相遠。

舉一個在 CV 上的例子。如果我們想要訓練一個模型去做自駕車的街景物件偵測，很多時候我們並不會直接去蒐集真實的資料，像是直接有一台車會去蒐集真實街景資料，這樣所需要的成本會過大。時常我們會訓練在合成資料上(synethic data)，然後再應用在真實的世界當中。

<center>
<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*jS41A2LpF1dw0GDX2ip-7A.png" width=500>
</center>

> Image from [Medium](/DACS/medium02.png)

不過這種情況下一個直覺的問題是，在 虛擬世界(Source Domain) 上也許我們能夠對各種物件去做標記 label，但是對於真實世界(Target Domain)往往會有許多我們沒有的 label、環境與虛擬世界有差距，這種差距被描述為 Domain Shift。當兩個 Domain 相差過大，Domain Shift 過高，就會導致單純在 Source Domain 上訓練的模型難以直接 apply 到 Target Domain 上。

因此，Domain Adaption 想解決的就是盡可能地將 Domain Shift 降低，讓我們得以用較低的成本在虛擬環境中訓練模型，然後應用在真實的環境當中。

## 問題描述

近年來透過 CNN 處理 semantic segmentation(影像分割) 的模型雖然有許多，也獲得不錯的成果，不過如果遇到新的 domain，往往就會 work 不太好，尤其是從 synethic data 轉變到 real data 上的時候。

問題在於不同的 domain，各自的 domain distribution 會不同。只訓練在 source domain 的模型對於 target domain 的狀況缺乏認知，導致預測失準。

:::info
這就像是同理心，因為缺乏對他人的理解，擅自用自己的思維解讀，就會導致互相的不理解。
:::

<center>
<img src="/DACS/rk1NqSKF6.png" width=500>
</center>

> Image from [Liang-ChiehChen et al. (2015)](https://arxiv.org/abs/1412.7062)
> 
> 可以發現單純用 CNN 就可以得到相當好的影像分割結果。

<center>
<img src="/DACS/HkPw2rFFT.png" width=500>
</center>

> Image from [Yiheng Zhang et al. (2018)](https://arxiv.org/abs/1804.08286)
> 
> 直接把訓練在虛擬環境的模型應用在真實環境，結果相當糟糕。

## Related Works

### ***Domain Alignment***

透過 adversarial learning (對抗式學習) 去拉近 source domain 以及 target domain。

我們可以想成現在 Segmentation Network 就是 GAN 的 Generator，然後會有一個 Discriminator 去判別現在給我的究竟是 source domain 還是 target domain 的預測結果。

<center>
<img src="/DACS/BJ6EjXVFT.png" width=500>
</center>

> Image from [Yi-Hsuan Tsai et al. (2018)](https://arxiv.org/abs/1802.10349)
> 
> 兩個 Domain 中各取圖片，經過相同的 Segmentation Network，將產出的 semantic maps 做對抗式學習


:::info
依照 alignment 的不同，可以分成 *pixel level*, *feature map level*, *semantic level* 等不同的做法。
:::

這樣的做法之所以可行，是源自於即便 domain 不同，在 semantic maps 上的 spatial layout 以及 local context 通常並不會差太多。

DACS 的做法之所以能夠成功，也有部分是源自於這樣的相似性帶來的好處。

:::tip
同樣以自駕車的例子來說，即便 synethic data 和 real data 的 domain 有相當大的差異，不過像是馬路、汽車、行人都還是會跟地板黏在一起，其他像是路燈、號誌、天空之類的就通常會像是在半空中。這類的 spatial layout 就相當地雷同。

<center>
<img src="/DACS/rJIw9mNKT.png" width=500>
</center>

> Image from [Yi-Hsuan Tsai et al. (2018)](https://arxiv.org/abs/1802.10349)
:::

### ***pseudo labelling (or self-training)***

> [Adversarial Learning for Semi-Supervised Semantic Segmentation](https://arxiv.org/abs/1802.07934)

最初是為了解決 半監督式學習(Semi-Supervise Learning, SSL) 而被提出的。

:::info
所謂的半監督式學習也就是說 target domain 的資料上只有一些 labeled data，其他絕大多都是 unlabeled data，這種狀況下訓練模型就被稱為半監督式學習。

而半監督式學習困難的點在於雖然對於 Target Domain 有部分的認知，但是並不全面。
:::

一個簡單的方法是想辦法給這些 unlabeled data 一些 pseudo label。那我們就可以用 supervise learning 的方法解決了。

舉例來說，先在 labeled data 上訓練一個模型，透過這個模型我們就有辦法給 unlabeled data 做 prediction，而 prediction 的結果就當作是他的 pseudo label，就可以再拿去 fine-tune model 了。

<center>
<img src="/DACS/HkcLl8tYa.png" height=400>
</center>

> Image from [Sylwia Majchrowska et al. (2021)](https://www.researchgate.net/publication/351624062_Waste_detection_in_Pomerania_non-profit_project_for_detecting_waste_in_environment?_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6Il9kaXJlY3QiLCJwYWdlIjoiX2RpcmVjdCJ9fQ)

但主要的問題來自於 Domain Shift，畢竟 Source Domain 和 Target Domain 還是存在差異的，並不是所有的 Target Data 都能夠透過 Source Data 去轉移出來。

尤其在 **Unsupervised Domain Adaption(UDA)** 來說是相當大的問題，在 UDA 當中通常 Domain Shift 都會特別大。

:::info
所謂的 UDA 也就是說我們對於 Target Domain 的資料不存在任何 label。換句話說，我們對於 Target Domain 缺乏 label 上的認知。
:::

對於 UDA 來說由於缺乏對於 Target Domain 的認識，一個常見的問題是產出的結果通常會傾向去預測結果為常見的 class。

:::info
對陌生人的認識，往往先從貼標籤開始。
:::

例如說在自駕車的道路辨識當中鄰近人行道這種時常出現的 class，如果出現道路或甚至機車，有可能就被誤判成人行道。或是汽車比卡車更常見，導致卡車時常被預測成汽車。

<center>
<img src="/DACS/Bk-o8k4Ka.png" width=600>
</center>

> Image from [Yang Zou et al (2018)](https://arxiv.org/abs/1810.07911) 
> 
> 看 column 4，只有 pseudo labeling 的例子

:::info
雖然已經有 paper 提出如 CBST 的方法來降低這種問題，但在邊界上往往還是難以有好的結果。
:::

### ***Mixing***

Mixing 基本上就是從 training image 拿出兩張，透過一些方式混在一起，產生一個新的 training image。最初被用於把 unlabeled image 混合成新的圖片，是一種 data augumentation 的技巧。

> 像是 Mixup 這種 data augumentation 方法也是屬於 Mixing 的一種。

DACS 當中使用的是 ClassMix 這種 Mixing 方法。

具體來說，ClassMix 的步驟
1. 把兩個圖片 $(A, B)$ 先轉成 semantic map $(S_A, S_B)$
2. 把 $S_A$ 其中一半的 classes 對應的 semantic map 做出一個 binary mask $(M)$
3. 把 mask $M$ apply 在 $A$ 上，跟 $B$ 合成出 $X_A$。
4. 把 mask $M$ apply 在 $S_A$ 上，跟 $S_B$ 合成出 $X_A$ 對應的 semantic map $Y_A$

<center>
<img src="/DACS/SyS0v-EKa.png" width=400>
</center>

> Image from [Viktor Olsson et al. (2020)](https://arxiv.org/abs/2007.07936)

這樣的做法有趣的是能夠將 semantic segmentation 在邊界上往往會出現誤差的問題解決。

邊界上的判斷會因為圖片跟相鄰環境的相似導致模糊不清。但透過剪貼則可以造成不同環境的突兀感，進而解決這個問題。因此這時候 pseudo labelling 就能夠比較好發揮作用。

<center>
<img src="/DACS/rJPUFZVKT.png" width=400>
</center>

> Image from [Viktor Olsson et al. (2020)](https://arxiv.org/abs/2007.07936)

## Methodology

### ***Naive Mixing to UDA***

最 Naive 的做法就是照著 ClassMix 的方法，將 unlebelled dataset Mixing 成新的 dataset，把 labelled dataset 以及 mixed dataset 拿去訓練。

:::info
在 UDA 當中，unlabelled dataset 就是 target domain dataset。
:::

<center>
<img src="/DACS/SJQLRM4Yp.png" width=400>
</center>

> Image from [Wilhelm Tranheden at al.](https://arxiv.org/abs/2007.08702)

但是這種做法實際上效果很糟糕。像是 `sidewalk` 被預測成 `road`，`rider` 被預測成 `person` 之類的，許多的 class 都被其他 class 覆蓋。這樣的問題只在 target domain 上會發生，這跟前面提到只使用 pseudo labelling to UDA 會造成的問題是吻合的。

<center>
<img src="/DACS/H1Ug77VFp.png" width=600>
</center>

> Image from [Wilhelm Tranheden at al.](https://arxiv.org/abs/2007.08702)
> 
> 單純的 Naive Mixing 往往在邊界上會有許多誤判的 class

:::tip
這種相似的 class 相鄰而導致的誤判被稱為 ***class conflation***
:::

---

### ***Domain Adaption via Corss-domain mixed Sampling (DACS)***

DACS 的核心做法是不單只是跟 Target Domain 去 mixing，而是將 Source 跟 Target 一起 Mix。如此一來， Target Domain 以及 Source Domain 的關聯性就能被連結起來，降低 Domain Shift。

<center>
<img src="/DACS/SkRQIQNKp.png" width=400>
</center>

> Image from [Wilhelm Tranheden at al.](https://arxiv.org/abs/2007.08702)

詳細的步驟具體來說
1. 從 Source Domain $(D_S)$ 取出圖片與 lebel $(X_S, Y_S)$
2. 從 Target Domain $(D_T)$ 取出圖片 $X_T$
3. 透過 segmentation network $f_{\theta}$ 取得 $X_T$ 的 pseudo label $\hat{Y_T}$
4. 將 $(X_S, Y_S), (X_T, \hat{Y_T})$ 經過 ClassMix 得到 $(X_M,Y_M)$
5. 把 $(X_S, Y_S), (X_M, Y_M)$ 拿去訓練。

<center>
<img src="/DACS/ryJwP7NFT.png" width=400>
</center>

> Image from [Wilhelm Tranheden at al.](https://arxiv.org/abs/2007.08702)

在 Loss 的設計上也相當直覺，就是希望 $X_S$ 的預測結果要接近 $Y_S$，$X_M$ 的結果要接近 $Y_M$。

- $H$: Cross-Entropy
- $\lambda$: 調整 Mixing 部分的影響程度

$$
\mathcal{L}(\theta) = \mathbb{E}[H(f_{\theta}(X_S), Y_S) + \lambda H(f_{\theta}(X_M), Y_M)]
$$

## Results

### ***實驗設定***

在 segmentation network 的設定上參考了許多過去的研究，選擇採用 DeepLab v2 搭配 ResNet101 作為 backbone。

ResNet101 是 pretrained on ImageNet 跟 MSCOCO。而 Hyperparameter 的設定基本上跟 [Yi-Hsuan Tsai et al. (2018)](https://arxiv.org/abs/1802.10349) 一樣。

在 Mixing 的方法上雖然任何 based on binary mask 的 Mixing 都可以使用，不過這裡最主要都是使用 ClassMix。

### ***Dataset***

在 synthetic-to-real 有一些常見的 benchmarks。
- GTA5 -> Cityscapes
- SYNTHIA -> Cityscapes

GTA5 以及 SYNTHIA 都是虛擬世界當中的影像，而 Cityscapes 則是現實世界當中的影像。

#### Cityscapes
照片是在城市當中開車拍下的各種照片

<center>
<img src="/DACS/rkIRSEEKa.png" width=500>
</center>

> Image from [Marius Cordts et al. (2016)](https://arxiv.org/abs/1604.01685)

- 2975 training images
- 19 classes

#### GTA5
照片是在 GTA5 下拍攝的

<center>
<img src="/DACS/SkcnE4Etp.png" width=400>
</center>

> Image from [Stephan R. Richter et al.](https://arxiv.org/abs/1608.02192)

- 24966 synthetic training images
- 19 classes
    - 可對應到 Cityscapes 的 classes

#### SYNTHIA
照片是在 Unity 建構的 virtual city 下拍攝

<center>
<img src="/DACS/ByESNENFT.png" width=600>
</center>

> Image from [GermanRos et al. (2016)](https://ieeexplore.ieee.org/document/7780721)

- 9400 synthetic training images
- 16(or 13) classes
    - 都會對到 Cityscapes 的 classes
    - 13 個 classes 的版本是少了 `Wall`, `Fence`, `Pole`

### GTA5 -> Cityscapes

<center>
<img src="/DACS/HkQQI44tp.png">
</center>

> Image from [Wilhelm Tranheden at al.](https://arxiv.org/abs/2007.08702)
>
> 其他的 Model 都是 DeepLab-v2，他們選擇其中 Performance 最好的，但 Backbone 並不一定要是 ResNet 101

<center>
<img src="/DACS/ry3mwEEFT.png" width=600>
</center>

> Image from [Wilhelm Tranheden at al.](https://arxiv.org/abs/2007.08702)
>
> `Source` 是只有使用 source domain 去 train 的模型

:::info
可以發現

- 單純用 source domain 去訓練顯然很糟糕，只對簡單的 class 像是 `Road`, `Build`, `Veg`, `Sky`, `Person`, `Car` 這些普遍做得不錯的 class 有還不錯的 Performance
- DACS 在絕大多數並非是最佳的結果上都不會離最佳太遠，除了 `SW` 有點偏以及 `Train` 真的很糟
:::

### SYNTHIA -> Cityscapes

考慮到 SYNTHIA 有些 paper 使用 16 個 classes，有些是 13 個 class 的版本，所以在數據上 mIoU 有兩列分別表示 13 個平均跟 16 個的平均。

<center>
<img src="/DACS/B1TyqVNFT.png">
</center>

> Image from [Wilhelm Tranheden at al.](https://arxiv.org/abs/2007.08702)

:::info
可以發現

- 單純用 source domain 去訓練顯然很糟糕，甚至對 `Road` 的 Performance 都不太好
- DACS 在絕大多數並非是最佳的結果上都不會離最佳太遠，除了 `SW` 頗偏
:::

### Some issues about evaluation

他們認為在其他的 paper 有不少人最後給的結果之所以那麼好看是因為
1. Cityscapes 並沒有 testset
2. 他們選擇用 validation set 判斷要不要 early stop，這個 validation set 也跟最後評估的 set 是一樣的
3. 針對 validation set 挑選 hyperparameters (?)

所以他們認為這樣不太公平，畢竟在 Validation set 做得很棒不能直接表達在整體會表達很棒。
他們也試著用相同的手段訓練模型，然後拿到了

- GTA5
    - Baseline: 35.68% (+2.83%)
    - DACS: 53.84% (+1.7%) (BEST)
- SYNTHIA
    - DACS (13 classes): 55.98% (+1.17%) (1.02% to BEST)
    - DACS (16 classes): 49.10% (+0.76%) (0.7% to BEST)

## Contribution
- Apply SSL method on ClassMix to UDA
- Introduce a simple framework with high-performance
- Beat SOTA in GTA5 to Cityscape

## 值得一看的文章們

- [【Day 24】半監督式學習（Semi-supervised Learning）（上）](https://ithelp.ithome.com.tw/articles/10278756)
- [【Day 25】半監督式學習（Semi-supervised Learning）（下）](https://ithelp.ithome.com.tw/articles/10279435)
- [Notes on “DACS: Domain Adaptation via Cross-domain Mixed Sampling”](https://hackmd.io/@akshayk07/ByhfvJ7XP)
- [物件偵測的領域自適應 (Domain Adaptation)](https://d246810g2000.medium.com/%E7%89%A9%E4%BB%B6%E5%81%B5%E6%B8%AC%E7%9A%84%E9%A0%98%E5%9F%9F%E8%87%AA%E9%81%A9%E6%87%89-domain-adaptation-65df2c9ffe76)
- [Adversarial Learning for Semi-Supervised Semantic Segmentation](https://arxiv.org/abs/1802.07934)
- [Domain Adaptation in Computer Vision: Everything You Need to Know](https://www.v7labs.com/blog/domain-adaptation-guide)
- [Semi-supervised semantic segmentation needs strong, varied perturbations](https://arxiv.org/abs/1906.01916)
- [ClassMix: Segmentation-Based Data Augmentation for Semi-Supervised Learning](https://arxiv.org/abs/2007.07936)
- [Domain Adaptation for Semantic Segmentation via Class-Balanced Self-Training](https://arxiv.org/abs/1810.07911)
- [Learning to Adapt Structured Output Space for Semantic Segmentation](https://arxiv.org/abs/1802.10349)