import db from '../../config/db_config.js'

export const productsIndex = async (req, res) => {
  try {
    const products = await db.select('*').from('products')
    res.render('products/index', {
      products: products
    })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.messsage })
  }
}

export const productInsert = async (req, res) => {
  const { name, category } = req.body

  if (!name || !category) {
    res.status(400).json({
      id: 0,
      msg: "Error... params not found, please inform 'name', 'category'."
    })
    return
  }

  try {
    const product = await db('products').insert({ name, category })
    res
      .status(201)
      .json({ id: product[0], msg: 'Ok, product successfully inserted!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const productUpdate = async (req, res) => {
  const { id } = req.params

  // atribui via desestruturação
  const { name, category } = req.body

  if (!name || !category) {
    res.status(400).json({
      id: 0,
      msg: "Error... params not found, please inform 'name', 'category'."
    })
    return
  }

  try {
    await db('products').where({ id }).update({ name, category })
    res.status(200).json({ id, msg: 'Ok, product successfully changed' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const productDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await db('products').where({ id }).del()
    res.status(200).json({ id, msg: 'Ok, product successfully deleted' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const productSearch = async (req, res) => {
  const { name } = req.params

  try {
    const search = await db('products').whereLike('name', `%${name}%`)
    res.status(200).json(search)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const categorySearch = async (req, res) => {
  const { category } = req.params

  try {
    const search = await db('products').whereLike('category', `%${category}%`)
    res.status(200).json(search)
    console.log('chegou aqui')
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export default {
  productsIndex,
  productInsert,
  productUpdate,
  productDestroy,
  productSearch,
  categorySearch
}
