import katex from "katex";
const { renderToString } = katex
import {unified} from "unified"
import { visit } from "unist-util-visit";
import {read} from 'to-vfile'
import { toMarkdown } from "mdast-util-to-markdown";
import rehypeParse from "rehype-parse"
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeMath from "rehype-mathjax"
import rehypeStringify from 'rehype-stringify'

import {toHast} from 'mdast-util-to-hast'
import {toHtml} from 'hast-util-to-html'
import {fromMarkdown} from "mdast-util-from-markdown"



main()


async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .parse(await read("example.md"))
    // .use(remarkRehype)
    // .use(rehypeMath)
    // .use(rehypeStringify)
    // .process(await read('example.md'))
    // console.log(JSON.stringify(file, null, 2))
    visit(file, 'math', (node)=>{
        node.data.hChildren = unified()
            .use(rehypeParse, { fragment: true, position: false})
            .parse(
                renderToString(node.value, {
                    displayMode: true,
                })
            ).children
        console.log(node.data.hChildren)
    })
    visit(file, 'inlineMath', (node)=> {
        node.data.hChildren = unified()
            .use(rehypeParse, {fragment: true, position: false})
            .parse(
                renderToString(node.value, {
                    displayMode: false,
                })
            )
    })
    const hast = toHast(file)
    const html = toHtml(hast)
    console.log(html)
}
