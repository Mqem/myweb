<template><div><h1 id="uncoded-simulation部分解释" tabindex="-1"><a class="header-anchor" href="#uncoded-simulation部分解释" aria-hidden="true">#</a> uncoded_simulation部分解释</h1>
<p>（本文程序默认群文件py_uncoded_SER_sim）</p>
<h2 id="一-概括内容" tabindex="-1"><a class="header-anchor" href="#一-概括内容" aria-hidden="true">#</a> 一.概括内容</h2>
<ol>
<li><strong>导入必要的库</strong>：程序使用了numpy，matplotlib.pyplot，math和time库来进行数值计算，数据可视化，数学运算和时间操作。</li>
<li><strong>定义MLC_Gauss_channel函数</strong>：这个函数是模拟带有高斯噪声的MLC通道。输入参数 x 是原始信号，u 和 sd 分别是各级别电压分布的平均值和标准差。这个函数首先识别输入信号中各个级别的存在，然后根据相应级别的平均值和标准差生成随机噪声，最后把噪声加到原始信号上。最后得到的 y 是原始信号 x 对应在MLC闪存中的实际电压。</li>
<li><strong>初始化参数</strong>：设置了各种参数，包括模拟的时间、Flash PE 循环次数、MLC 闪存记忆体参数（包括各状态的平均电压水平、标准差等）、RTN 参数、模拟参数（帧长度、帧数量等）和最佳阈值。</li>
<li><strong>模拟过程</strong>：对于每一个设定的保留时间，程序计算了与时间有关的保留参数，并根据这些参数以及前面设定的初始参数，计算出最终的电压分布。然后对于每一帧，程序首先生成随机的消息，然后将这些消息通过MLC_Gauss_channel发送，然后对接收到的信号进行解调，计算和原始信号的误差。如果符号错误超过一定数量，程序将停止模拟。</li>
<li><strong>结果输出</strong>：对于每个保留时间，程序会打印出平均的符号错误率(SER)和比特错误率(BER)，并将这些结果以图形的形式展示出来。<br>
<br><br></li>
</ol>
<h2 id="二-代码部分解释" tabindex="-1"><a class="header-anchor" href="#二-代码部分解释" aria-hidden="true">#</a> 二.代码部分解释</h2>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>n_0 <span class="token operator">=</span> u<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> sd<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> np<span class="token punctuation">.</span>random<span class="token punctuation">.</span>randn<span class="token punctuation">(</span>num_0<span class="token punctuation">)</span>
n_1 <span class="token operator">=</span> u<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> sd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">*</span> np<span class="token punctuation">.</span>random<span class="token punctuation">.</span>randn<span class="token punctuation">(</span>num_1<span class="token punctuation">)</span>
n_2 <span class="token operator">=</span> u<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">+</span> sd<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">*</span> np<span class="token punctuation">.</span>random<span class="token punctuation">.</span>randn<span class="token punctuation">(</span>num_2<span class="token punctuation">)</span>
n_3 <span class="token operator">=</span> u<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">+</span> sd<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">*</span> np<span class="token punctuation">.</span>random<span class="token punctuation">.</span>randn<span class="token punctuation">(</span>num_3<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这四行代码是在为四个不同的信号级别（0, 1, 2, 3）生成高斯噪声。这里 u 是各级别的平均电压，sd 是各级别的标准差，np.random.randn(num) 是生成 num 个标准正态分布（均值为 0，标准差为 1）的随机数。<br>
对于每个级别，u[i] + sd[i] * np.random.randn(num_i) 这个表达式生成了一个均值为 u[i]，标准差为 sd[i] 的正态分布的随机数，数量为 num_i。这些随机数被用来模拟信号传输过程中的噪声。<br>
例如，n_0 = u[0] + sd[0] * np.random.randn(num_0) 这行代码生成的是对应于信号级别 0 的噪声。num_0 是信号中级别为 0 的样本数量。产生的 n_0 是一个包含 num_0 个元素的<strong>数组</strong>，这些元素来自均值为 u[0]，标准差为 sd[0] 的正态分布。<br>
<br><br></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># [1] Chaudhry Adnan Aslam et. al.  "Decision-Directed Retention-Failure Recovery With Channel Update for</span>
<span class="token comment"># MLC NAND Flash Memory"</span>
<span class="token comment"># This channel model is according to [1]</span>

<span class="token comment"># -------------initial parameters--------------%</span>
time <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">10000</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>  <span class="token comment"># x_axis</span>
PE <span class="token operator">=</span> <span class="token number">5000</span>  <span class="token comment"># Flash PE cycles (vary this parameter)</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token comment"># MLC flash memory parameters</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token comment"># ================== RTN Parameters</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token comment"># simulation parameters</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token comment"># optimal thresholds, PE = 5000, time = [10000 5000 1000 100 10 1]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该部分初始化一些参数，包括模拟的时间、Flash PE 循环次数、MLC 闪存参数（包括各状态的平均电压水平、标准差等）、RTN 参数、模拟参数（帧长度、帧数量等）和最佳阈值。</p>
<ol>
<li>time = [10000, 5000, 1000, 100, 10, 1]：这是一个数组，表示要模拟的保留时间（单位：小时）。这个数组的每一个元素都将对应一次模拟。</li>
<li>PE = 5000：Flash PE 循环次数。PE（Program/Erase）循环是闪存中的写入/擦除操作。PE 循环次数的增加会导致闪存的可靠性降低，这在模型中会体现为电压级别的变化和噪声的增加。</li>
<li>Vmin = 1.4, V1 = 2.6, V2 = 3.2, Vmax = 3.93：这些是 MLC 闪存中四个状态（11，10，00，01）的对应电压分布的平均电压。</li>
<li>sigma_e = 0.35, sigma_p = 0.05：sigma_e 是状态 11 的对应电压分布的标准差，sigma_p 是其他三个状态（10，00，01）的对应电压分布的标准差。</li>
<li>V_delta = 0.2：这是 ISPP（增量步进程序）电压步长，代表在写入过程中电压每次增加的大小。</li>
<li>A_rtn = 0.00027, alpha_it = 0.62：这些是 RTN（随机电信噪声）的参数。sigma_rtn 是 RTN 的标准差，由 A_rtn 和 alpha_it 决定，与 PE 循环次数成正比。</li>
<li>frame_length = 72, number_frames = 50000：这是模拟参数。frame_length 是每一帧的长度（即每一帧包含的符号数），number_frames 是要模拟的帧数。（00,01,11,10 每一个状态就是一个符号。00是一个符号，00是两个比特）</li>
<li>map = np.array([0, 1, 2, 3]), bit_mapping = np.array([[1, 1], [1, 0], [0, 0], [0, 1]])：这些是映射参数。map 是符号到比特的映射，bit_mapping 是比特到符号的映射。</li>
<li>R1 = np.array([2.33, 2.34, 2.36, 2.39, 2.42, 2.44]), R2 = np.array([2.85, 2.86, 2.89, 2.92, 2.96, 2.98]), R3 = np.array([3.44, 3.46, 3.50, 3.56, 3.61, 3.64])：这些是判断阈值，用于将接收到的电压级别映射到相应的状态。每一个 R 都对应于 time 中的一个元素。<br>
<br><br></li>
</ol>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">for</span> m <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">for</span> frame <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>number_frames<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这部分是MLC信道的<strong>模拟过程</strong>，对于每一个设定的保留时间，该程序计算了与时间有关的保留参数，并根据这些参数以及前面设定的初始参数，计算出最终的电压分布。然后对于每一帧，程序首先生成随机的消息，然后将这些消息通过MLC_Gauss_channel发送，然后对接收到的信号进行解调，并计算和原始信号的误差。<br>
“模拟过程”主要包括了以下步骤：</p>
<ol>
<li>进行一个外部循环，遍历每一个保留时间点进行模拟。</li>
<li>对每一个保留时间点，计算出影响最终电压分布的各项参数，包括每个状态的均值 (mu) 和标准差 (sd)。</li>
<li>进行一个内部循环，模拟指定数量的帧。每一帧的模拟包括以下步骤：
<ul>
<li>生成原始消息</li>
<li>将原始消息通过高斯噪声信道进行传输</li>
<li>根据接收到的信号和设定的阈值进行解调</li>
<li>计算并累计符号错误和比特错误的数量</li>
</ul>
</li>
<li>对每一个保留时间点，计算总的符号错误率 (SER) 和比特错误率 (BER)，并将结果保存到数组中。</li>
<li>最后，使用 matplotlib 库绘制 SER 和 BER 随保留时间变化的对数图。<br>
<br><br></li>
</ol>
<h2 id="三-一些问题" tabindex="-1"><a class="header-anchor" href="#三-一些问题" aria-hidden="true">#</a> 三.一些问题</h2>
<ol>
<li>
<p>什么是保留参数？保留参数的计算式从何而来？<br>
A: 在闪存中，&quot;保留&quot;一词通常指的是数据在闪存中保留的时间。保留参数主要考虑了在不同保留时间下，由于各种因素（如电荷损失、电压阈值的漂移等）对闪存的影响。这些影响会导致读取到的电压与写入时的电压有所不同，从而影响到数据的正确读取。<br>
保留参数包括 mu_ret_xx 和 sigma_ret_xx，分别表示各个状态（11，10，00，01）电压阈值的偏移量和该偏移量的标准差。<br>
这些计算式是基于对闪存物理特性的理解和实验观察得到的。<br>
<br><br></p>
</li>
<li>
<p>信道是什么？为什么说MLC闪存是一种信道？<br>
A: 信道，通常在通信工程中指的是信息从发送端传输到接收端的媒介。信道的特性对信息的传输质量有很大的影响。<br>
在这个程序中，MLC（Multi-Level Cell，多级单元）闪存被视为一种信道，是因为在写入和读取数据时，数据需要通过这个“信道”。在这个过程中，由于各种物理因素（例如，程序/擦除周期的累积，数据保留时间，随机电信噪声等）的影响，写入的数据（发送端）和读取的数据（接收端）之间可能会有差异。<br>
这使得信息在MLC闪存中的数据存储和读取过程，就类似于信息在信道的发送和接收过程。<br>
<br><br></p>
</li>
<li>
<p>在主循环中，如何模拟信息的发送和接收？<br>
A: 首先，生成一个随机的二进制消息u。然后，将u转换为MLC闪存的状态x。接着，通过MLC_Gauss_channel函数，使用计算出的电压分布，将x发送到信道并得到y。然后，根据预设的阈值R1，R2和R3，将接收到的y转换回状态x_d。最后，将x_d再转换回二进制消息demap。u = np.random.randint(low=0, high=2, size=2 * frame_length)这段代码使用NumPy库生成一个长度为 2 * frame_length 的随机整数数组，并将其赋值给变量 u 。（此处的u并不是指电压，这并不是好的变量命名，后续应该修改）<br>
<br><br></p>
</li>
<li>
<p>在该模拟中，如何定义和计算“符号”和“比特”错误？<br>
A: 在这个模拟中，一个“符号”对应于一个MLC闪存的状态，即0，1，2，3（即00，01，11，10）中的一个，而一个“比特”对应于二进制消息中的一个位。当发送的状态（或比特）和接收的状态（或比特）不匹配时，我们就说发生了一个符号错误（或比特错误）。在每个帧之后，通过比较发送和接收的状态（或比特）来计算符号错误和比特错误的数量。<br>
<br><br></p>
</li>
</ol>
</div></template>


