const express = require('express')
const { getAllManufacturers, getManufacturerById, getManufacturerByName } = require('./controllers/manufacturers')
const { getAllProducts, getProductsById, getProductsByName } = require('./controllers/products')

const app = express()

app.get('/manufacturers', getAllManufacturers)

//app.get('/manufacturers/:id', getManufacturerById)

app.get('/manufacturers/:name', getManufacturerByName)

app.get('/products', getAllProducts)

//app.get('/products/:id', getProductsById)

app.get('/products/:name', getProductsByName)

app.listen(1337, () => {
  console.log('Listening on port 1337...') // eslint-disable-line no-console
})
