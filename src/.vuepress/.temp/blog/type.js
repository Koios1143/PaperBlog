export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-50ae5da2","v-6fdb6976","v-0fd9e004","v-3caeec67","v-32d63a0d","v-5b18c8c4","v-c0336012","v-184f4da6"]}},"star":{"/":{"path":"/star/","keys":[]}},"timeline":{"/":{"path":"/timeline/","keys":["v-50ae5da2","v-6fdb6976","v-0fd9e004","v-3caeec67","v-32d63a0d","v-5b18c8c4","v-c0336012","v-184f4da6"]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

