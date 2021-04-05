const {Router} = require('express')
const Todo = require('../models/Todo')
const router = Router()
router.get('/', async(req, res) => {
    const todos = await Todo.find({}) //получаем все todos что
    //есть для того чтобы что-то пользователю вернуть, обращаемся
    //к объекту res который вернул express
    res.render('index', { 
        //метод render позволяет рендерить некоторые страницы
        title: 'Todo list',
        isIndex: true, 
        todos: todos.filter(t=> t.archived == false)//передается на страницу как параметр
    })
})
router.get('/create', async(req, res) => {
    res.render('create', {
        title: 'Create Todo',
        isCreate: true
    })
})

router.get('/archive', async(req, res) => {
    const todos = await Todo.find({})
    res.render('archive', {
        title: 'Archive Todo',
        isArchive: true,
        todos: todos.filter(t=> t.archived == true)
    })
})

router.post('/create', async(req, res) => {
    const todo = new Todo({
        title: req.body.title
        //body.title соответствует name, указанному в input
    })
    await todo.save() //сохраняем созданный 'todo'
    res.redirect('/') //перенаправляем на домашнюю страницу
    //чтобы сразу увидеть список
})

router.post('/complete', async(req, res) => {
    const todo = await Todo.findById(req.body.id)
    todo.completed = !!req.body.completed
    await todo.save() 
    res.redirect('/') 
})

router.post('/archive', async(req, res) => {
    const todo = await Todo.findById(req.body.id)
    todo.archived = true
    await todo.save() 
    res.redirect('/') 
})
router.post('/unarchive', async(req, res) => {
    const todo = await Todo.findById(req.body.id)
    todo.archived = false
    await todo.save() 
    res.redirect('/') 
})
module.exports = router 
