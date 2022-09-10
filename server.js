const express = require('express')
const path = require('path')
const {Category, Product, seedAndSync} = require('./db') 

const app = express()

app.use('/dist', express.static('dist'))
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