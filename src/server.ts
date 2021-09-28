import { Application, config } from "../deps.ts";

import { router } from "./routes/index.ts";
import { logger } from "./middleware/logger.ts";

const { args } = Deno;
console.log("argumentos:")
console.log(Deno.args);
config({path: args[0],  export: true })
const PORT = Deno.env.get('PORT')

//const { PORT } = config();
//const { PORT } = config({path: 'development.env'})
const app = new Application();

app.use(logger);
app.use(router.routes());

console.log(`Server up on port ${PORT}`);

await app.listen({ port: Number(PORT) });
