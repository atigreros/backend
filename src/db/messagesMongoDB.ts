import { config } from "../../deps.ts";
import { MongoClient } from "../../deps.ts";
import type { Message } from "../types/message.ts";

//Load enviroment variables 
const { args } = Deno;
const { STRMONGO } = config({path: args[0],  export: true });
const { DBMONGO } = config({path: args[0],  export: true });
const URI = STRMONGO;

// Mongo Connection Init
const client = new MongoClient();
try {
    await client.connect(URI);
    console.log("Data base connected");
} catch (err) {
    console.log(err);
}

const db = client.database(DBMONGO);
const messages = db.collection<Message>("messages");

// @description: GET all Messages
// @route GET /api/users
const getMessages = async ({ response }: { response: any }) => {
    try {
    const allMessages = await messages.find({}).toArray();
    console.log(allMessages);
    if (allMessages) {
        response.status = 200;
        response.body = {
        success: true,
        data: allMessages,
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

// @description: GET single message
// @route GET /api/messages/:id
const getMessage = async ({
    params,
    response,
}: {
    params: { id: string };
    response: any;
}) => {
    console.log(params.id)
    const user = await messages.findOne({ messageID: params.id });

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
        msg: "No message found",
    };
    }
};

// @description: ADD single message
// @route POST /api/messages
const addMessage = async ({
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
        const message = await body.value;
        await messages.insertOne(message);
        response.status = 201;
        response.body = {
        success: true,
        data: message,
        };
    }
    } catch (err) {
    response.body = {
        success: false,
        msg: err.toString(),
    };
    }
};

// @description: UPDATE single message
// @route PUT /api/messages/:id
const updateMessage = async ({
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
    const inputMessage = await body.value;
    await messages.updateOne(
        { messageID: params.id },
        { $set: { username: {id_:inputMessage.id_, name: inputMessage.name, email: inputMessage.email}, text: inputMessage.text } }
    );
    const updatedMessage = await messages.findOne({ messageID: params.id });
    response.status = 200;
    response.body = {
        success: true,
        data: updatedMessage,
    };
    } catch (err) {
    response.body = {
        success: false,
        msg: err.toString(),
    };
    }
};

// @description: DELETE single message
// @route DELETE /api/messages/:id
const deleteMessage = async ({
    params,
    response,
}: {
    params: { id: string };
    request: any;
    response: any;
}) => {
    try {
    await messages.deleteOne({ messageID: params.id });
    response.status = 201;
    response.body = {
        success: true,
        msg: "Message deleted",
    };
    } catch (err) {
    response.body = {
        success: false,
        msg: err.toString(),
    };
    }
};

export { getMessages, getMessage, addMessage, updateMessage, deleteMessage };