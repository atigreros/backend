import { 
    Application , 
    engineFactory,
    adapterFactory,
    Router,
    config,
    viewEngine,
    ViewConfig,
    Session } from "../deps.ts";

import { router } from './routes/index.ts'


//Application
const app = new Application();

// Configuring Session for the Oak framework
const session = new Session({ framework: "oak" });
await session.init();

//VIEWERS WITH EJS
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
const viewConfig: ViewConfig = {
    viewRoot: "../views",
    viewExt: ".ejs"
  }

// session middleware
app.use(session.use()(session));

// view middleware
app.use(viewEngine(oakAdapter, ejsEngine, viewConfig));

// Allowing Static file to fetch from server
/*app.use(async (ctx,next) => {
    await send(ctx, ctx.request.url.pathname,{
     root: `${Deno.cwd()}/static`
      })
    next();
   });*/


//Adding middleware to require our router
const parentRouter = new Router();
//Producto routes
parentRouter.all("apiRouter", "/api(/.*)?", router.routes());
app.use(parentRouter.routes());

/*router.get("/api/products", findProduct)
.get("/api/products/:productId", findProductById)
.delete("/api/products/:productId", deleteProduct)
.put("/api/products/:productId", updateProduct)
.post("/api/products", createProduct);*/


// router.get("/",(ctx)=>{
//     ctx.render('index.ejs',{data: {msg:"World"}}
//     });

//Adding middleware to require our router
app.use(router.routes());
app.use(router.allowedMethods());

//ENV variables
const { args } = Deno;
console.log("argumentos:")
console.log(Deno.args);
config({path: args[0],  export: true })
const PORT = Deno.env.get('PORT')

console.log(`Server up on port ${PORT}`);
await app.listen({ port: Number(PORT) });
