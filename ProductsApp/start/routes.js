'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('welcome')

// Agregar middleware de autenticación
Route
    .get('/botonRojo', 'PresidentController.Apocalipsis')
    .middleware('auth')

const Product = use('App/Models/Product')
Route
    .get('products', async ({view}) => {
		const products = (await Product.all()).toJSON()

		return view.render('ProductsList', {products})
	})