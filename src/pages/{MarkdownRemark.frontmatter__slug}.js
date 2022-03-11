import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import "katex/dist/katex.min.css"
export default function Template({ data}) {
    const { markdownRemark }  = data
    const { frontmatter, html } = markdownRemark
    return (
        <Layout>
            <h1>{frontmatter.title}</h1>
            <small>{frontmatter.date}</small>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </Layout>
    )
}

export const pageQuery = graphql`
query($id: String!) {
    markdownRemark(id: { eq: $id }) {
        html
        frontmatter {
            date(formatString: "MMM DD, YYYY" )
            slug
            title
        }
    }
}`