---
date: 2024-03-17
category:
  - Note
tag:
  - Paper Read
  - Regularization
  - JMLR
author: Koios
---

# Dropout: A Simple Way to Prevent Neural Networks from Overfitting

## Basic Information

- Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, Ilya Sutskever, Ruslan Salakhutdinov @ Toronto University
- 2014 JMLR

## 問題描述

在近年來發現到 Neural Network 參數越多就有越強大的表達能力，並且通常會有更好的表現。不過隨著參數量的上升，我們也發現到模型越來越會傾向於 Overfitting。

這樣的狀況之所以會出現有可能有幾個原因
- 資料不足，導致過度複雜的模型直接學習到 dataset 本身
- 資料具有偏差，導致複雜的模型學習過於有偏差

一個理想上必定能夠避免 Overfitting 問題的解法是把所有可能的 Network Parameters 給出的輸出取平均，那就必然會考慮到所有的面向。然而，很顯然地，這樣的方法會有過多的計算量。

作者從 theory of the role of sex in evolution 當中獲得啟發。在有性生殖的過程當中會融合雙親的基因，過程當中也會有一些機率出現 random mutation。從生物學的角度來看，有性生殖能夠讓子代有部分雙親的優勢，使得子代能夠適應整個環境。

作者從啟發當中發想提出了 Dropout，有效地避免 Overfitting。

## Related Works

### Denoising Autoencoders (DAEs)

Dropout 在做的事情可以視為是在 Neural Network 的 hidden units 加上 noise。

過去類似的作法出現在 DAEs 當中。DAEs 作為一種 Autoencoder 的類別，同樣也包含了 Encoder 以及 Decoder。理想上將輸入經過 Encoder 與 Decoder 之後能夠還原出輸入的原貌。

DAE 的做法是對 input 加上 noise，藉此讓模型能夠學習到更多的特徵，避免了 Overfitting。

<center>
<img src="/Dropout/rJ-GJe4Cp.png" width=500>
</center>
</br>

> Image from [wikipedia](https://commons.wikimedia.org/wiki/File:Denoising-autoencoder.png)

與 DAE 不同，Dropout 針對 hidden units 加上 noise，並且發現這樣的做法實際上對於訓練有相當好的幫助。

## Methodology

### Overview

整個 Dropout 的做法簡單來說就是兩件事情。
1. 訓練過程中讓每個 hidden units 都有 $p$ 的機率不被使用到

<center>
<img src="/Dropout/BJkXxg4C6.png" width=400>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

2. 測試過程中讓每個 hidden units 的輸出結果都乘上機率 $p$ 作為輸出

<center>
<img src="/Dropout/SJB9le4R6.png" width=400>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

每個 hidden units 有機率 $p$ 不被選到，$n$ 個 units 組成的模型就像是有 $2^n$ 種不同模型一樣，卻又不會有過高的計算量。

### Model Description

首先說明這篇 paper 使用的一些 notation 跟對 Neural Network 的描述。

- $L$ 表示 Neural Network hidden layer 數量
- $l \in \{1, \dots, L\}$ 表示每個 hidden layer 的編號
- $z^{(l)}$ 表示 layer $l$ 的輸入
- $y^{(l)}$ 表示 layer $l$ 的輸出
    - $y^{(0)} = x$ 表示 input
- $W^{(l)}, \mathbf{b}^{(l)}$ 表示 layer $l$ 的 weights 和 biases
- $f$ 表示 activation function

於是對於 hidden unit $i$ 可以描述其輸入與輸出如下

$$
\begin{align*}
z_i^{(l + 1)} &= \mathbf{w}_i^{(l + 1)}\mathbf{y}^{(l)} + b_i^{(l + 1)} \\
y_i^{(l + 1)} &= f(z_i^{(l + 1)})
\end{align*}
$$

加上了 dropout 之後，每個 hidden unit 都會有機率 $p$ 在訓練過程中不被考慮到，因此對於上一層的 hidden unit $j$ 來說，他的輸出會被 $p$ 所影響如下。

$$
\begin{align*}
r_j^{(l)} &\sim \mathrm{Bernoulli}(p) \\
\tilde{\mathbf{y}}^{(l)} &= \mathbf{r}^{(l)} * \mathbf{y}^{(l)}
\end{align*}
$$

而對於這一層 hidden unit $i$ 的輸入輸出就會變成底下的樣子。

$$
\begin{align*}
z_i^{(l + 1)} &= \mathbf{w}_i^{(l + 1)}\tilde{\mathbf{y}}^{(l)} + b_i^{(l + 1)} \\
y_i^{(l + 1)} &= f(z_i^{(l + 1)})
\end{align*}
$$

<center>
<img src="/Dropout/BJ-jVxEAa.png" width=500>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

而在測試階段，則是把輸出乘上機率 $p$ 如下

$$
W_{test}^{(l)} = p W^{(l)}
$$

### Learning Dropout Nets

***Backpropagation***

- 使用 dropout 的模型在訓練過程當中那些被暫時移除的 hidden unit 梯度會是 $0$
- Dropout 也可以搭配其他的 Regularization 方法如 L1，加上後會再進一步提升效果

***Unsupervised Pretraining***

- Dropout 也可以應用在 pretrained model fine-tuning
- 由於 dropout 最後輸出會乘上 $p$，因此 pretrained weight 要先乘 $1/p$

## Results

### Datasets

為了測試 Dropout 的性能以及通用性，作者選了許多不同領域的資料集如下

<center>
<img src="/Dropout/S1rzOxECp.png" width=600>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

針對不同的 datasets，作者去挑了在該領域的 SOTA 加上 Dropout 去看最終的效能是不是確實有提升。

### Result on Image Datasets

***MNIST***

MNIST 是一個用於手寫辨識的資料集，包含了許多 $28 \times 28$ 的手寫數字，目的是要辨認出每個圖片是對應到哪個數字 $0$~$9$。

<center>
<img src="/Dropout/ryMTtgNRa.png" width=600>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

可以看到 baseline 的 error rate 是 $1.60\%$，單純加上 Dropout 之後就可以降低到 $1.35\%$。

如同前面描述，我們也可以再加上其他的技巧去做更多的處理，可以得到更好的結果。

而在這些許多不同的架構下，在相同的 hyperparameters、相同的 Dropout rate $p$，可以發現到對應的 test error 在 Dropout 使用的有無有相當大的不同。使用了 Dropout 的架構都可以得到更好的結果。

<center>
<img src="/Dropout/Sy2_5g4Cp.png" width=400>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

***SVHN***

SVHN(Street View House Number) dataset 包含了許多 $32 \times 32$ 的門牌號碼彩色照片，目標是要辨識出門牌號碼。

<center>
<img src="/Dropout/ryrCixN06.png" width=600>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

我們將 Conv Net 當作 baseline，也就是對應到 error rate $3.95\%$。單純在 fully connected layers 加上 dropout 之後可以來到 $3.02\%$。而在所有的 layer 都採用的話則可以進一步降低至 $2.55\%$。

當然，也可以再進一步加上其他的技巧去降低。

***CIFAR-10 / CIFAR-100***

CIFAR-10 包含了許多 $32 \times 32$ 的彩色圖片，這些圖片會被分類成 $10$ 種不同的類別，目的是要分類每張圖片至正確的類別。而 CIFAR-100 只是類別增加到 $100$。

<center>
<img src="/Dropout/SJJR2eNRT.png" width=600>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

同樣可以觀察到在加上 Dropout 可以得到更好的結果，並且進一步透過其他的技巧可以再做得更好。

***ImageNet***

ImageNet 包含了許多的高解析度彩色圖片，總共有 $22,000$ 個類別，目標同樣是將每個圖片分類到正確的類別當中。

因為 ImageNet 的類別超級多，因此在評分上我們可以考慮 Top-1 以及 Top-5 兩種方法。也就是說，只要正確的 label 出現在預測機率最高的前 5 個當中，對 Top-5 而言就算他答對。

<center>
<img src="/Dropout/r1N1AlVRp.png" width=600>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

同樣可以觀察到 dropout 帶來的好處。

:::danger
不過這裡的比較卻乏單純的 Conv Net 去當 baseline，好像不太能直接看出 Dropout 帶來的影響耶。
:::

### Result on Speech Recognition

***TIMIT***

這個 dataset 當中包含了 680 個講者的演講資料，當中包含了 8 種大主題，目標是要去把每個演講分類到正確的主題當中。

<center>
<img src="/Dropout/SJYxx4N0a.png" width=600>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

無論是單純加上 Dropout，或是使用其他的優化手段都有辦法獲得更好的 error rate。

### Result on Text Dataset

***Reuters-RCV1***

當中包含 800000 篇 newswire 上的文章，50 個主題，目標同樣是要分類。

加上 Dropout 後從 baseline 的 $31.05 \%$ error rate 降低到了 $29.62\%$。

:::info
後續還有一些類似的實驗用來驗證在各個領域採用 Dropout 後都可以獲得很棒的結果，但因為結論都是可以看到 Dropout 或是再額外加上其他優化的技巧都可以得到更好的結果，所以就不再贅述。
:::

### How Dropout Effect Network

Dropout 確實已經透過前面的各個實驗證實了他的效度是相當不錯，不過實際上對於 Network 來說它造成了怎樣的影響呢？

作者認為過去大模型之所以會 overfit datatset 是因為不同的 hidden units 會互相影響，也許某一個 unit 的"錯誤"會被其他的 unit 修正，以至於實際上每個 unit 的效益參差不齊，但是在訓練上的效果看起來還不賴。這個問題被稱為 **co-adaptations**。

作者認為 Dropout 能夠透過在訓練當中忽略其他的 hidden unit 進而避免 co-adaptation 的問題。

:::info
這就像是平常訓練的時候你有隊友可以 cover 你的失誤，所以作為一個團隊來說，你們整體看起來的表現會很不錯。

不過當你們現在處在一個未知的環境當中，反而彼此會難以配合，畢竟都還在熟悉新的環境。

然而 Dropout 就像是有時候你的隊友會請假，但是那些事情還是要處理，所以漸漸地每個人都會有一定的能力水平。現在即便丟到未知的環境當中，每個人也都還是能夠有一定的能力去解決。
:::

<center>
<img src="/Dropout/H1WsME406.png" width=600>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

作者使用一個簡單的 Autoencoder 做在 MNIST dataset 上，取出第一層 Layer 擷取出的特徵圖如上。雖然就結果而言他們的 test error 是類似的，但是從擷取出的特徵當中可以很明顯的看出搭配 Dropout 後的 Network 是真的有在學習特徵。

作者也發現到當使用 Dropout 之後 hidden units 的 activation 都會變得比較分散，如下圖所示。而且可以發現到幾乎所有的 activation 都會在 0 附近。

<center>
<img src="/Dropout/r1pTrNN06.png" width=600>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

### Hyperparameter

Dropout 當中有 dropout rate 可以設定，作者設計了兩種狀況來看 $p$ 在不同選擇下的結果。

- 固定 Layer 當中 hidden unit $n$
- 固定 $pn$

<center>
<img src="/Dropout/B12JDNV0p.png" width=600>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

可以發現到在左邊的圖中選擇 $0.4 \leq p \leq 0.8$ 之間會比較平坦，大致上也會是比較好的選擇點。

而在右邊的圖當中可以看到如果是固定 $pn$ 的話大致上會在 $0.4 \leq p \leq 0.7$ 之間會是比較好的選擇。

因此作者認為選擇 $p = 0.5$ (或是到 $0.6$) 會是比較好的選擇。

### Effect of Data Size

Data size 通常會對模型的結果有不小的影響。在同樣的網路架構下，如果在很少量資料的狀況下，模型通常會傾向 overfitting。作者比較了同樣架構下不同 data size，dropout 使用的有無造成的結果。

<center>
<img src="/Dropout/By4aOEV0T.png" width=300>
</center>
</br>

> Image from [Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, et.al (2014)](https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)

可以發現到在資料量小的狀況下使用 dropout 對於模型的訓練沒有什麼幫助。但隨著資料量越來越大，dropout 給出的幫助開始出現，但又會逐漸趨緩。

## Contribution

- 提出一個簡單避免 Overfitting 的方法
- 探討 Dropout 在各種狀況下給出的效益

## 值得一看的文章們

- [AutoEncoder (一)-認識與理解](https://medium.com/ml-note/autoencoder-%E4%B8%80-%E8%AA%8D%E8%AD%98%E8%88%87%E7%90%86%E8%A7%A3-725854ab25e8)
