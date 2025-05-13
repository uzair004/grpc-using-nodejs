const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './todo.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});

const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];

const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure());

client.createTodo({"id": -1, text}, (error, response) => {
    if (error) {
        console.error("Error: ", error);
    } else {
        console.log("Response createTodo method: ", JSON.stringify(response));
    }
})

// client.readTodos({}, (error, response) => {
//     console.log("Response from server: ", JSON.stringify(response));
// })

const callStream = client.readTodoStream();

callStream.on("data", (item) => { 
    console.log("Recieved item from server: ", JSON.stringify(item));
})

callStream.on("end", () => {
    console.log("Stream ended");
}
)