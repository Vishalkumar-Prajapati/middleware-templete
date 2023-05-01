import {server} from './server.mjs';
const port=4515;

server.listen(port,(err)=>{
    if(err)console.log(err);
    else console.log(`Server is running on localhost:${port}`);
});
