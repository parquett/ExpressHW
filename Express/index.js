const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = 3000
const app = express()

const hbs=exphbs.create({ //настройка конфигурации для будущего шаблонизатора
    defaultLayout: 'main', //название дефолтного лэйаута
    extname: 'hbs', //меняем дефолтное расширение
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('hbs', hbs.engine) //используем движок по ключу hbs
app.set('view engine', 'hbs') //используем движок по имени hbs
app.set('views', 'views') //регистрируем папку где хранятся страницы

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
//express теперь знает, что статика лежит в папке public
app.use(todoRoutes) //регистрируем пути

async function start() {
    try {
        // await mongoose.connect('mongodb+srv://Ivan:QAwsedrf@cluster0.cv4sq.mongodb.net/todos', {
        //     useNewUrlParser: true,
        //     useFindAndModify: false,
        //     useUnifiedTopology:true
        // })
        await mongoose.connect('mongodb+srv://artyom:bd123bd@workbd.ctzxh.mongodb.net/homework', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology:true
        })
        app.listen(PORT, () => {
            console.log('server has been started')
        })
    }
        catch(e){
        
            console.log(e)
        }
}
start()