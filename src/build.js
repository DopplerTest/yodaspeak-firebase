const fs = require('fs')
const ncp = require('ncp')
const nunjucks = require('nunjucks')

const DIST_DIR = process.env.DIST_DIR
const TRANSLATE_ENDPOINT = process.env.TRANSLATE_ENDPOINT
const TRANSLATION_SUGGESTION = process.env.TRANSLATION_SUGGESTION

nunjucks.configure('src/views', {
    autoescape: true,
})

if (fs.existsSync(DIST_DIR)) {
    fs.rmdirSync(DIST_DIR, { recursive: true })
}
fs.mkdirSync(DIST_DIR)

fs.writeFileSync(
    `${DIST_DIR}/index.html`,
    nunjucks.render('index.nunjucks', {
        translationEndpoint: TRANSLATE_ENDPOINT,
        translationSuggestion: TRANSLATION_SUGGESTION,
    })
)

ncp('./src/public', DIST_DIR, function (err) {
    if (err) {
        return console.error(err)
    }

    console.log(`Build saved to ${DIST_DIR}`)
})
