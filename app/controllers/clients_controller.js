import db from '../../config/db_config.js'

async function clientsIndex() {
  let result = await db.select('*').from('clients')
  console.log(result)
  return result
}

export default clients
