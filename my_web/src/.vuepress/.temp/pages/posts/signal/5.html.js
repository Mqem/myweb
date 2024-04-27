export const data = JSON.parse("{\"key\":\"v-4c6f3b94\",\"path\":\"/posts/signal/5.html\",\"title\":\"uncoded_simulation部分解释\",\"lang\":\"zh-CN\",\"frontmatter\":{\"icon\":\"pen-to-square\",\"date\":\"2023-07-28T00:00:00.000Z\",\"category\":[\"知识\"],\"tag\":[\"代码\",\"MLC\",\"信道\"],\"star\":true,\"sticky\":true,\"description\":\"uncoded_simulation部分解释 （本文程序默认群文件py_uncoded_SER_sim） 一.概括内容 导入必要的库：程序使用了numpy，matplotlib.pyplot，math和time库来进行数值计算，数据可视化，数学运算和时间操作。 定义MLC_Gauss_channel函数：这个函数是模拟带有高斯噪声的MLC通道。输入参数 x 是原始信号，u 和 sd 分别是各级别电压分布的平均值和标准差。这个函数首先识别输入信号中各个级别的存在，然后根据相应级别的平均值和标准差生成随机噪声，最后把噪声加到原始信号上。最后得到的 y 是原始信号 x 对应在MLC闪存中的实际电压。 初始化参数：设置了各种参数，包括模拟的时间、Flash PE 循环次数、MLC 闪存记忆体参数（包括各状态的平均电压水平、标准差等）、RTN 参数、模拟参数（帧长度、帧数量等）和最佳阈值。 模拟过程：对于每一个设定的保留时间，程序计算了与时间有关的保留参数，并根据这些参数以及前面设定的初始参数，计算出最终的电压分布。然后对于每一帧，程序首先生成随机的消息，然后将这些消息通过MLC_Gauss_channel发送，然后对接收到的信号进行解调，计算和原始信号的误差。如果符号错误超过一定数量，程序将停止模拟。 结果输出：对于每个保留时间，程序会打印出平均的符号错误率(SER)和比特错误率(BER)，并将这些结果以图形的形式展示出来。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://openai.com/posts/signal/5.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"miku\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"uncoded_simulation部分解释\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"uncoded_simulation部分解释 （本文程序默认群文件py_uncoded_SER_sim） 一.概括内容 导入必要的库：程序使用了numpy，matplotlib.pyplot，math和time库来进行数值计算，数据可视化，数学运算和时间操作。 定义MLC_Gauss_channel函数：这个函数是模拟带有高斯噪声的MLC通道。输入参数 x 是原始信号，u 和 sd 分别是各级别电压分布的平均值和标准差。这个函数首先识别输入信号中各个级别的存在，然后根据相应级别的平均值和标准差生成随机噪声，最后把噪声加到原始信号上。最后得到的 y 是原始信号 x 对应在MLC闪存中的实际电压。 初始化参数：设置了各种参数，包括模拟的时间、Flash PE 循环次数、MLC 闪存记忆体参数（包括各状态的平均电压水平、标准差等）、RTN 参数、模拟参数（帧长度、帧数量等）和最佳阈值。 模拟过程：对于每一个设定的保留时间，程序计算了与时间有关的保留参数，并根据这些参数以及前面设定的初始参数，计算出最终的电压分布。然后对于每一帧，程序首先生成随机的消息，然后将这些消息通过MLC_Gauss_channel发送，然后对接收到的信号进行解调，计算和原始信号的误差。如果符号错误超过一定数量，程序将停止模拟。 结果输出：对于每个保留时间，程序会打印出平均的符号错误率(SER)和比特错误率(BER)，并将这些结果以图形的形式展示出来。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"qem\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"代码\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"MLC\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"信道\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-07-28T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"uncoded_simulation部分解释\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-07-28T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"qem\\\",\\\"url\\\":\\\"https://user.qzone.qq.com/1441407386\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"一.概括内容\",\"slug\":\"一-概括内容\",\"link\":\"#一-概括内容\",\"children\":[]},{\"level\":2,\"title\":\"二.代码部分解释\",\"slug\":\"二-代码部分解释\",\"link\":\"#二-代码部分解释\",\"children\":[]},{\"level\":2,\"title\":\"三.一些问题\",\"slug\":\"三-一些问题\",\"link\":\"#三-一些问题\",\"children\":[]}],\"readingTime\":{\"minutes\":8.04,\"words\":2412},\"filePathRelative\":\"posts/signal/5.md\",\"localizedDate\":\"2023年7月28日\",\"excerpt\":\"<h1> uncoded_simulation部分解释</h1>\\n<p>（本文程序默认群文件py_uncoded_SER_sim）</p>\\n<h2> 一.概括内容</h2>\\n<ol>\\n<li><strong>导入必要的库</strong>：程序使用了numpy，matplotlib.pyplot，math和time库来进行数值计算，数据可视化，数学运算和时间操作。</li>\\n<li><strong>定义MLC_Gauss_channel函数</strong>：这个函数是模拟带有高斯噪声的MLC通道。输入参数 x 是原始信号，u 和 sd 分别是各级别电压分布的平均值和标准差。这个函数首先识别输入信号中各个级别的存在，然后根据相应级别的平均值和标准差生成随机噪声，最后把噪声加到原始信号上。最后得到的 y 是原始信号 x 对应在MLC闪存中的实际电压。</li>\\n<li><strong>初始化参数</strong>：设置了各种参数，包括模拟的时间、Flash PE 循环次数、MLC 闪存记忆体参数（包括各状态的平均电压水平、标准差等）、RTN 参数、模拟参数（帧长度、帧数量等）和最佳阈值。</li>\\n<li><strong>模拟过程</strong>：对于每一个设定的保留时间，程序计算了与时间有关的保留参数，并根据这些参数以及前面设定的初始参数，计算出最终的电压分布。然后对于每一帧，程序首先生成随机的消息，然后将这些消息通过MLC_Gauss_channel发送，然后对接收到的信号进行解调，计算和原始信号的误差。如果符号错误超过一定数量，程序将停止模拟。</li>\\n<li><strong>结果输出</strong>：对于每个保留时间，程序会打印出平均的符号错误率(SER)和比特错误率(BER)，并将这些结果以图形的形式展示出来。<br>\\n<br><br></li>\\n</ol>\",\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}