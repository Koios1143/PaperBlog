---
date: 2024-02-03
category:
  - Note
tag:
  - Paper Read
  - Reinforcement Learning
  - ICLR
---

# Noisy Networks for Exploration

## Basic Information

- 2018 ICLR
- Meire Fortunato, Mohammad Gheshlaghi Azar, Bilal Piot, et al. @ Google Deepmind

## 問題描述

在過去的 RL 當中我們往往仰賴對 agent 的 policy 增加 randomness 去增加 exploration，例如 `ϵ-greedy` 和 `entropy regularization` 等。不過這樣的做法往往只能在較於簡單的環境當中有比較有效率的探索，然而在現實狀況下往往並不會如此簡單，而這種探索的困難度甚至是指數性地成長。

> 例如在 Alpha Go 當中就至少探索了上千億甚至到幾兆個模擬的遊戲狀態

:::info
論文中有提及在 [Matthieu Geist, Olivier Pietquin (2014)](https://arxiv.org/abs/1406.3270) 有提及一個使用 Neural Network 的方法，不過並沒有保證收斂，因此仍然沒有解決問題。
:::

因此這一篇論文提出一個方法試圖去消除 exploration 效率與品質的問題。

## Related Works

- $\epsilon$-greedy、Entropy Regularization
- Parameter Space Noise for Exploration
- 用來加上 Noisy-Net 的各種 RL 架構
    - DQN
    - Double-DQN
    - Dueling DQN
    - A3C

### Parameter Space Noise for Exploration

2017 年由 OpenAI 發表在 ICLR 的 paper。其方法與這一篇可說是大同小異。

在過往的研究可以發現到說往往我們在設計讓 agent 有更多的 exploration 的時候都是透過增加 noise 來達成。

:::info
舉例而言，$\epsilon$-greedy 就是在 action space 上增加了 noise，讓選擇更多樣，以達成 exploration。

而在 A3C 當中加上 Entropy Regularization，是在 Loss 上鼓勵 policy 的亂度越高越好，達到鼓勵 exploration 的效果。
:::

<center>
<img src="/NoisyNet/SyWVpX9qa.png" width=500>
</center>

> Image from [OpenAI - Better exploration with parameter noise](https://openai.com/research/better-exploration-with-parameter-noise)

核心的概念很簡單，過去增加探索的方法大多都是在 action space 上增加 noise，而這裡則選擇在 parameter space 上增加 noise，並且達到了很棒的效果。

:::tip

<center>
<img src="/NoisyNet/Hunter.png" height=200>
&nbsp;
<img src="/NoisyNet/Furiren.png" height=200>
</center>

$\epsilon$-greedy 就像是獵人裡面的凱特，行動之前需要先看運氣抽接下來使用的武器，即便自己知道當下用哪一個 action 比較好，卻會受到 $\epsilon$ 的限制。

而在 parameter space 加上 noise 就像是可以換個角度去想其他人會怎麼做，試著用那一個人的做法走過一次，得到不同的經驗。

相較之下，action space 加 noise 就比較像是在亂試，反之在 parameter space 上加 noise 就比較有系統性一些。
:::

具體來說就是他們試圖在 parameter 上加上 Gaussian Noise。

$$
\tilde{\theta} = \theta + \mathcal{N}(0, \sigma^2I)
$$

| Action Space Noise | Parameter Space Noise |
| :----------------: | :-------------------: |
| <video width=300 autoplay="" controls="" loop="" muted="" playsinline="true" src="https://cdn.openai.com/parameter_noise/action_cheetah_2.mp4"></video> | <video width=300 autoplay="" controls="" loop="" muted="" playsinline="true" src="https://cdn.openai.com/parameter_noise/param_cheetah_2.mp4"></video> |

> Videos from [OpenAI - Better exploration with parameter noise](https://openai.com/research/better-exploration-with-parameter-noise)

---

:::warning
底下的內容只是單純的 Review
:::

---

### DQN

透過 Neural Network 去學習 optimal action value function $Q^*$。
Action 的決定上採用了 $\epsilon$-greedy。

<center>
<img src="/NoisyNet/rkeUkCO9T.png" width=500>
</center>

> Image from [Ziyu Wang et al. (2015)](https://arxiv.org/abs/1511.06581)

於是他們定義了底下的 Loss function 去試圖得到 $Q^*$。

$$
L(\theta) = \mathbb{E}_{(s, a, r, y) \sim D} \left[ \left(
    \textcolor{red}{r + \gamma \max_{b \in A} Q(y, b; \theta^-)}
     - Q(s, a; \theta)\right)^2 \right]
$$

- $D$ 是上一個 replay buffer 的 transition distribution
    - state $s$
    - action $a$
    - reward $r = R(s, a)$
    - probability $y \sim P(\cdot | s, a)$
- $\theta^-$ 是被固定的參數

:::tip
DQN 帶來了幾個好處
- Experience Replay
    透過儲存 Experience，更新參數是從 replay buffer 中隨意挑一筆，降低了資料之間的相關性，讓 Neural Network 訓練避免偏差。
- Target Network
    避免了訓練目標經常地變動造成訓練效果差
- 使用 Neural Network 替代 action value function
    避免了 Q-Learning 的 table 維度過大訓練困難的問題
:::

### Double-DQN

在 DQN 當中我們需要同時訓練兩個 model，也就是 $\theta$ 與 $\theta^-$。然而 DQN 的設定上對於目標被發現存在高估的問題，因此 Double-DQN 提出了解決這個高估問題的方法。

| 原始 DQN 目標 | Double-DQN 目標 |
| :---------: | :-------------: |
|$r + \gamma \max_{b \in A} Q(y, b; \theta^-)$ | $r + \gamma Q(y, \textcolor{red}{\max_{b \in A}{Q(y, b; \theta)}}; \theta^-)$

> 高估的狀況如底下的綠線。紫線是目標函數，橘線是綠線與紫線的誤差，不難發現到確實都存在高估的狀況。
> 
> 然而使用了 Double-DQN 之後的誤差(藍線)就小到幾乎不存在了。
> 
> <center><img src="/NoisyNet/r1F4qA_96.png" width=500></center>
> 
> Image from [Hado van Hasselt, Arthur Guez, David Silver (2015)](https://arxiv.org/abs/1509.06461)

:::tip
Double-DQN 帶來的幾個好處

- 讓 DQN 高估的問題消失，有更好的效果
:::

### Dueling DQN

Dueling DQN 的概念仍然是透過 Neural Network 去學習 optimal action value function $Q^*$。
Action 的決定上採用了 $\epsilon$-greedy。

<center>
<img src="/NoisyNet/Sk8vk0Oqp.png" width=500>
</center>

> Image from [Ziyu Wang et al. (2015)](https://arxiv.org/abs/1511.06581)

與 DQN 不同的地方在於他並不是直接去學習 $Q^*$，而是另外定義了一個 **Advantage function** $A$。

$$
A(s, a) = Q(s, a) - V(s)
$$


$V(s)$ 就像是 baseline，表示著在當前這個 state $s$ 底下你預期可以拿到多好的 return，所以 $A(s, a)$ 意義上就是在看每個 action 有多好多壞。

透過 $V$ 和 $A$ 的總和就能夠得到 $Q$。上圖就是在最後分開成兩個輸出結果 $V$ 和 $A$，最後合併成 $Q$。

$$
Q(s, a; \theta) = V(s; \theta_V) + A(s, a; \theta_A)
$$

:::info
在實務上為了避免像是 $V(s)$ 都是 $0$，實際上跟 DQN 沒有差異的問題，因此細節上是還會對 $A(s, a)$ 加上總和為 $0$ 的限制。

$$
Q(s, a, \theta, \alpha, \beta) = V(a, \theta, \alpha) + \left[ A(s, a, \theta, \beta) - \frac{1}{|A|} \sum_{a' \in |A|}{A(s, a', \theta, \beta)} \right]
$$

> $\alpha, \beta$ 只是調整 $V$ 和 $A$ 兩部分影響程度的參數。
:::

把 Dueling DQN 搭配 Double DQN 之後可以得到底下的 Loss。

$$
L(\theta) = \mathbb{E}_{(s, a, r, y) \sim D} \left[ \left( r + \gamma Q(y, \textcolor{red}{\arg \max_{b \in \mathcal{A}}{Q(y, b; \theta)}}; \theta^-) - Q(s, a; \theta) \right)^2 \right]
$$

:::tip
Dueling DQN 帶來了幾個好處

- 使用 Advantage function 增加模型的更新與 exploration。
:::

### A3C

在 DQN 當中使用了 Experience Reply 去避免訓練資料上的強關聯性，然而存在幾個缺點

- 需要額外的 memory 去儲存 replay buffer
- 需要 off-policy alogorithm，對於 online RL 來說可能導致收斂不穩定以及緩慢等問題

A3C 的概念就如同火影忍者的影分身之術，讓每個分身在各自的環境當中訓練，訓練成效也就翻倍。

<center>
<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*YtnGhtSAMnnHSL8PvS7t_w.png" height=300>
</center>
</br>

> Image from [Arthur Juliani@Medium](https://medium.com/emergent-future/simple-reinforcement-learning-with-tensorflow-part-8-asynchronous-actor-critic-agents-a3c-c88f72a5e9f2)

A3C 是使用 advantage actor-critic 的方式，會直接去學 policy 以及 value function。因此在參數上也就包含了兩項 $\theta_{\pi}$ 以及 $\theta_v$ 分別表示 policy 以及 value function 的參數。考慮在時間 $t$ 往後看 $k$ 步的更新，參照 A3C 的論文，兩個參數的 Loss 計算分別如下。

$$
\begin{align*}
\nabla_{\theta_{\pi}}L^{\pi}(\theta_{\pi}) &= 
-\mathbb{E}^{\pi} \left[ 
    \sum_{i=0}^{k}
        {\nabla_{\theta_{\pi}}
            \log\left(\pi(a_{t+i}|s_{t+i} ;\theta_{\pi})\right)
            A(s_{t+i}, a_{t+i};\theta_v)
        } + 
    \textcolor{red}{\beta \sum_{i=0}^{k}{
        \nabla_{\theta_{\pi}}{H\left(\pi(\cdot|s_{t+i};\theta_{\pi})\right)
    }}}
\right] \\
L^{V}(\theta_v) &= \sum_{i=0}^{k}{
    \mathbb{E}^{\pi} \left[ 
        \left( Q_i - V(s_{t+i};\theta_v) \right)^2 | s_{t+i}
    \right]
}
\end{align*}
$$

- $A$：Advantage function
    也就是 A3C 當中的 $R - V$
- $H$：Entropy function
    根據 A3C 的論文，加上這一項能夠促使模型更好 exploration
- $\beta$：調整 $A$ 和 $H$ 的影響程度
- $Q_i$：在時間 $i$ 時於 state $s_{t+i}$ 執行 policy $\pi$ 的 return

:::note
紅色的部分也就是前面提及的 ***entropy regularization***
:::

最後整體的 Loss 也就如下

$$
L(\theta) = L^{\pi}(\theta_{\pi}) + \lambda L^V(\theta_{v})
$$

- $\lambda$ 用來調整兩個 Loss 的影響力

:::info
Note：原始 A3C 論文中更新一步，並且沒有使用 entropy 的算式

$$
\begin{align*}
\theta'&:d\theta \leftarrow d \theta + \nabla_{\theta'}{\log \pi(a_i | s_i; \theta')\left( R - V(s_i;\theta_v') \right)} \\
\theta_v'&:d\theta_v \leftarrow d\theta_v + \partial \left( R - V(s_i;\theta_v') \right)^2 / \partial \theta_v'
\end{align*}
$$
:::


:::tip
A3C 帶來了幾個好處

- 降低訓練資料之間的關聯性
    畢竟每個 agent 訓練的環境都不同，得到的資料也就不同
- 能夠使用 on-policy 或是 off-policy，增加通用性
- 可以平行化加速訓練
- 穩定地訓練
:::

## Methodology

### 基本想法

Noisy-Net 的想法跟 [Parameter Space Noise for Exploration](https://arxiv.org/abs/1706.01905) 的想法基本上是相同方向，都是要對 parameter space 去加上 noise。

<center>
<img src="/NoisyNet/SyBMmE9q6.png" width=500>
</center>

作法上，對於每個可訓練的參數拆解成 $\zeta = (\mu, \sigma)$，然後再透過 zero-mean 的 $\epsilon$ 增加 noise。也就是說對於一個參數 $\theta$ 我們會寫成：

$$
\theta \stackrel{\texttt{def}}{=} \mu + \sigma \odot \epsilon
$$

所以對於一個 Linear Layer 來說

$$
y = wx + b \Rightarrow y = (\mu^w + \sigma^w \odot \epsilon^w)x + (\mu^b + \sigma^b \odot \epsilon^b)
$$

> *就只是這樣而已，不要想太多！*


:::tip
刻意挑 zero-mean 的 noise 是為了採用底下的特性方便後續 Loss 的計算。

$$
\bar{L}(\zeta) = \mathbb{E}[L(\theta)]
$$

因此

$$
\nabla \bar{L}(\zeta) = \nabla \mathbb{E}[L(\theta)] = \mathbb{E} \left[\nabla_{\mu, \Sigma}{L(\mu + \Sigma \odot \epsilon)} \right]
$$
> $\Sigma$ 包含了所有 $\sigma$

加上了 Monte-Carlo approximation 之後，可以用單一的 sample $\xi$ 去近似

$$
\nabla \bar{L}(\zeta) \approx \nabla_{\mu, \Sigma}L(\mu + \Sigma \odot \xi)
$$
:::

跟 OpenAI 提出的方法略為不同的地方在於他並不是直接對 network 的參數加上 Gaussian Noise，而是給了參數 $\epsilon^w, \epsilon^b$ 去決定要加怎樣的 noise。

在每一個 episode 開始之前先把參數加上 noise，接下來這一整個 episode 就都是用這個 network 去訓練，意即在過程中不會對 noise 做調整。

### 減少產 random number 時間

這樣的做法下每一個 episode 都需要 random noise 在 weight 和 bias 上。假如 $w \in \mathbb{R}^{q \times p}, b \in \mathbb{R}^{q}$，那麼 $\epsilon^{w} \in \mathbb{R}^{q \times p}, \epsilon^{b} \in \mathbb{R}^{q}$，也就意味著需要 random 出 $pq + q$ 個數值。

上面基本的做法作者稱他為 **Independent Gaussian noise**，而接下來作者給出一個 **Factorised Gaussian noise** 的做法。

基本上就是將 random number 拆分

$$
\begin{align*}
\epsilon_{i, j}^{w} &= f(\epsilon_i) f(\epsilon_j) \\
\epsilon_j^b &= f(\epsilon_j)
\end{align*}
$$

其中 $f(x) = \texttt{sgn}(x)\sqrt{|x|}, \epsilon_i \in \mathbb{R}^{q}, \epsilon_{j} \in \mathbb{R}^p$。

如此一來，只需要產出 $p + q$ 個 random number 也可以達到類似的效果。

### DQN & Dueling DQN

由於 DQN 和 Dueling DQN 是在 single-thread 上訓練，因此上述的 Random Overhead 會比較大，在這裡採用 **Factorised Gaussian noise**。

現在 Network 的部分改用 Noisy Network，也就不需要再使用 $\epsilon$-greedy 了。

原本的 DQN 對 Loss 的定義如下。

$$
L(\theta) = \mathbb{E}_{(s, a, r, y) \sim D} \left[ \left(r + \gamma \max_{b \in A} Q(y, b; 
\theta^-) - Q(s, a; \theta)\right)^2 \right]
$$

現在替換成 Noisy Net 的形式

$$
\bar{L}(\textcolor{red}{\zeta}) = \textcolor{red}{\mathbb{E}} \left[ \mathbb{E}_{(s, a, r, y) \sim D} \left[ r + \gamma \max_{b \in A} Q(y, b, \textcolor{red}{\epsilon'}; \textcolor{red}{\zeta^-}) - Q(s, a, \textcolor{red}{\epsilon}; \textcolor{red}{\zeta}) \right]^2 \right]
$$

> 最外層的期望值是對 $\epsilon$ 和 $\epsilon'$

同樣地也可以對 Dueling DQN 做修改。原本的定義為

$$
L(\theta) = \mathbb{E}_{(s, a, r, y) \sim D} \left[ \left( r + \gamma Q(y, \arg \max_{b \in \mathcal{A}}{Q(y, b; \theta)}; \theta^-) - Q(s, a; \theta) \right)^2 \right]
$$

現在替換成 Noisy Net 的形式

$$
\bar{L}{(\textcolor{red}{\zeta})} = \textcolor{red}{\mathbb{E}}\left[\mathbb{E}_{(s, a, r, y) \sim D} \left[  r + \gamma Q(y, \arg \max_{b \in \mathcal{A}}{Q(y, b, \textcolor{red}{\epsilon''}; \textcolor{red}{\zeta})}, \textcolor{red}{\epsilon'}; \textcolor{red}{\zeta^-}) - Q(s, a, \textcolor{red}{\epsilon}; \textcolor{red}{\zeta})  \right]^2 \right]
$$

### Distributed A3C

由於 A3C 是在 multi-thread 上訓練，因此不太需要考慮上述的 Random Overhead，在這裡採用 **Independent Gaussian noise** 即可。

現在 Network 的部分改用 Noisy Network，也就不需要再使用 Entropy function 了。

原本的 A3C

$$
\begin{align*}
\nabla_{\theta_{\pi}}L^{\pi}(\theta_{\pi}) &= 
-\mathbb{E}^{\pi} \left[ 
    \sum_{i=0}^{k}
        {\nabla_{\theta_{\pi}}
            \log\left(\pi(a_{t+i}|s_{t+i} ;\theta_{\pi})\right)
            A(s_{t+i}, a_{t+i};\theta_v)
        } + 
    \beta \sum_{i=0}^{k}{
        \nabla_{\theta_{\pi}}{H\left(\pi(\cdot|s_{t+i};\theta_{\pi})\right)
    }}
\right] \\
L^{V}(\theta_v) &= \sum_{i=0}^{k}{
    \mathbb{E}^{\pi} \left[ 
        \left( Q_i - V(s_{t+i};\theta_v) \right)^2 | s_{t+i}
    \right]
}
\end{align*}
$$

NoisyNet-A3C

$$
\begin{align*}
\nabla_{\textcolor{red}{\zeta_{\pi}}}L^{\pi}(\textcolor{red}{\zeta_{\pi}}) &= 
-\textcolor{red}{\mathbb{E}} \left[ \mathbb{E}^{\pi} \left[ 
    \sum_{i=0}^{k}
        {\nabla_{\textcolor{red}{\zeta_{\pi}}}
            \log\left(\pi(a_{t+i}|s_{t+i} ;\textcolor{red}{\zeta_{\pi}}, \textcolor{red}{\epsilon})\right)
            A(s_{t+i}, a_{t+i};\textcolor{red}{\zeta_{v}}, \textcolor{red}{\epsilon})
        }
\right]\right] \\
L^{V}(\textcolor{red}{\zeta_{v}}) &=  \textcolor{red}{\mathbb{E}} \left[ \sum_{i=0}^{k}{
    \mathbb{E}^{\pi} \left[ 
        \left( Q_i - V(s_{t+i};\textcolor{red}{\zeta_{v}}, \textcolor{red}{\epsilon}) \right) | s_{t+i}
    \right]
}\right]^2
\end{align*}
$$

:::note Noise initialize details

***Independent Gaussian noise***

- $\mu_{i,j} \sim \mathcal{U} \left[ -\sqrt{\frac{3}{p}}, +\sqrt{\frac{3}{p}} \right]$
    - $p$ 是 input 的數量
- $\sigma_{i, j} = 0.017$

***Factorised Gaussian noise***

- $\mu_{i, j} \sim \mathcal{U} \left[ -\sqrt{\frac{1}{p}}, +\sqrt{\frac{1}{p}} \right]$
    - $p$ 是 input 的數量
- $\sigma_{i, j} = \frac{0.5}{\sqrt{p}}$
:::

## Results

### Experiments

實驗是做在 57 Atari games 上。每 1M 個 frames 評估一次，episode 每 108K frames 會 truncate 一次。將沒有做任何修正的 DQN、Dueling DQN、A3C 作為 Baseline。

首先把 Baseline 以及加上 NoisyNet 的模型都跟 Human 比較，底下是用來評估優劣的評分方式。

$$
100 \times \frac{\texttt{Score}_{\texttt{agent}} - \texttt{Score}_{\texttt{Random}}}{\texttt{Score}_{\texttt{Human}} - \texttt{Score}_{\texttt{Random}}}
$$

> ***Note***
> 
> 最後得出的結果為 0：跟 Random 一樣糟
> 最後得出的結果為 100：跟 Human 一樣好

可以從分數上明顯看出來加上了 NoisyNet 後對於 Mean 以及 Median 都有正面的影響。

<center>
<img src="/NoisyNet/HJJWGws9a.png" width=500>
</center>

> Image from [Meire Fortunato, Mohammad Gheshlaghi Azar, Bilal Piot et al. (2018)](https://arxiv.org/abs/1706.10295)

接下來評估加上 NoisyNet 帶來的影響力，評分方式會也跟 Baseline 比較。

$$
100 \times \frac{\texttt{Score}_{\texttt{agent}} - \texttt{Score}_{\texttt{Baseline}}}{\max(\texttt{Score}_{\texttt{Human}}, \texttt{Score}_{\texttt{Baseline}}) - \texttt{Score}_{\texttt{Random}}}
$$

可以看到在大多數的遊戲加上了 NoisyNet 之後的結果都有些進步。

<center>
<img src="/NoisyNet/BJQS4Piq6.png" width=500>
</center>

> Image from [Meire Fortunato, Mohammad Gheshlaghi Azar, Bilal Piot et al. (2018)](https://arxiv.org/abs/1706.10295)

> 不過進步主要在 DQN 以及 Dueling 上較為顯著。A3C 的部分在退步也是有幾項退步蠻多，也並不是每次加上 NoisyNet 都會帶來 improvement。

從訓練中的曲線也可以明顯看到 NoisyNet 可以帶來很不錯的 improvement。

<center>
<img src="/NoisyNet/S1MqHvocT.png" width=800>
</center>

> Image from [Meire Fortunato, Mohammad Gheshlaghi Azar, Bilal Piot et al. (2018)](https://arxiv.org/abs/1706.10295)

### Analysis

為了進一步去釐清這樣的做法為什麼是可行、合理的，作者進一步去研究。

回顧一下我們加上 Noise 的方法，是把一個可訓練參數拆成 $\zeta = (\mu, \sigma)$，再額外多一個 Noise $\epsilon$。

$$
\theta \stackrel{\texttt{def}}{=} \mu + \sigma \odot \epsilon
$$

理想上，我們最後的 Loss 應該要能夠好好收斂，也就是說最後的 solution 應該要是 deterministic。那麼這裡加上的 $\epsilon$ 就應該隨著訓練慢慢被忽視，作用只在於訓練的前中期提供 exploration。因此，我們也就會期待 $\sigma$ 這個參數會漸漸趨近於 $0$ 了！

定義底下的平均

$$
\bar{\Sigma} = \frac{1}{N_{\texttt{weights}}}\sum_{i}{|\sigma_i^w|}
$$

作者發現在每一個遊戲當中最後一個 Layer 的 $\bar{\Sigma}$ 都是會逐漸趨近於 $0$ 的，然而若觀察倒數第二個 Layer 卻並不一定了，有些甚至是遞增的。也就是說，其實 NoisyNet 並不會都得出 deterministic solution。

此外，透過 $\bar{\Sigma}$ 的曲線也可以發現到在不同的遊戲當中他們的更新曲線相當地不同，也說明了實際上這樣的更新方式是能夠依照不同的遊戲去適應的。

<center>
<img src="/NoisyNet/BJPQjDocT.png" width=700>
</center>

> Image from [Meire Fortunato, Mohammad Gheshlaghi Azar, Bilal Piot et al. (2018)](https://arxiv.org/abs/1706.10295)

## Contribution

- 提供一個簡單又有效的 Exploration 方式
- 能夠在 on-policy 以及 off-policy 上適用
- 能夠輕易地套用在所有的 RL 算法當中

## 值得一看的文章們
- [强化学习中on-policy 与off-policy有什么区别？](https://www.zhihu.com/question/57159315)
- [Simple Reinforcement Learning with Tensorflow Part 8: Asynchronous Actor-Critic Agents (A3C)](https://medium.com/emergent-future/simple-reinforcement-learning-with-tensorflow-part-8-asynchronous-actor-critic-agents-a3c-c88f72a5e9f2)
- [Asynchronous Methods for Deep Reinforcement Learning](https://arxiv.org/abs/1602.01783)
- [Deep Exploration via Randomized Value Functions](https://arxiv.org/abs/1703.07608)
- [Kalman Temporal Differences](https://arxiv.org/abs/1406.3270)
- [VIME: Variational Information Maximizing Exploration](https://arxiv.org/abs/1605.09674)
- [Parameter Space Noise for Exploration](https://arxiv.org/abs/1706.01905)
- [Evolution Strategies as a Scalable Alternative to Reinforcement Learning](https://arxiv.org/abs/1703.03864)
- [Better exploration with parameter noise](https://openai.com/research/better-exploration-with-parameter-noise)
- [强化学习中的探索与利用（count-based)](https://zhuanlan.zhihu.com/p/78273736)
