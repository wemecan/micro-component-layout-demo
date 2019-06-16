module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/micro-component-templete/" : "/",
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      prismjs: "Prism",
      "element-ui": "ELEMENT",
    },
  },
};
