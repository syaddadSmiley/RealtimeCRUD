const socketsServerPort = 5000;
const socketServer = require('websocket').server;
const http = require('http');

//spinning the http server and the websocket server.
const server = http.createServer();
server.listen(socketsServerPort);
console.log('listening on port 5000');

//creating the websocket server
const wsServer = new socketServer({
    httpServer: server
});

const clients = {};

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function(request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    // you can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

    connection.on('message', function(message) {
        if (message.type==='utf8') {
            console.log('Received Message: ' + message.utf8Data);
            // // process WebSocket message
            // var dataFromClient = JSON.parse(message.utf8Data);
            // switch (dataFromClient.type) {
            //     //when a user tries to login    
            //     case "login":
            //         console.log("User logged", dataFromClient.name);
            //         //if anyone is logged in with this username then refuse
            //         if(clients[dataFromClient.name]) {
            //             sendTo(connection, {
            //                 type: "login",
            //                 success: false
            //             });
            //         }
            //         else {
            //             //save user connection on the server
            //             clients[dataFromClient.name] = connection;
            //             connection.name = dataFromClient.name;
            //             sendTo(connection, {
            //                 type: "login",
            //                 success: true
            //             });
            //         }
            //         break;
            //     case "offer":
            //         //for ex. UserA wants to call UserB
            //         console.log('Sending offer to: ', dataFromClient.name);
            //         //if UserB exists then send him offer details
            //         var conn = clients[dataFromClient.name];
            //         if(conn != null) {
            //             //setting that UserA connected with UserB
            //             connection.otherName = dataFromClient.name;
            //             sendTo(conn, {
            //                 type: "offer",
            //                 offer: dataFromClient.offer,
            //                 name: connection.name
            //             });
            //         }
            //         break;
            //     case "answer":
            //         console.log('Sending answer to: ', dataFromClient.name);
            //         //for ex. UserB answers UserA
            //         var conn = clients[dataFromClient.name];
            //         if(conn != null) {
            //             connection.otherName = dataFromClient.name;
            //             sendTo(conn, {
            //                 type: "answer",
            //                 answer: dataFromClient.answer
            //             });
            //         }
            //         break;
            //     case "candidate":
            //         console.log('Sending candidate to:',dataFromClient.name);
            //         var conn = clients[dataFromClient.name];
            //         if(conn != null) {
            //             sendTo(conn, {
            //                 type: "candidate",
            //                 candidate: dataFromClient.candidate
            //             });
            //         }
            //         break;
            //     case "leave":
            //         console.log('Disconnecting from', dataFromClient.name);
            //         var conn = clients[dataFromClient.name];
            //         conn.otherName = null;
            //         //notify the other user so he can disconnect his peer connection
            //         if(conn != null) {
            //             sendTo(conn, {
            //                 type: "leave"
            //             });
            //         }
            //         break;
            //     default:
            //         sendTo(connection, {
            //             type: "error",
            //             message: "Command not found: " + dataFromClient.type

            //broadcast message to all connected clients
            for (key in clients) {
                clients[key].sendUTF(message.utf8Data);
                console.log('sent Message to: ', clients[key]);
            }
        }
    })
});