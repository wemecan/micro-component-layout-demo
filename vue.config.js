module.exports = {
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      prismjs: "Prism",
    },
  },
};
