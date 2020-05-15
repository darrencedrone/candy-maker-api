const models = require('../models')

const getAllProducts = async (request, response) => {
  const products = await models.Products.findAll({
    include: [{ model: models.Manufacturers }]
  })

  return response.send(products)
}

const getProductsById = async (request, response) => {
  const { id } = request.params

  const product = await models.Products.findOne({
    where: { id },
    include: [{ model: models.Manufacturers }]
  })

  return product
    ? response.send(product)
    : response.sendStatus(404)
}

const getProductsByName = async (request, response) => {
  try {
    const { name } = request.params

    const foundProducts = await models.Products.findOne({
      where: {
        name: { [models.Op.like]: `%${name}%` },
      },
      attributes: ['id', 'name', 'yearIntroduced'],
      include: [{ model: models.Manufacturers, attributes: ['id', 'name', 'country'] }]
    })

    return foundProducts
      ? response.send(foundProducts)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('RIP. No matching product found.')
  }
}

module.exports = { getAllProducts, getProductsById, getProductsByName }
