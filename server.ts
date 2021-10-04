import { 
    Application , 
    engineFactory,
    adapterFactory,
    Router,
    config,
    viewEngine,
    ViewConfig,
    Session,
    onyx
 } from "./deps.ts";

// Import in onyx and setup
import './onyx-setup.ts';

//import { router } from './routes/index.ts'
import { apiRouter } from './src/routes/api.ts'
import { mainRouter } from './src/routes/main.ts'

//Application
const app : Application = new Application();

// Configuring Session for the Oak framework
const session = new Session({ 
    framework: "oak",
    store: "memory",
    // store: 'redis',
    // hostname: '127.0.0.1',
    // port: 6379, 
});


//VIEWERS WITH EJS
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
const viewConfig: ViewConfig = {
    viewRoot: "./src/views",
    viewExt: ".ejs"
}

await session.init();
// session middleware
app.use(session.use()(session));

// Initialize onyx after session
app.use(onyx.initialize());  //Si lo inicializo, da error al renderizar login

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
parentRouter.all("apiRouter", "/api(/.*)?", apiRouter.routes());
parentRouter.all("mainRouter", "/(/.*)?", mainRouter.routes());

app.use(parentRouter.routes());

//Adding middleware to require our router
app.use(parentRouter.routes());
app.use(parentRouter.allowedMethods());

//ENV variables
const { args } = Deno;
console.log("argumentos:")
console.log(Deno.args);
config({path: args[0],  export: true })
const PORT = Deno.env.get('PORT')

console.log(`Server up on port ${PORT}`);
await app.listen({ port: Number(PORT) });
