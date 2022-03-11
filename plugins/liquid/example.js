import {promises as fs} from 'node:fs'
import {micromark} from 'micromark'
import { variables, variablesHtml } from "./index.js";
main()

async function main() {
    const buf = await fs.readFile('example.md')
    const html = variablesHtml({'planet': '1', 'pla}net': '2'})
    const out = micromark(buf, {extensions: [variables], htmlExtensions: [html]})
    console.log(out)
}