import {createServer} from 'node:http';

const server=createServer((req,res)=>{
    res.statusCode=307;
    res.setHeader('Content-Type','text/plain');
    res.end('Hello World');
});

server.listen(3000,(err)=>{
    if(err) throw new Error(err);
    console.log('Server running at http://localhost:3000/');
});
