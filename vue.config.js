module.exports = {
  publicPath: "/",
  css: {
    loaderOptions: {
      less: {
        lessOptions: { javascriptEnabled: true },
      },
    },
  },
  pwa: {
    name: "Virus Rank",
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
    },
  },
};
