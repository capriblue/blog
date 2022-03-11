import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeMath from "rehype-mathjax"
import rehypeStringify from 'rehype-stringify'

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

  console.log(JSON.stringify(file))
}