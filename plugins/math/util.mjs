import {promises as fs} from 'node:fs'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {toHast} from 'mdast-util-to-hast'
import {toHtml} from 'hast-util-to-html'
import {math} from 'micromark-extension-math'
import { mathFromMarkdown } from "mdast-util-math";
import {unified} from 'unified'
import rehypeStrigify from 'rehype-stringify'
import rehypeMathjax from 'rehype-mathjax'
import rehypeParse from 'rehype-parse'
import {removePosition } from 'unist-util-remove-position'
import {visit} from 'unist-util-visit'
import {toText} from 'hast-util-to-text'

import katex from "katex";
const { renderToString } = katex
 main()

async function main() {
  const markdown = String(await fs.readFile('example.md'))
  const mdast = fromMarkdown(markdown, {
    extensions: [math()],
    mdastExtensions: [mathFromMarkdown()]
  })
  const hast = toHast(mdast, {allowDangerousHtml: true})
  console.log(JSON.stringify(removePosition(hast, true), null, 2))
  const rawhtml = toHtml(hast)
  // console.log(rawhtml)
  const newhast = mymath(hast)
  const doc =toHtml(newhast)
  console.log(doc)
  const doc2 = await unified().use(rehypeParse, {fragment: true}).use(rehypeMathjax).use(rehypeStrigify).process(rawhtml)
  // console.log(String(doc2))
}

function mymath(tree) {
  const parseHtml = unified().use(rehypeParse, {fragment: true})
  const assign = Object.assign
  visit(tree, 'element', (elm) => {
    const classes = elm.properties && Array.isArray(elm.properties.className) ? elm.properties.className : []
    const inline = classes.includes('math-inline')
    const displayMode = classes.includes('math-display')
    if (!inline && !displayMode) {
      return
    }

    const value = toText(elm, {whitespace: 'pre'})

    const result = renderToString(
      value,
      assign({}, {displayMode, throwOnError: false, strict: 'ignore'})
    )
    elm.children = removePosition(parseHtml.parse(result), true).children
  } )
  return tree
}