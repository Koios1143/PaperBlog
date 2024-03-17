---
date: 2024-03-13
category:
  - Note
tag:
  - Paper Read
  - Supervised Learning
  - Convolutional Neural Networks
  - Computer Vision
author: Xavier
---

# AlexNet: ImageNet Classifications with Deep Convolutional Neural Networks

## Basic Information
- Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton @ University of Toronto
- 2012 NeurIPS

## 問題描述
這是一篇將Deep Learning(深度學習)與Convolutional Neural Networks(卷積神經網路，以下簡稱CNN)運用在Computer Vision(計算機視覺)領域的開拓性論文。作者們train了一個Deep Convolutional Neural Network來分類ImageNet ILSVRC-2010資料集中的120萬張高解析度圖像，並得到了相較前人方法顯著優異許多的表現。

## Related Works
- Softmax function
- Non-saturating neurons
- "dropout" regularization method

### Softmax function
在Fully Connected Layer的最後，使用Softmax function將平坦化後的向量轉成機率分佈。通常會寫成以下形式:
<center>
<img src="/AlexNet/softmax.png" width=400>
</center>
</br>

簡單來說就是將一個$K$維的向量壓縮成一個$K$維的機率向量，且所有元素總和為$1$。

### Non-saturating neurons
可以將saturate理解成有沒有將值**擠壓**到一個特定的區間，正式的定義可以寫成這樣:
<center>
<img src="/AlexNet/saturating.png" width=400>
</center>
</br>

舉例來說，常用的sigmoid函數會將值**擠壓**到區間[0, 1]:
<center>
<img src="/AlexNet/Sigmoid.png" width=400>
</center>
</br>
因此，他就是一個saturating的activation function。

像一樣很常用的Relu函數則沒有被**擠壓**的上界:
<center>
<img src="/AlexNet/Relu.png" width=400>
</center>
</br>
因此就是一個non-saturating的activation function。

### Dropout
Dropout是用來解決Overfitting問題的一個基本技巧，透過給定一個特定的機率，代表每個Neuron有多大的機率會被"Dropout"。"Dropout"代表無論input是多少，這些Neuron的output永遠都是0。在Backpropagation的過程中，如果前一層的Activation為0，也會導致Gradient是0，使這條Weight無法被更新。因此，如果一個Neuron被"Dropout"的話，可當作是這個Neuron並不存在。

Dropout Layer的運作方式為，每一次的iteration都會重新隨機選擇一部份的Neuron來Dropout，藉此避免Neuron間co-adapting太多的問題，大幅降低overfitting發生的可能。

## Methodology
本研究訓練的Deep CNN模型包含了5層的convolutional layers與3層的fully-connected layers，而這樣的深度在處理大量圖像分類是必須的。為了降低成本與訓練時間，作者們使用了一些優化，將分為Dataset, Architecture, Reduce Overfitting與Details of learning四個部份。

### Dataset
ImageNet, 包含了超過1500萬張有標注的high-resolution圖像，分為大概22000個類別。這些圖像都是從網路上收集，並以人工標記(Amazon’s Mechanical Turk crowd-sourcing tool)。每年舉辦的ILSVRC會使用ImageNet一個subset，包含大約1000個類別的1000個圖像(120萬 for training, 5萬 for validation, 15萬 for testing)。本研究使用ILSVRC-2010作為資料集，並參加了ILSVRC-2012的競賽。

ImageNet包含了不同解析度的圖像，所以研究者們透過簡單的rescale與裁切的方式，將圖像down-sampled到$256 \times 256$的解析度。

### Architecture
AlexNet的架構如圖所示，包含5層的convolutional layers與3層的fully-connected layers。
<center>
<img src="/AlexNet/AlexNet_Architecture.png" width=800>
</center>
</br>

作者也將AlexNet的主要features分為四點，以下根據重要性排序:

#### ReLU Nonlinearity
如同前面**Non-saturating neurons**所提，一般的模型通常會使用像$f(x) = \tanh(x)$及$f(x) = \left(1 + e^{-x}\right)^{-1}$等saturating nonlinearity functions。而AlexNet使用$f(x) = \max(0, x)$這個non-saturating nonlinearity functions(使用這種nonlinearity的Neurons也叫做ReLUs)。
<center>
<img src="/AlexNet/Figure_1.png" width=400>
</center>
</br>
> 這張圖展示了(在CIFAR-10上)在一個4層的CNN上，使用Relu會比使用tanh的Neurons快上6倍。

如果使用傳統的saturating neuron，是沒有辦法對這麼大的神經網路進行實驗的(Vanishing Gradient問題)，也突顯了non-saturating neurons的重要。

#### Training on Mulitiple GPUs
單一個GTX 580 GPU只有3GB的記憶體，因此，只使用一個GPU是放不下用120萬個training examples訓練出來的networks的，所以作者們將Network橫跨到兩個GPU上，將各半的Neurons放在各個GPU上，並讓GPU只在特定的layers進行溝通(例如第2,4,5層Convolution layer的Kernel只會連接到前一層中在同一GPU的Kernel)，精準調控GPU之間的通訊量。
<center>
<img src="/AlexNet/AlexNet_GPU.png" width=800>
</center>
</br>

這樣的作法讓top-1跟top-5 error rates分別下降了1.7%和1.2%。相較於單個GPU，在訓練時間上也有些微的縮短。

:::info
雖說以現在GPU的發展，一個GPU就放得下了，應該可以不用做這件事情，但如果是為了平行運算的效能優化就不一定了XD
:::

#### Local Response Normalization
作者們也使用了以下的normalization技巧:
<center>
<img src="/AlexNet/LRN.png" width=600>
</center>
</br>

> 其中$a_{x,y}^{i}$為經過位置在$(x,y)$的kernel $i$，經過ReLU nonlinearity的activity，$b_{x,y}^{i}$則是做完normalization的值。
> $N$是該層的總kernel數, 而$n$則為與之相鄰的kernel數。 
> 而$n, k, \alpha, \beta$為hyper-parameters，經過調整後為$n = 5, k = 2, \alpha = 10^-4, \beta = 0.75$。

Local response normalization(LRN)實現了一種側抑制的形式，透過相鄰的Neurons間的相互抑制來減少雜訊，提昇training的效度。
這樣的normalization方式分別讓top-1 與 top-5 error rates減少了1.4%與1.2%。

:::info
LRN的概念在後來就很少被使用了，比較常被Batch Normalization(BN)取代，甚至後來Brock等人提出說在殘差神經網路(ResNet)中可以不做normalization。
:::

#### Overlapping Pooling
傳統上的General Pooling為Non-overlapping pooling，但在AlexNet中使用Overlapping pooling。
<center>
<img src="/AlexNet/Overlapping_pooling.png" width=600>
</center>
</br>

> $s$代表pooling units間的間隔(每個$s$ pixels做一次pooling)，$z$則代表每次做pooling的大小($z \times z$的大小)。
> 如果讓$s = z$，則是傳統的Non-overlapping pooling。
> 如果讓$s < z$，則是Overlapping pooling。

AlexNet選擇讓$s = 2, z = 3$，相較於$s = 2, z = 2$，在top-1跟top-5 error rates上，分別下降了0.4%跟0.3%。且作者們也發現，使用Overlapping Pooling的models較不容易發生Overfitting的情形。


### Reduce Overfitting
雖說ILSVRC的圖像有1000個類別，但AlexNet具有6000萬個parameters，容易導致嚴重的Overfitting。因此，作者透過以下幾種方法來避免Overfitting：
- Data Augmentation
- Dropout

#### Data Augmentation
以下採用兩種形式的data augmentation:
- Image extraction and reflection.
- Altering RGB intensities.

##### Image extraction and reflection
首先從$256 \times 256$的圖像中隨機提取$224 \times 224$的patches(跟他們的horizontal reflections)，並直接在這些patches上訓練。而在測試時，抽出其中5個patches(四個角落和中間)以及他們的horizontal reflections(加起來共10個)，並將softmax layer做出的預測進行平均。

##### Altering RGB intensities
簡單來說，就是對於每個pixel的RGB值進行PCA降維。
對於每個RGB image pixel 
$$
I_{xy} = \begin{bmatrix}
I_{R_{xy}} \\
I_{G_{xy}} \\
I_{B_{xy}}
\end{bmatrix}
$$
加上
$$
\begin{bmatrix}
p_1 & p_2 & p_3
\end{bmatrix}
\begin{bmatrix}
\alpha_1 \lambda_1 \\
\alpha_2 \lambda_2 \\
\alpha_3 \lambda
\end{bmatrix}
$$
> 其中$p_i$與$\lambda_i$分別為RGB pixel的$3 \times 3$ Covariance Matrix的第i個eigenvector與eigenvalue。
> $\alpha_i$則為隨機變量，對於特定image的每個pixel來說，只會被提取一次

上述的作法其實捕捉了自然圖像的一個重要性質，就是物件的identity對於顏色的照度與強度是不變的(就是說將一張狗的圖片變換顏色與亮度，他也不會變成貓)。這樣的作法成功讓top-1 error rate降低了超過1%。

#### Dropout
AlexNet在Fully Connected layer的前兩層使用了名為Dropout的技巧。就如同上面所提，AlexNet將Dropout的機率$p = 0.5$，代表每個Neuron每次有$\frac{1}{2}$的機率被Dropout，造成每次iterate，Neural Network都會有不同的架構。因為Dropout減少了Neurons間的co-adaptations，促使Neurons去學習更加robust的features。雖說Dropout大致會將iteration的數量加倍，但他也大幅降低了Overfitting的發生。

### Details of learning
AlexNet使用Stochastic Gradient Descent(SGD)來尋找參數，batch size為128, momentum為0.9
<center>
<img src="/AlexNet/AlexNet_SGD.png" width=600>
</center>
</br>

> 其中$i$是指第幾次iteration，$v$是momentum variable，$\left< \left. \frac{\partial L}{\partial w} \right|_{w_i} \right>$代表的是在第$i$的batch $D_i$上的平均。

初始權重的部份，使用標準差是$0.01$，平均是$0$的高斯分佈來初始化每一層的權重，並將第2, 4, 5層Convolution layers與Fully Connected layers的bias都初始化為$1$，剩下的bias都初始化為$0$。
而每一層的learning rate都是一樣的，初始值都為$0.01$，且當validation error rate停滯時就將learning rate除以10(其實我也不知道為什麼，但作者說是Heuristic)。

AlexNet共使用兩張GTX 580 3GB GPU，訓練了約5~6天，經過了約90個cycles，訓練集為ImageNet中的120萬張image。

## Results

### Quantitative Evaluation
<center>
<img src="/AlexNet/Results_ILSVRC.png" width=800>
</center>
</br>

上表為AlexNet參加ILSVRC-2010與ILSVRC-2012的結果。可以注意到在ISVRC-2010中，top-1與top-5 error rates分別為37.5%與17.0%。雖說ILSVRC-2012的測試集label沒有公開，所以表上的error rates為validation error rates(與test error rates差不到0.1％)，但還是可以看出AlexNet遠比第二名有著更好的準確率。

### Qualitative Evaluation
<center>
<img src="/AlexNet/GPU1_vs_GPU2.png" width=400>
</center>
</br>

上圖中可以看到在GPU1中的kernel，學到的大多都是跟顏色無關的特性，而GPU2中的kernel學到的大多都是跟顏色相關的。這個是前面提到Kernel間特殊的連接方式所造成的結果，不論重新設定初始權重跑幾次都會如此。

<center>
<img src="/AlexNet/Qualitative_Performance.png" width=800>
</center>
</br>

而這張圖可以看到說，不論是prediction還是classification，AlexNet的表現都非常出色。

## Discussion
### 作者觀點
AlexNet的研究表明了一個大型的深度CNN是能夠透過只用supervised learning的方式取得非常好的效果，而最重要的關鍵其實在於深度，因此算力是非常重要的(才能支撐更大、更深的模型)。期許未來算力的大幅進步能夠支撐用來處理影片序列(非常多的圖片and時間資訊)的超大超深CNN(我個人覺得已經是現在進行式了)。

### 我的觀點
而AlexNet的出現也是受惠於GPU發展的產物，包括後來越來越深的模型。雖說我們現在會覺得AlexNet其實也沒有很深，但以當時來說，是非常尖端且突破性的研究，也帶起了後來在各處使用Convolution Neural Network，以及model越來越deep的風潮。總結來說，AlexNet將Sigmoid替換成了ReLU，避免了Vanishing Gradient的問題；也透過Dropout以及Data augmentation，減少Overfitting的狀況；更點出了『深度很重要』的觀念，促使了後來越來越深的Model與算力發展。

## 心得
在讀paper的時候會發現，這篇其實沒有用到什麼複雜的技巧，大多都是大學部ML/DL相關課程就會學到的基本知識。考究到這篇論文的時間是在2012，在當時這些技巧應該都是非常新穎的概念，甚至有些東西是本篇論文的作者在不久前提出的(超酷XD)。自從這篇論文以來，Deep Convolution Neural Network在Computer Vision上才開始蔚為流行，成為大學ML/DL課必教的概念，而AlexNet也從此被視為在Computer Vision領域最有影響力的論文之一。在讀這篇AlexNet的時候，除了感受到這個領域的快速發展外，還真的有一種**站在巨人肩膀上**的感覺。


## References

- [ImageNet Classifications with Deep Convolutional Neural Networks](https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf)
- [What does the term saturating nonlinearities mean?](https://stats.stackexchange.com/questions/174295/what-does-the-term-saturating-nonlinearities-mean)
- [The Vanishing Gradient Problem](https://towardsdatascience.com/the-vanishing-gradient-problem-69bf08b15484)
- [Gradient Vanishing Problem –- 以 ReLU / Maxout 取代 Sigmoid actvation function](https://hackmd.io/@allen108108/ByCqzBfC4)
- [Difference between Local Response Normalization and Batch Normalization](https://towardsdatascience.com/difference-between-local-response-normalization-and-batch-normalization-272308c034ac)
- []()
- [世上最生動的 PCA：直觀理解並應用主成分分析](https://leemeng.tw/essence-of-principal-component-analysis.html)
- [A Step-by-Step Explanation of Principal Component Analysis (PCA)](https://builtin.com/data-science/step-step-explanation-principal-component-analysis)
- [機器/深度學習-基礎數學(三):梯度最佳解相關算法(gradient descent optimization algorithms)](https://chih-sheng-huang821.medium.com/%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92-%E5%9F%BA%E7%A4%8E%E6%95%B8%E5%AD%B8-%E4%B8%89-%E6%A2%AF%E5%BA%A6%E6%9C%80%E4%BD%B3%E8%A7%A3%E7%9B%B8%E9%97%9C%E7%AE%97%E6%B3%95-gradient-descent-optimization-algorithms-b61ed1478bd7)