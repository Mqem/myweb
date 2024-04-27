<template><div><h1 id="spa部分解释" tabindex="-1"><a class="header-anchor" href="#spa部分解释" aria-hidden="true">#</a> SPA部分解释</h1>
<p>（本文程序默认群文件py_sum_product_example）</p>
<h2 id="一-概括内容" tabindex="-1"><a class="header-anchor" href="#一-概括内容" aria-hidden="true">#</a> 一.概括内容</h2>
<p>SPA是一种用于解码线性块代码的迭代算法，通常用于低密度奇偶校验（LDPC）码。该算法通过迭代地更新&quot;概率&quot;消息，尝试找到一个合法的码字，即满足校验矩阵H的所有行的线性方程的解。<br>
以下是代码的大体内容和结构：</p>
<ol>
<li>导入numpy库：该库主要用于数值计算。</li>
<li>定义奇偶校验矩阵H。</li>
<li>初始化矩阵Q和R，以及向量qq，这些都是算法中用到的变量。</li>
<li>假设一个编码字c，经过BPSK调制后得到x，加入噪声后得到y。</li>
<li>计算一个初步的解码结果c，以及对应的校正子s。</li>
<li>如果s的所有元素都为0，那么c就是正确的解码结果，否则进入迭代过程。</li>
<li>在迭代过程中，首先计算接收到的对数似然比（LLR），然后进行若干次迭代，每次迭代包括水平步骤和垂直步骤。</li>
<li>在水平步骤中，更新矩阵R的元素。</li>
<li>在垂直步骤中，更新向量qq的元素，以及矩阵Q的元素。</li>
<li>根据更新后的qq计算一个新的解码结果c_estimate，以及对应的校正子s。</li>
<li>如果s的所有元素都为0，那么c_estimate就是正确的解码结果，否则继续迭代。</li>
<li>最后，输出解码结果。</li>
</ol>
<p><strong>简单的说，这个程序就是先假设了一个码字c， 然后对其进行编码（BPSK调制和奇偶校验），最后再对其进行解码。</strong>——解码过程分为初步解码和迭代过程解码，若初步解码没有得到正确结果，则使用 SPA 算法在迭代过程中去找到正确的码字。<br>
<br><br></p>
<h2 id="二-代码部分解释" tabindex="-1"><a class="header-anchor" href="#二-代码部分解释" aria-hidden="true">#</a> 二.代码部分解释</h2>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行代码导入了 <strong>numpy</strong> 库，这是一个广泛使用的Python库，主要用于处理大型多维数组和矩阵的数学运算。<br>
<br><br></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># initialization</span>
Q <span class="token operator">=</span> np<span class="token punctuation">.</span>zeros<span class="token punctuation">(</span><span class="token punctuation">(</span>M<span class="token punctuation">,</span> N<span class="token punctuation">)</span><span class="token punctuation">)</span>
R <span class="token operator">=</span> np<span class="token punctuation">.</span>zeros<span class="token punctuation">(</span><span class="token punctuation">(</span>M<span class="token punctuation">,</span> N<span class="token punctuation">)</span><span class="token punctuation">)</span>
qq <span class="token operator">=</span> np<span class="token punctuation">.</span>zeros<span class="token punctuation">(</span>N<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码初始化矩阵Q、R和向量qq，所有元素都被设置为0。在Sum-Product算法中，Q和R分别表示在迭代过程中传递的概率消息，qq是接收到的对数似然比。<br>
<br><br></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># assume a codeword is c</span>
c <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># after BPSK modulation</span>
x <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># after adding noise</span>
y <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0.339</span><span class="token punctuation">,</span> <span class="token number">1.492</span><span class="token punctuation">,</span> <span class="token number">0.6115</span><span class="token punctuation">,</span> <span class="token number">2.4295</span><span class="token punctuation">,</span> <span class="token number">1.5465</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.368</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
sigma <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码定义了一个假设的初始码字c，然后对c进行BPSK调制得到x，最后对x附加上高斯噪声得到最后的y。sigma是高斯噪声的标准差。<br>
注意这里只是一个具体的例子，实际程序应使用代码程序来随机生成初始码字和噪声。<br>
<br><br></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>c <span class="token operator">=</span> y <span class="token operator">&lt;</span> <span class="token number">0</span>

s <span class="token operator">=</span> np<span class="token punctuation">.</span>mod<span class="token punctuation">(</span>np<span class="token punctuation">.</span>dot<span class="token punctuation">(</span>H<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这行代码首先对接收到的y进行硬判决，得到一个初步的解码结果c。<br>
然后计算了相应的校正子s。（若校正子s全为0则说明解码成功完成，反之则需要进入后续迭代过程）<br>
<br><br></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">else</span><span class="token punctuation">:</span>
    q <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> y <span class="token operator">/</span> <span class="token punctuation">(</span>sigma <span class="token operator">**</span> <span class="token number">2</span><span class="token punctuation">)</span>
    iteration <span class="token operator">=</span> <span class="token number">1</span>
    max_it <span class="token operator">=</span> <span class="token number">20</span>
    <span class="token keyword">while</span> np<span class="token punctuation">.</span>count_nonzero<span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token keyword">and</span> iteration <span class="token operator">&lt;=</span> max_it<span class="token punctuation">:</span>
        <span class="token comment"># horizontal step</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>M<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

        <span class="token comment"># vertical step</span>
        <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>N<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

        c_estimate <span class="token operator">=</span> qq <span class="token operator">&lt;</span> <span class="token number">0</span>
        s <span class="token operator">=</span> np<span class="token punctuation">.</span>mod<span class="token punctuation">(</span>np<span class="token punctuation">.</span>dot<span class="token punctuation">(</span>H<span class="token punctuation">,</span> c_estimate<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
        iteration <span class="token operator">+=</span> <span class="token number">1</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码定义了当s的元素不全为0时的迭代过程。首先，计算接收到的对数似然比q。然后，开始迭代，直到s的所有元素都为0（解码成功），或者达到最大迭代次数。<br>
迭代过程分为水平步骤和垂直步骤。<br>
迭代过程中的水平步骤，用于更新矩阵R的元素。<br>
迭代过程中的垂直步骤，用于更新向量qq的元素，以及矩阵Q的元素。<br>
每次主循环的最后根据更新后的qq计算一个新的解码结果c_estimate，以及对应的校正子s，并更新迭代次数。<br>
<br><br></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>decoded <span class="token operator">=</span> c_estimate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行代码保存了解码结果。<br>
<br><br></p>
<h2 id="三-一些问题" tabindex="-1"><a class="header-anchor" href="#三-一些问题" aria-hidden="true">#</a> 三.一些问题</h2>
<ol>
<li>
<p>SPA算法是什么，有什么用？<br>
A：求和-积算法（Sum-Product Algorithm，简称SPA）是一种用于统计推断和解码的方法，特别是在处理图模型（如马尔可夫随机场和贝叶斯网络）时。该算法通过在图模型中的节点之间传递信息来进行推断。<br><br>
在数字通信中，SPA 常常用于解码低密度奇偶校验检查码（Low-Density Parity-Check，LDPC）。这种编码是一种前向纠错编码，用于在信道编码中增加冗余，从而在接收端可以检测和纠正错误。这对于提高数字通信系统的性能，特别是在存在噪声和干扰的环境中，非常重要。<br><br>
在 LDPC 的解码中，SPA 用于迭代地改进对传输符号的估计。在每次迭代中，SPA 会考虑接收到的信号和已有的估计，然后更新这些估计。这个过程会一直持续，直到估计停止改变，或者达到预设的最大迭代次数。<br><br></p>
</li>
<li>
<p>如何在 uncoded_simulation 程序中使用SPA算法？（指群文件py_uncoded_SER_sim）<br>
A：求和-积算法（Sum-Product Algorithm，SPA），这个算法通常用于解码阶段。<br>
SPA 的基本思想是在每次迭代中，利用接收到的信号和已有的估计，然后更新这些估计。这个过程会一直持续，直到估计停止改变，或者达到预设的最大迭代次数。<br><br>
具体来说，原程序（uncoded_simulation）在解码阶段是通过对接收信号进行硬判决来决定传输的符号。如果想引入 SPA，应当在这个解码阶段进行修改。则需要构建一个适合当前信道模型的 SPA 解码器，用来替换当前的硬判决解码。<br>
这部分大概在 MLC_Gauss_channel 函数之后，并且在计算错误之前。需要把现有的解码步骤替换为 SPA 的解码步骤。<br><br>
需要注意的是，SPA 通常用于解码 LDPC 等前向纠错码。应当先引入这类编码，然后再使用 SPA 进行解码。<br>
本文SPA示例程序中的奇偶校验矩阵就是LDPC码。<br><br></p>
</li>
<li>
<p>SPA算法和Min-Sum算法有什么区别<br>
Min-Sum 算法与 SPA 相同，只是简化了水平步长。<br>
<br><br></p>
</li>
</ol>
</div></template>


