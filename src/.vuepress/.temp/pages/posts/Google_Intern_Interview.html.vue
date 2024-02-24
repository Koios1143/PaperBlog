<template><div><h1 id="_2024-google-swe-intern-interview-心得" tabindex="-1"><a class="header-anchor" href="#_2024-google-swe-intern-interview-心得" aria-hidden="true">#</a> 2024 Google SWE Intern Interview 心得</h1>
<p>大概在今年的一月初投了履歷到 Google SWE，希望暑假可以去累積累積經驗，大概在幾天後就收到要填寫面試時間的通知信件，三周後收到了面試的通知。</p>
<p>在面試前收到的信件都會很貼心地說明，也有提供一些線上的資源協助你去了解如何準備面試，甚至也可以直接跟對方來往信件去確認，我覺得這一點是還蠻不錯的。</p>
<p>面試的流程大致上會分成兩場，兩場都是針對算法題目，不太會對簡歷或是個人背景去做提問，結束前也會有一小段可以任意問問題的時間。</p>
<p>兩場面試基本上會被放在同一天當中，但是會在不同時段。以我自己來說，我分別是在早上跟下午各一場。一場時間大概是 45 分鐘。</p>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>有趣的是，我們並不會在一般的 IDE 或是 Text Editor 上寫 code，而是 Google 會提供 Google Doc 在上面寫，而你的面試官也可以一起編輯，就像是實體面試的時候&quot;白板&quot;這個工具。</p>
</div>
<h2 id="第一場面試" tabindex="-1"><a class="header-anchor" href="#第一場面試" aria-hidden="true">#</a> 第一場面試</h2>
<h3 id="warnup" tabindex="-1"><a class="header-anchor" href="#warnup" aria-hidden="true">#</a> Warnup</h3>
<h4 id="題目敘述" tabindex="-1"><a class="header-anchor" href="#題目敘述" aria-hidden="true">#</a> 題目敘述</h4>
<p>給定 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>N</mi><mo>×</mo><mi>M</mi></mrow><annotation encoding="application/x-tex">N \times M</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span></span></span></span> 的地圖，其中</p>
<ul>
<li><code v-pre>#</code> 表示 wall</li>
<li><code v-pre>.</code> 表示 road</li>
<li><code v-pre>a</code> 表示起點</li>
<li><code v-pre>A</code> 表示終點</li>
</ul>
<p>每次只能選上下左右一個方向去移動，問從 <code v-pre>a</code> 是否有辦法走到 <code v-pre>A</code>。</p>
<h4 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h4>
<p>從起點做 BFS，看能不能走到終點</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>bool FindExit(vector&lt;vector&lt;char&gt;&gt; maps){
    // Find start point
    int rows = maps.size();
    int cols = maps[0].size();
    pair&lt;int, int&gt; start;
    for(int i=0 ; i&lt;rows ; i++){
        for(int j=0 ; j&lt;cols ; j++){
            if(maps[i][j] == 'a'){
                start = make_pair(i, j);
            }
        }
    }

    // BFS from start point
    // initialize vis array
    bool vis[rows][cols];
    for(int i=0 ; i&lt;rows ; i++){
        for(int j=0 ; j&lt;cols ; j++){
            vis[i][j] = false;
        }
    }
    // put start point
    queue&lt;pair&lt;int, int&gt;&gt; q;
    q.emplace(start);
    vis[start.first][start.second] = true;
    // For implementation simplicity
    int dx[] = {-1, 0, 1, 0};
    int dy[] = {0, -1, 0, 1};
    // BFS
    while(!q.empty()){
        int x = q.front().first;
        int y = q.front().second;
        q.pop();

        // check whether is answer or not
        if(maps[x][y] == 'A'){
            return true;
        }

        for(int i=0 ; i&lt;4 ; i++){
            int nx = x + dx[i];
            int ny = y + dy[i];
            // check whether nx and ny is valid
            if(nx &lt; 0 || nx &gt;= rows || ny &lt; 0 || ny &gt;= cols) continue;
            // check whether visited
            if(vis[nx][ny]) continue;
            // check wall
            if(maps[nx][ny] == '#') continue;
            // otherwise, road or end point
            q.emplace(nx, ny);
            vis[nx][ny] = true;
        }
    }
    // Cannot reach the end point
    return false;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="follow-up" tabindex="-1"><a class="header-anchor" href="#follow-up" aria-hidden="true">#</a> Follow-up</h3>
<h4 id="題目敘述-1" tabindex="-1"><a class="header-anchor" href="#題目敘述-1" aria-hidden="true">#</a> 題目敘述</h4>
<p>現在把 <code v-pre>a</code> 當成是一台車，又再多一台車 <code v-pre>b</code>。</p>
<p><code v-pre>a</code> 一樣要到終點 <code v-pre>A</code>，<code v-pre>b</code> 則是要到終點 <code v-pre>B</code>。</p>
<p>兩台車行走的時間可以隨意(也就是說，不需要一起移動一格)。</p>
<p>問是否可以在不碰撞的情況下兩台車都到終點。</p>
<h4 id="思路-1" tabindex="-1"><a class="header-anchor" href="#思路-1" aria-hidden="true">#</a> 思路</h4>
<p>兩台車並不需要同時去運行，所以可以等某一台車通過之後再回到原本的位置。</p>
<div class="hint-container tip">
<p class="hint-container-title">Tips</p>
<p>舉例來說</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>#B#
a.A
#b#
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>這個 case 下可以先等 <code v-pre>a</code> 走到 <code v-pre>A</code> 之後 <code v-pre>b</code> 再移動，所以不會有碰撞出現</p>
<p>不過底下這個 case 就無法避免碰撞而造成無解。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>####
aBAb
####
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p>這一題面試當下並沒有好的想法，最後也並沒有實際實作出來。</p>
<p>不過大抵還是會使用 BFS 去解。</p>
<h3 id="第一場面試小結" tabindex="-1"><a class="header-anchor" href="#第一場面試小結" aria-hidden="true">#</a> 第一場面試小結</h3>
<p>當初填表單的時候好像不小心填到一場英文一場中文，所以那一場我是用英文面試的，還是有一定程度影響到輸出效果www</p>
<p>第一場面試下來自己覺得有盡可能去溝通，也有先好好確認過題目的條件，不過 Follow-up 沒有找到一個好的想法覺得很可惜。即便是在面試結束之後想這個題目目前也還沒有什麼好的想法。</p>
<p>我不太確定時間複雜度的部分是不是需要自己說明，面試官當時沒有提問到，我也就沒有額外補充說明這一塊，面試結束後覺得應該還是需要提的，因此下一場面試就有比較積極去說明自己的解法時間複雜度如何。</p>
<h2 id="第二場面試" tabindex="-1"><a class="header-anchor" href="#第二場面試" aria-hidden="true">#</a> 第二場面試</h2>
<p>經過了午餐的小休息之後，接下來就是第二場的面試。</p>
<h3 id="warn-up" tabindex="-1"><a class="header-anchor" href="#warn-up" aria-hidden="true">#</a> Warn-up</h3>
<h4 id="題目敘述-2" tabindex="-1"><a class="header-anchor" href="#題目敘述-2" aria-hidden="true">#</a> 題目敘述</h4>
<p>給三個整數，找出中位數</p>
<h4 id="思路-2" tabindex="-1"><a class="header-anchor" href="#思路-2" aria-hidden="true">#</a> 思路</h4>
<p>只有三個數字，簡單條件判斷就可以出來了。</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>int FindMedium(int a, int b, int c){
    if(a &lt;= b &amp;&amp; b &lt;= c) return b;
    if(a &lt;= c &amp;&amp; c &lt;= b) return c;
    if(b &lt;= a &amp;&amp; a &lt;= c) return a;
    if(b &lt;= c &amp;&amp; c &lt;= a) return c;
    if(c &lt;= b &amp;&amp; b &lt;= a) return b;
    if(c &lt;= a &amp;&amp; a &lt;= b) return a;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="question-1" tabindex="-1"><a class="header-anchor" href="#question-1" aria-hidden="true">#</a> Question 1</h3>
<p>現在有 10 個人要安排會議日期，每個人都有一些 unavaliable 的日期，詢問有哪些大家都可行的日期。</p>
<p>每個不能的日期會用下列的 struct 表示</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>struct block{
    int personId; // 表示是哪一個人的日期
    int startDay; // 表示不能的開始時間
    int endDay; // 表示不能的結束時間
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整體安排的日期為 <code v-pre>0</code>~<code v-pre>最大的 endDay + 1</code></p>
<h4 id="思路-1-1" tabindex="-1"><a class="header-anchor" href="#思路-1-1" aria-hidden="true">#</a> 思路 1</h4>
<p>對於每一天去看看有沒有任何不能的時段有重疊到他，沒有的話就放進答案，否則繼續看下一個。</p>
<p>假設總共 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>M</mi></mrow><annotation encoding="application/x-tex">M</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span></span></span></span> 個 block，安排的日期最多 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>N</mi></mrow><annotation encoding="application/x-tex">N</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span></span></span></span> 天。每一天都需要去對 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>M</mi></mrow><annotation encoding="application/x-tex">M</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span></span></span></span> 個 block 檢查，檢查一個 block 是 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>，因此總共時間複雜度是 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>N</mi><mi>M</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(NM)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.10903em;">NM</span><span class="mclose">)</span></span></span></span>。</p>
<h4 id="思路-2-1" tabindex="-1"><a class="header-anchor" href="#思路-2-1" aria-hidden="true">#</a> 思路 2</h4>
<p>上面的解法也許有些暴力，況且 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>N</mi></mrow><annotation encoding="application/x-tex">N</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span></span></span></span> 也有可能很大。</p>
<p>考慮到排序往往會帶來不錯的性質，這裡先依照 <code v-pre>startDay</code> 由小到大排序，相同時則依照 <code v-pre>endDay</code> 由小到大。</p>
<p>對於相鄰的兩個時段，如果說他們是有重疊的，那我們可以把它們合併在一起。否則就表示從現在的 <code v-pre>endDay + 1</code> 到下一個 <code v-pre>startDay - 1</code> 之間都會是可以的日期。</p>
<p>如此一來對於每個 block 我們就可以只去考慮 <code v-pre>startDay</code> 以及 <code v-pre>endDay</code>。</p>
<p>排序採用 merge sort 可以得到 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>M</mi><mi>l</mi><mi>o</mi><mi>g</mi><mi>M</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(MlogM)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.01968em;">Ml</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mclose">)</span></span></span></span> 的時間複雜度。</p>
<p>看過一個 block 以及處理合併都只需要 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>，因此這一個步驟對每個 block 總共需要 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>M</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(M)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mclose">)</span></span></span></span>。</p>
<p>對於可以的時間需要逐一加入到答案當中，因此會需要額外 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>N</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(N)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span><span class="mclose">)</span></span></span></span> 的時間處理插入。</p>
<p>總時間複雜度來到 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>M</mi><mi>l</mi><mi>o</mi><mi>g</mi><mi>M</mi><mo>+</mo><mi>N</mi><mo>+</mo><mi>M</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(MlogM + N + M)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.01968em;">Ml</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mclose">)</span></span></span></span></p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>bool cmp(struct block p, struct block q){
    if(p.startDay != q.startDay) return p.startDay &lt; q.startDay;
    else return p.endDay &lt; q.endDay;
}

vector&lt;int&gt; FindAvaliable(vector&lt;block&gt; v){
    vector&lt;int&gt; ans;
    // sort the blocks
    sort(v.begin(), v.end(), cmp);
    // [0, v[0].startDay) should also be avaliable
    for(int i=0 ; i&lt;v[0].startDay ; i++){
        ans.emplace_back(i);
    }
    // Look over the whole blocks
    for(int i=0 ; i&lt;v.size() ; i++){
        // check whether there's next block
        if(i + 1 &lt; v.size()){
            // check whether we can merge two blocks
            if(v[i+1].endDay &lt;= v[i].startDay){
                // merge result to next block
                v[i+1].startDay = v[i].startDay;
            }
            else{
                // otherwise, add (v[i].endDay, v[i+1].startDay) to answer
                for(int i=v[i].endDay+1 ; i&lt;v[i+1].startDay ; i++){
                    ans.emplace_back(i);
                }
            }
        }
        else{
            // No more blocks, we should add v[i].endDay + 1 to answer
            ans.emplace_back(v[i].endDay + 1);
        }
    }
    return ans;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="question-1-follow-up" tabindex="-1"><a class="header-anchor" href="#question-1-follow-up" aria-hidden="true">#</a> Question 1 - Follow-up</h3>
<p>現在多給你一個參數 <code v-pre>k</code>，請把所有 <code v-pre>&lt;=k</code> 個人 unavaliable 的日期都列出來。</p>
<blockquote>
<p>保證不會有一個人自己填到重疊的時段</p>
</blockquote>
<h4 id="思路-1-2" tabindex="-1"><a class="header-anchor" href="#思路-1-2" aria-hidden="true">#</a> 思路 1</h4>
<p>同樣可以採取暴力的做法，去看過每一個時間，check 是否 unavaliable 的人數是 <code v-pre>&lt;=k</code>。</p>
<p>每一個時間需要花 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>M</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(M)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mclose">)</span></span></span></span> 去確認，總共有 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>N</mi></mrow><annotation encoding="application/x-tex">N</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span></span></span></span> 個時間，總時間複雜度 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>N</mi><mi>M</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(NM)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.10903em;">NM</span><span class="mclose">)</span></span></span></span>。</p>
<h4 id="思路-2-2" tabindex="-1"><a class="header-anchor" href="#思路-2-2" aria-hidden="true">#</a> 思路 2</h4>
<p>不妨把時段畫成圖，像是底下的樣子。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>---------
 -----
   -------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其實是哪一個人佔據了哪一個時段我們並不在乎，因為已經事先知道不會有人自己填到跟自己重疊的時段，所以我們只在乎<strong>美個時段有多少個重疊</strong>。</p>
<p>當然，我們可以像 <code v-pre>思路 1</code> 一樣去算每一個時間點的人數，但是實際上人數<strong>只會在那些開始以及結束的點被更新</strong>。</p>
<ul>
<li>進到 <code v-pre>startDay</code> 人數就 +1</li>
<li>進到 <code v-pre>endDat</code> 人數就 -1</li>
</ul>
<p>所以我們可以單純的去把所有的時間標記上他是 <code v-pre>start</code> 或是 <code v-pre>end</code>，然後拿去 sort。</p>
<p>如此一來我們就能夠知道每一個時間段 unavaliable 的人數有多少了。</p>
<p>製作出 <code v-pre>Days</code> 需要花 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>M</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(M)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mclose">)</span></span></span></span> 的時間。排序需要 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>M</mi><mi>l</mi><mi>o</mi><mi>g</mi><mi>M</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(MlogM)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.01968em;">Ml</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mclose">)</span></span></span></span> 的時間。最後只需要掃過每一個 block 就可以知道有哪些時段需要插入，時間是 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>M</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(M)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mclose">)</span></span></span></span>。記得也要考慮插入答案的 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>N</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(N)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span><span class="mclose">)</span></span></span></span>。</p>
<p>總時間複雜度落在 <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>M</mi><mo>+</mo><mi>M</mi><mi>l</mi><mi>o</mi><mi>g</mi><mi>M</mi><mo>+</mo><mi>M</mi><mo>+</mo><mi>N</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(M + MlogM + M + N)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.01968em;">Ml</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span><span class="mclose">)</span></span></span></span>。</p>
<h3 id="第二場面試小結" tabindex="-1"><a class="header-anchor" href="#第二場面試小結" aria-hidden="true">#</a> 第二場面試小結</h3>
<p>這一場的發揮還算不錯，也頗主動去跟面試官互動，整體感覺下來很棒。</p>
<h2 id="總結" tabindex="-1"><a class="header-anchor" href="#總結" aria-hidden="true">#</a> 總結</h2>
<p>Google 的面試往往要求的是跟面試官之間的互動，以及有沒有辦法好好說明與想到解決方案。</p>
<p>面試前沒有做什麼準備，實際上面試起來也覺得狀態還不錯，不過面試官主動的互動有比想像中少一些，像是時間複雜度的部分他們並不會直接詢問，說出一個解法之後似乎也不會說「有沒有更好的解法呢」之類的，而是說「如果你只想到這樣的話也可以開始寫 code，或是是著想想看有沒有其他想法」。</p>
<p>一些小細節上跟預期有些落差，不過整體上我覺得是還蠻不錯的體驗。題目其實並不會過難，真的就是期待你可以現場去好好思考跟說明你的想法，把面試官當成是你的隊友去討論討論作法。</p>
<p>最重要的也許是心態上的調整。面對面試如果過於緊張往往會無法順利面對突發狀況，需要好好整理心態，去面對未知的題目跟挑戰。</p>
<p>期待後續的消息 ouob。</p>
</div></template>


