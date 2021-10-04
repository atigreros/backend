import {   
    onyx
} from "../../deps.ts";

import { users as UserDB} from '../../src/db/usersMongoDB.ts';
import { User } from '../types/user.ts';
import '../../onyx-setup.ts';


export default {
    async getLogin(ctx: any){
         //const user = await ctx.state.session.get("user");  
         //if (user) return ctx.response.redirect('/main/products');
        //return ctx.response.redirect('/main/products') //OK
        //return ctx.render("index")
        return ctx.render("./login")
        //return ctx.response.redirect("/login");
    },
    async postLogin(ctx: any) {

        // option 1: construct a user object and invoke ctx.state.logIn
        const username = "gato"
        const inputUser = { username:"gato", password:"conbotas" };
        
        //const foundUser:User = UserDB.findOne({ userID: username });
        //if(inputUser.password == foundUser.password)
        {
            await ctx.state.logIn(ctx, inputUser, async (err: any) => {
                if (err) return ctx.throw(err);
                else {
                ctx.response.body = {
                    success: true,
                    username,
                    isAuth: true,
                };
            }
            });
        }

        console.log('postlogin');

        //const awt = await onyx.authenticate('local');
        // console.log(awt);
        // console.log(awt.ctx);
        // console.log(ctx);
        //await (awt)(ctx);
      
        if (await ctx.state.isAuthenticated()) {
          const { username } = await ctx.state.getUser();
          console.log (username);
          console.log('login OK');
          return ctx.render('./guardar')
        //   ctx.response.body = {
        //     success: true,
        //     username,
        //     isAuth: true,
        //   };
        } else {
            console.log('no login');
            return ctx.render('./login-error');
        //   const message = ctx.state.onyx.errorMessage || 'login unsuccessful';
        //   ctx.response.body = {
        //     success: false,
        //     message,
        //     isAuth: false,
        //   };
        }


    },
    async getRegister(ctx: any) {
        return ctx.render('./register');
    },
    async postRegister(ctx: any) {
        return ctx.response.redirect('/api/products/1'); //OK
    },
}

      
