const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const path = require('path')
const getRandomStr = require('./utils/getRandomStr')
const URL = require('./models/URL')

require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  if (!req.body.url) return res.redirect('/')
  const url = req.body.url
  const randomStr = getRandomStr()
  URL.findOne({ url })
    .then((data) => (data ? data : URL.create({ url, char: randomStr.char, zwsp: randomStr.zwsp })))
    .then((data) => res.render('index', { origin: req.headers.origin, char: data.char, zwsp: data.zwsp  }))
    .catch((error) => console.error(error))
})

app.get('/:randomStr', (req, res) => {
  const { randomStr } = req.params
  URL.findOne({ $or: [{ char: randomStr }, { zwsp: randomStr }] })
    .then((data) => {
      if (!data) return res.render('index', { msg: "Oops... That URL doesn't exist." })
      res.redirect(data.url)
    })
    .catch((error) => console.error(error))
})

app.listen(3000, () => {
  console.log('Express is listening on http://localhost:3000')
})
