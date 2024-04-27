import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "炼金术",
      icon: "book",
      link: "posts/magic/",
      prefix: "posts/magic/",
      children: [
        { text: "python神经网络", icon: "pen-to-square", link: "1" },
      ],
      collapsible: true,
    },
    {
      text: "传送术",
      icon: "book",
      link: "posts/signal/",
      prefix: "posts/signal/",
      children: [
        {
          text: "闪存信道",
          icon: "pen-to-square",
          link: "1",
        },
        {
          text: "MLC问题解释",
          icon: "pen-to-square",
          link: "2",
        },
        {
          text: "信道代码解释yyc",
          icon: "pen-to-square",
          link: "3",
        },
        {
          text: "SPA部分解释",
          icon: "pen-to-square",
          link: "4",
        },
        {
          text: "uncoded_simulation部分解释",
          icon: "pen-to-square",
          link: "5",
        },
        //"4",
      ],
      collapsible: true,
    },
    {
      text: "其它",
      icon: "book",
      link: "posts/other/",
      prefix: "posts/other/",
      children: [
        { text: "科学上网", icon: "pen-to-square", link: "overwall" },
        { text: "Matlab资源", icon: "pen-to-square", link: "share1" },
        "chatget",
      ],
      collapsible: true,
    },
    //"intro",
    //"slides",
  ],
});
