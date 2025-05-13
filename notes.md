SOAP: Strict schema, XML based, Older
REST: JSON based, No strict Schema, Easier
GraphQL: Minimize number of requests, flexible data handling for client
WebSockets: Bi-directional communication
SSE: Uni-directional (server to client)
Raw TPC: database usually use and invent, i.e redis

Most of above requires client libraries for handling connection, TLS, HTTP/1/2 protocols, features, updates etc
Even though its easier on browser side, as it handle all of it itself but on server side every language has its own client library which require maintenance and stuff discussed above

GRPC:
- one library for popular languages
- http/2 support and implementation
- protocol buffer as language agnostic message format

gRPC modes:
- Unary RPC mode
- Server streaming mode
- Client streaming mode
- Bidirectional streaming mode

Coding:
- Create .proto file
- Create server
    - Read proto file using photo-loader (pacakge definition
    - Load package definition to grpc object
    - Read proto package from grpc object
    - Add service (and its methods)
    - Bind server with credentials and start server
    - Define methods (createTodos, readTodos, readTodoStream)
- Create client
    - Same as server file until server listening or binding
    - Create client instance with credentials and ip, port
    - Call server methods or stream

Pros of gRPC:
- Fast & Compact (No JSON & use of HTTP/2)
- One client library per language
- Progress feedback (streaming, uploading)
- Cancel Request (by streamID)
- HTTP/2 benefits
Const of gRPC:
- Schema
- Proxies (not every proxy doesn’t work with gRPC)
- Error Handling
- No Browser Support (doesn’t work on browsers)
- Timeouts (micorservices connected using gPRC may have problems as different services require different time to respond, there might be timeouts etc, pub/sub are better there)
