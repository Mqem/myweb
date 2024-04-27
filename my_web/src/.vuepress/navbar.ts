import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  //"/demo/",
  {
    text: "文章",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "炼金术",
        icon: "pen-to-square",
        prefix: "magic/",
        children: [
          { text: "python神经网络", icon: "pen-to-square", link: "1" },
        ],
      },
      {
        text: "传送术",
        icon: "pen-to-square",
        prefix: "signal/",
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
        ],
      },
      {
        text: "其它",
        icon: "pen-to-square",
        prefix: "other/",
        children: [
          { text: "科学上网", icon: "pen-to-square", link: "overwall" },
          { text: "Matlab资源", icon: "pen-to-square", link: "share1" },
          "chatget",
        ],
      },
      //{ text: "樱桃", icon: "pen-to-square", link: "cherry" },
      //"strawberry",
    ],
  },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
