import {server} from './server.mjs';

const PORT=8000;

server.listen(PORT,(err)=>{
    if(err) throw new Error(err);
    console.log(`Server is running on port ${PORT}`);
});

