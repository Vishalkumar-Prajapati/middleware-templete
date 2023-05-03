import {createServer} from 'node:http';

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/json');
    const v=req.headers
    console.log(v);
    res.end(JSON.stringify(v));
    // res.end(v);
});
server.listen(8080);


// const nDate = new Date();
// console.log(process.env);
process.env.TZ = "Asia/Calcutta";
// console.log(process.env);
console.log(new Date().toString());