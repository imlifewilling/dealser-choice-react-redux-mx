const exp = require('constants')
const express = require('express')
const path = require('path')
const {Category, Product, seedAndSync} = require('./db') 

const app = express()

app.use(express.json())
app.use('/dist', express.static('dist'))
app.use('/assets', express.static('assets'))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/api/categories', async(req, res, next) => {
    try{
        res.send(await Category.findAll())
    }catch(error){
        next(error)
    }
})

app.get('/api/products', async(req, res, next) => {
    try{
        res.send(await Product.findAll())
    }catch(error){
        next(error)
    }
})

app.put('/api/products/:id', async(req, res, next) => {
    try{
        const product = await Product.findByPk(req.params.id)
        await product.update(req.body)
        res.send(product)
    }catch(error){
        next(error)
    }
})

app.post('/api/product', async(req, res, next) => {
    try{
        res.status(201).send(await Product.create(req.body))
    }catch(error){
        next(error)
    }
})

// app.post('/api/products/:id', async(req, res, next) => {
//     try{
//         res.status(201).send((await Product.findByPk(req.params.id)).update(req.body))
//     }catch(error){
//         next(error)
//     }
// })

app.delete('/api/products/:id', async(req, res, next) => {
    try{
        const deleteproduct = await Product.findByPk(req.params.id)
        await deleteproduct.destroy()
        res.sendStatus(204)
    }catch(error){
        next(error)
    }
})

const init = async () => {
    try{
        await seedAndSync()
        const port = process.env.PORT || 3000
        app.listen(port, () => console.log(`listening on port ${port}`))
    }catch(error){
        console.log(error)
    }
};

init();