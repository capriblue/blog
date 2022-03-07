import * as React from "react";
import { graphql } from "gatsby";

const BlogPost = ({ data }) => {
  const remark = data.markdownRemark;
  const date = remark.fileAbsolutePath.split("/").slice(-2, -1);
  return (
    <>
      <h1>{remark.frontmatter.title}</h1>
      <small>
        category: {remark.frontmatter.category}, date: {date}
      </small>
      {remark.html}
    </>
  );
};

export const query = graphql`
  query  {
    markdownRemark(id: { eq: "483c8131-6bbb-5309-9913-f459821e6af4" }) {
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