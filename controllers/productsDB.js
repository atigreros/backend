import { mysql } from './config.js'
import { sqlite3 } from './config.js'
import knexLib from 'knex'

class ProductsDB {
    constructor() {
        this.knex = knexLib(mysql);
        (async() => {
            let exists = await this.knex.schema.hasTable('products')
            if (!exists) {
                await this.knex.schema.createTable('products', table => {
                    table.increments('id').primary();
                    table.string('title', 30);
                    table.float('price', 100);
                    table.string('thumbnail',200);
                    table.integer('stock');
                });
                console.log('Products table created!')
            }
        })()
    }

    read(id) {
        return id? 
            this.knex('products').select('*').where('id', id) :
            this.knex('products').select('*')
    }
    
    add(product) {
        return this.knex('products').insert(product) 
    }

    update(id, newStock) {
      return this.knex.from('products').where('id', id).update({ stock: newStock })
    }

    /*update(producto, id) {
        return this.knex.from('products').where('id', id).update(product)
    }*/
    
    delete(id) {
        return this.knex.from('products').where('id', id).del()
    }
}

export default ProductsDB

/*import knex from 'knex'

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

export default ProductsDB*/