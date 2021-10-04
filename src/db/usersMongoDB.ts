import { MongoClient, config } from "../../deps.ts";
import type { User } from "../types/user.ts";

//Load enviroment variables 
const { args } = Deno;
const { STRMONGO } = config({path: args[0],  export: true });
const { DBMONGO } = config({path: args[0],  export: true });
const { USRNAME } = config({path: args[0],  export: true });
const { PWDMONGO } = config({path: args[0],  export: true });
const URI = STRMONGO;


// Mongo Connection Init
const client = new MongoClient();
try {
    //await client.connect(URI);
    //Referencia: https://stackoverflow.com/questions/66202683/deno-uncaught-error-no-such-host-is-known-os-error-11001
    await client.connect({
        db: DBMONGO,//"ecommerce",
        tls: true,
        servers: [
          { 
            host: URI,//"cluster0-shard-00-02.ixflv.mongodb.net",
            port: 27017,
          },
        ],
        credential: {
          username: USRNAME,//"ecommercedbUser",
          password: PWDMONGO,//"dbpass2021**",
          db: DBMONGO,//"ecommerce",
          mechanism: "SCRAM-SHA-1",
        },
      });

    console.log("Data Base connected");
} catch (err) {
    console.log(err);
}

const db = client.database(DBMONGO);
const users = db.collection<User>("users");

// @description: GET all Users
// @route GET /api/users
const getUsers = async ({ response }: { response: any }) => {
    try {
    const allUsers = await users.find({}).toArray();
    console.log(allUsers);
    if (allUsers) {
        response.status = 200;
        response.body = {
        success: true,
        data: allUsers,
        };
    } else {
        response.status = 500;
        response.body = {
        success: false,
        msg: "Internal Server Error",
        };
    }
    } catch (err) {
    response.body = {
        success: false,
        msg: err.toString(),
    };
    }
};

// @description: GET single user
// @route GET /api/users/:id
const getUser = async ({
    params,
    response,
}: {
    params: { id: string };
    response: any;
}) => {
    console.log(params.id)
    const user = await users.findOne({ userID: params.id });

    if (user) {
    response.status = 200;
    response.body = {
        success: true,
        data: user,
    };
    } else {
    response.status = 404;
    response.body = {
        success: false,
        msg: "No user found",
    };
    }
};

// @description: ADD single user
// @route POST /api/users
const addUser = async ({
    request,
    response,
}: {
    request: any;
    response: any;
}) => {
    try {
    if (!request.hasBody) {
        response.status = 400;
        response.body = {
        success: false,
        msg: "No Data",
        };
    } else {
        const body = await request.body();
        const user = await body.value;
        await users.insertOne(user);
        response.status = 201;
        response.body = {
        success: true,
        data: user,
        };
    }
    } catch (err) {
    response.body = {
        success: false,
        msg: err.toString(),
    };
    }
};

// @description: UPDATE single user
// @route PUT /api/users/:id
const updateUser = async ({
    params,
    request,
    response,
}: {
    params: { id: string };
    request: any;
    response: any;
}) => {
    try {
    const body = await request.body();
    const inputUser = await body.value;
    await users.updateOne(
        { userID: params.id },
        { $set: { username: inputUser.username, password: inputUser.password, email: inputUser.email, age:inputUser.age, address: inputUser.address, phone: inputUser.phone, avatar:inputUser.avatar } }
    );
    const updatedUser = await users.findOne({ userID: params.id });
    response.status = 200;
    response.body = {
        success: true,
        data: updatedUser,
    };
    } catch (err) {
    response.body = {
        success: false,
        msg: err.toString(),
    };
    }
};

// @description: DELETE single user
// @route DELETE /api/users/:id
const deleteUser = async ({
    params,
    response,
}: {
    params: { id: string };
    request: any;
    response: any;
}) => {
    try {
    await users.deleteOne({ userID: params.id });
    response.status = 201;
    response.body = {
        success: true,
        msg: "User deleted",
    };
    } catch (err) {
    response.body = {
        success: false,
        msg: err.toString(),
    };
    }
};

export { getUsers, getUser, addUser, updateUser, deleteUser, users};