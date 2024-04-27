export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-4c6f3b94","v-4fd8ecd2","v-53429e10","v-46314222","v-30fd2542","v-5a16008c","v-56ac4f4e","v-2905ed27","v-4381bd13","v-184f4da6","v-1473bf53"]}},"star":{"/":{"path":"/star/","keys":["v-4c6f3b94","v-4fd8ecd2","v-53429e10","v-46314222","v-30fd2542","v-5a16008c","v-56ac4f4e","v-2905ed27","v-4381bd13"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-4c6f3b94","v-4fd8ecd2","v-53429e10","v-46314222","v-30fd2542","v-5a16008c","v-56ac4f4e","v-2905ed27","v-4381bd13"]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

