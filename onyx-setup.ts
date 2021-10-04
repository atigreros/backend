import { onyx, LocalStrategy } from './deps.ts';
import { users as User} from './src/db/usersMongoDB.ts';

// Reference: https://deno.land/x/onyx@v1.0.1/example
// Configure the Strategy, constructor takes up to 2 arguments
// 1: optional: options
// 2: required: provide verify function that will receive username, password, and a callback function.  Verify the username/password is correct before invoking the callback function.
onyx.use(
  new LocalStrategy(
    async (username: string, password: string, done: Function) => {
      try {
        console.log("user in LocalStrategy")
        const user = await User.findOne({ userID: username });
        console.log(user);
        if (user && password === user.password) await done(null, user);
        else await done(null);
      } catch (error) {
        await done(error);
      }
    },
  )
);

// user needs to provide the serializer function that will specify what to store in the session db - typically just the user id
onyx.serializeUser(async function (user: any, cb: Function) {
  //await cb(null, user._id.$oid);
  await cb(null, user.username);
});

// user needs to provide the deserializer function that will receive what was stored in the session db as the first argument to query the user db for the user object
onyx.deserializeUser(async function (id: string, cb: Function) {
  //const _id = { $oid: id };
  const username = id;
  try {
    const user = await User.findOne({ userID: username });
    await cb(null, user);
  } catch (error) {
    await cb(error, null);
  }
});
