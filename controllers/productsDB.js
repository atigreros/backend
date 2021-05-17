import knex from 'knex'

class ProductsDB {
  constructor(config) {
    this.knex = knex(config)
  }

  async create() {
    return this.knex.schema.dropTableIfExists('products')
      .then(() => {
        return this.knex.schema.createTable('products', table => {
          table.increments('id').primary();
          table.string('title', 64).notNullable();
          table.float('price');
          table.string('thumbnail', 128).notNullable();
          table.integer('stock');
        })
      })
  }

  add(message) {
    return this.knex('products').insert(message)
  }

  select() {
    return this.knex('products').select()
  }

  delete(id) {
    return this.knex.from('products').where('id', id).del()
  }

  update(id, newStock) {
    return this.knex.from('products').where('id', id).update({ stock: newStock })
  }

  close() {
    return this.knex.destroy()
  }
}

export default ProductsDB