let http=require('http');
let fs=require('fs');
let fun=require('./Routes/routes');
let server=http.createServer(fun);

server.listen(3000);