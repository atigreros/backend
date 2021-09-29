import {   
    Application,
    viewEngine,
    engineFactory,
    adapterFactory} from "../../deps.ts";

export default {
    async getLogin(ctx: any){
        // const user = await ctx.state.session.get("user");  
        // if (user) return ctx.response.redirect('/admin');
        //return ctx.response.redirect('/main/products') //OK
        //return ctx.render("index")
        return ctx.render("login")
    },
}

      