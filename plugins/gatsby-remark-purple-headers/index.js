const visit = require("unist-util-visit")
const toString = require("mdast-util-to-string")
module.exports  = async  ({ markdownAST }, pluginOptions ) => {
    console.log(JSON.stringify(markdownAST))
    visit(markdownAST, "heading", node => {
        let { depth } = node
        if ( depth !== 1)  return

        let text = toString(node)

        const html = `
        <h1 style="color: rebeccapurple">${text}</h1>
        `

        node.type = "html"
        node.children = undefined
        node.value = html
    })
    return markdownAST
}

