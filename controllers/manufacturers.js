const models = require('../models')

const getAllManufacturers = async (request, response) => {
  const manufacturers = await models.Manufacturers.findAll({
    include: [{ model: models.Products }]
  })

  return response.send(manufacturers)
}

const getManufacturerById = async (request, response) => {
  const { id } = request.params

  const manufacturer = await models.Manufacturers.findOne({
    where: { id },
    include: [{ model: models.Products }]
  })

  return manufacturer
    ? response.send(manufacturer)
    : response.sendStatus(404)
}

const getManufacturerByName = async (request, response) => {
  try {
    const { name } = request.params

    const foundManufacturer = await models.Manufacturers.findOne({
      where: {
        name: { [models.Op.like]: `%${name}%` },
      },
      attributes: ['id', 'name', 'country'],
      include: [{ model: models.Products, attributes: ['id', 'name', 'yearIntroduced'] }]
    })

    return foundManufacturer
      ? response.send(foundManufacturer)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('RIP. No matching manufacturer found.')
  }
}

module.exports = { getAllManufacturers, getManufacturerById, getManufacturerByName }
