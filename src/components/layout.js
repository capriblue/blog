import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

const Layout = ({ children}) => {
    const data = useStaticQuery(graphql`
    query {
      allSitePage {
        nodes {
          path
        }
      }
    }
    `)
  const linknodes = data.allSitePage.nodes
  return (
    <>
      {linknodes.map((leaf) => (
        <li key={leaf.path}>
          <Link to={leaf.path}>{leaf.path}</Link>
        </li>
      ))}
      {children}
    </>
  );
};


export default Layout;
