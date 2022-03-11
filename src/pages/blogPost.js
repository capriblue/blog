import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const BlogPost = ({ data }) => {
  const remark = data.markdownRemark;
  const date = remark.fileAbsolutePath.split("/").slice(-2, -1) ?? `2020/03/11`
  // const date = `2022/03/11`
  return (
    <Layout>
      <h1>{remark.frontmatter.title}</h1>
      <small>
        category: {remark.frontmatter.category}, date: {date}
      </small>
      <div dangerouslySetInnerHTML={{__html: remark.html}}/>
    </Layout>
  );
};

export const query = graphql`
{
  markdownRemark {
    fileAbsolutePath
    frontmatter {
      title
      category
    }
    html
  }
}

`;

export default BlogPost;