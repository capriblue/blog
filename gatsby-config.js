module.exports = {
  siteMetadata: {
    title: `my blog site( this is test.)`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blogs",
        path: `${__dirname}/blog/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      }
    },
    "gatsby-transformer-remark",
  ],
};
