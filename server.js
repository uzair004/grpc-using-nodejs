const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = 'todo.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});

const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();

server.addService(todoPackage.Todo.service, {
    "createTodo": createTodo,
    "readTodos": readTodos,
    "readTodoStream": readTodoStream,
})

server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log("Server running...");

    server.start();
});

const todos = [];

function createTodo(call, callback) {
    // console.log("call: ", call);
    // console.log("call.request: ", call.request);

    const todoItem = {
        "id": todos.length,
        "text": call.request.text
    }

    todos.push(todoItem);

    callback(null, todoItem);
}

// synchronous
function readTodos(call, callback) {
    callback(null, { "items": todos });
}

function readTodoStream(call, callback) {

    todos.forEach(todo => {
        call.write(todo);
    });

    call.end(); // end the stream

}


