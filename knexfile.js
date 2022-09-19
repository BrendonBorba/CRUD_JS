// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const development = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bank'
  }
}

export { development }
