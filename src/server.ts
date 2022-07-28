    //import * as express from "express";
    const express = require("express");
    const socketio = require("socket.io")({
        allowEIO3: true // false by default
    });
    const path = require("path");

    const app = express();
    app.set("port", process.env.PORT || 8100);

    let http = require("http").Server(app);
    // set up socket.io and bind it to our
    // http server.
    let io = require("socket.io")(http);

    app.get("/", (req: any, res: any) => {
    res.sendFile(path.resolve("./src/index.html"));
    });

    // whenever a user connects on port 8100 via
    // a websocket, log that a user has connected
    io.on("connection", function(socket: any) {
        console.log("User has connected");
        // whenever we receive a 'message' we log it out
        socket.on("message", function(message: any) {
        console.log(message);
        // echo the message back down the
        // websocket connection
        socket.emit("message", message);
        }); 
    });

    const server = http.listen(8100, function() {
    console.log("listening on *8100");
    });