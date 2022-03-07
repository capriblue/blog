import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

const Layout = ({ children}) => {
    const data = useStaticQuery(graphql`
    query {
        allFile(
          filter: { internal: { mediaType: { eq: "application/javascript" } } }
        ) {
          nodes {
            relativePath
            name
          }
        }
      }`)
  const linknodes = data.allFile.nodes;
  return (
    <>
      {children}
      {linknodes.map((leaf) => (
        <li key={leaf.relativePath}>
          <Link to={leaf.name}>{leaf.name}</Link>
        </li>
      ))}
    </>
  );
};


export default Layout;
