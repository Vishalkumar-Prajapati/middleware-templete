import { readFileSync } from 'node:fs';
import {createServer} from 'node:http';
import {render} from 'ejs';
const PORT=8000;

// function readFile(){
//     const {database}=JSON.parse(readFileSync('../mainMiddleware/database.json'),'utf8');   
//     return database;
// }
const server = createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    // const database=readFile();
    // let data='';
    // req.on('data',(chunk)=>{
    //     data+=chunk.toString();
    // });
    // req.on('end',()=>{
        // const {email}=JSON.parse(data);
        const template=readFileSync('./button.ejs','utf8');
        // const index= database.findIndex(oData=>oData.email===email);
        // if(index!==-1){
            // const name=database[index].fullName;
            // const value={name};
            res.end(render(template));
        // }
        // else{
            // res.end(render("<h1>your <%= email %> is not verified</h1>",{email}));
        // }
    // })
    
}) 

server.listen(PORT,(err)=>{
    if(err) throw new Error(err);
    console.log(`Server is running on port ${PORT}`);
});