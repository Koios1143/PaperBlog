---
date: 2024-03-11
category:
  - Note
tag:
  - Paper Read
  - Domain Adaption
  - Computer Vision
  - CVPR
author: Koios
---

# DAFormer: Improving Network Architectures and Training Strategies for Domain-Adaptive Semantic Segmentation

## Basic Information

- Lukas Hoyer, Dengxin Dai, Luc Van Gool @ ETH Zurich & MPI for Informatics
- 2022 CVPR

<center>
<img src="/DAFormer/ByJEB7hT6.png" width=400>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)

與過去的方法相比， DAFormer 在 UDA semantic segmentation 領域當中做出了劃時代的貢獻。

## 問題描述

如同過去看過的 UDA 問題描述，這一篇同樣也是先說明了 semantic segmentation 在 UDA 上的重要性。由於標記 semantic segmentation labels 的成本過高，以致於開始將研究的方向轉向如 weak-supervised 或是 semi-supervised learning，最終則是 unsuvervised learning 的 UDA。

在這一篇論文當中主要探討的是過去 UDA 的模型都是採用如 DeepLab 搭配 ResNet 或是 VGG 等架構，但是這些架構在 semantic segmentation 領域都已經是過時的產物，有許多新的架構可以得到更高的 mIoU。作者懷疑會不會其實**我們應該要試著採用更好的 backbone 去訓練，可以得到更好的結果**。

不過直覺上，如果我們用更加強大的 backbone，那麼就會有更高的機會在 source domain 上 overfitting，因此這一篇 paper 的目標是**在改採用更佳的 backbone 的同時，避免 overfitting 的問題**。

## Related Works

- Sematic Image Segmentation
- Unsupervised Domain Adaptation (UDA)
- Transformer
- Self-training

## Methodology

### Self training for UDA

一開始我們一樣先看一下這一篇論文當中會用到的 Notation 以及他對於 self training 的描述。這裡已經預設包含了 Knowledge Distillation。

- $g_{\theta}$ 表示 student model
- $h_{\phi}$ 表示 teacher model
- $N_S$ 表示 Source Domain 的資料數量
- $N_T$ 表示 Target Domain 的資料數量
- $\mathcal{X}_S = \{ x_{S}^{(i)} \}_{i=1}^{N_S}$ 表示 Source Domain 的資料
- $\mathcal{X}_T = \{ x_{T}^{(i)} \}_{i=1}^{N_T}$ 表示 Target Domain 的資料
- $\mathcal{Y}_S = \{y_S^{(i)}\}_{i=1}^{N_S}$ 表示 Source Domain 對應的 labels
- $\mathcal{Y}_T = \{ y_T^{(i)} \}_{i=1}^{N_T}$ 表示 Target Domain 對應的 labels，在 UDA 預設是不會知道的
- $H, W$ 分別表示圖片的高寬
- $\mathcal{Y}_S, \mathcal{Y}_T$ 都具有 $C$ 個共通的 classes

最 Naive 的方法是把套上 Categorical Cross Entropy Loss (CCE Loss) 期待預測的 label 跟目標相同。

$$
\mathcal{L}_S^{(i)} = - \sum_{j=1}^{H \times W} \sum_{c=1}^{C}{y_S^{(i, j, c)} \log{g_{\theta}(x_{S}^{(i)})^{(j, c)}}}
$$

然而這種方法的 performance 以及一般性都並不是很理想。Self training 的方法會使用 pseudo labelling，透過產生假想的 label 去學習。於是 pseudo label 就不是單純的 one-hot，而是包含了機率的概念，我們會選其中最大的當成是最後的答案 $p_T^{(i, j, c)}$。

$$
p_T^{(i, j, c)} = \left[c = \mathop{\arg \max}_{c'}{h_{\phi}(x_T^{(i)})^{(j, c')}}\right]
$$

此外，我們也可以去定義當前 pseudo label 信心度的標準 $q_{T}^{(i)}$。也就是說，會期待預測出來的 label 至少信心度要超過 $\tau$，這樣的結果有多少。

$$
q_T^{(i)} = \frac{\sum_{j=1}^{H \times W}{\left[ \max_{c'}{h_{\phi}(x_T^{(i)})^{(j, c')} > \tau} \right]}}{H \cdot W}
$$

:::info
這裡的 $\left[ \cdot \right]$ 是 **Iverson Bracket**，只是單純符合條件給 `1`，否則給 `0` 的符號。

$$
[P] = \begin{cases}
1 & \mathrm{if \ } P \mathrm{\ is\ true} \\
0 & \mathrm{otherwise}
\end{cases}
$$
:::

有了評斷信心水平的標準，就可以結合起來形成新的 Loss。

$$
\mathcal{L}_T^{(i)} = -\sum_{j=1}^{H \times W} \sum_{c=1}^{C}{q_T^{(i)}p_T^{(i, j, c)} \log{g_{\theta}(x_T^{(i)})^{(j, c)}}}
$$

> 也就是說我們會期待產生出來的 pseudo label 除了越準確越好，也會期待其信心水平也要是高的。

Pseudo label 的產生方式可以是 offline 也可以是 online，這裡考慮到 online 的實作比較簡單，所以採用這個方法。與 ProDA 相同，根據過去的研究，這裡會採用 Exponential Moving Average (EMA) 去更新 teacher model。

$$
\phi_{t+1} \leftarrow \alpha \phi_{t} + (1 - \alpha) \theta_t
$$

此外，student model 的訓練上也是使用 augumented data。包含了 [DAFormer](https://koios1143.github.io/KoiosBlog/posts/DACS.html)、Color Jitter、Gaussian Blur、ClassMix。

### DAFormer Network Architecture

首先，針對 backbone network 過於老舊的部分作者先透過一些實驗去尋找好的架構，他們後來發現 Transformer based model 會有更好的 mIoU。這裡選用的 Transformer 是 **SegFormer**。

<center>
<img src="/DAFormer/HJjhyQi6T.png" width=400>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)
>
> - `Src-Only`: 只訓練在 GTA dataset
> - `UDA`: 使用 GTA dataset 作為 source domain 加上 UDA 方法 adapt Cityscape dataset
> - `Oracle`: 直接使用 supervised learning 訓練 Cityscape dataset
> 
> 上述的三者分數都是以 Cityscape dataset 去評估取得
> `Rel` 用來比較 UDA 在 Oracle 的 scale 下有多強。
> $$
> \mathrm{Rel} = \frac{\mathrm{UDA}}{\mathrm{Oracle}}
> $$

可以發現到 SegFormer 的表現都比起其他架構來得好許多，並且有趣的是 DeepLabV3+ 並沒有得到比 DeepLabV2 更好的表現。

:::spoiler 更多關於模型選擇的實驗

由於 backbone 實際上包含了 Encoder 以及 Decoder 兩個部分，作者進一步去分析究竟是哪一個部分使最後得到好的結果。

<center>
<img src="/DAFormer/BJhmNmjpT.png" width=400>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)

可以發現到當 Encoder 不採用 `MiT-B5` 這種包含了 Transformer 的 encoder，得出的 performance 會有大量的下降，也就是說，Transformer 在這裡能夠提供更好的幫助。

<center>
<img src="/DAFormer/HJIp4XjpT.png" width=400>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)

進一步去研究不同大小的 Encoder 會有怎樣的影響，可以發現到通常越大的模型能夠提供更好的效益。

<center>
<img src="/DAFormer/SkKqr7ipa.png" width=400>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)

使用 Transformer based encoder 有另一個有趣的好處是，他可以很好地把不同的 classes 分開，即便這些 classes 有許多相像的地方。圖中圈起來的是各種交通工具，可以發現到 `MiT-B5` 可以有更好的 feature separation。

此外，Transformer 當中包含的 self-attention 與傳統的 CNN 不同，即便在 testing 階段能夠動態地依據當下的輸入資料的相似性來產生對應的Affinity-map，再依據得到的Affinity-map做出預測。

> 中文敘述參考 [[論文筆記] DAFormer: Improving Network Architectures and Training Strategies for Domain-Adaptive Semantic Segmentation](https://yukai880723.medium.com/%E8%AB%96%E6%96%87%E7%AD%86%E8%A8%98-daformer-improving-network-architectures-and-training-strategies-for-domain-adaptive-semantic-17351cbed578)

:::

於是，根據實驗的結果我們選擇使用 SegFormer 做為新的 backbone。

不過過去使用 Transformer based backbone 解決 semantic segmentation 通常會有個通病是在 decoder 的部分只能取得 local information。於是作者嘗試修改 decoder 的部分，把 encoder 給出不同 level 的 feature maps 處理成相同 channels 數量以及大小，再使用不同的 dilation rates 去處理。如下圖所示。

<center>
<img src="/DAFormer/HJBYcXs66.png" width=300>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)

---

***Training Strategies for UDA***

這一篇 paper 最主要的貢獻，就是解決了使用更好的 backbone 同時避免 overfitting source domain 的方法，具體而言有三個部分：***Rare Class Sampling(RCS)***, ***Thing-Class ImageNet Feature Distance(FD)***, ***Learning Rate Warmup for UDA***。以下就分別說明這三個部分的作法。

--- 

### Rare Class Sampling (RCS)

作者在實驗的過程當中發現到 DAFormer 在 Rare Classes 的 performance 在不同 random seed 的情況下有很大的不同。作者認為這是因為**若這些 rare classes 在訓練後期才出現，模型很可能已經被 common classes 干擾形成 bias，以致於難以 re-learn**。

於是，對於這些 rare classes，我們就希望讓他在訓練過程當中出現的頻率可以更高，也就有更高的機會可以學更多次、更早看到它。

定義一個 source domain class $c$ 出現的頻率 $f_c$ 如下。

$$
f_c = \frac{\sum_{i=1}^{N_S} \sum_{j=1}^{H \times W} \left[ y_S^{(i, j, c)} \right]}{N_S \cdot H \cdot W}
$$

而一個 class $c$ 被 sample 到的機率 $P(c)$ 就可以用 softmax with temperature 去定義如下。

$$
P(c) = \frac{e^{(1 - f_c) / T}}{\sum_{c' = 1}^{C} e^{1 - f_{c'} / T}}
$$

也就是說，我們會盡可能讓出現頻率越低的 class 有較高的機會被 sample 到。

### Thing-Class ImageNet Feature Distance (FD)

通常在 UDA 的 backbone 所使用的 semantic segmentation network 都會使用 ImageNet pretrained models 去初始化權重。我們理想上會預期那些 ImageNet 當中有包含的 classes 理應因此得到較好的結果。

然而，如 train 和 bus 這兩個 classes 卻反而往往得到很糟糕的結果。並且透過觀察訓練過程作者發現到，其實在訓練初期其實是能夠辨別這些 classes 的，但卻隨著訓練過程慢慢地變糟。

作者認為這是**好的 features 都被 Loss function $\mathcal{L}_S$ 搞壞所導致**。

因此，作者把這些 "bottleneck features" 拿出來，希望他們在 ImageNet 的 feature 以及訓練模型的 feature 之間的距離可以拉近，避免模型"忘記"這些 features。

不過也考慮到 ImageNet 幾乎都是訓練在 Thing-Class 上，Stuff-Class 如 `road`, `sky` 就基本上沒有。因此這裡的拉近只會針對 Thing-Classes $\mathcal{C}_{\mathrm{things}}$ 處理。

定義 $x_S^{(i)}$ 的第 $j$ 個 pixel 的 Feature Distance $d^{(i, j)}$ 如下。

$$
d^{(i, j)} = \| F_{\mathrm{ImageNet}}(x_S^{(i)})^{(j)} - F_{\theta}(x_S^{(i)})^{(j)} \|_2
$$

定義 Mask $M_{\mathrm{things}}^{(i, j)}$ 如下。

$$
M_{\mathrm{things}}^{(i, j)} = \sum_{c' = 1}^{C}{y_{S, \mathrm{small}}^{(i, j, c')}} \cdot \left[ c' \in \mathcal{C}_{\mathrm{things}} \right]
$$

> 這裡的 $y_{S, \mathrm{small}}^{(i, j, c')}$ 只是為了 downsample size，採用了 Average Pooling。
> $$
> y_{S, \mathrm{small}}^{(i, j, c')} = \left[ \mathrm{AvgPool}(y_S^c, H/H_F, W/W_F) > r \right]
> $$

如此一來就能在 Loss 上多加上一項去 regularize。

$$
\mathcal{L}_{FD}^{(i)} = \frac{\sum_{j=1}^{H_F \times W_F}{d^{(i, j) \cdot M_{\mathrm{things}}^{(i, j)}}}}{\sum_j{M_{\mathrm{things}}^{(i, j)}}}
$$

於是乎最後的整體 Loss function 也就形成。

$$
\mathcal{L} = \mathcal{L}_S + \mathcal{L}_T + \lambda_{FD}\mathcal{L}_{FD}
$$

> $\lambda_{FD}$ 是一個 hyperparameter。

### Learning Rate Warmup for UDA

過去訓練 CNN 或是 Transformer 都會習慣使用 linear learning rate warmup，這裡也加進來，他們透過實驗發現這很不錯。

$$
\eta_t = \eta_{base} \cdot t / t_{warm}
$$

## Results

### 實驗設定

在 Dataset 的使用上如同過去我們看過的 DACS 與 ProDA，都是採用 UDA 當中常見的 datasets：Cityscapes、GTA5、SYNTHIA。

實作上採用了常見的 [mmsegmentation framework](https://github.com/open-mmlab/mmsegmentation)，Network 的架構如同前面所述，encoder 採用 MiT-B5 encoder，decoder 的部分作者另外的調整時選用的 dilation rate 分別是 1, 6, 12, 18。Encoder 已經 pretrain 在 ImageNet-1K 上。

至於詳細的 hyperparameter 設定請詳閱 paper。

### Summary

這裡先簡單總結一下。

<center>
<img src="/DAFormer/ByX72fnTp.png" width=400>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)

首先看到上面的表格，可以觀察到
- 加上 Warmup 之後 performance 提升了約 6.4 mIoU (row 1 & 2)
- 加上 RCS 之後 performance 提升了約 5.8 mIoU (row 2 & 4)
- 加上 FD 之後 performance 提升了約 3.5 mIoU (row 2 & 6)
- 加上 Warmup、RCS、FD 之後 performance 提升了約 14.4 mIoU (row 1 & 7)
- 再多一點調整後可以再提升約 0.8 mIoU

<center>
<img src="/DAFormer/SkOmnfn66.png" width=400>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)

作者也給出每個 classes 在加上不同的調整後得出的結果，可以看到所有 class 經過 DAFormer 都可以有獲得提升，甚至那些 rare classes 也變得能夠預測了。

### Learning Rate Warmup

<center>
<img src="/DAFormer/ryxVFG2ap.png" width=400>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)

經過實驗後發現無論是採用 DeepLabV2 或是 SegFormer，如果搭配 Learning Rate Warmup 都對於 performance 有所提升。

### Rare Class Sampling (RCS)

<center>
<img src="/DAFormer/H1wzjfnT6.png" width=400>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)

上圖展現出 Rider 和 Bicycle 這兩個 Class 預測的結果，在沒有使用 RCS 的情況下(藍色線)，IoU 的變化很大程度跟 Random Seed 的選用有關，這一點尤其在 Bicycle 最明顯。並且也可以觀察到那些比較早開始有所提升的 Random Seed 最後得到的 IoU 也會最大。

因此作者認為這是跟圖片被 sample 到的時間有所相關，進而提出 RCS 去提升 Rare Class 被 Sample 的機率(橘色線)，可以發現搭配了 RCS 後，IoU 的變化就比較不與 Random Seed 的選擇相關，並且普遍最後的 IoU 都會高過於原本的狀況。

### Thing-Class ImageNet Feature Distance (FD)

<center>
<img src="/DAFormer/r1Rsl72Ta.png" width=400>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)

在上圖的橘色線是原本的模型隨著訓練後對於不同 class 預測的 IoU 變化。可以觀察到 Train 這個類別居然會隨著訓練時間預測結果越糟糕，而最一開始的結果其實是還不錯的。

作者認為這是因為 MiT-B5 太強，導致 overfit source domain，進而產生這樣的結果。

透過加上 FD 之後，可以看到在綠色線的部分，成功避免了預測結果變差的狀況。

此外，作者也注意到 Cityscapes 的圖片由於是透過車子上裝設攝影鏡頭去蒐集的，所以圖片底下的部分實際上並不是跟街景相關，而是自駕車車體。

<center>
<img src="/DAFormer/HJx7fQ2Tp.png" width=400>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)

此外，在畫面的上方也有部分的影像因為影像校正導致的失真如下圖所示。

<center>
<img src="/DAFormer/HkcP7mn6p.png" width=400>
</center>
</br>

> Image from [ResearchGate](https://www.researchgate.net/figure/Qualitative-results-from-the-Cityscapes-dataset-Observe-how-NetWarp-PSPNet-is-able-to_fig3_319056828)

因此，作者進一步去忽略畫面上方 15 pixels 以及畫面下方 120 pixels 的 pseudo label。另外也考慮到 Transformer 的表達能力可以更強，進一步提高 $\alpha$ 到 $0.999$，最終得到更好的結果，如上面 summary 所示。

### DAFormer Decoder

<center>
<img src="/DAFormer/rJnj4mnaa.png" width=400>
</center>
</br>

> Image from [ResearchGate](https://www.researchgate.net/figure/Qualitative-results-from-the-Cityscapes-dataset-Observe-how-NetWarp-PSPNet-is-able-to_fig3_319056828)

作者進一步去比較自己改良的 decoder 跟其他架構相比，發現到 DAFormer 搭配 Depthwise Separable Convolution 確實能夠得到好的結果。儘管 UperNet 在 Oracle 上可以得到較好的結果，但是在 UDA 上 DAFormer 仍然有更好的 performance。

<center>
<img src="/DAFormer/BJjAHmn66.png" width=700>
</center>
</br>

> Image from [Lukas Hoyer, Dengxin Dai, Luc Van Gool (2022)](https://arxiv.org/abs/2111.14887)

最終也可以看到，與過去的 SOTA 相較之下，DAFormer 成功在幾乎所有的 class 上 outperform 其他 SOTA，並且最終的 mIoU 與過去的 SOTA 都有相當大的改進。

## Contribution

- 研究不同的 backbone 架構對於 UDA performance 的影響
- 成功將 Transformer 的成功帶進 UDA 領域
    - 提出了三個方法避免 overfitting 的問題
- 只需要一張 RTX 2080 Ti GPU 訓練 16 個小時，與過去的資源消耗相較減輕甚多

## 值得一看的文章們

- [[論文筆記] DAFormer: Improving Network Architectures and Training Strategies for Domain-Adaptive Semantic Segmentation](https://yukai880723.medium.com/%E8%AB%96%E6%96%87%E7%AD%86%E8%A8%98-daformer-improving-network-architectures-and-training-strategies-for-domain-adaptive-semantic-17351cbed578)
- [[CVPR22] DAFormer: Improving Network Architectures for Domain-Adaptive Semantic Segmentation](https://www.youtube.com/watch?v=SOfN51iK2lo&ab_channel=LukasHoyer)
- [DAFormer Github](https://github.com/lhoyer/DAFormer)
- [DAFormer(CVPR2022)阅读笔记](https://zhuanlan.zhihu.com/p/500372648)
- [DAFormer Extension Paper](https://arxiv.org/pdf/2304.13615.pdf)